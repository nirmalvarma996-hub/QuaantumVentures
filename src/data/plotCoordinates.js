/**
 * Plot Coordinate System for Quantamm Ventures Residential Layout
 * S.Nos: 59-5B & 75-4A, 4B of Mangalam (V), Tirupati (U) Mandal
 *
 * Scale: 1 meter = 5 SVG units  |  1 foot ≈ 1.524 SVG units
 * ViewBox: 0 0 900 1150
 */

import { calculateArea } from '../utils/areaCalculator';

/* ═══════════════════════════════════════════════════════════════
   GRID REFERENCE POINTS (SVG coordinates)
   ═══════════════════════════════════════════════════════════════ */

export const GRID = {
    // ── X-axis (left → right) ──
    LEFT_BOUNDARY: 80,
    OPEN_SPACE_R: 155,   // Public Open Space right edge (~50')
    ROAD_9M_L: [155, 200],  // Left 9M road
    ZONE_B_L: 200,
    ZONE_B_M: 246,   // Mid-line between 2 plot columns
    ZONE_B_R: 292,
    ROAD_12M: [292, 352],  // Center 12M road
    ZONE_C_L: 352,
    ZONE_C_M: 398,
    ZONE_C_R: 444,
    ROAD_9M_R: [444, 489],  // Right 9M road
    ZONE_D_L: 489,
    ZONE_D_M: 535,
    ZONE_D_R: 581,
    RIGHT_COL: [581, 627],  // East-facing column (30' deep)
    BOUNDARY_R: 640,
    ROAD_80: [655, 777],  // Existing 80' road

    // ── Y-axis (top → bottom) ──
    PEAK: 40,
    BOUNDARY_L_TOP: 100,   // Left boundary top
    BOUNDARY_R_TOP: 185,   // Right boundary top (lower due to slope)
    UPPER_START: 200,   // Upper plots begin
    ROAD_12M_H: [440, 500],  // Horizontal 12M road
    LOWER_START: 500,
    BOUNDARY_BOT: 1090,
    ROAD_60: [1090, 1180],  // Proposed 60' M.P. Road
};

/* ═══════════════════════════════════════════════════════════════
   BOUNDARY POLYGON (Conical top, irregular shape)
   ═══════════════════════════════════════════════════════════════ */

export const BOUNDARY_POINTS = [
    [420, 40],    // Peak (conical top)
    [640, 280],   // Right boundary top (steeper incline)
    [640, 1090],  // Right boundary bottom
    [120, 1090],  // Left boundary bottom (inclined rightwards)
    [80, 200],    // Left boundary top
];

/* ═══════════════════════════════════════════════════════════════
   ROAD DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */

export const ROADS = [
    {
        id: 'road-9m-right',
        label: '9M WIDE LAYOUT ROAD',
        x: 549, y: 230, width: 45, height: 860,
        orientation: 'vertical',
    },
    {
        id: 'road-12m-vertical',
        label: '12M WIDE LAYOUT ROAD',
        x: 347, y: 279, width: 80, height: 811,
        orientation: 'vertical',
    },
    {
        id: 'road-12m-horizontal',
        label: '12M WIDE LAYOUT ROAD',
        x: 80, y: 489, width: 560, height: 60,
        orientation: 'horizontal',
    },
    {
        id: 'road-60-bottom',
        label: 'PROPOSED 60\' M.P. ROAD',
        x: 80, y: 1090, width: 700, height: 91,
        orientation: 'horizontal',
        style: 'external',
        sublabel: 'EXISTING 60\' ROAD FROM MITTA GANDHIPURAM TO 80\' T.U.D.A ROAD',
    },
    {
        id: 'road-150-right',
        label: 'PROPOSED 150\' WIDE ROAD',
        x: 710, y: 40, width: 120, height: 1141,
        orientation: 'vertical',
        style: 'external',
        sublabel: 'EXISTING 80\' WIDE ROAD FROM TIRUPATI KARAKAMBARI RTO OFFICE TO TIRUPATI RENIGUNTA ROAD',
    },
    {
        id: 'road-9m-left',
        label: '9M WIDE LAYOUT ROAD',
        points: [[185, 151], [230, 130], [230, 1090], [185, 1090]],
        cx: 207.5, // Center for text
        cy: 620, // Center for text
        orientation: 'vertical',
    },
];

/* ═══════════════════════════════════════════════════════════════
   OPEN SPACES
   ═══════════════════════════════════════════════════════════════ */

export const OPEN_SPACES = [
    {
        id: 'public-open-space-left',
        label: 'PUBLIC\nOPEN\nSPACE',
        // Slope equation from (80,200) to (120,1090).
        // x at y=489 is: 80 + (120-80)/(1090-200) * (489-200) \u2248 80 + 40/890 * 289 \u2248 93
        points: [[80, 200], [185, 151], [185, 489], [93, 489]],
        fill: 'green',
        areaAcres: 0.65, // estimate
    },
    {
        id: 'others-land-right',
        label: 'OTHERS LAND',
        areaText: '',
        points: [[640, 280], [710, 280], [710, 1090], [640, 1090]],
        fill: 'hatch',
    },
    {
        id: 'utility-space',
        label: 'UTILITY',
        points: [[230, 279], [287, 279], [287, 330], [230, 330]],
        fill: 'utility',
        areaAcres: 0.05,
    },
];

/* ═══════════════════════════════════════════════════════════════
   PLOT DEFINITIONS — ~84 plots
   Each plot: { plotNumber, x, y, w, h, lengthFt, widthFt, facing, status, shape }
   shape: "rect" or "polygon" (polygon has `points` array)
   ═══════════════════════════════════════════════════════════════ */

/* ─── Right column (East facing, plots 1–4) ─── */
const PW = 46; // plot width (30' ≈ 46 SVG units)
const PH = 57; // plot height

const rightCol = [
    { plotNumber: 1, x: 594, y: 230, w: PW, h: 80, lengthFt: 48, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 230], [640, 280], [640, 310], [594, 310]] },
    { plotNumber: 2, x: 594, y: 312, w: PW, h: PH, lengthFt: 43, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 3, x: 594, y: 312 + PH + 2, w: PW, h: PH, lengthFt: 43, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 4, x: 594, y: 312 + (PH + 2) * 2, w: PW, h: PH, lengthFt: 43, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
];

/* ─── Right column lower (East facing, plots 5–15, below 12M road) ─── */
const PH2 = 47; // smaller plot height for lower section
const LOWER_START = 551; // just below 12M road (489+60+2)

const rightColLower = [
    { plotNumber: 5, x: 594, y: LOWER_START, w: PW, h: PH2, lengthFt: 42, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 6, x: 594, y: LOWER_START + (PH2 + 2), w: PW, h: PH2, lengthFt: 42, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 7, x: 594, y: LOWER_START + (PH2 + 2) * 2, w: PW, h: PH2, lengthFt: 41, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 8, x: 594, y: LOWER_START + (PH2 + 2) * 3, w: PW, h: PH2, lengthFt: 41, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 9, x: 594, y: LOWER_START + (PH2 + 2) * 4, w: PW, h: PH2, lengthFt: 41, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 10, x: 594, y: LOWER_START + (PH2 + 2) * 5, w: PW, h: PH2, lengthFt: 41, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 11, x: 594, y: LOWER_START + (PH2 + 2) * 6, w: PW, h: PH2, lengthFt: 40, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 12, x: 594, y: LOWER_START + (PH2 + 2) * 7, w: PW, h: PH2, lengthFt: 40, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 13, x: 594, y: LOWER_START + (PH2 + 2) * 8, w: PW, h: PH2, lengthFt: 40, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 14, x: 594, y: LOWER_START + (PH2 + 2) * 9, w: PW, h: PH2, lengthFt: 40, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 15, x: 594, y: LOWER_START + (PH2 + 2) * 10, w: PW, h: PH2, lengthFt: 45, widthFt: 30, facing: 'East', status: 'available', shape: 'rect' },
];

/* ─── Zone D upper (plots 31–27, left of 9M road, above 12M road) ─── */
const PH3 = 51; // plot height for zone D
const PW2 = 60; // wider width for plots 31-61
const ZONE_D_START = 226; // just below OTHERS LAND line
const ZONE_D_UPPER_X = 549 - PW2; // right edge touches 9M road at x=549 (new x = 489)

const zoneDUpper = [
    { plotNumber: 31, x: ZONE_D_UPPER_X, y: ZONE_D_START, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 30, x: ZONE_D_UPPER_X, y: ZONE_D_START + (PH3 + 2), w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 29, x: ZONE_D_UPPER_X, y: ZONE_D_START + (PH3 + 2) * 2, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 28, x: ZONE_D_UPPER_X, y: ZONE_D_START + (PH3 + 2) * 3, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 27, x: ZONE_D_UPPER_X, y: ZONE_D_START + (PH3 + 2) * 4, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
];

/* ─── Zone D lower (plots 26–16, left of 9M road, below 12M road) ─── */
const PH4 = 47; // plot height for lower zone D
const ZONE_D_LOWER = 551; // just below 12M road
// const ZONE_D_X = 503; // keeping original width for lowercase plots // REMOVED

const zoneDLower = [
    { plotNumber: 26, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 25, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2), w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 24, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 2, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 23, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 3, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 22, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 4, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 21, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 5, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 20, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 6, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 19, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 7, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 18, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 8, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 17, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 9, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 16, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 10, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
];

/* ─── Zone E (plots 32–35, beside plots 30–27, left column) ─── */
const ZONE_E_UPPER_X = ZONE_D_UPPER_X - PW2 - 2; // left of new zone D
const ZONE_E_START = 279; // aligned with plot 30

const zoneE = [
    { plotNumber: 32, x: ZONE_E_UPPER_X, y: ZONE_E_START, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 33, x: ZONE_E_UPPER_X, y: ZONE_E_START + (PH3 + 2), w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 34, x: ZONE_E_UPPER_X, y: ZONE_E_START + (PH3 + 2) * 2, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 35, x: ZONE_E_UPPER_X, y: ZONE_E_START + (PH3 + 2) * 3, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
];

/* ─── Zone E lower (plots 36–46, below 12M road, same column as 32–35) ─── */
const zoneELower = [
    { plotNumber: 36, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 37, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2), w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 38, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 2, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 39, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 3, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 40, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 4, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 41, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 5, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 42, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 6, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 43, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 7, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 44, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 8, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 45, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 9, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 46, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 10, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
];

/* ─── Zone F upper (plots 61–58, left of 12M vertical road, above 12M horizontal road) ─── */
const ZONE_F_UPPER_X = 347 - PW2; // road left edge (347) - PW2
const ZONE_F_START = 279; // aligned with plots 32-35

const zoneFUpper = [
    { plotNumber: 61, x: ZONE_F_UPPER_X, y: ZONE_F_START, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 60, x: ZONE_F_UPPER_X, y: ZONE_F_START + (PH3 + 2), w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 59, x: ZONE_F_UPPER_X, y: ZONE_F_START + (PH3 + 2) * 2, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 58, x: ZONE_F_UPPER_X, y: ZONE_F_START + (PH3 + 2) * 3, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', textX: 298 },
];

/* ─── Zone G upper (plots 62–64, left of 60-58, below Utility Space) ─── */
const ZONE_G_UPPER_X = 230; // matches utility space x, left edge of open space
const PW3 = 57; // width to cover gap (287 - 230 = 57)
const ZONE_G_START = 279 + PH3 + 2; // below utility space

const zoneGUpper = [
    { plotNumber: 62, x: ZONE_G_UPPER_X, y: ZONE_G_START, w: PW3, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 63, x: ZONE_G_UPPER_X, y: ZONE_G_START + (PH3 + 2), w: PW3, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 64, x: ZONE_G_UPPER_X, y: ZONE_G_START + (PH3 + 2) * 2, w: PW3, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
];

/* ─── Zone F lower (plots 57–47, left of 12M vertical road, below 12M horizontal road) ─── */
const zoneFLower = [
    { plotNumber: 57, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 56, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2), w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 55, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 2, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 54, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 3, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 53, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 4, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 52, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 5, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 51, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 6, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 50, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 7, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 49, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 8, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 48, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 9, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 47, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 10, w: PW2, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
];

/* ─── Zone G lower (plots 65–75, left of 57-47, below 12M horizontal road) ─── */
const zoneGLower = [
    { plotNumber: 65, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 66, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2), w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 67, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 2, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 68, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 3, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 69, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 4, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 70, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 5, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', textX: 240 },
    { plotNumber: 71, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 6, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 72, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 7, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 73, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 8, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 74, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 9, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 75, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 10, w: PW3, h: PH4, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
];

/* ─── Zone H lower (plots 87–76, left of 9m road) ─── */
// The left boundary line goes from (80, 200) to (120, 1090)
// The right edge of these plots is the 9m road at X=185
// Slope function: x(y) = 80 + (120-80)/(1090-200) * (y - 200) = 80 + 40/890 * (y - 200)
const getLeftX = (y) => 80 + (40 / 890) * (y - 200);

const PH5 = 43; // Adjusted height
const yVals = Array.from({ length: 13 }, (_, i) => ZONE_D_LOWER + i * (PH5 + 2));
const rightX = 185; // Edge of 9m road

const createSlantedPlot = (num, idx) => {
    const yTop = yVals[idx];
    const yBot = yTop + PH5;
    const xTopLeft = getLeftX(yTop);
    const xBotLeft = getLeftX(yBot);
    // Rough width calculation for data
    const avgW = rightX - (xTopLeft + xBotLeft) / 2;

    return {
        plotNumber: num,
        x: xTopLeft, y: yTop, w: avgW, h: PH5,
        lengthFt: 30, widthFt: 36, facing: 'East', status: 'available',
        shape: 'polygon',
        points: [[xTopLeft, yTop], [rightX, yTop], [rightX, yBot], [xBotLeft, yBot]]
    };
};

const zoneHLower = [
    createSlantedPlot(87, 0),
    createSlantedPlot(86, 1),
    createSlantedPlot(85, 2),
    createSlantedPlot(84, 3),
    createSlantedPlot(83, 4),
    createSlantedPlot(82, 5),
    createSlantedPlot(81, 6),
    createSlantedPlot(80, 7),
    createSlantedPlot(79, 8),
    createSlantedPlot(78, 9),
    createSlantedPlot(77, 10),
    createSlantedPlot(76, 11),
];

const rawPlots = [...rightCol, ...rightColLower, ...zoneDUpper, ...zoneDLower, ...zoneE, ...zoneELower, ...zoneFUpper, ...zoneGUpper, ...zoneFLower, ...zoneGLower, ...zoneHLower];

// Enrich with computed area fields
const plotCoordinates = rawPlots.map((p) => {
    const area = calculateArea(p.lengthFt, p.widthFt);
    return {
        plotNumber: p.plotNumber,
        x: p.x,
        y: p.y,
        w: p.w,
        h: p.h,
        lengthFt: p.lengthFt,
        widthFt: p.widthFt,
        ...area,
        facing: p.facing,
        status: p.status,
        shape: p.shape,
        points: p.points || null,
    };
});

export default plotCoordinates;

/* ═══════════════════════════════════════════════════════════════
   LAYOUT INFO (for info box)
   ═══════════════════════════════════════════════════════════════ */

export const LAYOUT_INFO = {
    title: [
        'RESIDENTIAL LAYOUT IN S.Nos',
        '59-5B & 75-4A, 4B OF MANGALAM (V)',
        'TIRUPATI (U) MANDAL',
        'TIRUPATI DISTRICT',
    ],
    details: [
        ['TOTAL AREA', '6-55.5 Acs'],
        ['PLOTTED AREA', '4-04.97 Acs'],
        ['ROADS AREA (40\' & 30\')', '1-81.70 Acs'],
        ['PUBLIC OPEN SPACE', '0-65.55 Acs'],
        ['UTILITY AREA', '0-03.28 Acs'],
    ],
};

/* ═══════════════════════════════════════════════════════════════
   SURVEY LABELS (surrounding area)
   ═══════════════════════════════════════════════════════════════ */

export const SURVEY_LABELS = [
    { x: 300, y: 20, label: '58' },
    { x: 500, y: 20, label: '70' },
    { x: 55, y: 300, label: '59/5A2' },
    { x: 55, y: 700, label: '75/3B' },
    { x: 680, y: 500, label: '74' },
    { x: 680, y: 1000, label: '76' },

];
