export default function Road({ road }) {
    const isExternal = road.style === 'external';
    const fill = isExternal ? '#3A3A3A' : '#2A2A2A';
    const opacity = isExternal ? 0.7 : 0.55;
    const fontSize = road.orientation === 'horizontal' ? 15 : 13;

    const cx = road.cx !== undefined ? road.cx : (road.x + road.width / 2);
    const cy = road.cy !== undefined ? road.cy : (road.y + road.height / 2);

    return (
        <g>
            {road.points ? (
                <polygon
                    points={road.points.map(p => p.join(',')).join(' ')}
                    fill={fill}
                    opacity={opacity}
                />
            ) : (
                <rect
                    x={road.x}
                    y={road.y}
                    width={road.width}
                    height={road.height}
                    fill={fill}
                    opacity={opacity}
                    rx="2"
                />
            )}

            {road.orientation === 'vertical' ? (
                <>
                    <text
                        x={cx}
                        y={cy - (road.sublabel ? 6 : 0)}
                        fill="#C6A84A"
                        fontSize={fontSize}
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        opacity="0.85"
                        transform={`rotate(-90 ${cx} ${cy})`}
                    >
                        {road.label}
                    </text>
                    {road.sublabel && (
                        <text
                            x={cx}
                            y={cy + 14}
                            fill="#999"
                            fontSize="8"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            opacity="0.6"
                            transform={`rotate(-90 ${cx} ${cy})`}
                        >
                            {road.sublabel}
                        </text>
                    )}
                </>
            ) : (
                <>
                    <text
                        x={cx}
                        y={cy - (road.sublabel ? 6 : 0)}
                        fill="#C6A84A"
                        fontSize={fontSize}
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        opacity="0.85"
                    >
                        {road.label}
                    </text>
                    {road.sublabel && (
                        <text
                            x={cx}
                            y={cy + 14}
                            fill="#999"
                            fontSize="8"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            opacity="0.6"
                        >
                            {road.sublabel}
                        </text>
                    )}
                </>
            )}
        </g>
    );
}
