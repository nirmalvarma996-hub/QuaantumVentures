import { motion } from 'framer-motion';

const STATUS_COLORS = {
    available: { fill: '#1E3A2F', stroke: '#2D5A47', text: '#A8D5BA', glow: '0 0 8px rgba(45,90,71,0.6)' },
    sold: { fill: '#8B2E2D', stroke: '#6A1B1A', text: '#FFFFFF', glow: 'none' },
    reserved: { fill: '#5A4A20', stroke: '#C6A84A', text: '#C6A84A', glow: 'none' },
};

export default function Plot({ plot, isHovered, onHover, onMove, onLeave }) {
    const colors = STATUS_COLORS[plot.status] || STATUS_COLORS.available;
    const cx = plot.textX !== undefined ? plot.textX : (plot.x + plot.w / 2);
    const cy = plot.textY !== undefined ? plot.textY : (plot.y + plot.h / 2);

    return (
        <motion.g
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ transformOrigin: `${cx}px ${cy}px`, cursor: 'pointer' }}
            onMouseEnter={(e) => onHover(plot, e)}
            onMouseMove={(e) => onMove(plot, e)}
            onMouseLeave={onLeave}
        >
            {/* Glow filter for available plots */}
            {plot.status === 'available' && (
                <rect
                    x={plot.x - 2}
                    y={plot.y - 2}
                    width={plot.w + 4}
                    height={plot.h + 4}
                    fill="none"
                    stroke="#2D5A47"
                    strokeWidth="1"
                    rx="6"
                    opacity={isHovered ? 0.8 : 0.3}
                    style={{ transition: 'opacity 0.2s', filter: 'blur(3px)' }}
                />
            )}

            {/* Plot shape */}
            {plot.shape === 'polygon' && plot.points ? (
                <polygon
                    points={plot.points.map(([px, py]) => `${px},${py}`).join(' ')}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    opacity={isHovered ? 1 : 0.9}
                    style={{ transition: 'all 0.2s' }}
                />
            ) : (
                <rect
                    x={plot.x}
                    y={plot.y}
                    width={plot.w}
                    height={plot.h}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    rx="3"
                    opacity={isHovered ? 1 : 0.9}
                    style={{ transition: 'all 0.2s' }}
                />
            )}

            {/* Plot number */}
            <text
                x={cx}
                y={cy}
                fill={colors.text}
                fontSize="13"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="middle"
                pointerEvents="none"
            >
                {plot.plotNumber}
            </text>
        </motion.g>
    );
}
