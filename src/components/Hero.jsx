import { motion } from 'framer-motion';
import { FaShieldAlt, FaMapMarkerAlt, FaPhoneAlt, FaMap } from 'react-icons/fa';

/**
 * Hero Section - Full viewport cinematic hero
 * with gradient overlay, TUDA Approved badge, and CTA buttons
 */
export default function Hero() {
    const handleScroll = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 py-24 md:py-32"
        >
            {/* Background with gradient overlay and Balaji Silhouette */}
            <div className="absolute inset-0 z-0 bg-[#050505]">
                {/* Dark base to make the gold pop */}


                {/* Lord Balaji & Tirumala Hills Background Art */}
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-[0.65]"
                    style={{
                        backgroundImage: 'url(/images/hero-bg.png)',
                        backgroundPosition: 'var(--hero-bg-pos, center 20%)',
                    }}
                />
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @media (max-width: 768px) {
                        :root { --hero-bg-pos: 30% 20%; }
                    }
                `}} />

                {/* Subtle pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-screen"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(198,168,74,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(198,168,74,0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Text readability vignette shadow behind content center */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 60%, rgba(5,5,5,0.0) 0%, rgba(5,5,5,0.4) 100%)',
                    }}
                />
            </div>

            {/* Decorative corner elements - hidden on mobile */}
            <div className="hidden md:block absolute top-24 left-10 w-32 h-32 border-t-2 border-l-2 border-gold/20 rounded-tl-3xl" />
            <div className="hidden md:block absolute bottom-24 right-10 w-32 h-32 border-b-2 border-r-2 border-gold/20 rounded-br-3xl" />

            {/* Content */}
            <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
                {/* TUDA Approved Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-6"
                >
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-900/40 to-green-800/30 border border-green-500/40 backdrop-blur-sm">
                        <FaShieldAlt className="text-green-400 text-sm" />
                        <span className="text-green-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                            TUDA Approved
                        </span>
                        <span className="text-green-400/60 text-xs">|</span>
                        <span className="text-green-200/80 text-xs sm:text-sm font-medium italic">
                            LP No: Coming Soon
                        </span>
                    </div>
                </motion.div>

                {/* Premium Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                        <span className="text-gold text-xs sm:text-sm font-medium tracking-wider uppercase">
                            Premium Gated Community
                        </span>
                    </div>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-ivory leading-tight mb-6 px-2"
                >
                    Invest in{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
                        Divine Growth
                    </span>
                    <br />
                    at the Heart of Tirupati
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-ivory/60 text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto mb-10 leading-relaxed px-4"
                >
                    Premium 6.5 Acre Gated Plotting Community by <span className="text-gold font-medium">Quaantumm Ventures</span>
                    <br />
                    — Where tradition meets modern investment.
                </motion.p>

                {/* Price Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mb-10 flex items-center justify-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gold/5 border border-gold/20 backdrop-blur-sm group hover:border-gold/40 transition-all duration-300">
                        <span className="text-ivory/80 text-sm sm:text-base md:text-lg">
                            Price starts from <span className="text-gold font-bold">₹1.6 Lakhs</span> per Tirupati Ankanam
                        </span>
                        <div className="relative cursor-help">
                            <span className="text-gold font-bold text-xl leading-none">*</span>
                            {/* Premium Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 rounded-xl bg-charcoal/95 backdrop-blur-md border border-gold/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[100]">
                                <p className="text-ivory text-xs leading-relaxed font-semibold">
                                    Final pricing may vary depending on the specific plot dimensions and orientation.
                                </p>
                                {/* Tooltip Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gold/40" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                >
                    <a href="#plots" onClick={(e) => handleScroll(e, '#plots')} className="btn-gold w-full sm:w-auto text-center flex items-center justify-center gap-2">
                        <FaMap className="text-lg" /> View Layout
                    </a>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=13.641033,79.463829"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline w-full sm:w-auto text-center flex items-center justify-center gap-2 border-gold/30 text-gold hover:bg-gold/10"
                    >
                        <FaMapMarkerAlt className="text-lg" />  Show Location
                    </a>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="mt-14 md:mt-16 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto px-4"
                >
                    {[
                        { value: '6.55', label: 'Acres' },
                        { value: '87', label: 'Premium Plots' },
                        { value: 'TUDA', label: 'Approved' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-gold font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
                                {stat.value}
                            </div>
                            <div className="text-ivory/40 text-xs sm:text-sm mt-1 tracking-wider uppercase">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 rounded-full border-2 border-gold/30 flex justify-center pt-2"
                >
                    <div className="w-1.5 h-3 rounded-full bg-gold/50" />
                </motion.div>
            </motion.div>
        </section>
    );
}
