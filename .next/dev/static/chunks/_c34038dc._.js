(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/data/players.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// data/players.ts
// Player images should be placed in /public/images/
__turbopack_context__.s([
    "getPlayerFlag",
    ()=>getPlayerFlag,
    "players",
    ()=>players
]);
const players = [
    {
        slug: "vinicius-jr",
        name: "Vinícius Júnior",
        role: "Left Winger",
        shortDescription: "Electric dribbler and key attacking threat. Known for his explosive pace and ability to beat defenders one-on-one.",
        image: "/images/jr.jpeg",
        number: 7,
        positionX: 25,
        positionY: 75
    },
    {
        slug: "rodrygo-goes",
        name: "Rodrygo Goes",
        role: "Right Winger",
        shortDescription: "Versatile attacker with a nose for goal. Clinical finisher who delivers in big moments.",
        image: "/images/rodrygo.webp",
        number: 11,
        positionX: 75,
        positionY: 75
    },
    {
        slug: "kylian-mbappe",
        name: "Kylian Mbappé",
        role: "Striker",
        shortDescription: "Clinical finisher with blistering pace. World-class forward who terrorizes defenses.",
        image: "/images/mbappe.jpg",
        number: 9,
        positionX: 50,
        positionY: 80
    },
    {
        slug: "jude-bellingham",
        name: "Jude Bellingham",
        role: "Central Midfielder",
        shortDescription: "Box-to-box engine and midfield leader. Combines technical skill with physical dominance.",
        image: "/images/jude.webp",
        number: 5,
        positionX: 50,
        positionY: 55
    },
    {
        slug: "federico-valverde",
        name: "Federico Valverde",
        role: "Right Midfielder",
        shortDescription: "Energetic runner with powerful shooting. Covers every blade of grass on the pitch.",
        image: "/images/placeholder-1.svg",
        number: 8,
        positionX: 75,
        positionY: 50
    },
    {
        slug: "aurélien-tchouameni",
        name: "Aurélien Tchouaméni",
        role: "Defensive Midfielder",
        shortDescription: "Physical presence and ball-winning midfielder. Protects the defense with intelligence.",
        image: "/images/tchouameni.jpg",
        number: 6,
        positionX: 25,
        positionY: 50
    },
    {
        slug: "dani-carvajal",
        name: "Dani Carvajal",
        role: "Right-back",
        shortDescription: "Solid defender with attacking overlap. Veteran presence with exceptional work rate.",
        image: "/images/placeholder-1.svg",
        number: 2,
        positionX: 85,
        positionY: 30
    },
    {
        slug: "david-alaba",
        name: "David Alaba",
        role: "Left-back",
        shortDescription: "Versatile defender with set-piece expertise. Brings experience and composure to the back line.",
        image: "/images/david.jpg",
        number: 4,
        positionX: 15,
        positionY: 30
    },
    {
        slug: "eder-militao",
        name: "Éder Militão",
        role: "Center-back",
        shortDescription: "Quick and aggressive defender. Strong in duels and excellent recovery pace.",
        image: "/images/placeholder-1.svg",
        number: 3,
        positionX: 35,
        positionY: 25
    },
    {
        slug: "antonio-rudiger",
        name: "Antonio Rüdiger",
        role: "Center-back",
        shortDescription: "Aerially dominant and aggressive defender. Leader at the back with fearless commitment.",
        image: "/images/placeholder-1.svg",
        number: 22,
        positionX: 65,
        positionY: 25
    },
    {
        slug: "andriy-lunin",
        name: "Andriy Lunin",
        role: "Goalkeeper",
        shortDescription: "Shot-stopper with excellent reflexes. Reliable last line of defense.",
        image: "/images/placeholder-1.svg",
        number: 13,
        positionX: 50,
        positionY: 8
    }
];
function getPlayerFlag(role) {
    if (role.includes("Brazil") || role.includes("Vinícius") || role.includes("Rodrygo")) return "🇧🇷";
    if (role.includes("France") || role.includes("Mbappé") || role.includes("Tchouaméni")) return "🇫🇷";
    if (role.includes("England") || role.includes("Bellingham")) return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
    if (role.includes("Germany") || role.includes("Rüdiger")) return "🇩🇪";
    if (role.includes("Ukraine") || role.includes("Lunin")) return "🇺🇦";
    if (role.includes("Spain") || role.includes("Carvajal") || role.includes("Valverde")) return "🇪🇸";
    if (role.includes("Austria") || role.includes("Alaba")) return "🇦🇹";
    return "";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/PlayerCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlayerCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$players$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/players.ts [app-client] (ecmascript)");
;
;
;
function PlayerCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "4efc675fd4cebd4fb1bd265d04d1d25b075c8b6c4cb23362083abfd990dbfc4c") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4efc675fd4cebd4fb1bd265d04d1d25b075c8b6c4cb23362083abfd990dbfc4c";
    }
    const { player } = t0;
    let t1;
    if ($[1] !== player.role) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$players$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlayerFlag"])(player.role);
        $[1] = player.role;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const flag = t1;
    let t2;
    if ($[3] !== player.number) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute inset-0 flex items-center justify-center font-display text-2xl",
            children: player.number
        }, void 0, false, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 26,
            columnNumber: 10
        }, this);
        $[3] = player.number;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
        }, void 0, false, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 34,
            columnNumber: 10
        }, this);
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== t2) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-16 h-16 rounded-full player-number flex-none shadow-lg overflow-hidden",
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 41,
            columnNumber: 10
        }, this);
        $[6] = t2;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== player.name) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-display text-lg font-bold text-[var(--foreground)] group-hover:text-[#d4af37] transition-colors truncate",
            children: player.name
        }, void 0, false, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 49,
            columnNumber: 10
        }, this);
        $[8] = player.name;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== flag) {
        t6 = flag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ml-1",
            children: flag
        }, void 0, false, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 57,
            columnNumber: 18
        }, this);
        $[10] = flag;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== player.role || $[13] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm text-[#d4af37] flex items-center gap-1 font-medium",
            children: [
                player.role,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[12] = player.role;
        $[13] = t6;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== player.shortDescription) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm text-[var(--text-muted)] mt-1 line-clamp-2",
            children: player.shortDescription
        }, void 0, false, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[15] = player.shortDescription;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== t5 || $[18] !== t7 || $[19] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 min-w-0",
            children: [
                t5,
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[17] = t5;
        $[18] = t7;
        $[19] = t8;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[var(--text-muted)] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9 5l7 7-7 7"
                }, void 0, false, {
                    fileName: "[project]/app/components/PlayerCard.tsx",
                    lineNumber: 92,
                    columnNumber: 200
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/PlayerCard.tsx",
                lineNumber: 92,
                columnNumber: 121
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 92,
            columnNumber: 11
        }, this);
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    let t11;
    if ($[22] !== t4 || $[23] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "player-card group cursor-pointer",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    t4,
                    t9,
                    t10
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PlayerCard.tsx",
                lineNumber: 99,
                columnNumber: 61
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/PlayerCard.tsx",
            lineNumber: 99,
            columnNumber: 11
        }, this);
        $[22] = t4;
        $[23] = t9;
        $[24] = t11;
    } else {
        t11 = $[24];
    }
    return t11;
}
_c = PlayerCard;
var _c;
__turbopack_context__.k.register(_c, "PlayerCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/sportmonks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLeagueStandings",
    ()=>getLeagueStandings,
    "getNextMatch",
    ()=>getNextMatch,
    "getRealMadridFixtures",
    ()=>getRealMadridFixtures
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Sportmonks API Service
// Documentation: https://docs.sportmonks.com/football/
const API_KEY = ("TURBOPACK compile-time value", "gETNf0PFWzIXG23ieB6GVwKHQmrdQJuTRwL6npYI3v6BQhknYLm83GfwkdUv");
const BASE_URL = ("TURBOPACK compile-time value", "https://api.sportmonks.com/v3") || 'https://api.sportmonks.com/v3';
const REAL_MADRID_ID = 53; // Real Madrid team ID in Sportmonks
async function getRealMadridFixtures(status = 'upcoming', limit = 10) {
    try {
        const endpoint = status === 'finished' ? `football/fixtures?api_token=${API_KEY}&include=participants;scores;league;venue;state&filter[fixture_states]=5,12` // Finished states
         : `football/fixtures?api_token=${API_KEY}&include=participants;scores;league;venue;state&filter[fixture_states]=1,2,10,11`; // Upcoming states
        const response = await fetch(`${BASE_URL}/${endpoint}&filter[team_id]=${REAL_MADRID_ID}&per_page=${limit}`, {
            headers: {
                'Accept': 'application/json'
            },
            next: {
                revalidate: 3600
            } // Cache for 1 hour
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        if (!data.data || !Array.isArray(data.data)) {
            console.warn('No fixtures data returned from API');
            return [];
        }
        return formatFixtures(data.data);
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        return [];
    }
}
async function getNextMatch() {
    try {
        const fixtures = await getRealMadridFixtures('upcoming', 1);
        return fixtures[0] || null;
    } catch (error) {
        console.error('Error fetching next match:', error);
        return null;
    }
}
/**
 * Format raw API data into usable match objects
 */ function formatFixtures(fixtures) {
    return fixtures.map((fixture)=>{
        const participants = fixture.participants || [];
        const homeTeam = participants.find((p)=>p.location === 'home');
        const awayTeam = participants.find((p)=>p.location === 'away');
        // Determine if Real Madrid is playing at home
        const isHome = homeTeam?.id === REAL_MADRID_ID;
        // Get scores if available
        const homeScore = fixture.scores?.find((s)=>s.participant_id === homeTeam?.id)?.score.goals ?? null;
        const awayScore = fixture.scores?.find((s)=>s.participant_id === awayTeam?.id)?.score.goals ?? null;
        // Format date
        const matchDate = new Date(fixture.starting_at);
        const dateStr = matchDate.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
        const timeStr = matchDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
        // Get match status
        const state = fixture.state;
        const isCompleted = state?.id === 5 || state?.id === 12; // Finished states
        return {
            id: fixture.id,
            homeTeam: homeTeam?.name || 'TBD',
            awayTeam: awayTeam?.name || 'TBD',
            homeScore,
            awayScore,
            date: dateStr,
            time: timeStr,
            venue: fixture.venue?.name || 'TBD',
            league: fixture.league?.name || 'Unknown League',
            leagueShortCode: fixture.league?.short_code || '',
            status: state?.name || 'Scheduled',
            isHome,
            isCompleted
        };
    });
}
async function getLeagueStandings(seasonId = 21646) {
    try {
        const response = await fetch(`${BASE_URL}/football/standings/season/${seasonId}?api_token=${API_KEY}&include=participant;league`, {
            headers: {
                'Accept': 'application/json'
            },
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching standings:', error);
        return [];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/FixturesList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FixturesList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$sportmonks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/sportmonks.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function FixturesList() {
    _s();
    const [fixtures, setFixtures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('upcoming');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FixturesList.useEffect": ()=>{
            async function loadFixtures() {
                try {
                    setLoading(true);
                    setError(null);
                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$sportmonks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRealMadridFixtures"])(activeTab, 5);
                    setFixtures(data);
                } catch (err) {
                    setError('Failed to load fixtures. Please try again later.');
                    console.error(err);
                } finally{
                    setLoading(false);
                }
            }
            loadFixtures();
        }
    }["FixturesList.useEffect"], [
        activeTab
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 text-[var(--text-muted)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-6 h-6 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/app/components/FixturesList.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    "Loading fixtures..."
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FixturesList.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/FixturesList.tsx",
            lineNumber: 27,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FixturesList.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FixturesList.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FixturesList.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/FixturesList.tsx",
            lineNumber: 35,
            columnNumber: 12
        }, this);
    }
    if (fixtures.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8 text-[var(--text-muted)]",
            children: [
                "No ",
                activeTab,
                " fixtures found."
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/FixturesList.tsx",
            lineNumber: 45,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('upcoming'),
                        className: `px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'upcoming' ? 'bg-[#d4af37] text-[#1a0f2e]' : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[#d4af37]'}`,
                        children: "Upcoming"
                    }, void 0, false, {
                        fileName: "[project]/app/components/FixturesList.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('finished'),
                        className: `px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'finished' ? 'bg-[#d4af37] text-[#1a0f2e]' : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[#d4af37]'}`,
                        children: "Results"
                    }, void 0, false, {
                        fileName: "[project]/app/components/FixturesList.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FixturesList.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 max-w-3xl mx-auto",
                children: fixtures.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-royal group cursor-pointer hover:border-[#d4af37]/50 transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "trophy-badge text-xs",
                                        children: match.leagueShortCode || match.league
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FixturesList.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this),
                                    match.isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-green-500 font-medium",
                                        children: "FT"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FixturesList.tsx",
                                        lineNumber: 68,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/FixturesList.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex-1 text-right ${!match.isHome ? 'opacity-70' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `font-display font-bold ${!match.isHome ? 'text-[var(--foreground)]' : 'text-[#d4af37]'}`,
                                            children: match.homeTeam
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/FixturesList.tsx",
                                            lineNumber: 77,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FixturesList.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0 px-6 py-3 bg-[var(--background)] rounded-lg border border-[var(--border)]",
                                        children: match.isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-display text-2xl font-bold text-[#d4af37]",
                                            children: [
                                                match.homeScore,
                                                " - ",
                                                match.awayScore
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/FixturesList.tsx",
                                            lineNumber: 84,
                                            columnNumber: 38
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-display text-xl font-bold text-[#d4af37]",
                                                    children: match.time
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/FixturesList.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-[var(--text-muted)]",
                                                    children: match.date
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/FixturesList.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/FixturesList.tsx",
                                            lineNumber: 86,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FixturesList.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex-1 text-left ${match.isHome ? 'opacity-70' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `font-display font-bold ${match.isHome ? 'text-[var(--foreground)]' : 'text-[#d4af37]'}`,
                                            children: match.awayTeam
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/FixturesList.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FixturesList.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/FixturesList.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[var(--border)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-sm text-[var(--text-muted)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/FixturesList.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/FixturesList.tsx",
                                                lineNumber: 107,
                                                columnNumber: 17
                                            }, this),
                                            match.venue
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/FixturesList.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this),
                                    !match.isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-sm text-[var(--text-muted)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/FixturesList.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/FixturesList.tsx",
                                                lineNumber: 113,
                                                columnNumber: 19
                                            }, this),
                                            match.date
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/FixturesList.tsx",
                                        lineNumber: 112,
                                        columnNumber: 38
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/FixturesList.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        ]
                    }, match.id, true, {
                        fileName: "[project]/app/components/FixturesList.tsx",
                        lineNumber: 62,
                        columnNumber: 32
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/FixturesList.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://www.realmadrid.com/en/football/schedule",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn-secondary inline-flex items-center gap-2",
                    children: [
                        "View Full Schedule",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            }, void 0, false, {
                                fileName: "[project]/app/components/FixturesList.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/FixturesList.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/FixturesList.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/FixturesList.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FixturesList.tsx",
        lineNumber: 49,
        columnNumber: 10
    }, this);
}
_s(FixturesList, "YESB+VXncBeAtCAKlwuM53R3KrM=");
_c = FixturesList;
var _c;
__turbopack_context__.k.register(_c, "FixturesList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/NextMatchHighlight.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NextMatchHighlight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$sportmonks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/sportmonks.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function NextMatchHighlight() {
    _s();
    const [nextMatch, setNextMatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NextMatchHighlight.useEffect": ()=>{
            async function loadNextMatch() {
                try {
                    const match = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$sportmonks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNextMatch"])();
                    setNextMatch(match);
                } catch (error) {
                    console.error('Error loading next match:', error);
                } finally{
                    setLoading(false);
                }
            }
            loadNextMatch();
        }
    }["NextMatchHighlight.useEffect"], []);
    // Countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NextMatchHighlight.useEffect": ()=>{
            if (!nextMatch) return;
            const timer = setInterval({
                "NextMatchHighlight.useEffect.timer": ()=>{
                    const now = new Date().getTime();
                    const matchDate = new Date(`${nextMatch.date} ${nextMatch.time}`).getTime();
                    const distance = matchDate - now;
                    if (distance < 0) {
                        setCountdown('Match Started!');
                        return;
                    }
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                    const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
                    setCountdown(`${days}d ${hours}h ${minutes}m`);
                }
            }["NextMatchHighlight.useEffect.timer"], 60000); // Update every minute
            // Initial call
            const now_0 = new Date().getTime();
            const matchDate_0 = new Date(`${nextMatch.date} ${nextMatch.time}`).getTime();
            const distance_0 = matchDate_0 - now_0;
            if (distance_0 > 0) {
                const days_0 = Math.floor(distance_0 / (1000 * 60 * 60 * 24));
                const hours_0 = Math.floor(distance_0 % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                const minutes_0 = Math.floor(distance_0 % (1000 * 60 * 60) / (1000 * 60));
                setCountdown(`${days_0}d ${hours_0}h ${minutes_0}m`);
            }
            return ({
                "NextMatchHighlight.useEffect": ()=>clearInterval(timer)
            })["NextMatchHighlight.useEffect"];
        }
    }["NextMatchHighlight.useEffect"], [
        nextMatch
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#1a0f2e]/60 backdrop-blur-md rounded-xl p-6 border border-[#d4af37]/30",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 text-[#d4af37]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    "Loading next match..."
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/NextMatchHighlight.tsx",
            lineNumber: 53,
            columnNumber: 12
        }, this);
    }
    if (!nextMatch) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-br from-[#2d1b4e]/80 to-[#1a0f2e]/80 backdrop-blur-md rounded-xl p-6 border border-[#d4af37]/30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold uppercase tracking-wider text-[#d4af37]",
                        children: "Next Match"
                    }, void 0, false, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-[var(--text-muted)]",
                        children: nextMatch.league
                    }, void 0, false, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 text-center ${!nextMatch.isHome ? 'opacity-70' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `font-display text-sm font-bold ${!nextMatch.isHome ? 'text-[var(--foreground)]' : 'text-[#d4af37]'}`,
                                children: nextMatch.homeTeam
                            }, void 0, false, {
                                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[var(--text-muted)]",
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-2 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-display text-xl font-bold text-[#d4af37]",
                            children: "VS"
                        }, void 0, false, {
                            fileName: "[project]/app/components/NextMatchHighlight.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 text-center ${nextMatch.isHome ? 'opacity-70' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `font-display text-sm font-bold ${nextMatch.isHome ? 'text-[var(--foreground)]' : 'text-[#d4af37]'}`,
                                children: nextMatch.awayTeam
                            }, void 0, false, {
                                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[var(--text-muted)]",
                                children: "Away"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-6 text-sm text-[var(--text-muted)] mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NextMatchHighlight.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            nextMatch.date
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NextMatchHighlight.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            nextMatch.time
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-xs text-[var(--text-muted)] mb-4",
                children: [
                    "📍 ",
                    nextMatch.venue
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            countdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center pt-4 border-t border-[#d4af37]/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1",
                        children: "Kick-off in"
                    }, void 0, false, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-display text-2xl font-bold text-[#d4af37]",
                        children: countdown
                    }, void 0, false, {
                        fileName: "[project]/app/components/NextMatchHighlight.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NextMatchHighlight.tsx",
                lineNumber: 116,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/NextMatchHighlight.tsx",
        lineNumber: 63,
        columnNumber: 10
    }, this);
}
_s(NextMatchHighlight, "KD2W3jSYqo/eTOq9jSLLQxKl8gI=");
_c = NextMatchHighlight;
var _c;
__turbopack_context__.k.register(_c, "NextMatchHighlight");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PlayerCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PlayerCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FixturesList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/FixturesList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NextMatchHighlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/NextMatchHighlight.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$players$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/players.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/CartContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// Product data
const products = [
    {
        id: "home-jersey-2024-25",
        name: "Home Jersey 2024/25",
        description: "Classic white home kit",
        price: 89.99,
        image: "/images/home jersey photo.webp",
        category: "Kit"
    },
    {
        id: "official-scarf",
        name: "Official Scarf",
        description: "White & gold scarf",
        price: 24.99,
        image: "/images/scarf photo.avif",
        category: "Accessories"
    },
    {
        id: "club-mug",
        name: "Club Mug",
        description: "Ceramic mug with crest",
        price: 14.99,
        image: "/images/mug photo.jpg",
        category: "Accessories"
    }
];
function Home() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(35);
    if ($[0] !== "2b0607e52aa8023ebc703ded844b37976d91d7a3fb078a0a8f9f73251acd38e4") {
        for(let $i = 0; $i < 35; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2b0607e52aa8023ebc703ded844b37976d91d7a3fb078a0a8f9f73251acd38e4";
    }
    const featuredPlayers = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$players$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["players"].slice(0, 6);
    const { addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    let t0;
    if ($[1] !== addToCart) {
        t0 = ({
            "Home[handleAddToCart]": (product)=>{
                addToCart(product);
            }
        })["Home[handleAddToCart]"];
        $[1] = addToCart;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const handleAddToCart = t0;
    const t1 = "min-h-screen flex flex-col items-center justify-start bg-main text-foreground";
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full bg-gradient-to-r from-[#2d1b4e] via-[#1a0f2e] to-[#2d1b4e] py-4 border-y border-[#d4af37]/30",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-6 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-6 h-6 text-[#d4af37]",
                            fill: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 61,
                                columnNumber: 309
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 61,
                            columnNumber: 229
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "page-header-text",
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 61,
                            columnNumber: 383
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 61,
                            columnNumber: 429
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 61,
                    columnNumber: 200
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 61,
                columnNumber: 127
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 61,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full mb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 68,
                    columnNumber: 129
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[#d4af37] text-sm font-medium uppercase tracking-wider",
                    children: "Official Fan Hub"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 68,
                    columnNumber: 197
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-display text-5xl md:text-7xl font-bold mb-6 text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gradient-gold",
                    children: "Hala"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 75,
                    columnNumber: 86
                }, this),
                " Madrid!"
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 75,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-lg md:text-xl mb-8 text-white/70 max-w-xl",
            children: [
                "Your premier destination for the latest news, fixtures, and exclusive content for the",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[#d4af37] font-semibold",
                    children: " Real Madrid"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 82,
                    columnNumber: 157
                }, this),
                " family."
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 text-center md:text-left",
            children: [
                t3,
                t4,
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/squad",
                            className: "btn-primary w-full sm:w-auto",
                            children: "Meet The Squad"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 89,
                            columnNumber: 165
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#fixtures",
                            className: "btn-secondary w-full sm:w-auto",
                            children: "View Fixtures"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 89,
                            columnNumber: 241
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 89,
                    columnNumber: 71
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "hero-section w-full py-20 md:py-32 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-6 relative z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row items-center gap-12",
                        children: [
                            t6,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 w-full max-w-md",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NextMatchHighlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 236
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 96,
                                columnNumber: 196
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 96,
                        columnNumber: 129
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 96,
                    columnNumber: 75
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 96,
                    columnNumber: 276
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 96,
            columnNumber: 10
        }, this);
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "section-title",
            children: "About The Club"
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 103,
            columnNumber: 10
        }, this);
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    let t9;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mb-12",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[var(--text-muted)] max-w-2xl mx-auto mt-8",
                    children: [
                        "Welcome to Madridista Zone – your premier destination for all things",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[#d4af37] font-semibold",
                            children: " Real Madrid"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 110,
                            columnNumber: 180
                        }, this),
                        ". We deliver the latest news, match info and merchandise for supporters worldwide."
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 110,
                    columnNumber: 49
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 110,
            columnNumber: 10
        }, this);
        $[10] = t9;
    } else {
        t9 = $[10];
    }
    let t10;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 mb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 rounded-lg bg-gradient-to-br from-[#2d1b4e] to-[#4a306d] flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-6 h-6 text-[#d4af37]",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 117,
                            columnNumber: 268
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 117,
                        columnNumber: 174
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 117,
                    columnNumber: 57
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "font-display text-xl font-bold text-[var(--foreground)]",
                    children: "Club Facts"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 117,
                    columnNumber: 411
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 117,
            columnNumber: 11
        }, this);
        $[11] = t10;
    } else {
        t10 = $[11];
    }
    let t11;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card-royal",
            children: [
                t10,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-4",
                    children: [
                        {
                            label: "Founded",
                            value: "1902"
                        },
                        {
                            label: "Stadium",
                            value: "Santiago Bernab\xE9u"
                        },
                        {
                            label: "League",
                            value: "La Liga"
                        },
                        {
                            label: "Colors",
                            value: "White & Gold"
                        }
                    ].map(_HomeAnonymous)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 124,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[12] = t11;
    } else {
        t11 = $[12];
    }
    let t12;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 mb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#e8c547] flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-6 h-6 text-[#1a0f2e]",
                        fill: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M5 3h14v2H5V3zm0 16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3H5v3zm14-8h-2V7h-2v4H9V7H7v4H5v2h2v4h2v-4h6v4h2v-4h2v-2z"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 143,
                            columnNumber: 254
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 143,
                        columnNumber: 174
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 143,
                    columnNumber: 57
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "font-display text-xl font-bold text-[var(--foreground)]",
                    children: "Major Trophies"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 143,
                    columnNumber: 389
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 143,
            columnNumber: 11
        }, this);
        $[13] = t12;
    } else {
        t12 = $[13];
    }
    let t13;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "about",
            className: "w-full py-20 bg-[var(--background)]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-6",
                children: [
                    t9,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                        children: [
                            t11,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-royal",
                                children: [
                                    t12,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-4",
                                        children: [
                                            {
                                                count: "15",
                                                trophy: "Champions League"
                                            },
                                            {
                                                count: "35",
                                                trophy: "La Liga Titles"
                                            },
                                            {
                                                count: "20",
                                                trophy: "Copa del Rey"
                                            },
                                            {
                                                count: "5",
                                                trophy: "FIFA Club World Cup"
                                            }
                                        ].map(_HomeAnonymous2)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 216
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 150,
                                columnNumber: 183
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 150,
                        columnNumber: 123
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 150,
                columnNumber: 79
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 150,
            columnNumber: 11
        }, this);
        $[14] = t13;
    } else {
        t13 = $[14];
    }
    const t14 = "squad";
    const t15 = "w-full py-20 bg-gradient-to-b from-[var(--background)] to-[var(--surface)]";
    const t16 = "max-w-6xl mx-auto px-6";
    let t17;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mb-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "section-title",
                    children: "Featured Players"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 172,
                    columnNumber: 46
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[var(--text-muted)] mt-8 max-w-xl mx-auto",
                    children: "Meet the stars of our first team. Click on any player to view their full profile."
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 172,
                    columnNumber: 97
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[15] = t17;
    } else {
        t17 = $[15];
    }
    const t18 = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    const t19 = featuredPlayers.map(_HomeFeaturedPlayersMap);
    let t20;
    if ($[16] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t18,
            children: t19
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 181,
            columnNumber: 11
        }, this);
        $[16] = t19;
        $[17] = t20;
    } else {
        t20 = $[17];
    }
    let t21;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mt-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/squad",
                className: "btn-secondary",
                children: "View Full Squad →"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 189,
                columnNumber: 46
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 189,
            columnNumber: 11
        }, this);
        $[18] = t21;
    } else {
        t21 = $[18];
    }
    let t22;
    if ($[19] !== t17 || $[20] !== t20) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: t14,
            className: t15,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t16,
                children: [
                    t17,
                    t20,
                    t21
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 196,
                columnNumber: 45
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 196,
            columnNumber: 11
        }, this);
        $[19] = t17;
        $[20] = t20;
        $[21] = t22;
    } else {
        t22 = $[21];
    }
    let t23;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "fixtures",
            className: "w-full py-20 bg-[var(--surface)]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "section-title",
                                children: "Fixtures & Results"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 205,
                                columnNumber: 154
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[var(--text-muted)] mt-8",
                                children: "Live data from Sportmonks API"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 205,
                                columnNumber: 211
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 205,
                        columnNumber: 119
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FixturesList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 205,
                        columnNumber: 295
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 205,
                columnNumber: 79
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[22] = t23;
    } else {
        t23 = $[22];
    }
    let t24;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mb-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "section-title",
                    children: "Official Merchandise"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 212,
                    columnNumber: 46
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[var(--text-muted)] mt-8",
                    children: "Show your colors with official Real Madrid gear"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 212,
                    columnNumber: 101
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 212,
            columnNumber: 11
        }, this);
        $[23] = t24;
    } else {
        t24 = $[23];
    }
    let t25;
    if ($[24] !== handleAddToCart) {
        t25 = products.map({
            "Home[products.map()]": (product_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card-royal text-center group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-[var(--rm-gray-light)] dark:bg-[var(--rm-purple)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: product_0.image,
                                alt: product_0.name,
                                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 220,
                                columnNumber: 229
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 220,
                            columnNumber: 109
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "font-display text-lg font-bold text-[var(--foreground)] mb-1",
                            children: product_0.name
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 220,
                            columnNumber: 380
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-[var(--text-muted)] mb-3",
                            children: product_0.description
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 220,
                            columnNumber: 478
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-display text-xl font-bold text-[#d4af37]",
                                    children: [
                                        "£",
                                        product_0.price.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 220,
                                    columnNumber: 614
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "Home[products.map() > <button>.onClick]": ()=>handleAddToCart(product_0)
                                    }["Home[products.map() > <button>.onClick]"],
                                    className: "btn-primary text-xs py-2 px-4",
                                    children: "Add to Cart"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 220,
                                    columnNumber: 714
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 220,
                            columnNumber: 558
                        }, this)
                    ]
                }, product_0.id, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 220,
                    columnNumber: 44
                }, this)
        }["Home[products.map()]"]);
        $[24] = handleAddToCart;
        $[25] = t25;
    } else {
        t25 = $[25];
    }
    let t26;
    if ($[26] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "merch",
            className: "w-full py-20 bg-gradient-to-b from-[var(--surface)] to-[var(--background)]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-6",
                children: [
                    t24,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-3 gap-8",
                        children: t25
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 231,
                        columnNumber: 163
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 231,
                columnNumber: 118
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        $[26] = t25;
        $[27] = t26;
    } else {
        t26 = $[27];
    }
    let t27;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "w-full py-12 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-4 mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 100 100",
                                className: "w-full h-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M50 5 L60 25 L75 15 L70 35 L90 30 L80 50 L95 70 L70 65 L75 90 L50 80 L25 90 L30 65 L5 70 L20 50 L10 30 L30 35 L25 15 L40 25 Z",
                                        fill: "#d4af37"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 237
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "45",
                                        y: "30",
                                        width: "10",
                                        height: "25",
                                        fill: "white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 390
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "37",
                                        y: "38",
                                        width: "26",
                                        height: "10",
                                        fill: "white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 448
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 239,
                                columnNumber: 184
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 239,
                            columnNumber: 157
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 239,
                        columnNumber: 96
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-display text-2xl text-[#d4af37] mb-2",
                        children: "Hala Madrid y nada más!"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 239,
                        columnNumber: 524
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/60 text-sm",
                        children: "Made with passion at APT Coding Camp"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 239,
                        columnNumber: 608
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gold-line max-w-xs mx-auto mt-6"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 239,
                        columnNumber: 685
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 239,
                columnNumber: 56
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 239,
            columnNumber: 11
        }, this);
        $[28] = t27;
    } else {
        t27 = $[28];
    }
    let t28;
    if ($[29] !== t13 || $[30] !== t2 || $[31] !== t22 || $[32] !== t26 || $[33] !== t7) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: t1,
            children: [
                t2,
                t7,
                t13,
                t22,
                t23,
                t26,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 246,
            columnNumber: 11
        }, this);
        $[29] = t13;
        $[30] = t2;
        $[31] = t22;
        $[32] = t26;
        $[33] = t7;
        $[34] = t28;
    } else {
        t28 = $[34];
    }
    return t28;
}
_s(Home, "nl1GTXZ5w6qFMt4L7GEMTgZvsmk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = Home;
function _HomeFeaturedPlayersMap(player) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PlayerCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        player: player
    }, player.slug, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 259,
        columnNumber: 10
    }, this);
}
function _HomeAnonymous2(item) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex items-center gap-4 py-2 border-b border-[var(--border)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "trophy-badge",
                children: [
                    item.count,
                    "x"
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 262,
                columnNumber: 105
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[var(--foreground)]",
                children: item.trophy
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 262,
                columnNumber: 156
            }, this)
        ]
    }, item.trophy, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 262,
        columnNumber: 10
    }, this);
}
function _HomeAnonymous(fact) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex justify-between items-center py-2 border-b border-[var(--border)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[var(--text-muted)]",
                children: fact.label
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 265,
                columnNumber: 114
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold text-[var(--foreground)]",
                children: fact.value
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 265,
                columnNumber: 176
            }, this)
        ]
    }, fact.label, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 265,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_c34038dc._.js.map