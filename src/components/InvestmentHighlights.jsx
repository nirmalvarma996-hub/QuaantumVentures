import { motion } from 'framer-motion';
import { FaFileContract, FaChartLine, FaGem, FaPrayingHands, FaRoad, FaTrain } from 'react-icons/fa';

/**
 * Investment Highlights Section
 */
const highlights = [
    {
        icon: FaFileContract,
        title: 'Clear Title & Documentation',
        description: 'Fully verified legal clearances with transparent documentation',
    },
    {
        icon: FaChartLine,
        title: 'Prime Growth Corridor',
        description: "Located in Tirupati's fastest appreciating zone",
    },
    {
        icon: FaGem,
        title: 'High Appreciation Potential',
        description: 'Early investors gain maximum value in a rapidly developing area',
    },
    {
        icon: FaPrayingHands,
        title: 'Near Spiritual & Commercial Hub',
        description: "Proximity to Tirumala and Tirupati's commercial district",
    },
    {
        icon: FaRoad,
        title: 'Steps Away from 150 ft Road',
        description: 'Just one plot away from the widest road corridor — enjoy premium connectivity without the noise',
    },
    {
        icon: FaTrain,
        title: 'Near Existing Tiruchanoor Station',
        description: 'Strategic proximity to major rail infrastructure for enhanced long-distance connectivity',
    },
];

export default function InvestmentHighlights() {
    return (
        <section id="highlights" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-charcoal relative overflow-hidden">
            {/* Decorative */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at 20% 80%, rgba(198,168,74,0.06) 0%, transparent 50%)',
                }}
            />

            <div className="w-full max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="text-gold text-sm tracking-[4px] uppercase font-medium">
                        Why Invest
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ivory mt-4 mb-6">
                        Investment{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                            Highlights
                        </span>
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </motion.div>

                {/* Highlights grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="relative p-6 sm:p-8 rounded-2xl border border-gold/10 bg-gradient-to-br from-charcoal-light/80 to-charcoal group hover:border-gold/30 transition-all duration-500"
                        >
                            {/* Glow on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center mb-4 sm:mb-6 group-hover:from-gold/25 group-hover:to-gold/10 transition-all duration-300">
                                    <item.icon className="text-gold text-xl" />
                                </div>
                                <h3 className="font-heading text-lg sm:text-xl font-semibold text-ivory mb-2 sm:mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-ivory/50 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
