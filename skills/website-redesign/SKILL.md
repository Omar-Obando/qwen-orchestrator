---
name: website-redesign
description: >
  Redesign existing websites by analyzing a live URL (via WebFetch) or a screenshot
  (via vision-capable models). Extracts layout, structure, colors, typography, content
  hierarchy, and SEO metadata, then produces an improved, professional redesign.
  Use this skill when the user provides a URL to replicate, a screenshot to analyze,
  or asks to "redesign", "rebuild", "improve", or "modernize" an existing website.
license: Complete terms in LICENSE.txt
---

# Website Redesign Skill

This skill enables agents to **redesign existing websites** by analyzing live URLs or screenshots. It leverages the `WebFetch` tool to scrape live pages and vision-capable models to analyze screenshots.

---

## When to Activate

Activate this skill when the user says any of:

- "Redesign this website: [URL]"
- "Rebuild [URL] with better design"
- "Make a site like [URL]"
- "Improve my website at [URL]"
- "Modernize this page: [URL]"
- Provides a screenshot of a website and asks to replicate or improve it
- "Clone this site's layout: [URL]"
- "Create something similar to [URL] but better"

---

## Site Types & Context

Different website types require different redesign approaches. Understand the **site type** first to provide appropriate improvements.

### Site Type Categories

| Type                   | Purpose                              | Key Elements                          | Redesign Focus                    |
| ---------------------- | ------------------------------------ | ------------------------------------- | --------------------------------- |
| **Business/Corporate** | Company info, services, contact      | About, services, contact, team        | Professional, trust-focused       |
| **E-commerce**         | Products, shopping cart, checkout    | Product grid, cart, checkout          | Conversion-focused, product-first |
| **Portfolio/Personal** | Showcase work, resume, contact       | Projects, skills, about               | Creative, visual-first            |
| **Blog/Content**       | Articles, news, updates              | Article grid, categories, comments    | Readable, engaging                |
| **Landing Page**       | Single goal, conversion-focused      | Hero, CTA, value props                | Minimal, direct                   |
| **Catalog**            | Product/service catalog with details | Category grid, product cards, filters | Browse-first, search-friendly     |
| **Community/Forum**    | User discussions, posts              | Thread list, replies, user profiles   | Interactive, engagement-focused   |
| **Educational**        | Courses, tutorials, resources        | Lesson grid, progress tracking        | Learning-focused, structured      |
| **SaaS/App**           | Software service, login, dashboard   | Login, dashboard, features            | User-centric, functional          |

### Catalog-Specific Redesign Guidelines

**Catalog sites** (product/service catalogs) need special attention to:

| Area                 | Best Practice                                                      |
| -------------------- | ------------------------------------------------------------------ |
| **Search & Filter**  | Advanced filters (price, category, tags), search with autocomplete |
| **Product Cards**    | Image, title, price, short description, "View Details" CTA         |
| **Category Grid**    | Icons, counts, subcategories, hierarchical navigation              |
| **Pagination**       | Load more button or numbered pagination                            |
| **Sorting**          | Price (low-high/high-low), newest, popularity, rating              |
| **Quick View**       | Modal/lightbox for product details without page load               |
| **Related Products** | "You might also like" section                                      |
| **Compare Feature**  | Compare 2-3 products side-by-side                                  |

---

## Design System Integration

When redesigning a website, you MUST analyze and preserve the original site's **design system** (color palette, typography, spacing) while applying professional improvements.

### Extract Original Design Tokens

Before redesigning, extract these design tokens from the original site:

```bash
# Step 1: Extract CSS/custom properties (BEST METHOD)
WebFetch(url="https://example.com", prompt="Extract ALL CSS custom properties (CSS variables) and color definitions from the site's styles: 1) All :root variables (e.g., --primary-color, --color-primary), 2) Any inline styles or CSS classes that define colors, 3) Color palettes used in the design system, 4) Background colors, text colors, accent colors with their hex/rgb values")

# Step 2: Extract visual colors from page content
WebFetch(url="https://example.com", prompt="Identify all visible colors in the design: 1) Background colors (header, main, footer), 2) Text colors (headings, body, links), 3) Accent colors (buttons, highlights), 4) Border colors, 5) Any brand-specific colors")

# Step 3: Extract typography and spacing
WebFetch(url="https://example.com", prompt="Extract typography and spacing system: 1) Font families and weights, 2) Font sizes (h1-h6, body), 3) Line heights, 4) Spacing tokens (padding/margin patterns), 5) Border radius values")
```

### Design Token Extraction Methods

**Method 1: CSS Custom Properties (BEST)**

```
If the site uses CSS variables (e.g., :root { --primary-color: #1a73e8; }):
- Extract ALL :root variables
- Map them to their purposes (primary, secondary, accent, etc.)
- Keep the same variable names for consistency
```

**Method 2: Inline Styles & Classes**

```
If colors are defined inline or in classes:
- Look for classes like .bg-primary, .text-secondary, .btn-accent
- Extract hex/rgb values from style attributes
- Group by purpose (background, text, border, etc.)
```

**Method 3: Visual Analysis (Fallback)**

```
If CSS extraction isn't possible:
- Analyze the visible page for color patterns
- Note dominant colors in header, main content, footer
- Identify accent colors in buttons, links, highlights
- Estimate color relationships (light/dark, warm/cool)
```

### Design Token Categories

| Category        | What to Extract                                             | Example                     |
| --------------- | ----------------------------------------------------------- | --------------------------- |
| **Colors**      | Primary, secondary, accent, background, text, border colors | `#1a73e8`, `#ffffff`        |
| **Typography**  | Font families, sizes, weights, line heights                 | `Inter`, `16px`, `400`      |
| **Spacing**     | Padding, margin, gap values                                 | `8px`, `16px`, `24px`       |
| **Borders**     | Radius, width, styles                                       | `4px`, `1px solid #ddd`     |
| **Shadows**     | Elevation levels                                            | `0 2px 4px rgba(0,0,0,0.1)` |
| **Breakpoints** | Mobile, tablet, desktop                                     | `480px`, `768px`, `1024px`  |

### Preserve Color Mood

**CRITICAL**: Preserve the **color mood** of the original site:

| Original Site                                  | What to Keep                         | What to Improve                        |
| ---------------------------------------------- | ------------------------------------ | -------------------------------------- |
| **Blue corporate** (banks, enterprises)        | Blue family (`#1a73e8` → `#1a5bb8`)  | Professional 6-color palette, contrast |
| **Green natural** (eco, health, outdoors)      | Green family (`#2e7d32` → `#1b5e20`) | Professional tones, accessibility      |
| **Orange/Red energetic** (food, entertainment) | Warm family (`#f4511e` → `#e64a19`)  | Professional balance, readability      |
| **Dark modern** (tech, SaaS, apps)             | Dark background (`#121212`)          | Contrast, text readability             |
| **Minimalist** (design, creative)              | Neutral palette                      | Professional spacing, typography       |

**Never change the color mood without asking the user!**

---

## Context-Aware Redesign

When redesigning a website, you MUST understand the **context** of the original site to provide appropriate improvements.

### Context Analysis Checklist

Before starting the redesign, analyze these context factors:

```
AskUserQuestion({
  questions: [
    {
      question: "What is the primary purpose of this website?",
      header: "Purpose",
      options: [
        { label: "Business/Corporate", description: "Company info, services, contact (professional, trust-focused)" },
        { label: "E-commerce", description: "Products, shopping cart, checkout (conversion-focused)" },
        { label: "Portfolio/Personal", description: "Showcase work, resume, contact (creative, personal)" },
        { label: "Blog/Content", description: "Articles, news, updates (readable, engaging)" },
        { label: "Landing Page", description: "Single goal, conversion-focused (minimal, direct)" },
        { label: "Other", description: "Describe the specific purpose" }
      ]
    },
    {
      question: "What industry does this business operate in?",
      header: "Industry",
      options: [
        { label: "Technology/SaaS", description: "Modern, clean, data-focused design" },
        { label: "Healthcare/Medical", description: "Trustworthy, clean, professional" },
        { label: "Finance/Banking", description: "Professional, conservative, trustworthy" },
        { label: "Food/Restaurant", description: "Appetizing, warm, inviting" },
        { label: "Real Estate", description: "Clean, spacious, image-focused" },
        { label: "E-commerce/Retail", description: "Product-focused, clear CTAs" },
        { label: "Creative/Design", description: "Bold, creative, visual-first" },
        { label: "Other", description: "Describe the industry" }
      ]
    },
    {
      question: "Who is the target audience?",
      header: "Audience",
      options: [
        { label: "Businesses (B2B)", description: "Professional, decision-makers, ROI-focused" },
        { label: "Consumers (B2C)", description: "General public, emotional appeal" },
        { label: "Developers/Technical", description: "Code-focused, documentation-heavy" },
        { label: "Creative/Artistic", description: "Visual-first, expressive" },
        { label: "General Public", description: "Broad audience, accessible design" }
      ]
    }
  ]
})
```

### Context-Based Design Guidelines

| Context                | Color Palette             | Typography                       | Layout                           | CTAs                             |
| ---------------------- | ------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| **B2B Technology**     | Professional blues/greys  | Clean sans-serif (Inter, Roboto) | Grid-based, data visualization   | "Request Demo", "Contact Sales"  |
| **Healthcare**         | Calming blues/greens      | Trustworthy serif/sans-serif     | Clean, spacious, clear hierarchy | "Book Appointment", "Learn More" |
| **Finance**            | Conservative blues/browns | Professional serif/sans-serif    | Traditional, trustworthy         | "Open Account", "Apply Now"      |
| **Food/Restaurant**    | Warm oranges/reds         | Appetizing serif/sans-serif      | Image-focused, inviting          | "Order Now", "View Menu"         |
| **E-commerce**         | Vibrant accent colors     | Clear, readable sans-serif       | Product-grid focused             | "Add to Cart", "Buy Now"         |
| **Creative Portfolio** | Bold, unique colors       | Expressive typography            | Visual-first, creative           | "View Work", "Contact"           |
| **Landing Page**       | High-contrast colors      | Direct, readable                 | Minimal, focused                 | "Get Started", "Sign Up"         |

### Industry-Specific Best Practices

Use Context7 to get industry-specific guidance:

```typescript
// B2B SaaS best practices
// Context7 query: "SaaS landing page design patterns conversion optimization"

// Healthcare website accessibility
// Context7 query: "Healthcare website accessibility WCAG compliance"

// Restaurant website food photography
// Context7 query: "Restaurant website design food photography"

// E-commerce product pages
// Context7 query: "E-commerce product page design conversion optimization"
```

---

## Redesign Workflow

### Method 1: URL-Based Redesign (WebFetch)

When the user provides a **live URL**, use the `WebFetch` tool to extract the full page structure:

```
# Step 1: Fetch the page content
WebFetch(url="https://example.com", prompt="Extract the COMPLETE website structure: 1) Page layout (header, nav, sections, footer), 2) All text content and headings, 3) Color scheme (backgrounds, text, accent colors), 4) Typography (font styles, sizes, weights), 5) All images/media references, 6) Navigation structure, 7) CTAs and buttons, 8) Contact information, 9) Social media links, 10) Overall page hierarchy and section order")

# Step 2: Fetch sub-pages for multi-page analysis
WebFetch(url="https://example.com/about", prompt="Extract complete page structure, content, layout, and design elements")
WebFetch(url="https://example.com/services", prompt="Extract complete page structure, content, layout, and design elements")
WebFetch(url="https://example.com/contact", prompt="Extract complete page structure, content, layout, and design elements")

# Step 3: Fetch CSS/design details
WebFetch(url="https://example.com", prompt="Analyze the CSS design system: 1) Color palette (all hex/rgb values), 2) Font families and sizes, 3) Spacing patterns, 4) Border radius values, 5) Shadow styles, 6) Animation/transition details, 7) Responsive breakpoint behavior")
```

#### What to Extract

| Category          | Details to Capture                                         |
| ----------------- | ---------------------------------------------------------- |
| **Layout**        | Header structure, nav items, section order, footer content |
| **Content**       | All headings (h1-h6), paragraphs, lists, CTAs              |
| **Colors**        | Primary, secondary, accent, backgrounds, text colors       |
| **Typography**    | Font families, sizes, weights, line heights                |
| **Images**        | Image URLs, alt text, sizes, placement                     |
| **Navigation**    | Menu items, dropdowns, mobile nav behavior                 |
| **SEO**           | Meta tags, Open Graph, structured data (JSON-LD)           |
| **Interactions**  | Animations, hover effects, scroll behaviors                |
| **Contact Info**  | Phone, email, address, social media, map embed             |
| **Business Data** | Services, products, pricing, team members, testimonials    |

### Method 2: Screenshot-Based Redesign (Vision Models)

When the user provides a **screenshot** (image file), and the model supports vision:

```
# Analyze the screenshot
"Analyze this website screenshot and extract: 1) Complete layout structure (grid/flex), 2) Color palette (all visible colors), 3) Typography (approximate font styles), 4) Component hierarchy, 5) Spacing patterns, 6) Visual style (modern/classic/minimal/bold), 7) Content hierarchy, 8) Navigation structure, 9) Any visible interactions, 10) Mobile vs desktop layout if visible"
```

**Vision Model Requirements:**

- The model must have vision capabilities (`"capabilities": { "vision": true }`)
- Supported models: qwen3.5-plus, Gemini, Claude with vision, GPT-4o
- In Qwen Code: paste the screenshot directly or reference the file with `@screenshot.png`
- In VS Code: paste the screenshot directly into the chat input

**If the model does NOT support vision:**

- Ask the user to also provide the URL so `WebFetch` can be used as a fallback
- Or ask the user to describe the key elements they want from the screenshot

---

## Redesign Principles

### What to IMPROVE (Never Copy Verbatim)

When redesigning, improve these areas:

| Area              | What to Fix                                                 |
| ----------------- | ----------------------------------------------------------- |
| **Layout**        | Tighter visual hierarchy, better whitespace, grid alignment |
| **Colors**        | Professional 6-color palette (see design-system skill)      |
| **Typography**    | Proper scale (clamp()), better font pairing, readable sizes |
| **Spacing**       | Minimum 80px sections, 128px footer, 8px grid system        |
| **Navigation**    | Max 7 items, dropdowns for groups, ONE CTA button           |
| **Mobile**        | Mobile-first responsive, touch targets ≥ 44px               |
| **Accessibility** | WCAG 2.1 AA, semantic HTML, ARIA, keyboard nav              |
| **Performance**   | WebP images, lazy loading, minimal JS, < 3s LCP             |
| **SEO**           | Per-page meta, JSON-LD, sitemap, robots.txt                 |
| **Icons**         | SVG icons (Lucide/Heroicons/Phosphor), ZERO emojis          |

### What to PRESERVE

| Keep Original        | Why                                                        |
| -------------------- | ---------------------------------------------------------- |
| **Business content** | Text, services, products, contact info                     |
| **Brand identity**   | Logo, brand name, tagline                                  |
| **Color mood**       | Similar tone (e.g., if original is blue, keep blue family) |
| **Page structure**   | Same pages but with detail pages added                     |
| **Contact info**     | Phone, email, address, social media                        |
| **Business data**    | Services, products, pricing, team                          |

---

## Redesign Checklist

Before starting the redesign, confirm with `AskUserQuestion`:

```
AskUserQuestion({
  questions: [
    {
      question: "What should the redesign prioritize?",
      header: "Priority",
      options: [
        { label: "Visual refresh", description: "Same structure, modern design, better colors and typography" },
        { label: "Full rebuild", description: "Completely new layout and structure, keep only the content" },
        { label: "Add features", description: "Redesign + add missing pages (blog, pricing, FAQ, etc.)" },
        { label: "Mobile-first", description: "Focus on mobile responsiveness and touch experience" }
      ]
    },
    {
      question: "What framework should the redesign use?",
      header: "Framework",
      options: [
        { label: "Astro + Tailwind", description: "Zero JS, perfect Lighthouse, best for marketing/content sites (recommended)" },
        { label: "Next.js + React", description: "SSR/SSG, best for SaaS apps and e-commerce" },
        { label: "Nuxt.js + Vue", description: "SSR/SSG, great developer experience" },
        { label: "HTML + Tailwind", description: "Simple, no build step, fast delivery" }
      ]
    },
    {
      question: "What design style for the redesign?",
      header: "Style",
      options: [
        { label: "Modern Clean", description: "Minimalist, spacious, sans-serif, premium feel" },
        { label: "Bold Dynamic", description: "Strong colors, gradients, animations, impactful" },
        { label: "Classic Elegant", description: "Serif fonts, refined spacing, timeless sophistication" },
        { label: "Playful Friendly", description: "Rounded shapes, vibrant colors, approachable" }
      ]
    }
  ]
})
```

---

## Multi-Page Redesign (MANDATORY)

When redesigning a website, you MUST create a **full multi-page site**, not just the homepage:

### Step 1: Map Original Pages

```
# Discover all pages from the original site
WebFetch(url="https://example.com/sitemap.xml", prompt="List all URLs in this sitemap")

# If no sitemap, crawl the navigation
WebFetch(url="https://example.com", prompt="List ALL navigation links and their hrefs, including footer links and any dropdown menus")
```

### Step 2: Create Redesigned Pages

| Original Page       | Redesigned Version                                                |
| ------------------- | ----------------------------------------------------------------- |
| Home                | Full hero, value proposition, services preview, testimonials, CTA |
| About               | Company story, team grid with photos, mission/values, timeline    |
| Services            | Listing + individual detail pages per service                     |
| Products            | Listing + individual detail pages per product                     |
| Contact             | Contact form, map embed, phone/email, hours, social links         |
| Blog (if exists)    | Blog listing + individual article pages with related posts        |
| FAQ (if exists)     | Accordion FAQ with search, structured data (FAQPage schema)       |
| Team (if exists)    | Team member cards with bios, roles, social links                  |
| Pricing (if exists) | Pricing table with tiers, feature comparison, FAQ                 |

### Step 3: Add Missing Pages

Many original sites are incomplete. ALWAYS add these if missing:

- **404 page** — Custom error page with navigation back
- **Privacy Policy** — Required by law in most jurisdictions
- **Terms of Service** — Required for any business site
- **robots.txt** — With sitemap reference
- **sitemap.xml** — With all pages and `<lastmod>` dates

---

## Design Analysis Report

After fetching and analyzing the original site, create a `$SESSION_DIR/redesign-analysis.md`:

```markdown
# Redesign Analysis: [Website Name]

## Original Site

- URL: [URL]
- Pages Found: [N] ([list them])
- Framework: [detected or unknown]
- Hosting: [detected or unknown]

## Current Design Issues

- [Issue 1: e.g., "No mobile responsiveness"]
- [Issue 2: e.g., "Inconsistent color palette"]
- [Issue 3: e.g., "No structured data (JSON-LD)"]
- [Issue 4: e.g., "Missing service detail pages"]
- [Issue 5: e.g., "Poor accessibility (no alt text, low contrast)"]

## Original Color Palette

| Role       | Color | Usage        |
| ---------- | ----- | ------------ |
| Primary    | [hex] | [where used] |
| Secondary  | [hex] | [where used] |
| Accent     | [hex] | [where used] |
| Background | [hex] | [where used] |
| Text       | [hex] | [where used] |

## Redesigned Color Palette

| Role       | Color | Rationale              |
| ---------- | ----- | ---------------------- |
| Primary    | [hex] | [why this color]       |
| Secondary  | [hex] | [why this color]       |
| Accent     | [hex] | [why this color]       |
| Background | [hex] | [why this color]       |
| Surface    | [hex] | [cards, modals]        |
| Text       | [hex] | [4.5:1 contrast on bg] |

## Redesigned Pages

- [x] Home
- [x] About
- [x] Services (listing)
- [x] Services/[service-slug] (detail pages)
- [x] Contact
- [ ] Blog (new)
- [ ] FAQ (new)

## SEO Improvements

- [Add JSON-LD for Organization + LocalBusiness]
- [Add BreadcrumbList on all non-home pages]
- [Add per-page meta descriptions and Open Graph tags]
- [Create robots.txt with sitemap reference]
- [Create sitemap.xml with all pages]
```

Save this report using `SaveMemory` and/or the Memory MCP `create_entities`:

```
create_entities({
  entities: [
    { name: "redesign-[domain]", entityType: "project", observations: [
      "Original URL: https://example.com",
      "Pages found: 5",
      "Framework: Astro + Tailwind",
      "Color mood: Professional blue",
      "Priority: Full rebuild",
      "Style: Modern Clean"
    ]}
  ]
})
```

---

## Framework-Specific Redesign Guidance

### Astro + Tailwind (Recommended for Marketing/Content Sites)

```
# Project structure
src/
  layouts/
    BaseLayout.astro        # Shared head, nav, footer
  pages/
    index.astro             # Home
    about.astro             # About
    services/
      index.astro           # Services listing
      [slug].astro          # Service detail (dynamic)
    products/
      index.astro           # Products listing
      [slug].astro          # Product detail (dynamic)
    contact.astro           # Contact
    blog/
      index.astro           # Blog listing
      [slug].astro          # Blog article
  components/
    Header.astro
    Footer.astro
    Hero.astro
    ServiceCard.astro
    ProductCard.astro
    ContactForm.astro
  styles/
    global.css              # CSS custom properties, design tokens
```

### Next.js + React (For SaaS / E-commerce)

```
# Project structure
src/
  app/
    layout.tsx              # Root layout
    page.tsx                # Home
    about/page.tsx
    services/
      page.tsx              # Services listing
      [slug]/page.tsx       # Service detail
    contact/page.tsx
  components/
    ui/                     # Button, Input, Card, etc.
    sections/               # Hero, Features, Testimonials
    layouts/                # Header, Footer, Navigation
  lib/
    utils.ts
  styles/
    globals.css
```

---

## Deployment Recommendation

After the redesign, recommend deployment:

| Platform             | Best For                            | Cost      | Setup                             |
| -------------------- | ----------------------------------- | --------- | --------------------------------- |
| **Cloudflare Pages** | Astro/Static sites, marketing sites | Free      | `npx wrangler pages deploy dist/` |
| **Vercel**           | Next.js, React apps, SaaS           | Free tier | `npx vercel`                      |
| **Netlify**          | Static sites, JAMstack              | Free tier | `npx netlify deploy --prod`       |
| **GitHub Pages**     | Simple static sites                 | Free      | Push to `gh-pages` branch         |

For **Astro sites**: recommend Cloudflare Pages (free, global CDN, automatic HTTPS).
For **Next.js apps**: recommend Vercel (native support, automatic previews).

---

## Anti-Patterns (NEVER Do These)

- Copy the original site's CSS/framework verbatim — always rebuild clean
- Ignore mobile responsiveness during redesign
- Skip SEO improvements (JSON-LD, meta tags, sitemap)
- Create fewer pages than the original
- Remove existing content without asking the user
- Use emojis in the redesigned site
- Leave footer stuck to the section above (128px top padding)
- Saturate navigation with more than 7 items
- Create single-page redesigns when the original has multiple pages
- Skip accessibility improvements (contrast, alt text, keyboard nav)

## Required Patterns

- ALWAYS extract ALL pages from the original site before redesigning
- ALWAYS ask about redesign priority, framework, and style via AskUserQuestion
- ALWAYS create a redesign analysis report
- ALWAYS improve SEO (add JSON-LD, meta tags, sitemap)
- ALWAYS add missing pages (404, Privacy, Terms)
- ALWAYS use the design-system skill for color palettes and typography
- ALWAYS recommend Astro for marketing/content site redesigns
- ALWAYS use SVG icons (Lucide/Heroicons/Phosphor), zero emojis
- ALWAYS ensure 80px+ section spacing and 128px footer top padding
