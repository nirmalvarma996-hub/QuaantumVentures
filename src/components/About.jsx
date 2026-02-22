import { motion } from 'framer-motion';

/**
 * About Quantamm Ventures Section
 */
export default function About() {
    return (
        <section id="about" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-ivory relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-64 h-64 border border-gold/10 rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-48 h-48 border border-gold/5 rounded-full pointer-events-none" />

            <div className="w-full max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="text-gold-dark text-sm tracking-[4px] uppercase font-medium">
                        About Us
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-6">
                        Quantamm{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">
                            Ventures
                        </span>
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-10 sm:mt-12 bg-gradient-to-br from-charcoal to-charcoal-light rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center shadow-2xl border border-gold/10"
                >
                    <p className="text-ivory/80 text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
                        <span className="text-gold font-heading text-2xl md:text-3xl font-bold block mb-6">
                            &ldquo;Building Legacies, One Plot at a Time&rdquo;
                        </span>
                        Quantamm Ventures is committed to building premium real estate assets in high-growth
                        corridors of Tirupati, offering{' '}
                        <span className="text-gold font-medium">trust, transparency, and long-term value</span>.
                        With a vision rooted in integrity and a deep understanding of Indian real estate,
                        we help families and investors secure their future in one of India&apos;s most
                        spiritually significant and economically vibrant cities.
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12 pt-8 sm:pt-10 border-t border-gold/10">
                        {[
                            { value: '6.5', label: 'Acres Developed' },
                            { value: '40+', label: 'Premium Plots' },
                            { value: '100%', label: 'Clear Titles' },
                            { value: '∞', label: 'Trust' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-gold font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
                                    {stat.value}
                                </div>
                                <div className="text-ivory/40 text-sm mt-2 tracking-wider uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
