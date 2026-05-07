---
name: anti-pattern
description: >
  Anti-pattern detection and prevention skill. Catches hardcoded data,
  non-functional UI elements, placeholder code, N+1 queries, and other
  common development anti-patterns before they ship.
license: MIT
---

# Anti-Pattern Skill — Ship Real Code, Not Decorations

This skill detects and prevents the most common anti-patterns that make software look unfinished or unprofessional.

## Banned Anti-Patterns (ZERO TOLERANCE)

### UI/UX Anti-Patterns

```
❌ BANNED:
- "Coming Soon" sections or labels
- Non-functional buttons (must work or be removed)
- Forms that don't submit anywhere
- Hardcoded fake data in production components
- Static tables pretending to be dynamic
- Links that go nowhere (href="#")
- "Under Construction" banners
- Feature flags permanently set to false
- Disabled inputs without clear explanation
- Empty states without helpful messaging
- Pagination that doesn't actually paginate
- Search bars that don't actually search
- Filters that return the same results
- SINGLE LANDING PAGE when user asks for "a website" (MUST be multi-page)
- No color palette defined before writing CSS
- Random hex colors without a documented design system
- Inconsistent colors across pages (different blues, different spacing)
- EMOJIS anywhere in the website (use SVG icons from Lucide/Heroicons/Phosphor)
- Sections touching each other (no spacing between content blocks)
- Footer stuck directly to the section above (no breathing room)
- Navigation with more than 7 top-level items (cluttered, overwhelming)
- Service pages without individual detail pages (/services only, no /services/web-design)
- Product pages without individual detail pages (/products only, no /products/[slug])
- Generic service descriptions (2-3 lines per service is NOT enough)

✅ REQUIRED:
- Every visible button triggers a real handler or is removed
- Every form has a real onSubmit connected to an API call
- Every list loads from a real data source with loading states
- Every link navigates to a real destination
- Empty states explain why and suggest next actions
- Error states show real error messages from the server
- Loading states appear during real async operations
- Multi-page website with separate routes (Home, About, Services, Contact, Products)
- Professional 6-color palette (--color-primary, secondary, accent, bg, surface, text)
- Consistent design system across ALL pages
- ZERO emojis — use SVG icons (Lucide, Heroicons, Phosphor)
- Section spacing: minimum 80px padding between sections
- Footer: minimum 128px top padding (never touching content above)
- Navigation: max 7 items, dropdowns for groups, secondary links in footer
- Services: listing page + individual detail pages per service
- Products: listing page + individual detail pages per product
- Each service detail: description, process, deliverables, pricing, FAQ, CTA
- Each product detail: gallery, specs, pricing, reviews, related products
```

### Website Architecture Anti-Patterns

```
❌ BANNED (when user says "build a website"):
- Creating index.html as the ONLY file
- Putting all content in one scrollable page
- Using anchor links (#about, #services) instead of separate pages
- Calling it a "website" when it's just a landing page
- No navigation menu between sections/pages
- No shared header/footer across pages
- No unique meta title/description per page

✅ REQUIRED:
- Separate route/page for each section (e.g., /about, /services, /contact)
- Navigation menu linking all pages
- Shared header + footer components
- Each page has unique <title> and <meta description>
- Consistent color palette and typography across ALL pages
- Minimum 5 pages for any "website" request (Home, About, Services, Products/Portfolio, Contact)
```

### Code Anti-Patterns

```
❌ BANNED:
- return []; // TODO: implement
- throw new Error('Not implemented');
- // placeholder
- Hardcoded arrays pretending to be API responses
- Functions with empty bodies
- Catch blocks that silently swallow errors
- Commented-out code in production
- Magic numbers without named constants
- Copy-pasted code (DRY violation)
- God functions (>100 lines)
- Deeply nested callbacks (>3 levels)
- N+1 database queries in loops

✅ REQUIRED:
- Every function has real, working implementation
- Every error is properly handled with user feedback
- Constants are named and documented
- Code is DRY — extract shared logic
- Functions are focused and under 40 lines
```

### N+1 Query Detection

```
❌ BANNED (N+1):
// This fires 1 query per user = N+1 problem
for (const user of users) {
  const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [user.id]);
}

✅ REQUIRED (Batch):
// This fires 1 query total
const userIds = users.map(u => u.id);
const orders = await db.query(
  'SELECT * FROM orders WHERE user_id IN (?)',
  [userIds]
);
// Then group in memory
const ordersByUser = groupBy(orders, 'user_id');
```

### SQL Anti-Patterns

```
❌ BANNED:
SELECT * FROM users                    -- No SELECT *
WHERE name LIKE '%" + input + "%'     -- SQL injection
ORDER BY RAND()                        -- Performance killer
HAVING COUNT(*) > 0                    -- Use WHERE instead
WHERE YEAR(created_at) = 2024          -- Breaks index usage

✅ REQUIRED:
SELECT id, name, email FROM users      -- Explicit columns
WHERE name LIKE ?                      -- Parameterized
ORDER BY id DESC LIMIT 20              -- Deterministic sort
WHERE created_at >= '2024-01-01'       -- Index-friendly
  AND created_at < '2025-01-01'
```

## Verification Checklist

Before ANY deliverable is marked complete:

### General

- [ ] No "coming soon" or "under construction" anywhere
- [ ] All buttons are functional or removed
- [ ] All forms submit to real endpoints
- [ ] All lists load from real data sources
- [ ] No hardcoded demo data in production paths
- [ ] No N+1 queries (check every loop with a query)
- [ ] No TODO comments without issue references
- [ ] Error states handle real errors
- [ ] Loading states show during real operations

### Design & UI Anti-Patterns

- [ ] Zero emojis anywhere in the website (use SVG icons only)
- [ ] Sections have minimum 80px padding between them (no touching)
- [ ] Footer has minimum 128px top padding (not stuck to content)
- [ ] Main navigation has max 7 top-level items
- [ ] Secondary links in footer, not main nav
- [ ] Services have individual detail pages (not just a listing page)
- [ ] Products have individual detail pages (not just a listing page)
- [ ] Each service detail has: description, process, deliverables, CTA
- [ ] Each product detail has: gallery, specs, pricing, reviews
- [ ] Alternating section backgrounds for visual separation

### SEO Anti-Patterns (for website projects)

- [ ] No page without a unique `<title>` and `<meta name="description">`
- [ ] No page without Open Graph tags (og:title, og:description, og:image)
- [ ] No page without JSON-LD structured data (`<script type="application/ld+json">`)
- [ ] No non-home page without BreadcrumbList schema
- [ ] No duplicate JSON-LD blocks (use `@id` references instead)
- [ ] No missing `robots.txt` or `sitemap.xml`
- [ ] No images without `alt` text
- [ ] no page without canonical URL
- [ ] No missing `<html lang="xx">` attribute
- [ ] No page with more than one `<h1>`
