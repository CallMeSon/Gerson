import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../components/Button';
import { fadeUp, fadeRight, staggerContainer } from '../lib/variants';
import { useTypewriter } from '../hooks/useTypewriter';
import heroImg from '../assets/hero.png';
import coffeeImg from '../assets/coffee.png';
import laptopImg from '../assets/laptop.png';
import certifiedImg from '../assets/certified.png';

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const typewriterText = useTypewriter(['Best Unemployment', 'UI/UX Designer', 'Fullstack Dev', 'Problem Solver']);

  const playMottoSound = () => {
    const audio = new Audio('/hidup-jokowi.mp3');
    audio.play().catch((err) => {
      console.warn('Gagal memutar audio:', err);
    });
  };

  return (
    <section id="about" ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">

      {/* Left Column */}
      <motion.div
        className="lg:col-span-7 flex flex-col items-start gap-8"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-tight"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeUp} className="block">I'm Gerson Sebastian,</motion.span>
          <motion.span variants={fadeUp} className="block mt-2">
            <span className="gradient-text-blue">
              {typewriterText}
              <span className="typewriter-cursor" />
            </span>
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-[#e8e8e8] font-light text-lg max-w-[480px] leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          I'm available for work, if you want to contact with me then please hit hire me button
        </motion.p>

        <motion.div
          className="flex items-center gap-4 animate-fade-in"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <Button variant="primary" size="lg" asAnchor href="#contact">
            Hire Me
          </Button>
          <Button variant="outline" size="lg" onClick={playMottoSound}>
            My Motto
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Column */}
      <motion.div
        className="lg:col-span-5 flex justify-center relative"
        variants={fadeRight}
        initial="hidden"
        animate="visible"
      >
        <div>
          {/* Profile Photo */}
          <motion.img
            src={heroImg}
            alt="Gerson Sebastian"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          />

          {/* Floating Coffee Cup */}
          <motion.div
            className="absolute bottom-[-30px] left-[-60px] w-48 h-48 z-20 pointer-events-none drop-shadow-2xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={coffeeImg} alt="coffee" className="w-full h-full object-contain" />
          </motion.div>

          {/* Floating Laptop */}
          <motion.div
            className="absolute top-[-30px] right-[-80px] w-64 h-64 z-20 pointer-events-none drop-shadow-2xl"
            animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <img src={laptopImg} alt="laptop" className="w-full h-full object-contain" />
          </motion.div>

          {/* Badge */}
          <motion.div
            className="absolute top-[30%] left-[-30px] z-20 w-[200px] drop-shadow-xl float-badge"
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ duration: 0.3 }}
          >
            <img alt="Certified Jobless" src={certifiedImg} className="w-full h-auto object-contain" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
