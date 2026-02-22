import { LAYOUT_INFO, SURVEY_LABELS } from '../../data/plotCoordinates';

export default function LayoutBoundary({ boundaryPoints }) {
    const pts = boundaryPoints.map(([x, y]) => `${x},${y}`).join(' ');

    return (
        <g>
            {/* Outer boundary polygon */}
            <polygon
                points={pts}
                fill="none"
                stroke="#C6A84A"
                strokeWidth="2.5"
                strokeDasharray="10,5"
                opacity="0.6"
            />




            {/* Survey number labels */}
            {SURVEY_LABELS.map((s) => (
                <g key={s.label}>
                    <circle cx={s.x} cy={s.y} r="16" fill="none" stroke="#666" strokeWidth="1" opacity="0.4" />
                    <text x={s.x} y={s.y + 5} textAnchor="middle" fill="#999" fontSize="10" fontWeight="500">
                        {s.label}
                    </text>
                </g>
            ))}

            {/* OTHERS LAND fill between boundary slopes and inner lines */}
            <polygon
                points="420,40 284,104 330,115 320,200 490,225 549,224 549,181"
                fill="#2A3A5A"
                opacity="0.35"
            />
            <polygon
                points="420,40 284,104 330,115 320,200 490,225 549,224 549,181"
                fill="url(#pat-hatch)"
                opacity="0.4"
            />
            <text x="400" y="160" fill="#8AAAD0" fontSize="12" fontWeight="600" textAnchor="middle" opacity="0.7">
                OTHERS LAND
            </text>

            {/* Inner boundary lines */}
            <line x1="284" y1="104" x2="330" y2="115" stroke="#C6A84A" strokeWidth="2" opacity="0.7" />
            <line x1="330" y1="115" x2="320" y2="200" stroke="#C6A84A" strokeWidth="2" opacity="0.7" />
            <line x1="320" y1="200" x2="490" y2="225" stroke="#C6A84A" strokeWidth="2" opacity="0.7" />
            <line x1="490" y1="225" x2="549" y2="224" stroke="#C6A84A" strokeWidth="2" opacity="0.7" />

            {/* From left slope → vertical down → horizontal to plot 31 */}
            <line x1="230" y1="130" x2="230" y2="277" stroke="#C6A84A" strokeWidth="2" opacity="0.7" />
            <line x1="230" y1="277" x2="489" y2="277" stroke="#C6A84A" strokeWidth="2" opacity="0.7" />

            {/* PUBLIC OPEN SPACE fill */}
            <polygon
                points="230,130 284,104 330,115 320,200 490,225 489,226 489,277 230,277"
                fill="#1A3A2A"
                opacity="0.35"
            />
            <polygon
                points="230,130 284,104 330,115 320,200 490,225 489,226 489,277 230,277"
                fill="url(#pat-dots)"
                opacity="0.3"
            />
            <text x="360" y="250" fill="#6BCB77" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.8">
                PUBLIC OPEN SPACE
            </text>

            {/* Fill gap between 9M road top and boundary slope */}
            <polygon points="549,181 594,230 549,230" fill="#2A2A2A" opacity="0.55" />

            {/* Residential Layout info box (below 60' road, bottom right) */}
            <g transform="translate(680, 1220)">
                <rect x="0" y="0" width="200" height="160" fill="#2D2D2D" stroke="#C6A84A" strokeWidth="1" rx="6" opacity="0.9" />
                {LAYOUT_INFO.title.map((line, i) => (
                    <text key={i} x="100" y={18 + i * 12} textAnchor="middle" fill="#C6A84A" fontSize="7" fontWeight={i === 0 ? '700' : '500'}>
                        {line}
                    </text>
                ))}
                <line x1="10" y1="68" x2="190" y2="68" stroke="#C6A84A" strokeWidth="0.5" opacity="0.4" />
                {LAYOUT_INFO.details.map(([label, value], i) => (
                    <g key={label}>
                        <text x="15" y={85 + i * 16} fill="#ccc" fontSize="8">{label}</text>
                        <text x="185" y={85 + i * 16} textAnchor="end" fill="#C6A84A" fontSize="8" fontWeight="600">{value}</text>
                    </g>
                ))}
            </g>
        </g>
    );
}
