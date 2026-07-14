import React, { useState, useRef, useEffect } from 'react';

interface ImageDropZoneProps {
  currentUrl: string;
  onUploaded: (url: string) => void;
  uploadEndpoint: string;
}

export default function ImageDropZone({
  currentUrl,
  onUploaded,
  uploadEndpoint,
}: ImageDropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset local preview when currentUrl changes from outside (e.g. form reset or new project edit)
    setLocalPreview(null);
  }, [currentUrl]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateAndUpload = async (file: File) => {
    setError(null);

    // Validate type: png, jpeg, jpg
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Hanya file PNG dan JPG/JPEG yang diizinkan.');
      return;
    }

    // Validate size: 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Ukuran file maksimal adalah 5MB.');
      return;
    }

    // Create instant local preview
    const previewUrl = URL.createObjectURL(file);
    setLocalPreview(previewUrl);

    // Perform upload
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengunggah gambar');
      }

      const data = await response.json();
      onUploaded(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat mengunggah.');
      // Revert local preview on error
      setLocalPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    onUploaded('');
    setLocalPreview(null);
    setError(null);
  };

  // Check if we have an image URL
  const hasImage = !!localPreview || !!currentUrl;

  // Let's resolve image src if relative path
  const backendBaseUrl = uploadEndpoint.replace('/api/upload', '');
  const imageSrc = localPreview || (currentUrl
    ? currentUrl.startsWith('http')
      ? currentUrl
      : `${backendBaseUrl}${currentUrl}`
    : '');

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-gray-400 mb-1">
        Gambar Proyek (PNG, JPG, maks. 5MB) *
      </label>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".png,.jpg,.jpeg"
        onChange={handleChange}
        disabled={loading}
      />

      {hasImage ? (
        <div className="relative group overflow-hidden rounded-lg border border-white/10 bg-[#121212] aspect-[16/10] flex items-center justify-center">
          <img
            src={imageSrc}
            alt="Preview proyek"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-200">
            <button
              type="button"
              onClick={triggerFileInput}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-1.5 px-3 rounded shadow transition"
              disabled={loading}
            >
              Ganti Gambar
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold py-1.5 px-3 rounded shadow transition"
              disabled={loading}
            >
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition duration-200 aspect-[16/10] bg-[#121212] ${
            isDragActive
              ? 'border-blue-500 bg-blue-500/5'
              : 'border-white/10 hover:border-blue-500/50 hover:bg-white/[0.01]'
          } ${loading ? 'pointer-events-none opacity-60' : ''}`}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-gray-400 font-medium">Mengunggah file...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <svg
                className={`w-10 h-10 mb-3 transition ${
                  isDragActive ? 'text-blue-500' : 'text-gray-500'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm font-semibold text-white mb-1">
                Drag & drop gambar di sini
              </p>
              <p className="text-xs text-gray-500 mb-2">atau klik untuk menelusuri</p>
              <span className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400">
                PNG, JPG (Maks. 5MB)
              </span>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1 font-semibold flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
