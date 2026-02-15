'use client';

import { useState, useEffect } from 'react';
import DomeGallery from '@/components/DomeGallery';
import InteractionFlow from '@/components/InteractionFlow';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Home() {
  const [showLoveCode, setShowLoveCode] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const userImages = [
    '/1.jpeg',
    '/2.jpeg',
    '/3.jpeg',
    '/4.jpeg',
    '/5.jpeg',
    '/6.jpeg',
    '/7.jpeg',
    '/8.jpeg',
    '/9.jpeg',
    '/10.jpeg',
    '/11.jpeg',
    '/12.jpeg',
    '/13.jpeg',
    '/14.jpeg',
    '/15.jpeg',
  ];

  // Timer untuk pindah dari LoveCode3.html ke gallery setelah 12 detik
  useEffect(() => {
    if (showLoveCode && !showGallery) {
      const timer = setTimeout(() => {
        setShowGallery(true);
      }, 12000); // 12 detik

      return () => clearTimeout(timer);
    }
  }, [showLoveCode, showGallery]);

  return (
    <main className="w-screen h-screen bg-[#060010] relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!showLoveCode && !showGallery && (
          <InteractionFlow key="flow" onFlowComplete={() => setShowLoveCode(true)} />
        )}
        
        {showLoveCode && !showGallery && (
          <motion.div
            key="lovecode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <iframe
              src="LoveCode3.html"
              className="w-full h-full border-0"
              title="Love Code Animation"
            />
          </motion.div>
        )}
        
        {showGallery && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* Valentine Background - Enhanced */}
            <div className="absolute inset-0 z-0">
              {/* Gradient background with stronger colors */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2d0a1a] via-[#0a0015] to-[#150a25]" />
              
              {/* Large animated hearts background - More visible */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: `${Math.random() * 100}%`,
                      y: '110vh',
                      scale: Math.random() * 0.6 + 0.3,
                      rotate: Math.random() * 360
                    }}
                    animate={{
                      opacity: [0, 0.25, 0],
                      y: '-10vh',
                      rotate: Math.random() * 360 + 180
                    }}
                    transition={{
                      duration: Math.random() * 12 + 15,
                      repeat: Infinity,
                      delay: Math.random() * 8,
                      ease: "linear"
                    }}
                    className="absolute text-red-500/40"
                  >
                    <Heart size={Math.random() * 40 + 25} fill="currentColor" />
                  </motion.div>
                ))}
              </div>

              {/* Stronger radial gradient overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_60%)]" />
              
              {/* More visible pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, rgba(239,68,68,0.8) 1.5px, transparent 1.5px)',
                backgroundSize: '35px 35px'
              }} />

              {/* Animated diagonal stripes */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(239,68,68,0.3) 50px, rgba(239,68,68,0.3) 100px)',
                  backgroundSize: '200% 200%'
                }}
              />

              {/* Corner decorative hearts - Larger and more visible */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 left-10"
              >
                <Heart className="w-28 h-28 text-red-500/30 fill-red-500/30" />
              </motion.div>
              
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                  ease: "easeInOut"
                }}
                className="absolute bottom-10 right-10"
              >
                <Heart className="w-32 h-32 text-pink-500/30 fill-pink-500/30" />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.75,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 right-20"
              >
                <Heart className="w-20 h-20 text-red-400/30 fill-red-400/30" />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 2.25,
                  ease: "easeInOut"
                }}
                className="absolute bottom-1/3 left-16"
              >
                <Heart className="w-24 h-24 text-pink-400/30 fill-pink-400/30" />
              </motion.div>

              {/* Floating sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`
                    }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: Math.random() * 2 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 4,
                      ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-pink-300 rounded-full"
                    style={{
                      boxShadow: '0 0 15px rgba(255,182,193,0.8)'
                    }}
                  />
                ))}
              </div>

              {/* Pulsing glow orbs */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"
              />
              
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 2,
                  ease: "easeInOut"
                }}
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
              />
            </div>

            {/* Gallery content */}
            <div className="relative z-10 w-full h-full">
              <audio src="/pretty.mp3" autoPlay loop className="hidden" />
              <DomeGallery
                images={userImages}
                fit={0.8}
                minRadius={600}
                maxVerticalRotationDeg={0}
                segments={34}
                dragDampening={2}
                grayscale={false}
                autoRotationSpeed={0.1}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
