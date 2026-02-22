const PATTERNS = {
    green: { id: 'pat-green', color: '#2D5A47', bg: '#1E3A2F' },
    greenDots: { id: 'pat-green-dots', color: '#2D5A47', bg: '#1E3A2F' },
    hatch: { id: 'pat-hatch', color: '#4A6A9A', bg: '#2A3A5A' },
    utility: { id: 'pat-utility', color: '#C6A84A', bg: '#3A3A20' },
};

export function OpenSpacePatterns() {
    return (
        <defs>
            <pattern id="pat-green" patternUnits="userSpaceOnUse" width="8" height="8">
                <path d="M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2" stroke="#2D5A47" strokeWidth="0.8" opacity="0.6" />
            </pattern>
            <pattern id="pat-green-dots" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="1.5" fill="#2D5A47" opacity="0.5" />
            </pattern>
            <pattern id="pat-hatch" patternUnits="userSpaceOnUse" width="8" height="8">
                <path d="M0,4 l8,0" stroke="#4A6A9A" strokeWidth="0.6" opacity="0.6" />
                <path d="M4,0 l0,8" stroke="#4A6A9A" strokeWidth="0.6" opacity="0.6" />
            </pattern>
            <pattern id="pat-utility" patternUnits="userSpaceOnUse" width="6" height="6">
                <path d="M0,3 l6,0" stroke="#C6A84A" strokeWidth="0.4" opacity="0.3" />
            </pattern>
        </defs>
    );
}

export default function OpenSpace({ space }) {
    const pat = PATTERNS[space.fill] || PATTERNS.green;
    const pts = space.points.map(([x, y]) => `${x},${y}`).join(' ');

    // Calculate center for label
    const cx = space.points.reduce((s, p) => s + p[0], 0) / space.points.length;
    const cy = space.points.reduce((s, p) => s + p[1], 0) / space.points.length;

    // Detect if vertical (narrow width, tall height)
    const xs = space.points.map(p => p[0]);
    const ys = space.points.map(p => p[1]);
    const w = Math.max(...xs) - Math.min(...xs);
    const h = Math.max(...ys) - Math.min(...ys);
    const isVertical = h > w * 2;

    return (
        <g>
            {/* Background fill */}
            <polygon points={pts} fill={pat.bg} opacity="0.3" />
            {/* Pattern overlay */}
            <polygon points={pts} fill={`url(#${pat.id})`} />
            {/* Border */}
            <polygon points={pts} fill="none" stroke={pat.color} strokeWidth="1" opacity="0.5" />

            {/* Label */}
            <text
                x={cx}
                y={cy - 8}
                fill={space.fill === 'hatch' ? '#8AAAD0' : '#A8D5BA'}
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                opacity="0.9"
                transform={isVertical ? `rotate(-90 ${cx} ${cy})` : undefined}
            >
                {space.label}
            </text>
            {/* Area text */}
            {space.areaText && (
                <text
                    x={cx}
                    y={cy + 10}
                    fill={space.fill === 'hatch' ? '#8AAAD0' : '#A8D5BA'}
                    fontSize="8"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    opacity="0.6"
                    transform={isVertical ? `rotate(-90 ${cx} ${cy + 10})` : undefined}
                >
                    {space.areaText}
                </text>
            )}
        </g>
    );
}
