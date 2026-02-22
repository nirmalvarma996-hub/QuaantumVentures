import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import plotData from '../data/plotData';

/**
 * Request Callback Form Section — centered with proper spacing
 */
export default function CallbackForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        plot: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const availablePlots = plotData.filter((p) => p.status === 'available');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            console.log('Form submitted:', formData);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-charcoal relative overflow-hidden">
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
                    className="text-center mb-12 md:mb-16 px-4"
                >
                    <span className="text-gold text-sm tracking-[4px] uppercase font-medium">
                        Get In Touch
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ivory mt-4 mb-6">
                        Request a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                            Callback
                        </span>
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                    <p className="text-ivory/50 mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                        Leave your details and our team will reach out within 24 hours.
                    </p>
                </motion.div>

                <div className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="w-full max-w-lg"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card-dark p-8 sm:p-10 md:p-12 text-center"
                            >
                                <FaCheckCircle className="text-green-400 text-5xl mx-auto mb-6" />
                                <h3 className="font-heading text-2xl font-bold text-ivory mb-3">Thank You!</h3>
                                <p className="text-ivory/60 text-base sm:text-lg">
                                    We&apos;ve received your request. Our team will contact you within 24 hours.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({ name: '', phone: '', plot: '', message: '' });
                                    }}
                                    className="btn-outline mt-8"
                                >
                                    Submit Another Request
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass-card-dark p-6 sm:p-8 md:p-10 space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="text-ivory/60 text-sm mb-2 block font-medium">
                                        Full Name <span className="text-gold">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-charcoal/50 border border-gold/15 rounded-xl text-ivory text-sm sm:text-base placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors font-body"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-ivory/60 text-sm mb-2 block font-medium">
                                        Phone Number <span className="text-gold">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+91 XXXXX XXXXX"
                                        className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-charcoal/50 border border-gold/15 rounded-xl text-ivory text-sm sm:text-base placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors font-body"
                                    />
                                </div>

                                {/* Plot preference */}
                                <div>
                                    <label className="text-ivory/60 text-sm mb-2 block font-medium">
                                        Preferred Plot Number (Optional)
                                    </label>
                                    <select
                                        name="plot"
                                        value={formData.plot}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-charcoal/50 border border-gold/15 rounded-xl text-ivory text-sm sm:text-base focus:outline-none focus:border-gold/50 transition-colors font-body appearance-none cursor-pointer"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M1 4l5 5 5-5' fill='none' stroke='%23C6A84A' stroke-width='1.5'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 16px center',
                                        }}
                                    >
                                        <option value="">Select a plot (optional)</option>
                                        {availablePlots.map((plot) => (
                                            <option key={plot.plotNumber} value={plot.plotNumber}>
                                                Plot #{plot.plotNumber} — {plot.sqft} sq.ft ({plot.facing} facing)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="text-ivory/60 text-sm mb-2 block font-medium">
                                        Message (Optional)
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Any specific requirements or questions..."
                                        className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-charcoal/50 border border-gold/15 rounded-xl text-ivory text-sm sm:text-base placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors font-body resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-gold w-full justify-center !py-3.5 sm:!py-4 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                                                <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <FaPaperPlane /> Request Callback
                                        </span>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
