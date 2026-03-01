/**
 * Plot Coordinate System for quaantumm Ventures Residential Layout
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
    OPEN_SPACE_R: 170,   // Public Open Space right edge
    ROAD_9M_L: [170, 220],  // Left 9M road
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
    BOUNDARY_R: 645,
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
    [645, 280],   // Right boundary top (steeper incline)
    [640, 1100],  // Right boundary bottom (inclined slightly left and lowered)
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
        x: 80, y: 477, width: 565, height: 60,
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
        const x0 = 170; const x1 = 220;
        const y0 = Math.round(road60TopYAt(x0));
        const y1val = Math.round(road60TopYAt(x1));
        return {
            id: 'road-9m-left',
            label: '9M WIDE LAYOUT ROAD',
            points: [[170, 157], [220, 134], [220, y1val], [170, y0]],
            cx: 195, // Center for text
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
        // x at y=477 is: 80 + (120-80)/(1090-200) * (477-200) ≈ 80 + 40/890 * 277 ≈ 92.5
        points: [[80, 200], [170, 157], [170, 477], [92.5, 477]],
        fill: 'green',
        areaAcres: 0.65, // estimate
    },
    {
        id: 'others-land-right',
        label: 'OTHERS LAND',
        areaText: '',
        points: [[645, 280], [710, 280], [710, 1097], [640, 1100]],
        fill: 'hatch',
    },
    {
        id: 'utility-space',
        label: 'UTILITY',
        points: [[220, 279], [275, 279], [275, 330], [220, 330]],
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
const ZONE_F_WIDTH = 72; // reduced from 77
const ZONE_G_WIDTH = 55; // increased from 50 to compensate for Zone F reduction and maintain road alignment
const ZONE_D_WIDTH = 66; // wider width for plots 16-31
const ZONE_E_WIDTH = 54; // narrower width for plots 32-46 to keep combined space
const LOWER_START = 566; // shifted down to account for initial height increase
const ZONE_D_LOWER = 566; // same as lower start
const ZONE_D_START = 226; // just below OTHERS LAND line
const ZONE_D_UPPER_X = 549 - ZONE_D_WIDTH; // right edge touches 9M road at x=549
const ZONE_E_UPPER_X = ZONE_D_UPPER_X - ZONE_E_WIDTH - 2; // left of new zone D
const ZONE_E_START = 279; // aligned with plot 30
const ZONE_F_UPPER_X = 347 - ZONE_F_WIDTH; // road left edge
const ZONE_F_START = 279; // aligned with plots 32-35
const ZONE_G_UPPER_X = ZONE_F_UPPER_X - ZONE_G_WIDTH; // left side of new Zone G
const PH3_REDUCED = 48; // slightly reduced height for upper zones
const ZONE_G_START = 279 + PH3_REDUCED + 2; // below utility space
const PH5 = 43; // Zone H standard

const rightCol = [
    { plotNumber: 1, x: 594, y: 230, w: PW, h: 100, lengthFt: 48, widthFt: 30, facing: 'West', status: 'sold', shape: 'polygon', points: [[594.2, 230], [645, 280], [644.7, 330], [594, 330]], irregularDimensions: { west: "71'11\"", south: "43'9\"", east: "27'7\"" } },
    { plotNumber: 2, x: 594, y: 329, w: PW, h: 48, lengthFt: 43, widthFt: 30, facing: 'West', status: 'sold', shape: 'polygon', points: [[594, 329], [644.7, 329], [644.4, 377], [594, 377]], irregularDimensions: { west: "30'", east: "30'", south: "43'7\"", north: "43'9\"" } },
    { plotNumber: 3, x: 594, y: 379, w: PW, h: 48, lengthFt: 43, widthFt: 30, facing: 'West', status: 'sold', shape: 'polygon', points: [[594, 379], [644.4, 379], [644.1, 427], [594, 427]], irregularDimensions: { west: "30'", east: "30'", north: "43'7\"", south: "43'4\"" } },
    { plotNumber: 4, x: 594, y: 429, w: PW, h: 48, lengthFt: 43, widthFt: 30, facing: 'West', status: 'sold', shape: 'polygon', points: [[594, 429], [644.1, 429], [643.8, 477], [594, 477]], irregularDimensions: { west: "30'", east: "30'", north: "43'4\"", south: "43'2\"" } },
];

/* ─── Right column lower (East facing, plots 5–15, below 12M road) ─── */

const rightColLower = [
    { plotNumber: 5, x: 594, y: 537, w: PW, h: 60, lengthFt: 70, widthFt: 42, facing: 'West', status: 'sold', shape: 'polygon', points: [[594, 537], [643.5, 537], [643.0, 609], [594, 609]], irregularDimensions: { east: "60'", west: "60'", north: "42'10\"", south: "42'5\"" } },
    { plotNumber: 6, x: 594, y: LOWER_START + (PH2 + 2), w: PW, h: PH2, lengthFt: 42, widthFt: 36, facing: 'West', status: 'sold', shape: 'polygon', points: [[594, 611], [643.0, 611], [642.7, 654], [594, 654]], irregularDimensions: { east: "36'", west: "36'", north: "42'5\"", south: "42'2\"" } },
    { plotNumber: 7, x: 594, y: LOWER_START + (PH2 + 2) * 2, w: PW, h: PH2, lengthFt: 41, widthFt: 36, facing: 'West', status: 'sold', shape: 'polygon', points: [[594, 656], [642.7, 656], [642.4, 699], [594, 699]], irregularDimensions: { east: "36'", west: "36'", north: "42'2\"", south: "41'1\"" } },
    { plotNumber: 8, x: 594, y: LOWER_START + (PH2 + 2) * 3, w: PW, h: PH2, lengthFt: 41, widthFt: 36, facing: 'West', status: 'available', shape: 'polygon', points: [[594, 701], [642.4, 701], [642.2, 744], [594, 744]], irregularDimensions: { east: "36'", west: "36'", north: "41'11\"", south: "41'8\"" } },
    { plotNumber: 9, x: 594, y: LOWER_START + (PH2 + 2) * 4, w: PW, h: PH2, lengthFt: 41, widthFt: 36, facing: 'West', status: 'available', shape: 'polygon', points: [[594, 746], [642.2, 746], [641.9, 789], [594, 789]], irregularDimensions: { east: "36'", west: "36'", north: "41'8\"", south: "41'5\"" } },
    { plotNumber: 10, x: 594, y: LOWER_START + (PH2 + 2) * 5, w: PW, h: PH2, lengthFt: 41, widthFt: 36, facing: 'West', status: 'available', shape: 'polygon', points: [[594, 791], [641.9, 791], [641.6, 834], [594, 834]], irregularDimensions: { east: "36'", west: "36'", north: "41'5\"", south: "41'2\"" } },
    { plotNumber: 11, x: 594, y: LOWER_START + (PH2 + 2) * 6, w: PW, h: PH2, lengthFt: 40, widthFt: 36, facing: 'West', status: 'available', shape: 'polygon', points: [[594, 836], [641.6, 836], [641.3, 879], [594, 879]], irregularDimensions: { east: "36'", west: "36'", north: "41'2\"", south: "40'11\"" } },
    { plotNumber: 12, x: 594, y: LOWER_START + (PH2 + 2) * 7, w: PW, h: PH2, lengthFt: 40, widthFt: 36, facing: 'West', status: 'available', shape: 'polygon', points: [[594, 881], [641.3, 881], [641.1, 924], [594, 924]], irregularDimensions: { east: "36'", west: "36'", north: "40'11\"", south: "40'8\"" } },
    { plotNumber: 13, x: 594, y: LOWER_START + (PH2 + 2) * 8, w: PW, h: PH2, lengthFt: 40, widthFt: 36, facing: 'West', status: 'available', shape: 'polygon', points: [[594, 926], [641.1, 926], [640.8, 969], [594, 969]], irregularDimensions: { east: "36'", west: "36'", north: "40'8\"", south: "40'6\"" } },
    { plotNumber: 14, x: 594, y: LOWER_START + (PH2 + 2) * 9, w: PW, h: PH2, lengthFt: 40, widthFt: 36, facing: 'West', status: 'sold', shape: 'polygon', points: [[594, 971], [640.8, 971], [640.5, 1014], [594, 1014]], irregularDimensions: { east: "36'", west: "36'", north: "40'6\"", south: "40'4\"" } },
    { plotNumber: 15, x: 594, y: LOWER_START + (PH2 + 2) * 10, w: PW, h: 96, lengthFt: 71, widthFt: 40, facing: 'West', status: 'sold', shape: 'polygon', points: [[594, 1016], [640.5, 1016], [640, 1100], [594, 1101.6]], irregularDimensions: { west: "71'8\"", east: "68'6\"", north: "40'4\"", south: "40'2\"" } },
];

/* ─── Zone D upper (plots 31–27, left of 9M road, above 12M road) ─── */

const zoneDUpper = [
    { plotNumber: 31, x: ZONE_D_UPPER_X, y: ZONE_D_START, w: ZONE_D_WIDTH, h: PH3, lengthFt: 60, widthFt: 48.6, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { west: "48'7\"", east: "48'5\"", north: "60'", south: "60'" } },
    { plotNumber: 30, x: ZONE_D_UPPER_X, y: ZONE_D_START + PH3 + 2, w: ZONE_D_WIDTH, h: PH3_REDUCED, lengthFt: 60, widthFt: 31.75, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "31'9\"", west: "31'9\"", north: "60'", south: "60'" } },
    { plotNumber: 29, x: ZONE_D_UPPER_X, y: ZONE_D_START + PH3 + 2 + (PH3_REDUCED + 2), w: ZONE_D_WIDTH, h: PH3_REDUCED, lengthFt: 60, widthFt: 30, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { west: "30'", east: "30'", north: "60'", south: "60'" } },
    { plotNumber: 28, x: ZONE_D_UPPER_X, y: ZONE_D_START + PH3 + 2 + (PH3_REDUCED + 2) * 2, w: ZONE_D_WIDTH, h: PH3_REDUCED, lengthFt: 60, widthFt: 30, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { west: "30'", east: "30'", north: "60'", south: "60'" } },
    { plotNumber: 27, x: ZONE_D_UPPER_X, y: ZONE_D_START + PH3 + 2 + (PH3_REDUCED + 2) * 3, w: ZONE_D_WIDTH, h: PH3_REDUCED, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
];

/* ─── Zone D lower (plots 26–16, left of 9M road, below 12M road) ─── */

const zoneDLower = [
    { plotNumber: 26, x: ZONE_D_UPPER_X, y: 537, w: ZONE_D_WIDTH, h: 72, lengthFt: 60, widthFt: 60, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "60'", south: "60'" } },
    { plotNumber: 25, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2), w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 24, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 2, w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 23, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 3, w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 22, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 4, w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 21, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 5, w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 20, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 6, w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 19, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 7, w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 18, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 8, w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 17, x: ZONE_D_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 9, w: ZONE_D_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { west: "36'", east: "36'", north: "60'", south: "60'" } },
    { plotNumber: 16, x: ZONE_D_UPPER_X, y: 1011, w: ZONE_D_WIDTH, h: 50, lengthFt: 78, widthFt: 60, facing: 'East', status: 'sold', shape: 'polygon', points: [[483, 1011], [549, 1011], [549, 1103.4], [483, 1105.6]], irregularDimensions: { east: "74'", west: "78'8\"", north: "60'", south: "60'2\"" } },
];

/* ─── Zone E (plots 32–35, beside plots 30–27, left column) ─── */

const zoneE = [
    { plotNumber: 32, x: ZONE_E_UPPER_X, y: ZONE_E_START, w: ZONE_E_WIDTH, h: PH3_REDUCED, lengthFt: 50, widthFt: 31.75, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "31'9\"", east: "31'9\"", north: "50'", south: "50'" } },
    { plotNumber: 33, x: ZONE_E_UPPER_X, y: ZONE_E_START + PH3_REDUCED + 2, w: ZONE_E_WIDTH, h: PH3_REDUCED, lengthFt: 50, widthFt: 30, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "30'", west: "30'", north: "50'", south: "50'" } },
    { plotNumber: 34, x: ZONE_E_UPPER_X, y: ZONE_E_START + PH3_REDUCED + 2 + (PH3_REDUCED + 2), w: ZONE_E_WIDTH, h: PH3_REDUCED, lengthFt: 50, widthFt: 30, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "30'", west: "30'", north: "50'", south: "50'" } },
    { plotNumber: 35, x: ZONE_E_UPPER_X, y: ZONE_E_START + PH3_REDUCED + 2 + (PH3_REDUCED + 2) * 2, w: ZONE_E_WIDTH, h: PH3_REDUCED, lengthFt: 50, widthFt: 36, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "50'", south: "50'" } },
];

/* ─── Zone E lower (plots 36–46, below 12M road, same column as 32–35) ─── */
const zoneELower = [
    { plotNumber: 36, x: ZONE_E_UPPER_X, y: 537, w: ZONE_E_WIDTH, h: 72, lengthFt: 50, widthFt: 60, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 37, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2), w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 38, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 2, w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 39, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 3, w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 40, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 4, w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 41, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 5, w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 42, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 6, w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'available', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 43, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 7, w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'available', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 44, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 8, w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 45, x: ZONE_E_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 9, w: ZONE_E_WIDTH, h: PH4, lengthFt: 50, widthFt: 60, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { west: "60'", east: "60'", north: "50'", south: "50'" } },
    { plotNumber: 46, x: ZONE_E_UPPER_X, y: 1011, w: ZONE_E_WIDTH, h: 55, lengthFt: 50, widthFt: 82, facing: 'West', status: 'sold', shape: 'polygon', points: [[427, 1011], [481, 1011], [481, 1105.7], [427, 1108.1]], irregularDimensions: { east: "78'8\"", west: "82'7\"", north: "50'", south: "50'2\"" } },
];

/* ─── Zone F upper (plots 61–58, left of 12M vertical road, above 12M horizontal road) ─── */

const zoneFUpper = [
    { plotNumber: 61, x: ZONE_F_UPPER_X, y: ZONE_F_START, w: ZONE_F_WIDTH, h: PH3_REDUCED, lengthFt: 60, widthFt: 31.75, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "31'9\"", west: "31'9\"", north: "60'", south: "60'" } },
    { plotNumber: 60, x: ZONE_F_UPPER_X, y: ZONE_F_START + PH3_REDUCED + 2, w: ZONE_F_WIDTH, h: PH3_REDUCED, lengthFt: 60, widthFt: 30, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "30'", west: "30'", north: "60'", south: "60'" } },
    { plotNumber: 59, x: ZONE_F_UPPER_X, y: ZONE_F_START + PH3_REDUCED + 2 + (PH3_REDUCED + 2), w: ZONE_F_WIDTH, h: PH3_REDUCED, lengthFt: 60, widthFt: 30, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "30'", west: "30'", north: "60'", south: "60'" } },
    { plotNumber: 58, x: ZONE_F_UPPER_X, y: ZONE_F_START + PH3_REDUCED + 2 + (PH3_REDUCED + 2) * 2, w: ZONE_F_WIDTH, h: PH3_REDUCED, lengthFt: 30, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect' },
];

/* ─── Zone G upper (plots 62–64, left of 60-58, below Utility Space) ─── */

const zoneGUpper = [
    { plotNumber: 62, x: ZONE_G_UPPER_X, y: ZONE_G_START, w: ZONE_G_WIDTH, h: PH3_REDUCED, lengthFt: 42, widthFt: 28.875, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "30'", west: "27'9\"", north: "42'", south: "42'" } },
    { plotNumber: 63, x: ZONE_G_UPPER_X, y: ZONE_G_START + PH3_REDUCED + 2, w: ZONE_G_WIDTH, h: PH3_REDUCED, lengthFt: 42, widthFt: 30, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "30'", west: "30'", north: "42'", south: "42'" } },
    { plotNumber: 64, x: ZONE_G_UPPER_X, y: ZONE_G_START + PH3_REDUCED + 2 + (PH3_REDUCED + 2), w: ZONE_G_WIDTH, h: PH3_REDUCED, lengthFt: 42, widthFt: 36, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
];

/* ─── Zone F lower (plots 57–47, left of 12M vertical road, below 12M horizontal road) ─── */
const zoneFLower = [
    { plotNumber: 57, x: ZONE_F_UPPER_X, y: 537, w: ZONE_F_WIDTH, h: 72, lengthFt: 60, widthFt: 60, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "60'", west: "60'", north: "60'", south: "60'" } },
    { plotNumber: 56, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2), w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 55, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 2, w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 54, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 3, w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 53, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 4, w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 52, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 5, w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 51, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 6, w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 50, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 7, w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 49, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 8, w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 48, x: ZONE_F_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 9, w: ZONE_F_WIDTH, h: PH4, lengthFt: 60, widthFt: 36, facing: 'East', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "60'", south: "60'" } },
    { plotNumber: 47, x: ZONE_F_UPPER_X, y: 1011, w: ZONE_F_WIDTH, h: 66, lengthFt: 60.08, widthFt: 88.08, facing: 'East', status: 'sold', shape: 'polygon', points: [[275, 1011], [347, 1011], [347, 1111.2], [275, 1113.3]], irregularDimensions: { north: "60'", south: "60'2\"", east: "85'9\"", west: "90'5\"" } },
];

/* ─── Zone G lower (plots 65–75, left of 57-47, below 12M horizontal road) ─── */
const zoneGLower = [
    { plotNumber: 65, x: ZONE_G_UPPER_X, y: 537, w: ZONE_G_WIDTH, h: 72, lengthFt: 60, widthFt: 42, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "60'", west: "60'", north: "42'", south: "42'" } },
    { plotNumber: 66, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2), w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 67, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 2, w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 68, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 3, w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 69, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 4, w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 70, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 5, w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 71, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 6, w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 72, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 7, w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 73, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 8, w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'available', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 74, x: ZONE_G_UPPER_X, y: ZONE_D_LOWER + (PH4 + 2) * 9, w: ZONE_G_WIDTH, h: PH4, lengthFt: 42, widthFt: 36, facing: 'West', status: 'sold', shape: 'rect', irregularDimensions: { east: "36'", west: "36'", north: "42'", south: "42'" } },
    { plotNumber: 75, x: ZONE_G_UPPER_X, y: 1011, w: ZONE_G_WIDTH, h: 70, lengthFt: 92.08, widthFt: 42.08, facing: 'West', status: 'sold', shape: 'polygon', points: [[220, 1011], [275, 1011], [275, 1113.3], [220, 1115.7]], irregularDimensions: { east: "90'5\"", west: "93'9\"", north: "42'", south: "42'2\"" } },
];

/* ─── Zone H lower (plots 87–76, left of 9m road) ─── */
// The left boundary line goes from (80, 200) to (120, 1090)
// The right edge of these plots is the 9m road at X=185
// Slope function: x(y) = 80 + (120-80)/(1090-200) * (y - 200) = 80 + 40/890 * (y - 200)
const getLeftX = (y) => 80 + (40 / 890) * (y - 200);

const yVals = Array.from({ length: 13 }, (_, i) => ZONE_D_LOWER + i * (PH5 + 2));
const rightX = 170; // Edge of 9m road

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
    {
        plotNumber: 87,
        x: getLeftX(537), y: 537, w: rightX - (getLeftX(537) + getLeftX(537 + 72)) / 2, h: 72,
        lengthFt: 56.83, widthFt: 60.08, facing: 'East', status: 'sold',
        shape: 'polygon',
        points: [[getLeftX(537), 537], [rightX, 537], [rightX, 537 + 72], [getLeftX(537 + 72), 537 + 72]],
        irregularDimensions: { north: "58'", south: "55'8\"", east: "60'", west: "60'1\"" }
    },
    {
        plotNumber: 86,
        x: 98.47, y: 611, w: 70.565, h: 43,
        lengthFt: 54.955, widthFt: 48.04, facing: 'East', status: 'sold',
        shape: 'polygon',
        points: [[98.47, 611], [170, 611], [170, 654], [100.4, 654]],
        irregularDimensions: { north: "55'8\"", south: "54'3\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 85,
        x: 100.49, y: 656, w: 68.54, h: 43,
        lengthFt: 53.54, widthFt: 48.04, facing: 'East', status: 'sold',
        shape: 'polygon',
        points: [[100.49, 656], [170, 656], [170, 699], [102.43, 699]],
        irregularDimensions: { north: "54'3\"", south: "52'10\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 84,
        x: 102.52, y: 701, w: 66.52, h: 43,
        lengthFt: 52.17, widthFt: 48.04, facing: 'East', status: 'available',
        shape: 'polygon',
        points: [[102.52, 701], [170, 701], [170, 744], [104.45, 744]],
        irregularDimensions: { north: "52'10\"", south: "51'6\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 83,
        x: 104.54, y: 746, w: 64.495, h: 43,
        lengthFt: 50.79, widthFt: 48.04, facing: 'East', status: 'available',
        shape: 'polygon',
        points: [[104.54, 746], [170, 746], [170, 789], [106.47, 789]],
        irregularDimensions: { north: "51'6\"", south: "50'1\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 82,
        x: 106.56, y: 791, w: 62.475, h: 43,
        lengthFt: 49.375, widthFt: 48.04, facing: 'East', status: 'available',
        shape: 'polygon',
        points: [[106.56, 791], [170, 791], [170, 834], [108.49, 834]],
        irregularDimensions: { north: "50'1\"", south: "48'8\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 81,
        x: 108.59, y: 836, w: 60.44, h: 43,
        lengthFt: 48, widthFt: 48.04, facing: 'East', status: 'available',
        shape: 'polygon',
        points: [[108.59, 836], [170, 836], [170, 879], [110.51, 879]],
        irregularDimensions: { north: "48'8\"", south: "47'4\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 80,
        x: 110.61, y: 881, w: 58.42, h: 43,
        lengthFt: 46.625, widthFt: 48.04, facing: 'East', status: 'available',
        shape: 'polygon',
        points: [[110.61, 881], [170, 881], [170, 924], [112.54, 924]],
        irregularDimensions: { north: "47'4\"", south: "45'11\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 79,
        x: 112.63, y: 926, w: 56.4, h: 43,
        lengthFt: 44.96, widthFt: 48.04, facing: 'East', status: 'sold',
        shape: 'polygon',
        points: [[112.63, 926], [170, 926], [170, 969], [114.56, 969]],
        irregularDimensions: { north: "45'11\"", south: "44'", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 78,
        x: 114.65, y: 971, w: 54.385, h: 43,
        lengthFt: 43.46, widthFt: 48.04, facing: 'East', status: 'available',
        shape: 'polygon',
        points: [[114.65, 971], [170, 971], [170, 1014], [116.58, 1014]],
        irregularDimensions: { north: "44'", south: "42'11\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 77,
        x: 116.67, y: 1016, w: 52.345, h: 43,
        lengthFt: 42.21, widthFt: 48.04, facing: 'East', status: 'sold',
        shape: 'polygon',
        points: [[116.67, 1016], [170, 1016], [170, 1059], [118.6, 1059]],
        irregularDimensions: { north: "42'11\"", south: "41'6\"", east: "36'", west: "60'1\"" }
    },
    {
        plotNumber: 76,
        x: 118, y: 1061, w: 52, h: 58,
        lengthFt: 40.46, widthFt: 61.67, facing: 'East', status: 'sold',
        shape: 'polygon',
        points: [[118, 1061], [170, 1061], [170, 1117.6], [120, 1120]],
        irregularDimensions: { north: "41'6\"", south: "39'5\"", east: "60'2\"", west: "63'2\"" }
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
