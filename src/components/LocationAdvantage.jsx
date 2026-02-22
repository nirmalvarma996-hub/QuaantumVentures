import { motion } from 'framer-motion';
import { FaRoad, FaBuilding, FaTrain, FaLaptopCode, FaLandmark } from 'react-icons/fa';

/**
 * Location Advantage Section - Highlights proximity to key landmarks
 */
const advantages = [
    {
        icon: FaRoad,
        title: 'Steps Away from 150 ft Road',
        description: 'Just one plot away from the widest road corridor — enjoy premium connectivity without the noise',
    },
    {
        icon: FaBuilding,
        title: '1 km from RTO Office',
        description: 'Opposite road to RTO Office — prime commercial adjacency',
    },
    {
        icon: FaTrain,
        title: 'Near Tiruchanoor Railway Station',
        description: 'Excellent rail connectivity for daily commuters',
    },

];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
};

export default function LocationAdvantage() {
    return (
        <section id="location" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-charcoal relative overflow-hidden">
            {/* Decorative gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 80% 20%, rgba(198,168,74,0.08) 0%, transparent 60%)',
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
                        Strategic Position
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ivory mt-4 mb-6">
                        Location{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                            Advantage
                        </span>
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                    <p className="text-ivory/50 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
                        Positioned at the epicenter of Tirupati&apos;s growth corridor, every landmark
                        is within arm&apos;s reach.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {advantages.map((adv, i) => (
                        <motion.div
                            key={adv.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="glass-card-dark p-6 sm:p-8 group cursor-default"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-4 sm:mb-5 group-hover:from-gold/30 group-hover:to-gold/10 transition-all duration-300">
                                <adv.icon className="text-gold text-xl sm:text-2xl" />
                            </div>
                            <h3 className="font-heading text-lg sm:text-xl font-semibold text-ivory mb-2 sm:mb-3">
                                {adv.title}
                            </h3>
                            <p className="text-ivory/50 text-sm leading-relaxed">
                                {adv.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
