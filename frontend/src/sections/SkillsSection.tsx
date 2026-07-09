import { motion } from 'framer-motion';
import RevealSection from '../components/RevealSection';
import { fadeUp, staggerContainer } from '../lib/variants';
import uxImg from '../assets/UX.png';
import uiEngineerImg from '../assets/ui-engineer.png';
import problemsolvImg from '../assets/problemsolv.png';

const SKILLS = [
  {
    img: uxImg,
    title: 'UI/UX',
    desc: 'Lorem ipsum description of skills',
    border: 'hover:border-[#8B5CF6]/60',
  },
  {
    img: uiEngineerImg,
    title: 'UI Engineer',
    desc: 'Lorem ipsum description of skills',
    border: 'hover:border-[#266ed9]/60',
  },
  {
    img: problemsolvImg,
    title: 'Problem Solving',
    desc: 'Lorem ipsum description of skills',
    border: 'hover:border-[#b14c1f]/60',
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="mb-32">
      <RevealSection className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text-blue">My Skill</span> Saya
        </h2>
        <p className="text-[#e8e8e8] font-light max-w-xl mx-auto">
          Love to explore on design and building software, I will create solution
        </p>
      </RevealSection>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {SKILLS.map((card, i) => (
          <motion.div
            key={card.title}
            variants={fadeUp}
            custom={i}
            className={`skill-card border border-white/10 ${card.border} transition rounded-[6px] p-8 flex flex-col justify-center items-center gap-6 flex-[1_0_0] text-center bg-white/[0.02]`}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
            data-cursor-hover
          >
            <motion.div
              className="flex items-center justify-center"
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <img alt={card.title} src={card.img} className="object-contain" />
            </motion.div>
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
