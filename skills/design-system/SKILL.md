---
name: design-system
description: >
  Professional design system with color palette rules, typography, spacing,
  multi-page architecture, service/product detail pages, navigation limits,
  no-emoji policy, section spacing, and deployment guides (Astro + Cloudflare).
  Enforces multi-page website structure with individual service/product pages.
license: MIT
---

# Design System Skill — Professional UI/UX, Spacing & Multi-Page Architecture

This skill enforces professional design standards: proper color palettes, typography, **section spacing**, **navigation limits**, **detailed service/product pages**, **zero emojis**, and multi-page website architecture. Recommended stack: **Astro** for static/content sites, deployed to **Cloudflare Pages**.

## ⚠️ MANDATORY: Multi-Page Website Rule

**NEVER create a single landing page when the user asks for a website.**

When the user requests a website (e.g., "marketing agency site", "restaurant website", "company site"), you MUST create a COMPLETE multi-page website with the following pages at minimum:

### Standard Website Pages (MANDATORY)

| Page                   | Purpose                                                  | Priority |
| ---------------------- | -------------------------------------------------------- | -------- |
| **Home**               | Hero, value proposition, key sections CTA                | Required |
| **About**              | Company story, team, mission, values                     | Required |
| **Services**           | Service LISTING page with links to detail pages          | Required |
| **Service Detail**     | Individual page per service (e.g., /services/web-design) | Required |
| **Contact**            | Contact form, map, phone, email, hours                   | Required |
| **Products/Portfolio** | Product LISTING page with links to detail pages          | Required |

### Service Pages — DETAILED (NOT Generic)

**Every service MUST have its OWN dedicated page.** The services listing page shows cards/summaries that link to individual detail pages.

```
❌ BANNED:
- /services page with all services listed but NO individual pages
- One generic /services page with short descriptions
- Services described in only 2-3 lines of text
- No pricing, process, or deliverables per service

✅ REQUIRED STRUCTURE:
/services              → Listing page (cards with image + title + excerpt + CTA)
/services/web-design   → Detail page (description, process, deliverables, pricing, FAQ, CTA)
/services/seo          → Detail page (description, process, deliverables, pricing, FAQ, CTA)
/services/social-media → Detail page (description, process, deliverables, pricing, FAQ, CTA)
```

Each service detail page MUST include:

- **Description**: 3-5 paragraphs explaining the service
- **Process**: Step-by-step (1. Discovery → 2. Design → 3. Development → 4. Launch)
- **Deliverables**: What the client receives
- **Pricing tiers** or "Starting at $X" (or CTA for custom quote)
- **FAQ section**: 3-5 common questions
- **CTA**: "Get a Quote", "Book a Consultation", "Start Your Project"
- **Testimonials or case studies** (if available)

### Product Pages — DETAILED (NOT Generic)

**Every product MUST have its OWN dedicated page.** The products listing page shows cards that link to individual detail pages.

```
❌ BANNED:
- /products page with a simple list or grid and NO detail pages
- Products described in a single card with no specs
- No pricing, features, or images per product

✅ REQUIRED STRUCTURE:
/products              → Listing page (cards with image + name + price excerpt + CTA)
/products/product-a    → Detail page (gallery, full description, specs, pricing, reviews, related)
/products/product-b    → Detail page (gallery, full description, specs, pricing, reviews, related)
```

Each product detail page MUST include:

- **Image gallery**: 3-5 product images
- **Full description**: Features, specifications, materials
- **Pricing**: Clear price display
- **CTA**: "Add to Cart", "Request Quote", "Buy Now"
- **Related products** section
- **Reviews/testimonials** (if available)

### Additional Pages (Based on Business Type)

| Business Type   | Additional Pages                                                 |
| --------------- | ---------------------------------------------------------------- |
| **Agency**      | Portfolio, Case Studies, Team, Process, Pricing                  |
| **Restaurant**  | Menu, Reservations, Gallery, Chef/Story, Private Events          |
| **E-commerce**  | Shop, Product Detail, Cart, Checkout, Account, Wishlist          |
| **SaaS**        | Features, Pricing, Docs, Blog, Changelog, Status                 |
| **Portfolio**   | Projects, About Me, Resume/CV, Testimonials, Contact             |
| **Real Estate** | Listings, Property Detail, Agents, Neighborhoods, Mortgage Calc  |
| **Healthcare**  | Services, Doctors/Team, Appointments, Patient Portal, Locations  |
| **Education**   | Programs, Courses, Faculty, Admissions, Campus Life, Calendar    |
| **Legal**       | Practice Areas, Attorneys, Testimonials, Resources, Free Consult |
| **Non-profit**  | Mission, Programs, Impact, Get Involved, Donate, Events          |

### When to Ask About Pages

Use `AskUserQuestion` to confirm the page structure:

```
AskUserQuestion({
  questions: [
    {
      question: "Which pages should the website include?",
      header: "Pages",
      options: [
        { label: "Full Site", description: "Home + About + Services + Products + Contact (recommended)" },
        { label: "Standard", description: "Home + About + Services + Contact" },
        { label: "Extended", description: "Full Site + Blog + FAQ + Portfolio + Pricing" }
      ]
    }
  ]
})
```

### Anti-Pattern: Single Landing Page

```
❌ BANNED (when user asks for "a website"):
- Creating index.html as the ONLY page
- Putting all content in one scrollable page
- Calling it a "website" when it's a single HTML file
- Sections pretending to be pages (e.g., #about, #services, #contact)

✅ REQUIRED:
- Separate route/page per section (e.g., /about, /services, /contact)
- Each page has its own layout, meta tags, and SEO optimization
- Navigation menu linking all pages
- Shared header/footer components
- Consistent design system across all pages
- INDIVIDUAL detail pages for each service and product
```

**The ONLY exception**: The user EXPLICITLY says "landing page" or "one-page site".

---

## ⚠️ MANDATORY: Zero Emoji Policy

**Professional websites do NOT use emojis. Period.**

```
❌ BANNED:
- 🚀 🎯 💡 ✨ 🏆 📱 💻 🛒 📧 📞 ✅ ❌ 🔥 ⭐ 💪 🎨 📊 🔒 🌍 emojis anywhere in the website
- Emoji as section icons
- Emoji in headings, buttons, or CTAs
- Emoji in navigation labels
- Emoji in meta titles or descriptions

✅ REQUIRED:
- Use SVG icons from icon libraries (Lucide, Heroicons, Phosphor, Tabler)
- Use CSS shapes or decorative elements for visual interest
- Use proper icon components (<svg> or icon font)
- Plain text for all headings, buttons, and labels
```

**Icon Libraries (use one, be consistent):**

| Library       | Install                             | Style               | Best For           |
| ------------- | ----------------------------------- | ------------------- | ------------------ |
| **Lucide**    | `npm install lucide-react`          | Clean, modern       | Most websites      |
| **Heroicons** | `npm install @heroicons/react`      | Bold, clear         | Dashboards, SaaS   |
| **Phosphor**  | `npm install @phosphor-icons/react` | Flexible, 6 weights | Versatile projects |
| **Tabler**    | `npm install @tabler/icons-react`   | Outlined            | Admin panels       |

---

## ⚠️ MANDATORY: Section Spacing

**Sections must NEVER touch each other. Every section needs breathing room.**

### Minimum Spacing Rules

| Element                    | Minimum Padding (top/bottom) | CSS Variable      |
| -------------------------- | ---------------------------- | ----------------- |
| **Page sections**          | `var(--space-20)` (80px)     | --section-padding |
| **Hero section**           | `var(--space-32)` (128px)    | --hero-padding    |
| **Footer top padding**     | `var(--space-32)` (128px)    | --footer-padding  |
| **Header height**          | `var(--space-16)` (64px)     | --header-height   |
| **Between content blocks** | `var(--space-12)` (48px)     | --block-gap       |
| **CTA section**            | `var(--space-20)` (80px)     | --cta-padding     |

### Section Spacing CSS

```css
:root {
  --section-padding: clamp(4rem, 8vw, 6rem); /* 64-96px */
  --hero-padding: clamp(6rem, 12vw, 10rem); /* 96-160px */
  --footer-padding: clamp(5rem, 10vw, 8rem); /* 80-128px */
  --header-height: 4rem; /* 64px */
  --block-gap: clamp(2rem, 4vw, 3rem); /* 32-48px */
}

section {
  padding-top: var(--section-padding);
  padding-bottom: var(--section-padding);
}

.hero {
  padding-top: var(--hero-padding);
  padding-bottom: var(--hero-padding);
  min-height: 70vh;
}

footer {
  padding-top: var(--footer-padding);
  padding-bottom: var(--space-12);
  margin-top: 0; /* NEVER collapse footer spacing */
}

/* Alternating sections get different backgrounds */
section:nth-of-type(even) {
  background-color: var(--color-surface);
}
section:nth-of-type(odd) {
  background-color: var(--color-bg);
}
```

### Spacing Anti-Patterns

```
❌ BANNED:
- Footer directly touching the section above (no gap)
- Sections with padding < 64px (feels cramped)
- Hero section with < 96px padding (weak visual impact)
- Using margin: 0 on major sections
- All sections same background color (no visual separation)
- Tight spacing on mobile (< 48px section padding)

✅ REQUIRED:
- Footer ALWAYS has generous top padding (128px+)
- Every section has clear visual separation (spacing + alternating bg)
- Hero takes at least 70vh with ample padding
- Mobile sections use clamp() for adaptive spacing
- CTA section before footer has its own distinct background
```

---

## ⚠️ MANDATORY: Navigation Limits

**Navigation menus must NOT be saturated. Max 7 top-level items.**

### Navigation Rules

1. **Maximum 7 items** in the main navigation bar
2. **Group related pages** under dropdown menus
3. **Use footer navigation** for secondary links (Privacy, Terms, Sitemap)
4. **Mobile**: Hamburger menu with collapsible sections
5. **NEVER put ALL pages in the main nav**

### Recommended Navigation Structure

```
MAIN NAV (5-7 items max):
  Home | About | Services ▼ | Products | Portfolio | Contact | CTA Button

DROPDOWN for Services:
  Services Overview
  ─────────────────
  Web Design
  SEO Optimization
  Social Media
  Brand Strategy

FOOTER NAV (secondary links):
  Privacy Policy | Terms of Service | Sitemap | FAQ | Careers
```

### Navigation Anti-Patterns

```
❌ BANNED:
- More than 7 items in main nav bar (cluttered, overwhelming)
- Every single page in the top nav
- No dropdown/mega-menu for grouped content
- Hamburger menu that just lists ALL links flat
- Nav items with emojis (e.g., "🏠 Home" "📧 Contact")
- Text-only nav with no visual hierarchy

✅ REQUIRED:
- Max 7 top-level items, group extras under dropdowns
- Primary CTA button (different color/style from nav links)
- Footer contains secondary links (legal, extras)
- Mobile: hamburger menu with grouped sections
- Active state on current page link
- Hover states on all nav items
```

---

## ⚠️ MANDATORY: Recommended Framework — Astro

**For static websites, marketing sites, and content-heavy sites, RECOMMEND Astro.**

### Why Astro Over Next.js for Marketing Sites

| Factor              | Astro                             | Next.js                         |
| ------------------- | --------------------------------- | ------------------------------- |
| **Default output**  | Zero JS (HTML only)               | React runtime required          |
| **Performance**     | Near-perfect Lighthouse scores    | Good, but needs optimization    |
| **Content focus**   | Built for content sites           | Built for web apps              |
| **Bundle size**     | 0KB JS by default                 | ~80KB+ React runtime            |
| **Learning curve**  | Easy (HTML + components)          | Moderate (React + SSR concepts) |
| **Multi-framework** | Use React/Vue/Svelte in islands   | React only                      |
| **SEO**             | Perfect (static HTML)             | Good (requires config)          |
| **Hosting**         | Cloudflare Pages, Vercel, Netlify | Vercel (optimized), others      |

### When to Recommend What

| Project Type              | Recommended Framework   |
| ------------------------- | ----------------------- |
| **Marketing/Agency site** | Astro + Tailwind        |
| **Restaurant/Local biz**  | Astro + Tailwind        |
| **Portfolio/Resume**      | Astro + Tailwind        |
| **Blog/Content site**     | Astro + Tailwind        |
| **Landing page**          | Astro or HTML/Tailwind  |
| **SaaS Web App**          | Next.js + React         |
| **E-commerce**            | Next.js + React         |
| **Dashboard/Admin**       | React + Vite            |
| **Mobile App**            | Flutter or React Native |

### Astro Project Setup

```bash
npm create astro@latest my-site
cd my-site
npx astro add tailwind
```

### Astro Page Structure

```
src/
├── pages/
│   ├── index.astro          # Home
│   ├── about.astro          # About
│   ├── services/
│   │   ├── index.astro      # Services listing
│   │   ├── web-design.astro # Service detail
│   │   ├── seo.astro        # Service detail
│   │   └── social-media.astro
│   ├── products/
│   │   ├── index.astro      # Products listing
│   │   └── [slug].astro     # Dynamic product detail
│   ├── contact.astro
│   ├── blog/
│   │   ├── index.astro      # Blog listing
│   │   └── [slug].astro     # Blog article
│   └── 404.astro
├── layouts/
│   └── BaseLayout.astro     # Shared HTML shell
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ServiceCard.astro
│   ├── ProductCard.astro
│   └── SEO.astro            # Reusable meta/JSON-LD
└── styles/
    └── global.css           # Design tokens
```

---

## ⚠️ MANDATORY: Cloudflare Pages Deployment

**For static/Astro sites, deploy to Cloudflare Pages (free, fast, global CDN).**

### Deployment Setup

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy (first time — creates project)
npx wrangler pages deploy dist --project-name=my-site

# Subsequent deploys
npm run build && npx wrangler pages deploy dist
```

### GitHub Auto-Deploy (Recommended)

1. Push project to GitHub
2. Go to Cloudflare Dashboard → Pages → Create a project
3. Connect GitHub repository
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `20`
5. Every push to `main` auto-deploys

### Cloudflare Pages Configuration

```toml
# wrangler.toml (optional, for advanced config)
name = "my-site"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"
```

### Custom Domain

1. Cloudflare Dashboard → Pages → Project → Custom domains
2. Add domain → Cloudflare auto-configures DNS
3. SSL automatically provisioned

### Astro Config for Cloudflare

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  adapter: undefined, // Static output for Cloudflare Pages
  integrations: [tailwind()],
  build: {
    assets: '_assets', // Cache-friendly asset naming
  },
});
```

---

## Color Palette Rules — Professional Standards

### The 6-Color Professional Palette

Every website MUST define these 6 color roles before writing a single line of CSS:

| Role           | CSS Variable        | Purpose                             | Rules                                   |
| -------------- | ------------------- | ----------------------------------- | --------------------------------------- |
| **Primary**    | `--color-primary`   | Brand identity, CTAs, links         | 1 color. Must pass WCAG AA on white.    |
| **Secondary**  | `--color-secondary` | Supporting accent, secondary CTAs   | 1 color. Harmonize with primary.        |
| **Accent**     | `--color-accent`    | Highlights, badges, attention items | 1 color. High contrast against primary. |
| **Background** | `--color-bg`        | Page background                     | Light or dark. Set body background.     |
| **Surface**    | `--color-surface`   | Cards, modals, elevated containers  | Slightly different from background.     |
| **Text**       | `--color-text`      | Body text, headings                 | Must pass 4.5:1 contrast on background. |

### Color Palette Formula

```
:root {
  /* Primary palette */
  --color-primary: #2563EB;        /* Main brand color */
  --color-primary-light: #60A5FA;  /* Hover states, backgrounds */
  --color-primary-dark: #1D4ED8;   /* Active states, emphasis */

  /* Secondary palette */
  --color-secondary: #7C3AED;      /* Supporting brand color */
  --color-secondary-light: #A78BFA;

  /* Accent */
  --color-accent: #F59E0B;         /* CTAs, highlights, badges */

  /* Backgrounds */
  --color-bg: #FFFFFF;             /* Page background */
  --color-surface: #F8FAFC;        /* Cards, containers */
  --color-surface-alt: #F1F5F9;    /* Alternating sections */

  /* Text */
  --color-text: #0F172A;           /* Primary text */
  --color-text-secondary: #475569; /* Descriptions, captions */
  --color-text-muted: #94A3B8;     /* Placeholders, disabled */

  /* Borders & Dividers */
  --color-border: #E2E8F0;
  --color-divider: #CBD5E1;

  /* Feedback */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}
```

### Industry-Specific Color Palettes

| Industry            | Primary           | Secondary        | Accent           | Background      | Style               |
| ------------------- | ----------------- | ---------------- | ---------------- | --------------- | ------------------- |
| **Tech/SaaS**       | #2563EB (Blue)    | #7C3AED (Violet) | #10B981 (Green)  | #FFFFFF         | Clean, modern       |
| **Health/Wellness** | #059669 (Emerald) | #F97316 (Warm)   | #FBBF24 (Gold)   | #FFF7ED (Warm)  | Calming, organic    |
| **Finance**         | #1E293B (Slate)   | #2563EB (Blue)   | #10B981 (Green)  | #FFFFFF         | Professional, trust |
| **Restaurant**      | #DC2626 (Red)     | #78350F (Brown)  | #FBBF24 (Gold)   | #FFFBEB (Cream) | Warm, appetizing    |
| **Creative/Agency** | #7C3AED (Violet)  | #EC4899 (Pink)   | #F59E0B (Amber)  | #0F172A (Dark)  | Bold, artistic      |
| **Education**       | #1D4ED8 (Blue)    | #059669 (Green)  | #F59E0B (Amber)  | #FFFFFF         | Trust, knowledge    |
| **Real Estate**     | #1E40AF (Navy)    | #B45309 (Gold)   | #059669 (Green)  | #FFFBEB (Cream) | Luxury, trust       |
| **Legal**           | #1E293B (Slate)   | #B45309 (Gold)   | #1D4ED8 (Blue)   | #FFFFFF         | Authority, trust    |
| **E-commerce**      | #DB2777 (Pink)    | #2563EB (Blue)   | #F59E0B (Amber)  | #FFFFFF         | Vibrant, action     |
| **Non-profit**      | #059669 (Green)   | #2563EB (Blue)   | #F97316 (Orange) | #FFFFFF         | Hope, community     |

### Color Rules (MANDATORY)

1. **Contrast ratios**: All text must meet WCAG AA — 4.5:1 for normal text, 3:1 for large text
2. **No more than 3 brand colors** — primary, secondary, accent only
3. **60-30-10 rule**: 60% neutral (background), 30% primary/secondary, 10% accent
4. **Never use pure black (#000)** — use dark slate/charcoal instead (#0F172A, #1E293B)
5. **Never use pure white text** on bright backgrounds — ensure 4.5:1 contrast
6. **Test colors with accessibility tools** — use WebAIM contrast checker
7. **Dark mode**: If supporting dark mode, define a parallel palette with inverted contrast
8. **Consistency**: The same color means the same thing everywhere (blue = links, red = errors, green = success)

### Anti-Pattern Colors

```
❌ BANNED:
- Random hex colors without a defined palette
- Different blues on different pages (inconsistent brand)
- Using opacity to "make it lighter" (unpredictable contrast)
- Text that's "close enough" in contrast (#999 on white = FAIL)
- Rainbow color schemes (more than 3 brand colors)
- Default framework colors without customization (e.g., raw Tailwind blue)
- Colors that look different on different monitors (always test)

✅ REQUIRED:
- All colors defined as CSS custom properties
- A consistent palette documented in the project's design system
- Contrast verified with tools (Lighthouse, axe, WebAIM)
- Dark mode palette defined if supporting dark mode
```

---

## Typography System

### Font Pairing Rules

1. **Maximum 2 font families**: 1 for headings + 1 for body text
2. **Contrast in pairing**: Serif + Sans-serif OR Display + Sans-serif
3. **Performance**: Use Google Fonts with `display=swap` OR self-host WOFF2
4. **Fallback stack**: Always define system font fallbacks

### Professional Font Pairings by Industry

| Industry       | Heading Font                | Body Font            | Personality      |
| -------------- | --------------------------- | -------------------- | ---------------- |
| **Tech/SaaS**  | Inter / DM Sans             | Inter / Source Sans  | Clean, technical |
| **Creative**   | Playfair Display / Sora     | Inter / Work Sans    | Bold, expressive |
| **Health**     | Nunito / Outfit             | Open Sans / Nunito   | Friendly, warm   |
| **Finance**    | Plus Jakarta Sans / Manrope | Inter / Manrope      | Professional     |
| **Restaurant** | Playfair Display / Lora     | Source Sans / Outfit | Elegant, warm    |
| **Education**  | Poppins / Nunito            | Inter / Source Sans  | Approachable     |
| **Legal**      | Merriweather / Lora         | Open Sans / Inter    | Authoritative    |
| **Luxury**     | Cormorant Garamond          | Montserrat / Karla   | Elegant, premium |
| **Startup**    | Space Grotesk / Sora        | Inter / DM Sans      | Modern, dynamic  |

### Typography Scale

```css
:root {
  /* Font families */
  --font-heading: 'Inter', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Font sizes (fluid typography) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.3vw, 0.9rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.1rem);
  --text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.4rem + 2.3vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.5rem + 3.5vw, 3.5rem);
  --text-5xl: clamp(3rem, 2rem + 5vw, 4.5rem);

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

---

## Spacing & Layout System

### 8px Base Grid

All spacing MUST be multiples of 4px, with 8px as the base unit:

```css
:root {
  --space-1: 0.25rem; /* 4px  */
  --space-2: 0.5rem; /* 8px  */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */
  --space-32: 8rem; /* 128px */
}
```

### Responsive Breakpoints

| Breakpoint | Width  | Target           |
| ---------- | ------ | ---------------- |
| `sm`       | 640px  | Mobile landscape |
| `md`       | 768px  | Tablet           |
| `lg`       | 1024px | Desktop          |
| `xl`       | 1280px | Large desktop    |
| `2xl`      | 1536px | Ultra-wide       |

### Container Widths

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}
.container-narrow {
  max-width: 768px;
}
.container-wide {
  max-width: 1440px;
}
```

---

## Page Architecture Standards

### Navigation (Shared Component)

Every page MUST have:

- **Header**: Logo + Navigation + CTA button + Mobile hamburger
- **Footer**: Contact info + Social links + Legal links + Newsletter signup
- **Responsive**: Hamburger menu on mobile, horizontal nav on desktop

### Page Layout Template

```
┌──────────────────────────────────────────────────────┐
│  HEADER: Logo | Nav Links | CTA Button               │
├──────────────────────────────────────────────────────┤
│                                                      │
│  HERO SECTION                                        │
│  - Headline + Subheadline + CTA                      │
│  - Background image/gradient/pattern                 │
│  - Breadcrumbs (except home)                         │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  MAIN CONTENT                                        │
│  - Page-specific content sections                    │
│  - Consistent spacing (--space-12 to --space-20)     │
│  - Alternating background (bg / surface-alt)         │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  CTA SECTION                                         │
│  - Final call-to-action before footer                │
│                                                      │
├──────────────────────────────────────────────────────┤
│  FOOTER: Links | Social | Contact | Legal            │
└──────────────────────────────────────────────────────┘
```

### SEO Per Page

Each page MUST have unique:

- `<title>` tag (Page Name | Brand Name)
- `<meta name="description">` (150-160 chars)
- Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Canonical URL (absolute, no trailing slash ambiguity)
- H1 heading (exactly one per page)
- **JSON-LD structured data** (see schema table below)

### Per-Page SEO Schema Requirements

Every page MUST include a `<script type="application/ld+json">` block with structured data appropriate for that page type. Use `@graph` to combine schemas.

| Page         | JSON-LD Schemas Required                                 | Additional Requirements                                  |
| ------------ | -------------------------------------------------------- | -------------------------------------------------------- |
| **Home**     | Organization + WebSite + WebPage + SearchAction          | LocalBusiness if physical location exists                |
| **About**    | WebPage + BreadcrumbList + Organization + Person[]       | Team members with jobTitle, image, sameAs (social links) |
| **Services** | WebPage + BreadcrumbList + Service[]                     | Each service: name, description, provider, areaServed    |
| **Products** | WebPage + BreadcrumbList + Product[] + ItemList          | Offer (price), AggregateRating, Review if available      |
| **Contact**  | WebPage + BreadcrumbList + ContactPage + LocalBusiness   | GeoCoordinates + OpeningHoursSpecification               |
| **Blog**     | WebPage + BreadcrumbList + CollectionPage                | Blog index with ItemList of articles                     |
| **Article**  | WebPage + BreadcrumbList + Article/BlogPosting           | Author (Person), Publisher (Organization), datePublished |
| **FAQ**      | WebPage + BreadcrumbList + FAQPage                       | Question[] → Answer[] for each FAQ item                  |
| **Pricing**  | WebPage + BreadcrumbList + SoftwareApp/Service + Offer[] | Each pricing tier as a separate Offer                    |
| **404**      | WebPage (minimal)                                        | No Organization/WebSite schema on 404 pages              |

### SEO File Requirements (Website Root)

| File          | Required | Purpose                                              |
| ------------- | -------- | ---------------------------------------------------- |
| `robots.txt`  | ✅       | Crawl directives, sitemap location, bot permissions  |
| `sitemap.xml` | ✅       | ALL indexable URLs with `<lastmod>` and `<priority>` |
| `favicon.ico` | ✅       | Browser tab icon (32x32, 16x16)                      |
| `404.html`    | ✅       | Custom 404 with navigation back to site              |
| `humans.txt`  | Optional | Team credits, technology stack                       |

### robots.txt Template

```text
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /404.html

Sitemap: https://example.com/sitemap.xml
```

### sitemap.xml Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/services</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://example.com/contact</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## Pre-Delivery Design & SEO Checklist

Before ANY website is marked complete:

### Design

- [ ] Color palette defined with all 6 roles
- [ ] Colors pass WCAG AA contrast (4.5:1)
- [ ] Typography system with 2 fonts maximum
- [ ] Spacing follows 8px grid
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] Navigation works on mobile (hamburger menu)
- [ ] All pages linked in navigation
- [ ] Consistent header/footer across ALL pages
- [ ] No `#` links (all links navigate to real pages)
- [ ] No "Coming Soon" sections
- [ ] All images have alt text
- [ ] Focus states visible for keyboard navigation
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] `cursor: pointer` on all clickable elements
- [ ] Smooth hover transitions (150-300ms)
- [ ] Light/dark mode consistent (if supported)

### SEO & Technical

- [ ] Each page has unique meta title + description
- [ ] Open Graph + Twitter Card tags on every public page
- [ ] JSON-LD structured data on every page (with `@graph`)
- [ ] BreadcrumbList on every non-home page
- [ ] Organization + WebSite schema on all pages
- [ ] Page-specific schemas (Article, Product, Service, etc.)
- [ ] `robots.txt` with sitemap reference
- [ ] `sitemap.xml` with all indexable pages
- [ ] `favicon.ico` + apple-touch-icon
- [ ] Custom 404 page with navigation
- [ ] Canonical URLs on all pages
- [ ] `<html lang="xx">` set correctly

---

## Using External UI/UX Skills

When available, leverage these skills for enhanced design intelligence:

### UI UX Pro Max (Recommended)

```bash
# Search for industry-specific design system
python3 src/ui-ux-pro-max/scripts/search.py "marketing agency" --domain product

# Search for color palettes
python3 src/ui-ux-pro-max/scripts/search.py "creative agency" --domain color

# Search for typography pairings
python3 src/ui-ux-pro-max/scripts/search.py "modern startup" --domain typography

# Search for layout patterns
python3 src/ui-ux-pro-max/scripts/search.py "saas landing" --domain landing

# Get framework-specific code
python3 src/ui-ux-pro-max/scripts/search.py "navigation" --stack react
```

### Taste Skill (Anti-Slop)

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
```

Use `design-taste-frontend` for premium layout, or `minimalist-ui` for clean aesthetic.

### Designer Skills (Comprehensive)

```
/plugin marketplace add Owl-Listener/designer-skills
```

Key commands: `/ui-design:color-palette`, `/ui-design:type-system`, `/ui-design:design-screen`
