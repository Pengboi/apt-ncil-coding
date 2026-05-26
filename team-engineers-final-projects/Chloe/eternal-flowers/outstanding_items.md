# Outstanding Items — Eternal Flowers Demo

## HIGH PRIORITY (Must-fix before demo)

### 1. Custom Order Form Does Nothing
- **File:** `app/page.tsx:467`
- **Issue:** `onSubmit={(e) => e.preventDefault()}` — no actual submission logic, no success/error feedback
- **Fix:** Add form state management, validation, and success confirmation UI

### 2. Newsletter Form Does Nothing
- **File:** `app/page.tsx:662-671`
- **Issue:** No `onSubmit` handler — emails are never captured or acknowledged
- **Fix:** Add state, validation, and success message

### 3. Payment Placeholder Screams "Not Ready"
- **File:** `app/components/CheckoutModal.tsx:611-627`
- **Issue:** Dashed border box says "Payment Integration Coming Soon" and "This is a demo checkout"
- **Fix:** Replace with polished demo-friendly UI (simulate payment with card fields, remove "coming soon" language)

### 4. Footer Links All Dead (`href="#"`)
- **File:** `app/page.tsx:694-708`
- **Issue:** Shop and Help section links go nowhere
- **Fix:** Point "Birthday Collection", "Valentine's Day", "Flower Purses", "Custom Orders" to `#collections`/`#shop`/`#custom` anchors; Help links to `#about` or a mailto link

### 5. Search Button Does Nothing
- **File:** `app/components/Navbar.tsx:64`
- **Issue:** Dead search icon button with no functionality
- **Fix:** Remove for demo (no search feature exists), or add scroll-to-shop behavior

---

## MEDIUM PRIORITY (Should-fix for polish)

### 6. CartItem Type Duplicated 3x
- **Files:** `app/page.tsx:13-18`, `app/components/ShoppingCart.tsx:7-12`, `app/components/CheckoutModal.tsx:7-12`
- **Issue:** Same interface defined three times with slight inconsistencies (required vs optional fields)
- **Fix:** Extract to shared `app/types.ts` and import everywhere

### 7. Input Error Border Styling Bug
- **File:** `app/components/CheckoutModal.tsx` + `app/globals.css:345-360`
- **Issue:** `.input-field` sets `border: none; border-bottom: ...` but error class adds `border-[var(--burgundy)]` which adds borders on ALL sides, not just bottom
- **Fix:** Change error styling to use `border-b-[var(--burgundy)]` or `border-bottom-color`

### 8. Empty / Broken Asset Files
- `public/images/logo.png` — **0 bytes** (empty file)
- `public/images/placeholder-1.svg` — Contains "Snake Game" text (wrong project)
- **Fix:** Delete both files; they're not referenced in code

### 9. Unused Default Assets (bloat)
- `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — Leftover from `create-next-app`
- `public/images/9741ade04969467cb4a52783dbddaba8.MOV` (4.6 MB) — Unused video
- `public/images/a83b81bf-33ea-4605-8f2c-4b6105972c6a.MP4` (2.2 MB) — Unused video
- `website-check.png` at project root
- **Fix:** Delete all unused assets

### 10. No Open Graph / Social Sharing Meta Tags
- **File:** `app/layout.tsx`
- **Issue:** Missing `og:title`, `og:description`, `og:image`, `twitter:card` etc.
- **Fix:** Add Open Graph metadata for professional sharing

### 11. Placeholder Phone Number
- **File:** `app/page.tsx:724`
- **Issue:** `+44 (0) 123 456 7890` is clearly fake
- **Fix:** Replace with actual business number or remove phone section for demo

---

## LOW PRIORITY (Nice-to-have)

### 12. Unused `heroImages` Export
- **File:** `app/data/products.ts:140-144`
- **Fix:** Remove or integrate into hero section

### 13. Case-Sensitive Image Extension
- `public/images/home-page-image.JPG` — Uppercase `.JPG` can break on Linux servers
- **Fix:** Rename to `.jpg` and update references

### 14. `next start` Won't Work with Static Export
- **Issue:** `output: 'export'` builds static files to `dist/`, but `next start` expects Node server
- **Fix:** Document proper serve command (e.g., `npx serve dist`)

### 15. Scroll Animation Flash
- **File:** `app/globals.css:146`
- **Issue:** `animate-fade-in-up` uses `forwards` fill mode but doesn't set `opacity: 0` as initial state, causing content flash on slow connections
- **Fix:** Set initial opacity on elements using this class
