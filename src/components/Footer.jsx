import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

/**
 * Footer Component
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-charcoal border-t border-gold/10">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                                <span className="text-charcoal font-bold text-lg font-heading">Q</span>
                            </div>
                            <div>
                                <span className="text-gold font-heading font-bold text-xl">Quantamm</span>
                                <span className="block text-[10px] text-gold-light/70 tracking-[3px] uppercase -mt-1">
                                    Ventures
                                </span>
                            </div>
                        </div>
                        <p className="text-ivory/40 text-sm leading-relaxed">
                            Building premium real estate assets in high-growth corridors of Tirupati,
                            offering trust, transparency, and long-term value.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gold font-heading text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Location', 'Plot Layout', 'Highlights', 'About', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-ivory/40 hover:text-gold text-sm transition-colors no-underline"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-gold font-heading text-lg font-semibold mb-6">Contact Us</h4>
                        <div className="space-y-4">
                            <a href="tel:+919876543210" className="flex items-center gap-3 text-ivory/40 hover:text-gold text-sm transition-colors no-underline">
                                <FaPhone className="text-gold/60" />
                                +91 98765 43210
                            </a>
                            <a href="mailto:info@quantammventures.com" className="flex items-center gap-3 text-ivory/40 hover:text-gold text-sm transition-colors no-underline">
                                <FaEnvelope className="text-gold/60" />
                                info@quantammventures.com
                            </a>
                            <div className="flex items-start gap-3 text-ivory/40 text-sm">
                                <FaMapMarkerAlt className="text-gold/60 mt-0.5 flex-shrink-0" />
                                <span>
                                    Opposite RTO Office, 150 ft Main Road,
                                    <br />
                                    Tirupati, Andhra Pradesh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Map placeholder */}
                    <div>
                        <h4 className="text-gold font-heading text-lg font-semibold mb-6">Location</h4>
                        <div className="rounded-xl overflow-hidden border border-gold/10 h-40">
                            <iframe
                                title="Quantamm Ventures Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15449.099553244935!2d79.39!3d13.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb270baff55555%3A0x0!2sTirupati!5e0!3m2!1sen!2sin!4v1600000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>

                {/* Social links + Copyright */}
                <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-ivory/30 text-sm">
                        © {currentYear} Quantamm Ventures. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {[
                            { icon: FaFacebook, href: '#' },
                            { icon: FaInstagram, href: '#' },
                            { icon: FaYoutube, href: '#' },
                            { icon: FaLinkedin, href: '#' },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                className="w-10 h-10 rounded-full border border-gold/15 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all no-underline"
                            >
                                <social.icon className="text-sm" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
