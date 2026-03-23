# Safo landing page instructions

## Source of truth
- Use `docs/wireframe.txt` for section order and layout intent.
- Use `content/content.yaml` as the single source of truth for copy, labels, FAQs, device cards, and form fields.
- Do not invent new marketing claims.
- If proof data is missing, keep the proof section lean instead of fabricating credibility.

## Skills to use
- Use $frontend-design for layout, hierarchy, spacing, and implementation.
- Use $theme-factory for color tokens, typography scale, spacing scale, radii, shadows, and button/input styling.
- After implementation, use $web-design-guidelines to review the page and fix anything generic, bloated, visually weak, or hard to scan.
- After design review, use $webapp-testing to test responsive behavior, CTA flow, selected_device prefill, keyboard accessibility, and form validation.
- Use $imagegen only for approved abstract assets like hero background, texture, or OG image.
- Do not use $imagegen for fake device photos, fake clinicians, or fake treatment rooms.

## Build target
Build a mobile-first single-page landing page for Safo.
The page must feel premium medical aesthetics, clean, restrained, fast to scan, high-trust, and conversion-first without looking cheap.

## Required section order
1. Sticky Header
2. Hero
3. Trust Strip
4. Portfolio by Treatment Goal
5. Why Safo
6. Confidence and Proof
7. FAQ + Contact Form
8. Footer

## Hard rules
- No pricing
- No blog
- No news
- No team section
- No company history timeline
- No comparison table
- No testimonial slider
- No autoplay video
- No WhatsApp popup
- No chatbot popup
- No separate contact page
- No stock-doctor or spa-style imagery
- No extra sections beyond the approved structure

## Product and proof rules
- Competitor device names in `content/content.yaml` are temporary placeholders only.
- Keep the page `noindex` until real Safo devices and claims replace those placeholders.
- Do not turn placeholder proof into fake proof.

## CTA and form rules
- Keep one primary conversion goal: embedded contact form submission.
- Header CTA scrolls to the contact form.
- Hero primary CTA scrolls to the contact form.
- Hero secondary CTA scrolls to the devices section.
- Device card CTA scrolls to the form and prefills `selected_device`.
- Mobile sticky CTA stays visible until the form section is in view.

## Form requirements
Required fields:
- full_name
- business_email
- clinic_company
- country
- business_type
- treatment_interest
- message
- consent

Optional:
- phone

Hidden:
- selected_device
- utm_source
- utm_medium
- utm_campaign
- utm_content
- referrer
- landing_page

## Visual direction
- premium medical-tech
- white, navy, graphite, cool gray
- one blue or teal accent only
- restrained, clinical, product-led
- strong whitespace
- soft borders
- light shadows
- no trendy fluff

## Technical expectations
- Next.js App Router
- TypeScript
- Tailwind CSS
- semantic HTML
- accessible form and accordion
- minimal client JavaScript
- inline success and error states
- metadata and FAQ schema
- `noindex` until placeholders are replaced