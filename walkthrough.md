# Walkthrough — Trending Mega Menu → Popular Now: "View All Forecasts" Destination

## Summary
Wired the `"View All Forecasts"` button in [`NewsPOCTrendingHome.tsx`](file:///c:/Users/ASUS/Downloads/IGENews/components/news-poc/NewsPOCTrendingHome.tsx) to launch the dedicated, enterprise-grade **Full News Discovery Page** in [`NewsPOCFullDiscoveryView.tsx`](file:///c:/Users/ASUS/Downloads/IGENews/components/news-poc/NewsPOCFullDiscoveryView.tsx) preserving full context from Trending / Popular Now.

---

## 🛠️ Key Implementation Highlights

1. **`components/news-poc/NewsPOCTrendingHome.tsx`**:
   - Integrated `NewsPOCFullDiscoveryView`.
   - Connected `"VIEW ALL FORECASTS"` action under the *Popular Now* section to dynamically switch into the Full Discovery experience.
   - Preserves source context:
     - **Breadcrumb**: `Home → Trending → Popular Now → Forecasts & Discovery`
     - **Badge**: `TRENDING FORECASTS • FULL DISCOVERY`
     - **H1**: `Trending Market Forecasts & Strategic Discovery`
     - **Subtext**: `Explore multi-sector market forecasts, macroeconomic sentiment trends, policy projections, and strategic trade forecasts across 50 global industry sectors.`
     - **Back Navigation**: Seamlessly restores the Trending view state.

2. **`components/news-poc/NewsPOCFullDiscoveryView.tsx`**:
   - Dedicated, production-ready Full News Discovery architecture with search, taxonomy categories, featured hero stories, multi-variant cards (Standard, Premium, Sponsored), batch pagination with loading skeletons, trending/most read leaderboards, alerts, newsletter, and cross-sector exploration.

---

## 🛡️ Strict Isolation & Quality Verification
- **Target Files Modified**: [`components/news-poc/NewsPOCTrendingHome.tsx`](file:///c:/Users/ASUS/Downloads/IGENews/components/news-poc/NewsPOCTrendingHome.tsx) and [`components/news-poc/NewsPOCFullDiscoveryView.tsx`](file:///c:/Users/ASUS/Downloads/IGENews/components/news-poc/NewsPOCFullDiscoveryView.tsx).
- **Strict Scope Isolation**: All other Mega Menus, submenus, global headers/footers, and database models remain untouched.
- **TypeScript Compilation**: Clean validation with `0` errors (exit code `0`).
