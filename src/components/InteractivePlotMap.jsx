import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import plotCoordinates, { BOUNDARY_POINTS, ROADS, OPEN_SPACES } from '../data/plotCoordinates';
import Plot from './plot/Plot';
import Road from './plot/Road';
import OpenSpace, { OpenSpacePatterns } from './plot/OpenSpace';
import LayoutBoundary from './plot/LayoutBoundary';

/* ─── Status helpers ─── */
function getStatusLabel(s) {
    return s === 'sold' ? 'SOLD' : s === 'reserved' ? 'RESERVED' : 'AVAILABLE';
}

const STATUS_BADGE = {
    available: { bg: '#1E3A2F', border: '#2D5A47', text: '#A8D5BA' },
    sold: { bg: '#8B2E2D', border: '#6A1B1A', text: '#fff' },
    reserved: { bg: '#5A4A20', border: '#C6A84A', text: '#C6A84A' },
};

/* ─── Default viewBox ─── */
const DEFAULT_VB = { x: 0, y: 0, w: 900, h: 1400 };

export default function InteractivePlotMap() {
    const [hoveredPlot, setHoveredPlot] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [viewBox, setViewBox] = useState(DEFAULT_VB);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState(null);
    const containerRef = useRef(null);

    /* ── Zoom via viewBox ── */
    const zoomIn = useCallback(() => setViewBox((vb) => {
        // Limit max zoom to 100% (where viewBox width equals DEFAULT_VB.w)
        const nw = Math.max(vb.w * 0.8, DEFAULT_VB.w);
        const nh = Math.max(vb.h * 0.8, DEFAULT_VB.h);
        return { x: vb.x + (vb.w - nw) / 2, y: vb.y + (vb.h - nh) / 2, w: nw, h: nh };
    }), []);

    const zoomOut = useCallback(() => setViewBox((vb) => {
        // Limit min zoom to approx 50% (where viewBox width is 2x DEFAULT_VB.w)
        const nw = Math.min(vb.w * 1.25, DEFAULT_VB.w * 2);
        const nh = Math.min(vb.h * 1.25, DEFAULT_VB.h * 2);
        return { x: vb.x - (nw - vb.w) / 2, y: vb.y - (nh - vb.h) / 2, w: nw, h: nh };
    }), []);

    const resetView = useCallback(() => setViewBox(DEFAULT_VB), []);

    const zoomLevel = Math.round((DEFAULT_VB.w / viewBox.w) * 100);

    /* ── Pan via mouse drag ── */
    const onMouseDown = (e) => {
        if (e.button !== 0) return;
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY, vb: { ...viewBox } });
    };
    const onMouseMove = useCallback((e) => {
        if (!isPanning || !panStart) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = (panStart.x - e.clientX) * (viewBox.w / rect.width);
        const dy = (panStart.y - e.clientY) * (viewBox.h / rect.height);
        setViewBox({ ...panStart.vb, x: panStart.vb.x + dx, y: panStart.vb.y + dy });
    }, [isPanning, panStart, viewBox.w, viewBox.h]);
    const onMouseUp = () => { setIsPanning(false); setPanStart(null); };

    /* ── Scroll zoom ── */
    const onWheel = useCallback((e) => {
        e.preventDefault();
        if (e.deltaY < 0) zoomIn(); else zoomOut();
    }, [zoomIn, zoomOut]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Attach native wheel event with passive: false to allow e.preventDefault()
        container.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', onWheel);
        };
    }, [onWheel]);

    /* ── Plot hover ── */
    const handleHover = (plot, e) => {
        setHoveredPlot(plot);
        updateTooltipPos(e);
    };
    const handleMove = (plot, e) => {
        if (hoveredPlot?.plotNumber === plot.plotNumber) updateTooltipPos(e);
    };
    const handleLeave = () => setHoveredPlot(null);

    const updateTooltipPos = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    /* ── Stats ── */
    const available = plotCoordinates.filter((p) => p.status === 'available').length;
    const sold = plotCoordinates.filter((p) => p.status === 'sold').length;
    const reserved = plotCoordinates.filter((p) => p.status === 'reserved').length;

    const vb = `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`;

    return (
        <section id="plots" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-ivory relative overflow-hidden">
            {/* Grid background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(198,168,74,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(198,168,74,0.5) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="w-full max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-gold-dark text-sm tracking-[4px] uppercase font-medium">Master Plan</span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-6">
                        Interactive Plot{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">Layout</span>
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                    <p className="text-charcoal/50 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
                        S.Nos 59-5B &amp; 75-4A, 4B of Mangalam (V), Tirupati — Total Area: 6.55 Acres
                    </p>
                </motion.div>




                {/* Legend + Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2"
                >
                    <div className="flex flex-wrap gap-4 sm:gap-6">
                        {[
                            { color: '#1E3A2F', border: '#2D5A47', label: `Available (${available})` },
                            { color: '#8B2E2D', border: '#6A1B1A', label: `Sold (${sold})` },

                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm border" style={{ backgroundColor: item.color, borderColor: item.border }} />
                                <span className="text-charcoal/70 text-xs sm:text-sm font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center rounded-lg bg-charcoal/10 hover:bg-charcoal/20 text-charcoal font-bold transition-colors">−</button>
                        <span className="text-charcoal/60 text-xs font-medium w-12 text-center">{zoomLevel}%</span>
                        <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center rounded-lg bg-charcoal/10 hover:bg-charcoal/20 text-charcoal font-bold transition-colors">+</button>
                        <button onClick={resetView} className="px-3 h-8 rounded-lg bg-charcoal/10 hover:bg-charcoal/20 text-charcoal text-xs font-medium transition-colors">Reset</button>
                    </div>
                </motion.div>

                {/* SVG Map */}
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="relative bg-gradient-to-br from-charcoal to-charcoal-light rounded-2xl border border-gold/20 shadow-2xl overflow-hidden"
                    style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onClick={handleLeave}
                >
                    <svg
                        viewBox={vb}
                        preserveAspectRatio="xMidYMid meet"
                        className="w-full"
                        style={{ minHeight: '500px' }}
                    >
                        {/* Background */}
                        <rect x="-100" y="-50" width="1200" height="1500" fill="#1A1A1A" />

                        {/* Pattern definitions */}
                        <OpenSpacePatterns />

                        {/* Boundary */}
                        <LayoutBoundary boundaryPoints={BOUNDARY_POINTS} />

                        {/* Open Spaces */}
                        {OPEN_SPACES.map((space) => (
                            <OpenSpace key={space.id} space={space} />
                        ))}

                        {/* Roads */}
                        {ROADS.map((road) => (
                            <Road key={road.id} road={road} />
                        ))}

                        {/* Plots */}
                        {plotCoordinates.map((plot) => (
                            <Plot
                                key={plot.plotNumber}
                                plot={plot}
                                isHovered={hoveredPlot?.plotNumber === plot.plotNumber}
                                onHover={handleHover}
                                onMove={handleMove}
                                onLeave={handleLeave}
                            />
                        ))}
                    </svg>

                    {/* Tooltip */}
                    <AnimatePresence>
                        {hoveredPlot && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-50 pointer-events-none"
                                style={{ left: tooltipPos.x + 16, top: tooltipPos.y - 10 }}
                            >
                                <div className="bg-charcoal/95 backdrop-blur-md border border-gold/30 rounded sm:rounded-xl p-1 sm:px-4 sm:py-3 shadow-2xl w-max sm:min-w-[210px]">
                                    <div className="flex items-center justify-between gap-2 sm:gap-4 mb-0.5 sm:mb-2">
                                        <span className="text-gold font-heading font-bold text-[8px] sm:text-base">Plot #{hoveredPlot.plotNumber}</span>
                                        <span
                                            className="text-[6px] sm:text-xs font-semibold px-0.5 py-0.5 rounded-full"
                                            style={{
                                                backgroundColor: STATUS_BADGE[hoveredPlot.status].bg,
                                                color: STATUS_BADGE[hoveredPlot.status].text,
                                                border: `1px solid ${STATUS_BADGE[hoveredPlot.status].border}`,
                                            }}
                                        >
                                            {getStatusLabel(hoveredPlot.status)}
                                        </span>
                                    </div>
                                    <div className="space-y-px sm:space-y-1 text-[7px] sm:text-sm">
                                        <div className="flex justify-between border-b border-gold/10 pb-px sm:pb-1 mb-px sm:mb-1 gap-2">
                                            <span className="text-ivory/60 font-medium">Facing</span>
                                            <span className="text-ivory font-bold">{hoveredPlot.facing} facing</span>
                                        </div>
                                        {hoveredPlot.irregularDimensions ? (
                                            <>
                                                <div className="flex justify-between border-b border-gold/10 pb-px mb-px mt-0.5 sm:mt-2">
                                                    <span className="text-gold/80 font-semibold text-[6px] sm:text-xs tracking-wider uppercase">Site Measures</span>
                                                </div>
                                                {[
                                                    ['West', hoveredPlot.irregularDimensions.west],
                                                    ['East', hoveredPlot.irregularDimensions.east],
                                                    ['North', hoveredPlot.irregularDimensions.north],
                                                    ['South', hoveredPlot.irregularDimensions.south],
                                                    ['Area', `${hoveredPlot.sqft} sq.ft`],
                                                    ['Ankanams', `${hoveredPlot.ankanams}`],
                                                    ['Sq. Yards', `${hoveredPlot.sqYards}`],
                                                ].filter(([_, val]) => val).map(([label, value]) => (
                                                    <div key={label} className="flex justify-between items-center gap-2">
                                                        <span className="text-ivory/60 font-medium">{label}</span>
                                                        <span className="text-ivory font-bold">{value}</span>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            [
                                                ['Dimensions', `${hoveredPlot.lengthFt}′ × ${hoveredPlot.widthFt}′`],
                                                ['Area', `${hoveredPlot.sqft} sq.ft`],
                                                ['Ankanams', hoveredPlot.ankanams],
                                                ['Sq. Yards', hoveredPlot.sqYards],
                                            ].map(([label, value]) => (
                                                <div key={label} className="flex justify-between items-center gap-2">
                                                    <span className="text-ivory/60 font-medium">{label}</span>
                                                    <span className="text-ivory font-bold">{value}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="grid grid-cols-3 gap-4 mt-8"
                >
                    {[
                        { label: 'Available', count: available, color: '#2D5A47' },
                        { label: 'Sold', count: sold, color: '#8B2E2D' },

                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center py-4 rounded-xl border"
                            style={{ borderColor: stat.color + '40', backgroundColor: stat.color + '10' }}
                        >
                            <div className="text-2xl sm:text-3xl font-heading font-bold" style={{ color: stat.color }}>{stat.count}</div>
                            <div className="text-charcoal/50 text-xs sm:text-sm font-medium mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
