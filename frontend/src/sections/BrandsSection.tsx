import { useRef, useEffect } from 'react';
import RevealSection from '../components/RevealSection';
import upnvjImg from '../assets/upnvj.png';
import veterantechImg from '../assets/veterantech.png';
import kopdesImg from '../assets/kopdes.png';
import bgnImg from '../assets/bgn.png';

const BRANDS = [
  { src: upnvjImg, alt: 'UPN' },
  { src: veterantechImg, alt: 'Veterantech' },
  { src: kopdesImg, alt: 'Soon' },
  { src: bgnImg, alt: 'Soon' },
];

// Duplicate brands 4x to create an infinite loop illusion
const BRANDS_LOOP = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

export default function BrandsSection() {
  const brandScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = brandScrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const step = () => {
      if (!isDown) {
        el.scrollLeft += 0.8;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => { isDown = false; };
    const onMouseUp = () => { isDown = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 1.5;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(step);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <RevealSection>
      <section className="bg-[rgba(255,255,255,0.04)] border border-white/5 py-[20px] mb-32 mx-[60px] overflow-hidden ">
        <div
          ref={brandScrollRef}
          className="overflow-x-auto flex gap-24 scrollbar-none cursor-grab active:cursor-grabbing select-none px-8"
          style={{ scrollBehavior: 'auto' }}
        >
          {BRANDS_LOOP.map((brand, i) => (
            <div
              key={brand.alt + i}
              className="w-[156px] h-[156px] flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-108"
            >
              <img alt={brand.alt} src={brand.src} className="w-full h-full object-contain brand-logo" />
            </div>
          ))}
        </div>
      </section>
    </RevealSection>
  );
}
