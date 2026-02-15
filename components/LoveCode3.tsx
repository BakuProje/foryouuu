'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoveCode3({ onComplete }: { onComplete: () => void }) {
    const [animationState, setAnimationState] = useState(0);
    const [showText, setShowText] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Electric particle animation - 100% sama dengan HTML
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles: any[] = [];
        let time = 0;
        let animFrame: number;

        const PARTICLE_COUNT = 900; // Sama dengan HTML
        const COLOR_BASE = 'rgba(255, 30, 150,';

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);

        // 1. FUNGSI HATI (RESPONSIF FIXED) - Sama persis dengan HTML
        const getHeartPoint = (t: number) => {
            const minSize = Math.min(width, height);
            const isMobile = width < 768;
            const scaleFactor = isMobile ? 55 : 30;
            const scale = minSize / scaleFactor;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            return {
                x: (x * scale) + width / 2,
                y: (y * scale) + height / 2
            };
        };

        // 2. FUNGSI LINGKARAN (Intro) - Sama persis dengan HTML
        const getThreeCircles = (t: number, i: number) => {
            const minSize = Math.min(width, height);
            const orbitRadius = minSize * 0.25;
            const circleRadius = minSize * 0.08;
            const offset = (i % 3) * (Math.PI * 2 / 3);
            const centerX = width / 2 + Math.cos(time * 1.5 + offset) * orbitRadius;
            const centerY = height / 2 + Math.sin(time * 1.5 + offset) * orbitRadius;
            return {
                x: centerX + Math.cos(t) * circleRadius,
                y: centerY + Math.sin(t) * circleRadius
            };
        };

        // 3. FUNGSI GELOMBANG - Sama persis dengan HTML
        const getTwoWaves = (t: number, i: number) => {
            const split = i % 2 === 0 ? -1 : 1;
            const realWidth = width < 768 ? width * 0.9 : width * 0.85;
            const startX = (width - realWidth) / 2;
            const x = startX + (t / (Math.PI * 2)) * realWidth;
            const y = height / 2 + Math.sin(t * 7 + time * 3) * (height * 0.12) * split;
            return { x, y };
        };

        // SISTEM PARTIKEL - Sama persis dengan HTML
        class Particle {
            id: number;
            x: number;
            y: number;
            vx: number;
            vy: number;
            history: { x: number; y: number }[];

            constructor(index: number) {
                this.id = index;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.history = [];
            }

            update(state: number) {
                let target;
                const angle = (this.id / PARTICLE_COUNT) * Math.PI * 2;

                if (state === 0) {
                    target = getThreeCircles(angle, this.id);
                } else if (state === 1) {
                    target = getTwoWaves(angle, this.id);
                } else {
                    target = getHeartPoint(angle);
                }

                const dx = target.x - this.x;
                const dy = target.y - this.y;
                this.vx += dx * 0.05;
                this.vy += dy * 0.05;
                this.vx *= 0.84;
                this.vy *= 0.84;

                // Efek Getar Listrik (Jitter)
                let noise = 0;
                if (state === 2) noise = 3.0;

                this.x += this.vx + (Math.random() - 0.5) * noise;
                this.y += this.vy + (Math.random() - 0.5) * noise;

                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > 5) this.history.shift();
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                const opacity = 0.4 + Math.random() * 0.6;
                ctx.strokeStyle = COLOR_BASE + opacity + ')';
                ctx.lineWidth = 1.3;

                if (this.history.length > 0) {
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                }
                ctx.stroke();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle(i));
        }

        const animate = () => {
            // Trail sedikit lebih gelap agar efek listrik terlihat kontras
            ctx.fillStyle = 'rgba(2, 0, 5, 0.25)';
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'lighter';

            particles.forEach(p => {
                p.update(animationState);
                p.draw(ctx);
            });

            ctx.globalCompositeOperation = 'source-over';
            time += 0.02;
            animFrame = requestAnimationFrame(animate);
        };

        animate();

        // TIMELINE - Sama persis dengan HTML (4s, 8s) + 18s total
        // Fase 0: Lingkaran (0s - 4s) - sudah default

        // Fase 1: Gelombang (4s - 8s)
        setTimeout(() => {
            setAnimationState(1);
        }, 4000);

        // Fase 2: Hati Listrik + Teks (8s - 18s)
        setTimeout(() => {
            setAnimationState(2);
            setShowText(true);
            // Ledakan partikel saat berubah jadi hati
            particles.forEach(p => {
                p.vx += (Math.random() - 0.5) * 60;
                p.vy += (Math.random() - 0.5) * 60;
            });
        }, 8000);

        // Complete after 18 seconds total
        setTimeout(() => {
            onComplete();
        }, 18000);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animFrame);
        };
    }, [animationState, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 overflow-hidden"
        >
            {/* Canvas for particle animation */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: '#020005' }}
            />

            {/* Text overlay - Styling 100% sama dengan HTML */}
            <AnimatePresence>
                {showText && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full pointer-events-none"
                    >
                        <h1
                            className="text-[4.5rem] sm:text-[4.5rem] md:text-[4.5rem] m-0 text-white uppercase tracking-[4px]"
                            style={{
                                fontFamily: "var(--font-audiowide)",
                                textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de, 0 0 40px #ff00de, 0 0 80px #ff00de',
                                animation: 'electric-shock 3s infinite'
                            }}
                        >
                            I Love You
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CSS Animation - Sama persis dengan HTML */}
            <style jsx>{`
                @keyframes electric-shock {
                    0%, 100% { opacity: 1; transform: scale(1) skew(0deg); }
                    5% { opacity: 0.8; }
                    10% { opacity: 1; text-shadow: 0 0 10px #fff, 0 0 20px #ff00de; }
                    15% { opacity: 0.3; transform: scale(1.02) skew(2deg); }
                    20% { opacity: 1; text-shadow: 0 0 15px #fff, 0 0 30px #ff00de, 0 0 60px #ff00de; }
                    25% { transform: scale(0.98) skew(-2deg); }
                    30% { opacity: 1; }
                    70% { opacity: 1; transform: scale(1); }
                    72% { opacity: 0.6; }
                    74% { opacity: 1; }
                }

                @media (max-width: 768px) {
                    h1 {
                        font-size: 2.8rem !important;
                        letter-spacing: 2px !important;
                    }
                }
            `}</style>
        </motion.div>
    );
}
