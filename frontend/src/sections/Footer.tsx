import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/variants';
import logoImg from '../assets/Logo.svg';
import githubIcon from '../assets/icon-github.svg';
import linkedinIcon from '../assets/icon-linkedin.svg';

const FEATURE_LINKS = ['UI/UX Design', 'Programming', 'Web Project', 'App Project'];
const ABOUT_LINKS = ['Contact', 'Privacy Policy', 'Terms Condition'];

export default function Footer() {
  return (
    <footer className="bg-[rgba(255,255,255,0.1)] mix-blend-hard-light overflow-hidden w-full relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <motion.div
          className="flex items-center justify-between px-[128px] py-[47px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Info */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[25px] w-[384px]">
            <div className="flex items-center gap-3">
              <img alt="Logo" className="w-[38px] h-[41px] object-contain" src={logoImg} />
              <span className="text-[27px] font-bold tracking-tight">gerson</span>
            </div>
            <p className="text-[#b6b6b6] font-extralight text-[18px] leading-normal max-w-sm whitespace-pre-wrap">
              A passionate UI/UX Designer and Fullstack Developer crafting beautiful, interactive, and user-centric digital experiences.
            </p>
            <div className="flex items-center gap-8">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-[31px] hover:opacity-80 transition" data-cursor-hover>
                <img alt="Github" src={githubIcon} className="w-full h-full object-contain" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 hover:opacity-80 transition" data-cursor-hover>
                <img alt="Linkedin" src={linkedinIcon} className="w-full h-full object-contain" />
              </a>
            </div>
          </motion.div>

          {/* Links */}
          <div className="flex gap-[128px] items-start text-[18px] leading-normal">
            {/* Features Links */}
            <motion.div variants={fadeUp} custom={1} className="flex flex-col gap-[24px] w-[117px]">
              <h4 className="font-bold text-white">Features</h4>
              <ul className="flex flex-col gap-[10px] text-[#b6b6b6] font-extralight">
                {FEATURE_LINKS.map((item) => (
                  <motion.li key={item} whileHover={{ x: 4, color: '#ffffff' }} className="cursor-pointer transition-colors">
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* About Links */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-[24px] w-[140px]">
              <h4 className="font-bold text-white">About</h4>
              <ul className="flex flex-col gap-[10px] text-[#b6b6b6] font-extralight">
                {ABOUT_LINKS.map((item) => (
                  <motion.li key={item} whileHover={{ x: 4, color: '#ffffff' }} className="cursor-pointer transition-colors">
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
