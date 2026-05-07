'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Dot follows precisely
    const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
    const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

    // Ring lags behind for the trailing effect
    const ringX = useSpring(mouseX, { stiffness: 120, damping: 20 });
    const ringY = useSpring(mouseY, { stiffness: 120, damping: 20 });

    useEffect(() => {
        // Only show on non-touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!visible) setVisible(true);
        };

        const down = () => setClicking(true);
        const up   = () => setClicking(false);
        const leave = () => setVisible(false);
        const enter = () => setVisible(true);

        const checkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setHovering(
                !!target.closest('a, button, [role="button"], input, textarea, select, label')
            );
        };

        window.addEventListener('mousemove',  move);
        window.addEventListener('mousemove',  checkHover);
        window.addEventListener('mousedown',  down);
        window.addEventListener('mouseup',    up);
        document.addEventListener('mouseleave', leave);
        document.addEventListener('mouseenter', enter);

        return () => {
            window.removeEventListener('mousemove',  move);
            window.removeEventListener('mousemove',  checkHover);
            window.removeEventListener('mousedown',  down);
            window.removeEventListener('mouseup',    up);
            document.removeEventListener('mouseleave', leave);
            document.removeEventListener('mouseenter', enter);
        };
    }, [mouseX, mouseY, visible]);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            {/* Ring — trails behind */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: visible ? 1 : 0,
                    scale:   hovering ? 1.8 : clicking ? 0.7 : 1,
                    width:   hovering ? 48 : 36,
                    height:  hovering ? 48 : 36,
                }}
                transition={{ scale: { duration: 0.15 }, width: { duration: 0.15 }, height: { duration: 0.15 } }}
            >
                <div className="w-full h-full rounded-full border border-white dark:border-white opacity-70" />
            </motion.div>

            {/* Dot — precise */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: visible ? 1 : 0,
                    scale:   clicking ? 0.5 : 1,
                }}
                transition={{ scale: { duration: 0.1 } }}
            >
                <div className="w-2 h-2 rounded-full bg-white dark:bg-white" />
            </motion.div>
        </>
    );
}
