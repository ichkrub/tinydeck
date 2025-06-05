import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const floatingIcons = [
  // Left side icons
  { x: '5%', y: '20%', size: 48, delay: 0, duration: 8 },
  { x: '10%', y: '50%', size: 32, delay: 2, duration: 10 },
  { x: '15%', y: '80%', size: 64, delay: 1, duration: 9 },
  // Right side icons
  { x: '85%', y: '15%', size: 56, delay: 3, duration: 11 },
  { x: '90%', y: '45%', size: 40, delay: 0.5, duration: 7 },
  { x: '80%', y: '75%', size: 48, delay: 2.5, duration: 10 },
  // Additional depth icons
  { x: '20%', y: '30%', size: 24, delay: 1.5, duration: 12 },
  { x: '75%', y: '60%', size: 28, delay: 3.5, duration: 9 },
];

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-white/5"
          style={{ left: icon.x, top: icon.y }}
          animate={{
            y: ['0%', '-20%', '0%'],
            x: ['-5%', '5%', '-5%'],
            rotate: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          }}
        >
          <FileText size={icon.size} />
        </motion.div>
      ))}
    </div>
  );
}
