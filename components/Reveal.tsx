"use client";
import { motion, useReducedMotion } from "framer-motion";
export const ease = [0.23, 1, 0.32, 1] as const;
export default function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={{ opacity: 0, y: reduce ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.5, ease, delay }}>
      {children}
    </motion.div>
  );
}
