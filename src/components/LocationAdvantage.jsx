import { motion } from 'framer-motion';
import { FaRoad, FaBuilding, FaTrain, FaLaptopCode, FaLandmark, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * Location Advantage Section - Highlights proximity to key landmarks
 */
const strategicAdvantages = [
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

const upcomingProjects = [
    {
        icon: FaLaptopCode,
        title: 'Proposed IT Hub',
        description: 'Close proximity to the upcoming tech corridor, ensuring high ROI',
    },
    {
        icon: FaLandmark,
        title: 'Proposed Govt Buildings',
        description: 'Close proximity to the new administrative zone planned for Tirupati',
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

            <div className="w-full max-max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
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
                </motion.div>

                {/* Sub-section: Strategic Landmarks */}
                <div className="mb-20">
                    <h3 className="text-ivory/80 text-xl font-heading font-semibold mb-8 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-gold/50" />
                        Key Connectivity
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {strategicAdvantages.map((adv, i) => (
                            <motion.div
                                key={adv.title}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="glass-card-dark p-6 sm:p-8 group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-5">
                                    <adv.icon className="text-gold text-xl" />
                                </div>
                                <h4 className="font-heading text-lg font-semibold text-ivory mb-2">
                                    {adv.title}
                                </h4>
                                <p className="text-ivory/50 text-sm leading-relaxed">
                                    {adv.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sub-section: Upcoming Projects */}
                <div className="mb-20">
                    <h3 className="text-ivory/80 text-xl font-heading font-semibold mb-8 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-gold/50" />
                        Upcoming Developments
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl">
                        {upcomingProjects.map((adv, i) => (
                            <motion.div
                                key={adv.title}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="glass-card-dark p-6 sm:p-8 group border border-gold/10 transition-all cursor-default"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-5 group-hover:from-gold/30">
                                    <adv.icon className="text-gold text-xl" />
                                </div>
                                <h4 className="font-heading text-lg font-semibold text-ivory mb-2 group-hover:text-gold transition-colors">
                                    {adv.title}
                                </h4>
                                <p className="text-ivory/50 text-sm leading-relaxed">
                                    {adv.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Dedicated Action for Plot Location */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-gold/10 via-gold/5 to-transparent border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="text-center md:text-left">
                        <h3 className="font-heading text-2xl font-bold text-ivory mb-2">Detailed Site Map</h3>
                        <p className="text-ivory/60 mb-4">View the exact location and site boundaries on Google Maps.</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/20">
                            <FaMapMarkerAlt className="text-gold" />
                            <span className="text-gold font-mono text-sm tracking-widest">13.641033, 79.463829</span>
                        </div>
                    </div>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=13.641033,79.463829"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold whitespace-nowrap"
                    >
                        Open Plot Location
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
