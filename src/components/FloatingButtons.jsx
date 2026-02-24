import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

/**
 * Floating action buttons - WhatsApp + Call Now
 */
export default function FloatingButtons() {
    return (
        <>
            {/* WhatsApp */}
            <a
                href="https://wa.me/916301102828?text=Hi%2C%20I%20am%20interested%20in%20Quantamm%20Ventures%20plots%20in%20Tirupati."
                target="_blank"
                rel="noopener noreferrer"
                className="floating-whatsapp"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp />
            </a>

            {/* Call Now */}
            <a
                href="tel:+916301102828"
                className="floating-call"
                aria-label="Call Now"
            >
                <FaPhoneAlt />
            </a>
        </>
    );
}
