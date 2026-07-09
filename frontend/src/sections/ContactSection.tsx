import { motion } from 'framer-motion';
import Button from '../components/Button';
import { fadeLeft, fadeRight } from '../lib/variants';
import catImg from '../assets/cat.png';

export default function ContactSection() {
  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">

      {/* Left Column (Image) */}
      <motion.div
        className="lg:col-span-6 flex justify-center"
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="relative max-w-full">
          {/* Construction Cat */}
          <motion.div className="relative z-10" whileHover={{ scale: 1.02 }}>
            <img alt="Why Hire Me" src={catImg} className="object-contain" />
          </motion.div>
        </div>
      </motion.div>

      {/* Right Column (Text) */}
      <motion.div
        className="lg:col-span-6 flex flex-col items-start gap-6"
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Why you should <br />
          <span className="gradient-text-blue">Hire Me</span>
        </h2>
        <p className="text-2xl font-light text-[#e8e8e8] leading-relaxed italic">
          "Because I have no job :("
        </p>
        <p className="text-gray-400 font-light leading-relaxed">
          Tapi secara profesional, saya bersemangat mempelajari fullstack web development dan siap mendedikasikan waktu saya untuk membantu membangun solusi digital hebat di tim Anda.
        </p>
        <Button variant="orange" size="lg" asAnchor href="mailto:gerson.sebastian@example.com">
          Hire Me
        </Button>
      </motion.div>
    </section>
  );
}
