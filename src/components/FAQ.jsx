import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

/**
 * FAQ Section — center-aligned accordion with proper padding/margins
 */
const faqs = [
    {
        question: 'What is the total area of the project?',
        answer:
            'The Quantamm Ventures plotting project spans 6.5 acres of premium land, strategically located opposite the RTO Office on a 150 ft main road in Tirupati.',
    },
    {
        question: 'Are the titles clear and verified?',
        answer:
            'Yes, all plots come with 100% clear titles and verified documentation. We ensure complete transparency in all legal processes for your peace of mind.',
    },
    {
        question: 'What are the plot sizes available?',
        answer:
            'We offer a range of plot sizes from 1,200 sq.ft to 2,400 sq.ft to suit different investment needs. Each plot is designed to maximize utility and value.',
    },
    {
        question: 'Is there a gated community?',
        answer:
            'Yes, this is a premium gated plotting community with planned internal roads, landscaping, and all essential amenities for a secure and elegant living environment.',
    },
    {
        question: 'What is the expected appreciation?',
        answer:
            "With the upcoming IT Hub, proposed Government offices, and proximity to Tirumala, this area is in Tirupati's prime growth corridor with high appreciation potential in the coming years.",
    },
    {
        question: 'Can NRIs invest in this project?',
        answer:
            'Absolutely! We have a streamlined process for NRI investors including virtual site visits, digital documentation, and dedicated relationship management.',
    },
    {
        question: 'What are the payment options?',
        answer:
            'We offer flexible payment plans including outright purchase, EMI options, and bank loan assistance. Contact our team for customized payment schedules.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-ivory relative overflow-hidden">
            <div className="w-full max-w-3xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="text-gold-dark text-sm tracking-[4px] uppercase font-medium">
                        Have Questions?
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-6">
                        Frequently Asked{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">
                            Questions
                        </span>
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </motion.div>

                {/* Accordion */}
                <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            className="border border-gold/15 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm"
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left bg-transparent border-none cursor-pointer group"
                            >
                                <span className="font-heading text-sm sm:text-base md:text-lg font-semibold text-charcoal pr-4 leading-snug">
                                    {faq.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-gold flex-shrink-0"
                                >
                                    <FaChevronDown />
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-charcoal/60 text-sm sm:text-base leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
