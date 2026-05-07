'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]),  { stiffness: 200, damping: 30 });
    const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });
    const shine   = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 30 });

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
        rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
    };

    const onMouseLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                transformPerspective: 800,
            }}
            className={`relative ${className}`}
        >
            {/* Shine overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useTransform(
                        shine,
                        (v) => `linear-gradient(${105 + v}deg, rgba(255,255,255,0.08) 0%, transparent 60%)`
                    ),
                }}
            />
            {children}
        </motion.div>
    );
}
