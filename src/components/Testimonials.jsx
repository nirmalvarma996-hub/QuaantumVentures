import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

/**
 * Testimonials Slider Section — properly centered with consistent padding
 * with auto-scroll functionality
 */
const testimonials = [
    {
        name: 'Prabhakar raju',
        role: 'Contractor, Rajampeta',
        text: 'Quaantumm Ventures offered me the perfect investment opportunity in Tirupati. The location near the 150 ft main road and the transparency in documentation made my decision easy. Highly recommended!',
        rating: 5,
    },
    {
        name: 'Murali Mohan Reddy',
        role: 'Business Owner, Kurnool',
        text: "Quaantumm Ventures is a great company with a great vision. The location near the 150 ft main road and the transparency in documentation made my decision easy. Highly recommended!",
        rating: 5,
    },
    {
        name: 'Chakri Raju',
        role: 'NRI Investor, USA',
        text: "Even from abroad, the team made the entire process seamless. The clear titles, premium layout, and Tirupati's spiritual significance make this a must-have asset for my family.",
        rating: 5,
    },
    {
        name: 'A.V Naidu',
        role: 'Bank Employee, Tirupati',
        text: "I've invested in quaantumm Ventures, but the value proposition at quaantumm Ventures stands out. The appreciation potential with the upcoming government offices is remarkable.",
        rating: 5,
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const next = useCallback(() => {
        setCurrent((c) => (c + 1) % testimonials.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(next, 12000);
        return () => clearInterval(timer);
    }, [next, isHovered]);

    return (
        <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-charcoal relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(198,168,74,0.06) 0%, transparent 60%)',
                }}
            />

            <div className="w-full max-w-3xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="text-gold text-sm tracking-[4px] uppercase font-medium">
                        Testimonials
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ivory mt-4 mb-6">
                        What Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                            Investors Say
                        </span>
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </motion.div>

                {/* Slider */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="glass-card-dark p-6 sm:p-8 md:p-12 text-center"
                        >
                            <FaQuoteLeft className="text-gold/30 text-3xl sm:text-4xl mx-auto mb-5 sm:mb-6" />
                            <p className="text-ivory/80 text-base sm:text-lg md:text-xl leading-relaxed font-light mb-6 sm:mb-8 px-2">
                                &ldquo;{testimonials[current].text}&rdquo;
                            </p>
                            <div className="flex items-center justify-center gap-1 mb-4">
                                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                                    <FaStar key={i} className="text-gold text-sm" />
                                ))}
                            </div>
                            <div className="text-gold font-heading text-lg sm:text-xl font-semibold">
                                {testimonials[current].name}
                            </div>
                            <div className="text-ivory/40 text-sm mt-1">
                                {testimonials[current].role}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/30 bg-transparent text-gold flex items-center justify-center hover:bg-gold/10 transition-all cursor-pointer"
                        >
                            <FaChevronLeft />
                        </button>
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-2.5 rounded-full border-none cursor-pointer transition-all ${i === current ? 'bg-gold w-8' : 'bg-gold/30 w-2.5'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/30 bg-transparent text-gold flex items-center justify-center hover:bg-gold/10 transition-all cursor-pointer"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
