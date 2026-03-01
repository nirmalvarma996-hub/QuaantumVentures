import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

/**
 * Navbar Component - Premium sticky navigation bar
 * with smooth scroll and mobile hamburger menu
 */
const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Location', href: '#location' },
    { name: 'Plot Layout', href: '#plots' },
    { name: 'Highlights', href: '#highlights' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled
                ? 'bg-charcoal/95 backdrop-blur-xl shadow-2xl shadow-gold/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="#home" className="flex items-center gap-3 no-underline">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                        <span className="text-charcoal font-bold text-sm font-heading tracking-tighter">QV</span>
                    </div>
                    <div>
                        <span className="text-gold font-heading font-bold text-xl tracking-wide">Quaantumm</span>
                        <span className="block text-[10px] text-gold-light/70 tracking-[3px] uppercase -mt-1">Ventures</span>
                    </div>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-ivory/80 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-300 no-underline"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="btn-gold !py-2.5 !px-6 !text-sm"
                    >
                        Enquire Now
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-gold text-2xl bg-transparent border-none cursor-pointer"
                >
                    {mobileOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-charcoal/98 backdrop-blur-xl border-t border-gold/10"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-ivory/80 hover:text-gold text-base font-medium tracking-wide transition-colors duration-300 no-underline py-2"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="btn-gold text-center mt-2"
                            >
                                Enquire Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
