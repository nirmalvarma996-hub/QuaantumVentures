import { motion } from 'framer-motion';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

/**
 * Contact/Call Now Section — replacing the callback form
 */
export default function CallbackForm() {
    return (
        <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-charcoal relative overflow-hidden text-center">
            {/* Background elements */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 30% 70%, rgba(198,168,74,0.08) 0%, transparent 50%)',
                }}
            />

            <div className="w-full max-w-5xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16"
                >
                    <span className="text-gold text-sm tracking-[4px] uppercase font-medium">
                        Immediate Assistance
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ivory mt-4 mb-6">
                        Get in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                            Touch
                        </span>
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                    <p className="text-ivory/50 mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                        Ready to secure your divine plot? Call us directly for personalized assistance and site visits.
                    </p>
                </motion.div>

                <div className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="glass-card-dark p-8 sm:p-12 md:p-16 w-full max-w-3xl flex flex-col items-center gap-8"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-2">
                                <FaPhoneAlt className="text-gold text-3xl animate-pulse" />
                            </div>
                            <h3 className="text-ivory/60 text-sm sm:text-base font-medium tracking-widest uppercase mb-1">
                                Call for Enquiries
                            </h3>
                            <a
                                href="tel:+916301102828"
                                className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-gold hover:text-gold-light transition-colors duration-300 no-underline"
                            >
                                6301102828
                            </a>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                            <a
                                href="tel:+916301102828"
                                className="btn-gold flex-1 flex items-center justify-center gap-2 text-lg py-4"
                            >
                                <FaPhoneAlt /> Call Now
                            </a>
                            <a
                                href="https://wa.me/916301102828?text=Hi%2C%20I%20am%20interested%20in%20quaantum%20Ventures%20plots%20in%20Tirupati."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline flex-1 flex items-center justify-center gap-2 text-lg py-4 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                            >
                                <FaWhatsapp /> WhatsApp Us
                            </a>
                        </div>

                        <div className="mt-4 pt-8 border-t border-gold/10 w-full">
                            <p className="text-ivory/40 text-sm">
                                Site visits available all days. Prior appointment recommended.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

