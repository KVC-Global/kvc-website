# KVC Global - Brand & Design Specification (2026 V1)

## Table of Contents

1. [Our Story & Mission](#our-story--mission)
2. [Our Logo](#our-logo)
3. [Color Palette & Tailwind v4 Tokens](#color-palette--tailwind-v4-tokens)
4. [Typography](#typography)
5. [Visual Elements](#visual-elements)
6. [AI Agent Implementation & Component Engine](#ai-agent-implementation--component-engine)

---

## Our Story & Mission

**Brand Story:** KVC Global accompanies individuals, families, and businesses on their journey of studying, working, doing business, and settling down in Singapore. We simplify and bring absolute transparency to the entire process, empowering our clients to build a sustainable and greater future.

**Vision:** To be the top-of-mind, most trusted consultancy that sincerely serves deserving individuals in achieving their optimal educational and residency pathways in Singapore.

**Mission:** Connecting knowledge, shaping the future. We deliver personalized, honest, and high-quality solutions to maximize your application's success rate, overcoming global competition challenges together with you.

**Tagline:** _Begin Something Greater._

---

## Our Logo

The KVC Global logo stands for professionalism, architecture, and global connection. The stylized 'K' icon is embedded within a solid geometric foundation, symbolizing the clear pathways and strategic guidance that lead our clients to success in Singapore.

### Logo Variations

- **Horizontal Logo:** The standard corporate variant. Heavily preferred for left-aligned placements on website headers and official documentation.
- **Icon Only:** The stylized 'K' box used independently for micro-spaces like browser favicons and social media profile avatars.

### Tagline Usage

- **With Tagline:** Features the sub-text "BEGIN SOMETHING GREATER" beneath the main brand name. Mandated for Desktop Headers and high-impact physical print materials.
- **Without Tagline:** Displays only "KVC GLOBAL". Mandated for Mobile Headers or micro-scaled instances to maintain high legibility.

### Clear Space & Background Integration

- **Clear Space:** Maintain a safety perimeter buffer around the logo equal to the stroke width of the 'K' icon lettermark.
- **Light Backgrounds:** Apply the original dark blue and black/charcoal corporate version.
- **Dark Backgrounds:** It is mandatory to execute the All-White silhouette version to ensure absolute contrast.

### Logo Misuse (Don't s)

- Do not apply web UI drop shadows (unless it is for physical 3D office signage).
- Do not stretch, compress, warp, or alter the aspect ratio under any circumstances.
- Do not inject non-brand colors or arbitrary hex codes into the logo assets.

---

## Color Palette & Tailwind v4 Tokens

### Core Color Matrix

| Color Identity    | Semantic Role      | HEX Code  | Intended UI & UX Application                                                                                                                                              |
| :---------------- | :----------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Dark Blue`       | Primary            | `#0A2540` | Main corporate brand identifier. Applied to Header backgrounds, Primary CTAs, Section Headings (`h1`, `h2`), and Dark Testimonial Blocks.                                 |
| `KVC Gold`        | Secondary / Accent | `#C8913C` | High-impact metallic gold accent tone. Applied to keyword highlights ("GREATER."), active menu state indicators, stat icons, slider arrows, and secondary CTA highlights. |
| `Pure White`      | Background         | `#FFFFFF` | Primary canvas background for content sections (Hero, Cards, Forms).                                                                                                      |
| `Soft Light Blue` | Background         | `#F4F7FA` | Alternative light section background to group structural layers (Partners, Office Cards).                                                                                 |
| `Charcoal Black`  | Typography         | `#1A202C` | High-contrast body text for maximum readability on light backgrounds.                                                                                                     |

#### Color Constraints & Guardrails

- **Background Rule:** Layout rows must alternate strictly between `Pure White` and `Soft Light Blue`. Dark Blue (`#0A2540`) is exclusively reserved for structural bookends (Header, Footer, Dark Review Section).
- **Grid Card Highlighting:** When building grid components (e.g., Service Cards), the default state is light. The highlighted or active card state must shift to a full `Dark Blue` background with `KVC Gold` text links or active highlights. **Zero tolerance for red or generic orange accents.**

---

## Typography

The KVC Global typographic system focuses on clean, modern aesthetics, optimal cross-border readability, and flawless dual-language rendering (English & Vietnamese).

### Font System

- **Heading Typography (Montserrat / Inter):**
  - _Application:_ Main Hero Titles, Section Headings (`h1`, `h2`, `h3`), and Navigation Menu Items.
  - _Weights:_ Bold (700) or SemiBold (600).
- **Body Typography (Be Vietnam Pro):**
  - _Application:_ Standard paragraph blocks, text-heavy descriptions, statistical sub-labels, form fields.
  - _Weights:_ Regular (400) or Medium (500).

### Typographic Layout Rules

- **Hierarchy Scale:** Apply robust modular typographic scaling to enforce an instant visual hierarchy between the uppercase Hero title and the standard paragraph descriptions.
- **Vertical Spacing:** Maintain a paragraph line-height threshold of $\ge 1.5$ (`leading-relaxed`) to prevent user visual fatigue during content consumption.

---

## Visual Elements

### 1. Imagery Direction

- **Style:** Heavily people-centric. Showcase successful professionals, ambitious students, and happy families.
- **Composition:** Subjects should be positioned facing or interacting with iconic modern Singapore backdrops (e.g., Marina Bay Sands, Merlion park) under bright, optimistic daylight or golden-hour sunset tones.

### 2. Iconography & Symbols

- **Style:** Outlined vector stroke style only. Do not use filled, heavily shadowed, or multi-tone gradient icon packs.
- **Color Mapping:** Automatically inherit `Dark Blue` on light canvases, and dynamically transition to `KVC Gold` or `Pure White` on dark backgrounds.

---

## AI Agent Implementation & Component Engine

### 6.1. Tailwind CSS v4 Theme Configuration

For **Tailwind CSS v4**, your AI Agent must inject these tokens directly into the main entry CSS file using the new `@theme` syntax instead of the legacy configuration file:

```css
@import "tailwindcss";

@theme {
  --color-brand-blue: #0a2540;
  --color-brand-gold: #c8913c;
  --color-brand-dark: #1a202c;
  --color-brand-light: #f4f7fa;

  --font-heading: "Montserrat", "Inter", sans-serif;
  --font-body: "Be Vietnam Pro", sans-serif;

  --radius-brand: 20px;
}
```
