import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * Footer Component
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-charcoal border-t border-gold/10">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                                <span className="text-charcoal font-bold text-sm font-heading tracking-tighter">QV</span>
                            </div>
                            <div>
                                <span className="text-gold font-heading font-bold text-xl">Quaantumm</span>
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
                            {[
                                { name: 'Home', id: 'home' },
                                { name: 'Location', id: 'location' },
                                { name: 'Plot Layout', id: 'plots' },
                                { name: 'Highlights', id: 'highlights' },
                                { name: 'About', id: 'about' },
                                { name: 'Contact', id: 'contact' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={`#${link.id}`}
                                        className="text-ivory/40 hover:text-gold text-sm transition-colors no-underline"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-gold font-heading text-lg font-semibold mb-6">Contact Us</h4>
                        <div className="space-y-4">
                            <a href="tel:+916301102828" className="flex items-center gap-3 text-ivory/40 hover:text-gold text-sm transition-colors no-underline">
                                <FaPhone className="text-gold/60" />
                                +91 63011 02828
                            </a>

                            <a
                                href="https://maps.google.com/maps?q=13.641033,79.463829"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 text-ivory/40 hover:text-gold text-sm transition-colors no-underline group"
                            >
                                <FaMapMarkerAlt className="text-gold/60 mt-0.5 flex-shrink-0 group-hover:text-gold" />
                                <span>
                                    Opposite RTO Office, 150 ft Main Road,
                                    <br />
                                    Tirupati, Andhra Pradesh
                                    <br />

                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Map placeholder */}
                    <div>
                        <h4 className="text-gold font-heading text-lg font-semibold mb-6">Location</h4>
                        <div className="rounded-xl overflow-hidden border border-gold/10 h-40">
                            <iframe
                                title="quaantumm Ventures Location"
                                src="https://maps.google.com/maps?q=13.641033,79.463829&z=15&output=embed"
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
                        © {currentYear} Quaantumm Ventures. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {/* Social links removed as requested */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
