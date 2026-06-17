# MISSION: Mobile-First UX Overhaul for Graphs.jsx
**Role:** Expert Frontend React Developer & UX/UI Specialist
**Target File:** `frontend/src/components/Graphs.jsx`

## Context
The current implementation of our Recharts-based dashboard suffers from severe layout degradation on mobile viewports (Android/iOS). The bars are stretching/compressing, negative margins are clipping labels, and the floating hover-based tooltip obscures the data itself.

## Objective
Refactor `Graphs.jsx` to implement a premium, interactive, mobile-first design pattern. Prioritize touch-friendly interactions over mouse-hover events, utilizing horizontal swipe gestures and static detail panels.

---

## Technical Directives & Implementation Steps

### 1. Implement Horizontal Scroll Wrappers (The Swipe UI)
Do not force multiple category columns into a 100vw container.
* Create a `renderMobileScrollWrapper(children, minWidth)` helper function.
* Wrap all multi-month `<BarChart>`, `<LineChart>`, and `<AreaChart>` instances in this wrapper when `isMobile` is true.
* **Styling:** Use `overflow-x: auto`, `-webkit-overflow-scrolling: touch`, and hide the scrollbar (`scrollbar-width: none` or `::-webkit-scrollbar { display: none; }`).
* Set a minimum width (e.g., `minWidth: 600px`) so the bars maintain a healthy, readable thickness.

### 2. Deprecate Floating Tooltips for "Tap-to-Select" Bottom Cards
Floating absolute tooltips are terrible for mobile. Replace them with an anchored detail state.
* **State:** Introduce `const [activeMobileData, setActiveMobileData] = useState(null);`
* **Interaction:** Update the Recharts components to capture touch/click events on data nodes/bars. On tap, update `activeMobileData` with the payload. Disable the standard `<Tooltip>` on mobile.
* **UI Component:** Render a modern "Details Card" directly *below* the chart container.
    * **Design Language:** Use a modern glassmorphic look (e.g., `background: rgba(20, 20, 20, 0.85)`, `backdrop-filter: blur(10px)`, subtle border).
    * **Data Display:** Show the month, category, and total in a clean, grid-based layout with the category's specific color indicator (e.g., a colored dot).
    * **Empty State:** When `activeMobileData` is null, show a subtle prompt: *"বিস্তারিত দেখতে গ্রাফের যেকোনো অংশে ট্যাপ করুন"* (Tap anywhere on the graph to see details).

### 3. Recharts Layout & Margin Overhaul
Fix the clipping and aspect ratio issues permanently.
* **Remove Negative Margins:** Strip out `left: -25` or similar negative values in the `margin` prop. Use standard positive margins (e.g., `left: 5`) and rely on Recharts' auto-scaling.
* **Aspect Ratio:** Replace fixed `height={CH}` with the `<ResponsiveContainer aspect={isMobile ? 1.5 : 2.5}>` property to ensure the chart scales proportionally to the device screen.
* **Tick Styling:** Ensure Y-axis and X-axis ticks have appropriate font sizes (`fontSize: 9` or `10` on mobile) and use `angle={-45}` if text overlapping occurs on the X-axis.

### 4. Optimize Single-Month Layout (Vertical Bars)
The vertical bar layout for single-month views is correct but needs spacing adjustments.
* Ensure the `width` of the `<YAxis>` provides enough room for the Bengali category labels so they don't truncate or clip off the left edge.
* Apply rounded corners to the bars (e.g., `radius={[0, 4, 4, 0]}`).

## Rules of Engagement
1.  **Do not break desktop view:** Ensure all mobile-specific logic is strictly gated behind the `isMobile` flag. The desktop experience (hover tooltips, fixed widths) must remain intact.
2.  **No external libraries:** Stick strictly to React, Recharts, and inline styles (or your existing CSS-in-JS solution). Do not add Tailwind or external UI frameworks if they aren't already imported.
3.  **Modern Aesthetics:** Ensure transitions (like rendering the detail card) are smooth. Add `transition: all 0.3s ease` to the card appearance.