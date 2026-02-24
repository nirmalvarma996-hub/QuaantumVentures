/**
 * Plot Coordinate System for Quantamm Ventures Residential Layout
 * S.Nos: 59-5B & 75-4A, 4B of Mangalam (V), Tirupati (U) Mandal
 *
 * Scale: 1 meter = 5 SVG units  |  1 foot ≈ 1.524 SVG units
 * ViewBox: 0 0 900 1150
 */

import { calculateArea, calculateIrregularArea } from '../utils/areaCalculator';

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
    [635, 1100],  // Right boundary bottom (inclined slightly left and lowered)
    [120, 1120],  // Left boundary bottom (lowered)
    [80, 200],    // Left boundary top
];

/* ═══════════════════════════════════════════════════════════════
   ROAD DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */

export const ROADS = [
    // Compute slanted top Y of the proposed 60' road so vertical roads align to it
    // Top edge of proposed 60' road (approx): left (80,1093) -> right (710,1044)
    // We'll interpolate Y at the vertical road's X and set their heights so they end at that Y.
    ...(function computeRoads() {
        // Use the actual top edge of the proposed 60' road as currently defined below
        // (these values align with the `road-60-bottom` polygon top points in this file)
        const ROAD60_TOP = { x1: 80, y1: 1121, x2: 710, y2: 1097 };
        const road60TopYAt = (x) => ROAD60_TOP.y1 + (ROAD60_TOP.y2 - ROAD60_TOP.y1) / (ROAD60_TOP.x2 - ROAD60_TOP.x1) * (x - ROAD60_TOP.x1);

        const right9mX = 549; const right9mY = 230;
        const vertical12mX = 347; const vertical12mY = 279;

        const right9mHeight = Math.round(road60TopYAt(right9mX) - right9mY);
        const vertical12mHeight = Math.round(road60TopYAt(vertical12mX) - vertical12mY);

        return [
            {
                id: 'road-9m-right',
                label: '9M WIDE LAYOUT ROAD',
                x: right9mX, y: right9mY, width: 45, height: right9mHeight,
                orientation: 'vertical',
            },
            {
                id: 'road-12m-vertical',
                label: '12M WIDE LAYOUT ROAD',
                x: vertical12mX, y: vertical12mY, width: 80, height: vertical12mHeight,
                orientation: 'vertical',
            },
        ];
    })(),
    {
        id: 'road-12m-horizontal',
        label: '12M WIDE LAYOUT ROAD',
        x: 80, y: 489, width: 560, height: 60,
        orientation: 'horizontal',
    },
    {
        id: 'road-60-bottom',
        label: 'PROPOSED 60\' M.P. ROAD',
        points: [[80, 1121], [710, 1097], [710, 1187], [80, 1211]],
        cx: 390, cy: 1145,
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
    (function computeLeft9m() {
        // Adjust bottom Y of left 9m road so it meets the slanted top of the proposed 60' road
        // Keep the same ROAD60_TOP values as used above so both left/right interpolation match
        const ROAD60_TOP = { x1: 80, y1: 1121, x2: 710, y2: 1097 };
        const road60TopYAt = (x) => ROAD60_TOP.y1 + (ROAD60_TOP.y2 - ROAD60_TOP.y1) / (ROAD60_TOP.x2 - ROAD60_TOP.x1) * (x - ROAD60_TOP.x1);
        const x0 = 185; const x1 = 230;
        const y0 = Math.round(road60TopYAt(x0));
        const y1val = Math.round(road60TopYAt(x1));
        return {
            id: 'road-9m-left',
            label: '9M WIDE LAYOUT ROAD',
            points: [[185, 151], [230, 130], [230, y1val], [185, y0]],
            cx: 207.5, // Center for text
            cy: 620, // Center for text
            orientation: 'vertical',
        };
    })(),
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
        points: [[640, 280], [710, 280], [710, 1097], [635, 1100]],
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
const PH2 = 43; // aligned with Zone H (43 units)
const PH3 = 51; // plot height for zone D
const PH4 = 43; // aligned with Zone H (43 units)
const PW2 = 60; // wider width for plots 31-61
const PW3 = 57; // width to cover gap
const LOWER_START = 551; // just below 12M road
const ZONE_D_LOWER = 551; // same as lower start
const ZONE_D_START = 226; // just below OTHERS LAND line
const ZONE_D_UPPER_X = 549 - PW2; // right edge touches 9M road at x=549
const ZONE_E_UPPER_X = ZONE_D_UPPER_X - PW2 - 2; // left of new zone D
const ZONE_E_START = 279; // aligned with plot 30
const ZONE_F_UPPER_X = 347 - PW2; // road left edge
const ZONE_F_START = 279; // aligned with plots 32-35
const ZONE_G_UPPER_X = 230; // matches utility space
const ZONE_G_START = 279 + PH3 + 2; // below utility space
const PH5 = 43; // Zone H standard

const rightCol = [
    { plotNumber: 1, x: 594, y: 230, w: PW, h: 100, lengthFt: 48, widthFt: 30, facing: 'West', status: 'sold', shape: 'polygon', points: [[594.2, 230], [640, 280], [639.7, 330], [594, 330]], irregularDimensions: { west: "71'11\"", south: "43'9\"", east: "27'7\"" } },
    { plotNumber: 2, x: 594, y: 332, w: PW, h: PH3, lengthFt: 43, widthFt: 30, facing: 'West', status: 'reserved', shape: 'polygon', points: [[594, 332], [639.7, 332], [639.3, 383], [594, 383]], irregularDimensions: { west: "30'", east: "30'", south: "43'7\"", north: "43'9\"" } },
    { plotNumber: 3, x: 594, y: 385, w: PW, h: PH3, lengthFt: 43, widthFt: 30, facing: 'West', status: 'reserved', shape: 'polygon', points: [[594, 385], [639.3, 385], [639, 436], [594, 436]], irregularDimensions: { west: "30'", east: "30'", north: "43'7\"", south: "43'4\"" } },
    { plotNumber: 4, x: 594, y: 438, w: PW, h: PH3, lengthFt: 43, widthFt: 30, facing: 'West', status: 'reserved', shape: 'polygon', points: [[594, 438], [639, 438], [638.6, 489], [594, 489]], irregularDimensions: { west: "30'", east: "30'", north: "43'4\"", south: "43'2\"" } },
];

/* ─── Right column lower (East facing, plots 5–15, below 12M road) ─── */

const rightColLower = [
    { plotNumber: 5, x: 594, y: LOWER_START, w: PW, h: PH2, lengthFt: 42, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 551], [638.3, 551], [638.1, 594], [594, 594]] },
    { plotNumber: 6, x: 594, y: LOWER_START + (PH2 + 2), w: PW, h: PH2, lengthFt: 42, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 596], [638.1, 596], [637.8, 639], [594, 639]] },
    { plotNumber: 7, x: 594, y: LOWER_START + (PH2 + 2) * 2, w: PW, h: PH2, lengthFt: 41, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 641], [637.8, 641], [637.5, 684], [594, 684]] },
    { plotNumber: 8, x: 594, y: LOWER_START + (PH2 + 2) * 3, w: PW, h: PH2, lengthFt: 41, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 686], [637.5, 686], [637.2, 729], [594, 729]] },
    { plotNumber: 9, x: 594, y: LOWER_START + (PH2 + 2) * 4, w: PW, h: PH2, lengthFt: 41, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 731], [637.2, 731], [637, 774], [594, 774]] },
    { plotNumber: 10, x: 594, y: LOWER_START + (PH2 + 2) * 5, w: PW, h: PH2, lengthFt: 41, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 776], [637, 776], [636.7, 819], [594, 819]] },
    { plotNumber: 11, x: 594, y: LOWER_START + (PH2 + 2) * 6, w: PW, h: PH2, lengthFt: 40, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 821], [636.7, 821], [636.4, 864], [594, 864]] },
    { plotNumber: 12, x: 594, y: LOWER_START + (PH2 + 2) * 7, w: PW, h: PH2, lengthFt: 40, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 866], [636.4, 866], [636.1, 909], [594, 909]] },
    { plotNumber: 13, x: 594, y: LOWER_START + (PH2 + 2) * 8, w: PW, h: PH2, lengthFt: 40, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 911], [636.1, 911], [635.8, 954], [594, 954]] },
    { plotNumber: 14, x: 594, y: LOWER_START + (PH2 + 2) * 9, w: PW, h: PH2, lengthFt: 40, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 956], [635.8, 956], [635.6, 999], [594, 999]] },
    { plotNumber: 15, x: 594, y: 1001, w: PW, h: 52, lengthFt: 45, widthFt: 30, facing: 'East', status: 'available', shape: 'polygon', points: [[594, 1001], [635.6, 1001], [635, 1100], [594, 1101.6]] },
];

/* ─── Zone D upper (plots 31–27, left of 9M road, above 12M road) ─── */

const zoneDUpper = [
    { plotNumber: 31, x: ZONE_D_UPPER_X, y: ZONE_D_START, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 30, x: ZONE_D_UPPER_X, y: ZONE_D_START + (PH3 + 2), w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 29, x: ZONE_D_UPPER_X, y: ZONE_D_START + (PH3 + 2) * 2, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
    { plotNumber: 28, x: ZONE_D_UPPER_X, y: ZONE_D_START + (PH3 + 2) * 3, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'North', status: 'available', shape: 'rect' },
    { plotNumber: 27, x: ZONE_D_UPPER_X, y: ZONE_D_START + (PH3 + 2) * 4, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'rect' },
];

/* ─── Zone D lower (plots 26–16, left of 9M road, below 12M road) ─── */

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
    { plotNumber: 16, x: ZONE_D_UPPER_X, y: 1001, w: PW2, h: 60, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'polygon', points: [[489, 1001], [549, 1001], [549, 1103.4], [489, 1105.7]] },
];

/* ─── Zone E (plots 32–35, beside plots 30–27, left column) ─── */

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
    { plotNumber: 46, x: ZONE_E_UPPER_X, y: 1001, w: PW2, h: 65, lengthFt: 30, widthFt: 36, facing: 'South', status: 'available', shape: 'polygon', points: [[427, 1001], [487, 1001], [487, 1105.8], [427, 1108.1]] },
];

/* ─── Zone F upper (plots 61–58, left of 12M vertical road, above 12M horizontal road) ─── */

const zoneFUpper = [
    { plotNumber: 61, x: ZONE_F_UPPER_X, y: ZONE_F_START, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 60, x: ZONE_F_UPPER_X, y: ZONE_F_START + (PH3 + 2), w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 59, x: ZONE_F_UPPER_X, y: ZONE_F_START + (PH3 + 2) * 2, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect' },
    { plotNumber: 58, x: ZONE_F_UPPER_X, y: ZONE_F_START + (PH3 + 2) * 3, w: PW2, h: PH3, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', textX: 298 },
];

/* ─── Zone G upper (plots 62–64, left of 60-58, below Utility Space) ─── */

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
    { plotNumber: 47, x: ZONE_F_UPPER_X, y: 1001, w: PW2, h: 76, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'polygon', points: [[287, 1001], [347, 1001], [347, 1111.2], [287, 1113.5]] },
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
    { plotNumber: 75, x: ZONE_G_UPPER_X, y: 1001, w: PW3, h: 80, lengthFt: 30, widthFt: 36, facing: 'East', status: 'available', shape: 'polygon', points: [[230, 1001], [287, 1001], [287, 1113.5], [230, 1115.7]] },
];

/* ─── Zone H lower (plots 87–76, left of 9m road) ─── */
// The left boundary line goes from (80, 200) to (120, 1090)
// The right edge of these plots is the 9m road at X=185
// Slope function: x(y) = 80 + (120-80)/(1090-200) * (y - 200) = 80 + 40/890 * (y - 200)
const getLeftX = (y) => 80 + (40 / 890) * (y - 200);

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
    {
        plotNumber: 76,
        x: 118, y: 1046, w: 67, h: 44,
        lengthFt: 30, widthFt: 36, facing: 'East', status: 'available',
        shape: 'polygon',
        points: [[118, 1046], [185, 1046], [185, 1117.5], [120, 1120]]
    },
];

const rawPlots = [...rightCol, ...rightColLower, ...zoneDUpper, ...zoneDLower, ...zoneE, ...zoneELower, ...zoneFUpper, ...zoneGUpper, ...zoneFLower, ...zoneGLower, ...zoneHLower];

// Enrich with computed area fields
const plotCoordinates = rawPlots.map((p) => {
    let area;
    if (p.irregularDimensions) {
        const d = p.irregularDimensions;
        // Default missing sides to their opposites or standard dims (e.g. Plot 1 missing North)
        const west = d.west || d.east || `${p.lengthFt}'`;
        const east = d.east || d.west || `${p.lengthFt}'`;
        const north = d.north || d.south || `${p.widthFt}'`;
        const south = d.south || d.north || `${p.widthFt}'`;

        area = calculateIrregularArea(west, east, north, south);
    } else {
        area = calculateArea(p.lengthFt, p.widthFt);
    }

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
        irregularDimensions: p.irregularDimensions || null,
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
