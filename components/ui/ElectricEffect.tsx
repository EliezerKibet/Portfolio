'use client';

import { useEffect, useRef } from 'react';

const GRID = 40;
const HALF = 11;
const REACH = 90;

export default function ElectricEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -9999, y: -9999 });
    const anglesRef = useRef<Float32Array | null>(null);
    const rafRef = useRef<number>(0);
    const dimsRef = useRef({ cols: 0, rows: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const cols = Math.ceil(canvas.width / GRID) + 1;
            const rows = Math.ceil(canvas.height / GRID) + 1;
            dimsRef.current = { cols, rows };
            anglesRef.current = new Float32Array(cols * rows);
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
        window.addEventListener('mousemove', onMove);

        const isDark = () => document.documentElement.classList.contains('dark');

        const tick = () => {
            const { cols, rows } = dimsRef.current;
            const angles = anglesRef.current;
            if (!angles) { rafRef.current = requestAnimationFrame(tick); return; }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const dark = isDark();
            const { x: mx, y: my } = mouse.current;

            ctx.lineWidth = dark ? 0.9 : 0.75;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const gx = c * GRID + GRID * 0.5;
                    const gy = r * GRID + GRID * 0.5;
                    const dx = gx - mx;
                    const dy = gy - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Swirl angle (tangent to cursor circle) blended with default (horizontal)
                    const influence = dist < 1 ? 1 : Math.max(0, 1 - dist / REACH);
                    const swirl = Math.atan2(dx, -dy); // clockwise swirl
                    const target = swirl * influence;

                    const i = r * cols + c;
                    let delta = target - angles[i];
                    // Shortest angular path
                    if (delta > Math.PI) delta -= Math.PI * 2;
                    if (delta < -Math.PI) delta += Math.PI * 2;
                    angles[i] += delta * 0.1;

                    const a = angles[i];
                    const cos = Math.cos(a);
                    const sin = Math.sin(a);

                    const proximity = Math.max(0, 1 - dist / (REACH * 1.3));
                    const opacity = (dark ? 0.1 : 0.07) + proximity * (dark ? 0.45 : 0.28);

                    ctx.globalAlpha = opacity;
                    ctx.strokeStyle = dark ? '#a5b4fc' : '#6366f1';

                    ctx.beginPath();
                    ctx.moveTo(gx - cos * HALF, gy - sin * HALF);
                    ctx.lineTo(gx + cos * HALF, gy + sin * HALF);
                    ctx.stroke();
                }
            }

            ctx.globalAlpha = 1;
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1]" />;
}
