import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoader - Premium gold shimmer loading animation
 * Displays on initial page load with quaantumm branding
 */
export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-charcoal flex flex-col items-center justify-center"
                >
                    {/* Gold ring animation */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-24 h-24 mb-8"
                    >
                        <div
                            className="absolute inset-0 rounded-full border-2 border-gold/20"
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                            className="absolute inset-0 rounded-full"
                            style={{
                                border: '2px solid transparent',
                                borderTopColor: '#C6A84A',
                                borderRightColor: '#C6A84A',
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gold font-heading text-xl font-bold tracking-tighter">QV</span>
                        </div>
                    </motion.div>

                    {/* Brand name */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-center"
                    >
                        <span className="text-gold font-heading text-2xl font-bold tracking-wider">
                            Quaantumm Ventures
                        </span>
                        <div className="mt-3 h-0.5 w-48 mx-auto gold-shimmer rounded-full" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
