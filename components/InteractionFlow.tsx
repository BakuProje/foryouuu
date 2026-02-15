'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

// --- Background Particles ---
const BackgroundHearts = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => ( // Reduced to 10 for better performance
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        y: '110vh',
                        x: `${(i * 10) + Math.random() * 5}%`, // More deterministic distribution
                        scale: 0.5
                    }}
                    animate={{
                        opacity: [0, 0.2, 0],
                        y: '-10vh',
                        rotate: [0, 180],
                        scale: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                    }}
                    className="absolute text-red-500/10"
                >
                    <Heart size={30} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
};

// --- Step 1: Love Mode ---
const LoveModeStep = ({ onComplete }: { onComplete: () => void }) => {
    const [isOn, setIsOn] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Delay content appearance for dramatic entrance
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOn) {
            const timer = setTimeout(() => onComplete(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOn, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center relative z-10 px-6 w-full"
        >
            {/* Animated background circles */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-red-500 to-pink-500 blur-3xl"
            />

            {/* Decorative floating hearts */}
            <AnimatePresence>
                {isOn && (
                    <>
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    scale: [0, 1.5, 0],
                                    y: [0, -150 - i * 10],
                                    x: [0, (i % 2 === 0 ? 1 : -1) * (50 + i * 15)]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeOut"
                                }}
                                className="absolute"
                                style={{ top: '50%' }}
                            >
                                <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Sparkles around the card */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 180]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                        className="absolute"
                        style={{
                            left: `${(i * 7) % 100}%`,
                            top: `${(i * 13) % 100}%`
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={showContent ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={`relative backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] transition-all duration-1000 ease-in-out flex flex-col items-center space-y-8 sm:space-y-10 border overflow-hidden max-w-md w-full ${isOn ? 'bg-gradient-to-br from-red-500/30 via-pink-500/25 to-red-500/30 shadow-[0_0_120px_rgba(239,68,68,0.5),inset_0_0_60px_rgba(239,68,68,0.1)] border-red-500/40' : 'bg-transparent shadow-2xl border-white/10'}`}
            >
                {/* Animated background pattern */}
                <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={isOn ? {
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    } : {}}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(239,68,68,0.4) 1.5px, transparent 1.5px)',
                        backgroundSize: '25px 25px'
                    }}
                />

                {/* Diagonal light streaks */}
                <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={isOn ? {
                        x: ['100%', '-100%'],
                        opacity: [0, 0.3, 0]
                    } : {}}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />

                {/* Main heart icon with enhanced effects */}
                <div className="relative">
                    {/* Multiple glow rings */}
                    <AnimatePresence>
                        {isOn && (
                            <>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-full bg-red-500/40 blur-2xl"
                                />
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-full bg-pink-500/40 blur-3xl"
                                />
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-full bg-red-400/30 blur-xl"
                                />
                            </>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={showContent ? { scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 0.8, type: "spring", stiffness: 200, delay: 0.4 }}
                    >
                        <motion.div
                            animate={isOn ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, 8, -8, 0],
                                filter: [
                                    'drop-shadow(0 0 10px rgba(239,68,68,0.3))',
                                    'drop-shadow(0 0 40px rgba(239,68,68,0.9))',
                                    'drop-shadow(0 0 10px rgba(239,68,68,0.3))'
                                ]
                            } : {}}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Heart className={`w-20 h-20 sm:w-24 sm:h-24 transition-all duration-1000 ${isOn ? 'text-red-500 fill-red-500' : 'text-white/30'}`} />
                        </motion.div>
                    </motion.div>

                    {/* Orbiting sparkles */}
                    <AnimatePresence>
                        {isOn && (
                            <>
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 1.2, 0],
                                            rotate: [0, 360]
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.3,
                                            ease: "linear"
                                        }}
                                        className="absolute"
                                        style={{
                                            top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                                            left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                                        }}
                                    >
                                        <Sparkles className="w-5 h-5 text-yellow-300" />
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col items-center space-y-6 relative z-10">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={showContent ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <motion.span
                            animate={isOn ? {
                                textShadow: [
                                    '0 0 10px rgba(239,68,68,0.3)',
                                    '0 0 30px rgba(239,68,68,0.7)',
                                    '0 0 10px rgba(239,68,68,0.3)'
                                ]
                            } : {}}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className={`text-4xl sm:text-5xl font-playfair transition-colors duration-1000 ${isOn ? 'text-white' : 'text-white/50'}`}
                        >
                            Love Mode
                        </motion.span>
                    </motion.span>

                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={showContent ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOn(!isOn)}
                        className={`group relative w-32 h-16 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] p-1.5 focus:outline-none ${isOn ? 'bg-gradient-to-r from-red-500 via-pink-500 to-red-500 shadow-[0_0_50px_rgba(239,68,68,0.7)]' : 'bg-white/15 hover:bg-white/20 border border-white/20'
                            }`}
                    >
                        {/* Inner glow when on */}
                        {isOn && (
                            <motion.div
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full bg-white/25"
                            />
                        )}

                        <motion.div
                            animate={{ x: isOn ? 64 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            className="relative w-13 h-13 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-none"
                        >
                            <Heart
                                size={24}
                                className={`transition-all duration-500 ${isOn ? "text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "text-gray-400"}`}
                            />
                        </motion.div>

                        <AnimatePresence>
                            {!isOn && (
                                <motion.span
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 5 }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50"
                                >
                                    off
                                </motion.span>
                            )}
                            {isOn && (
                                <motion.span
                                    initial={{ opacity: 0, x: 5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -5 }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                >
                                    on
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Instruction text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOn ? 0 : 0.6 }}
                        transition={{ duration: 0.5 }}
                        className="text-sm text-white/60 font-light tracking-wide"
                    >
                        Tap to activate
                    </motion.p>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Step 2: Tic-Tac-Toe ---
const TicTacToeStep = ({ onComplete }: { onComplete: () => void }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isUserTurn, setIsUserTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [message, setMessage] = useState("Let's play a little game...");
    const [winningLine, setWinningLine] = useState<number[] | null>(null);

    const checkWinner = useCallback((squares: (string | null)[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setWinningLine([a, b, c]);
                return squares[a];
            }
        }
        return squares.includes(null) ? null : 'draw';
    }, []);

    const makeAIMove = useCallback((currentBoard: (string | null)[]) => {
        const emptyIndices = currentBoard.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
        if (emptyIndices.length === 0) return;

        const nonCenterIndices = emptyIndices.filter(i => i !== 4);
        const targetIndex = nonCenterIndices.length > 0
            ? nonCenterIndices[Math.floor(Math.random() * nonCenterIndices.length)]
            : 4;

        const newBoard = [...currentBoard];
        newBoard[targetIndex] = 'O';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result);
        } else {
            setIsUserTurn(true);
        }
    }, [checkWinner]);

    const handleSquareClick = (index: number) => {
        if (board[index] || winner || !isUserTurn) return;

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result);
        } else {
            setIsUserTurn(false);
            setTimeout(() => makeAIMove(newBoard), 600);
        }
    };

    useEffect(() => {
        if (winner === 'X') {
            setMessage("Kamu Menang");
            setTimeout(() => onComplete(), 3500);
        } else if (winner === 'O' || winner === 'draw') {
            setMessage(winner === 'draw' ? "Seri! Coba lagi yaa ❤️" : "Hampir! Sekali lagi...");
            setTimeout(() => {
                setBoard(Array(9).fill(null));
                setWinner(null);
                setWinningLine(null);
                setIsUserTurn(true);
            }, 1500);
        }
    }, [winner, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center space-y-8 sm:space-y-10 relative z-10 px-6"
        >
            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            y: '-100%',
                            x: [0, (i % 2 === 0 ? 50 : -50)]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "linear"
                        }}
                        className="absolute"
                        style={{ left: `${(i * 12) + 10}%` }}
                    >
                        <Heart className="w-8 h-8 text-red-500/20 fill-red-500/20" />
                    </motion.div>
                ))}
            </div>

            <motion.h2
                animate={winner === 'X' ? {
                    scale: [1, 1.05, 1],
                    textShadow: [
                        '0 0 20px rgba(239,68,68,0.5)',
                        '0 0 30px rgba(239,68,68,0.7)',
                        '0 0 20px rgba(239,68,68,0.5)'
                    ]
                } : {}}
                transition={{ duration: 1.5, repeat: winner === 'X' ? Infinity : 0, ease: "easeInOut" }}
                className="text-3xl sm:text-4xl font-playfair text-white text-center drop-shadow-lg max-w-xs whitespace-pre-line leading-tight"
            >
                {winner === 'X' ? "Kamu Menang" : message}
            </motion.h2>

            <div className="relative">
                {/* Glow effect behind board */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl blur-2xl"
                />

                <div className="relative grid grid-cols-3 gap-3 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                    {board.map((square, i) => {
                        const isWinningSquare = winningLine?.includes(i);
                        return (
                            <button
                                key={i}
                                onClick={() => handleSquareClick(i)}
                                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center border transition-all duration-300 group relative overflow-hidden ${
                                    isWinningSquare
                                        ? 'bg-gradient-to-br from-red-500/40 to-pink-500/40 border-red-400/50 shadow-[0_0_30px_rgba(239,68,68,0.6)]'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                            >
                                {/* Sparkle effect on hover */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10"
                                />

                                <AnimatePresence mode="wait">
                                    {square === 'X' ? (
                                        <motion.div
                                            key={winner === 'X' ? "heart-win" : "heart"}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={winner === 'X' ? {
                                                scale: 1,
                                                rotate: 0
                                            } : {
                                                scale: 1,
                                                rotate: 0
                                            }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                delay: winner === 'X' ? i * 0.1 : 0
                                            }}
                                        >
                                            {winner === 'X' ? (
                                                <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-red-500 fill-red-500 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]" />
                                            ) : (
                                                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 fill-red-400 filter drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                                            )}
                                        </motion.div>
                                    ) : square === 'O' ? (
                                        <motion.div
                                            key="broken-heart"
                                            initial={{ scale: 0, rotate: 180 }}
                                            animate={{ 
                                                scale: 1, 
                                                rotate: 0
                                            }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            className="text-4xl sm:text-5xl"
                                        >
                                            💔
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {winner === 'X' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <motion.h2
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-4xl sm:text-5xl font-playfair text-white text-center drop-shadow-lg"
                        >
                            
                        </motion.h2>
                        
                        {/* Confetti hearts */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: [0, -100 - Math.random() * 50],
                                    x: [(Math.random() - 0.5) * 200],
                                    scale: [0, 1, 0.5],
                                    rotate: [0, Math.random() * 360]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.1,
                                    ease: "easeOut"
                                }}
                                className="absolute"
                            >
                                <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Step 3: Love Meter ---
const LoveMeterStep = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 1500);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);
        return () => clearInterval(interval);
    }, [onComplete]);

    // SVG parameters for the semi-circle
    const radius = 90;
    const circumference = Math.PI * radius;
    const dashOffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-8 sm:space-y-12 w-full max-w-lg px-6 relative z-10"
        >
            <div className="relative w-full max-w-[320px] sm:max-w-lg aspect-[2/1] flex flex-col items-center justify-end overflow-visible">
                {/* SVG Gauge */}
                <svg viewBox="0 0 200 110" className="w-full h-full absolute top-0 overflow-visible">
                    {/* Background Path (Gray) */}
                    <path
                        d="M 10,100 A 90,90 0 0 1 190,100"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="14"
                        strokeLinecap="round"
                    />
                    {/* Progress Path (Red) with enhanced glow */}
                    <motion.path
                        d="M 10,100 A 90,90 0 0 1 190,100"
                        fill="none"
                        stroke="url(#loveGradient)"
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        animate={{ strokeDashoffset: dashOffset }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        style={{ 
                            filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.8)) drop-shadow(0 0 20px rgba(239, 68, 68, 0.4))'
                        }}
                    />
                    <defs>
                        <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="50%" stopColor="#f87171" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="z-10 flex flex-col items-center pb-2 sm:pb-4">
                    {/* Heart icon - Hidden on mobile, visible on desktop */}
                    <motion.div
                        animate={{ 
                            scale: [1, 1.15, 1],
                            filter: [
                                'drop-shadow(0 0 10px rgba(239, 68, 68, 0.6))',
                                'drop-shadow(0 0 25px rgba(239, 68, 68, 0.9))',
                                'drop-shadow(0 0 10px rgba(239, 68, 68, 0.6))'
                            ]
                        }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="mb-1 sm:mb-2 hidden sm:block"
                    >
                        <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-red-500 fill-red-500" />
                    </motion.div>
                    <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tighter leading-none">
                        {progress}<span className="text-red-400 text-2xl sm:text-3xl">%</span>
                    </div>
                    <span className="text-lg sm:text-2xl text-white/70 font-playfair italic mt-1 sm:mt-2 tracking-wide sm:tracking-widest">
                        Love Intensity
                    </span>
                </div>
            </div>

            {/* Progress Bar for consistency */}
            <div className="w-full max-w-[320px] sm:max-w-lg h-2 sm:h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <motion.div
                    className="h-full bg-gradient-to-r from-red-500 via-red-400 to-pink-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
};

// --- Step 4: Typewriter ---
const TypewriterStep = ({ onComplete }: { onComplete: () => void }) => {
    const text = "Happy Valentine!!!!";
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isDeleting && displayedText !== text) {
            timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, 150);
        } else if (!isDeleting && displayedText === text) {
            timer = setTimeout(() => setIsDeleting(true), 2500);
        } else if (isDeleting && displayedText !== "") {
            timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length - 1));
            }, 80);
        } else if (isDeleting && displayedText === "") {
            onComplete();
        }
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, onComplete, text]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            className="flex flex-col items-center justify-center p-8 relative z-10 overflow-hidden"
        >
            {/* Simplified floating hearts - only 6 hearts */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: `${(i * 16) % 100}%`,
                            y: '110vh',
                        }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            y: '-10vh',
                        }}
                        transition={{
                            duration: 12 + i * 2,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: "linear"
                        }}
                        className="absolute text-red-500/30"
                    >
                        <Heart size={25} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {/* Main text with simple Valentine theme */}
            <motion.div
                animate={{
                    textShadow: [
                        '0 0 15px rgba(239,68,68,0.4)',
                        '0 0 25px rgba(239,68,68,0.6)',
                        '0 0 15px rgba(239,68,68,0.4)'
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative"
            >
                <h1 className="text-5xl sm:text-8xl font-playfair text-white text-center leading-tight">
                    {displayedText}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 sm:w-4 h-12 sm:h-20 bg-gradient-to-b from-red-500 to-pink-500 ml-2 align-middle rounded-sm"
                    />
                </h1>
            </motion.div>

            {/* Only 2 decorative hearts */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4"
            >
                <Heart className="w-12 h-12 text-red-400/30 fill-red-400/30" />
            </motion.div>

            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeInOut"
                }}
                className="absolute bottom-1/4 right-1/4"
            >
                <Heart className="w-12 h-12 text-pink-400/30 fill-pink-400/30" />
            </motion.div>
        </motion.div>
    );
};

export default function InteractionFlow({ onFlowComplete }: { onFlowComplete: () => void }) {
    const [step, setStep] = useState(1);

    return (
        <div className="fixed inset-0 z-50 bg-[#060010] flex items-center justify-center overflow-hidden">
            {/* Visual background layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

            <BackgroundHearts />

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <LoveModeStep key="step1" onComplete={() => setStep(2)} />
                )}
                {step === 2 && (
                    <TicTacToeStep key="step2" onComplete={() => setStep(3)} />
                )}
                {step === 3 && (
                    <LoveMeterStep key="step3" onComplete={() => setStep(4)} />
                )}
                {step === 4 && (
                    <TypewriterStep key="step4" onComplete={() => onFlowComplete()} />
                )}
            </AnimatePresence>

            {/* Corner Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-900/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-900/20 blur-[100px] rounded-full" />
        </div>
    );
}
