# SowhatVisuals - AI Coding Agent Instructions

## Project Overview

**Type**: Static portfolio website for videographer/content creator  
**Stack**: Vanilla HTML, CSS, JavaScript (ES6+) - No frameworks  
**Hosting**: Netlify with integrated form handling  
**Design**: Minimalist black/white aesthetic with Montserrat typography  
**Key Feature**: Contact form with Netlify Forms, lightbox gallery, responsive design

## Architecture & Critical Patterns

### Static Site Structure

- **Single-page application**: All content in `index.html` with smooth-scroll navigation
- **No build process**: Direct deployment of static files to Netlify
- **Assets organization**:
  - `assets/` - Production assets (logos, images, videos)
  - `SWV Assets/` - Original source files (do not reference in code)

### JavaScript Module Pattern

- **ES6+ vanilla JS** - No jQuery or frameworks allowed
- **Initialization pattern**: All features init via `DOMContentLoaded` in `script.js`
  ```javascript
  document.addEventListener('DOMContentLoaded', function () {
    initNavigation()
    initScrollEffects()
    initWorkFilters()
    // ... etc
  })
  ```
- **Browser globals**: Explicitly declared in ESLint comments (`/* global document, window, fetch */`)

### Form Handling Architecture

**CRITICAL**: Contact form uses Netlify Forms, not custom backend

- Form requires `data-netlify="true"` attribute on `<form>` tag
- Includes honeypot field for spam protection
- Submission handling:
  - **Localhost**: Simulated with setTimeout (development mode detection)
  - **Production**: Fetch API POST to `/` with `application/x-www-form-urlencoded`
  - Success redirects handled by Netlify, fallback notification system in place
- See `initContactForm()` for implementation details

### Image Optimization System

**Advanced preloading strategy** implemented in `initImageOptimization()`:

- All work section images preloaded and cached on page load
- `imageCache` Set prevents duplicate loads
- Loading states managed via `data-loaded`, `data-cached` attributes
- Filter switching uses cached images (no re-fetch)
- Brand images use lazy loading (different strategy)

### Lightbox Navigation

- Single lightbox handles both images AND videos (`#lightbox-image`, `#lightbox-video`)
- Media items collected in array with index-based navigation
- Keyboard support: Escape (close), Arrow Left/Right (navigate)
- `data-type` and `data-src` attributes on `.view-btn` drive lightbox content

## Developer Workflows

### Testing & Validation

```bash
npm run lint          # ESLint check (9.x flat config)
npm run lint:fix      # Auto-fix issues
npm run test          # Lint + validation
npm run dev           # Python HTTP server on :8000
```

### Local Development

- **Recommended**: Use VS Code Live Server extension
- **Alternative**: `npm run dev` (Python required)
- **Form testing**: Check `isLocalhost` detection in `initContactForm()` for simulated submission

### Deployment

- **Auto-deploy**: Push to `main` branch triggers Netlify build
- **Manual**: Drag/drop entire folder to Netlify dashboard
- **Config**: `netlify.toml` handles headers, caching, redirects
- **Forms**: Auto-detected by Netlify (no manual setup needed)

### Codacy Integration

**MANDATORY WORKFLOW** (see `.github/instructions/codacy.instructions.md`):

1. After ANY file edit, immediately run `codacy_cli_analyze` tool
2. Always use: `provider: gh`, `organization: EthanPeters96`, `repository: sowhatvisuals`
3. After dependency changes, run with `tool: "trivy"` for security scan
4. Fix any issues before proceeding with other tasks

## Code Conventions

### CSS Architecture

- **No preprocessors**: Plain CSS with custom properties
- **Design tokens**:
  - Primary: `#000000` (black)
  - Secondary: `#FFFFFF` (white)
  - Font: Montserrat Bold (700) / ExtraBold (800)
- **Layout**: CSS Grid + Flexbox (no float-based layouts)
- **Responsive**: Mobile-first with breakpoints at 768px, 1024px
- **Class naming**: Descriptive, no BEM despite CONTRIBUTING.md mention (not currently used)

### JavaScript Standards (ESLint 9.x Flat Config)

```javascript
// eslint.config.js uses export default [] syntax
rules: {
    'semi': ['error', 'always'],          // Semicolons required
    'quotes': ['error', 'single'],        // Single quotes only
    'indent': ['error', 4],               // 4-space indentation
    'no-trailing-spaces': 'error',
    'eol-last': 'error'                   // Newline at EOF
}
```

### File Modifications

- **HTML**: Strict black/white color scheme - no color deviations
- **Images**: Optimize before adding (max 200KB for brand logos)
- **Videos**: Hero video at `assets/videos/show-reel-main-page.mp4`
- **Critical inline CSS**: Navigation styles in `<head>` for performance

## Integration Points

### Netlify Forms

- Form name: `contact` (configured in `netlify.toml`)
- Fields: `name`, `email`, `budget`, `project-details`
- Success page: `success.html`
- Notifications: Configured in Netlify dashboard (not in code)

### External Dependencies

- **Google Fonts**: Montserrat (preconnect in HTML head)
- **Font Awesome 6.0**: Icons loaded with `media="print"` hack for async
- **No CDN frameworks**: No Bootstrap, Tailwind, or similar

### Performance Optimizations

- Resource hints: `preconnect` for fonts, CDN
- Image preloading: Custom cache system in `initImageOptimization()`
- Asset caching: Netlify headers set 1-year cache for `/assets/*`
- Lazy loading: Brand images only (work section fully preloaded)

## Common Gotchas

1. **Form submission**: Don't modify fetch endpoint - must POST to `/` for Netlify
2. **ESLint globals**: Must declare browser globals in comment or config will fail
3. **Image paths**: Always relative to root (`assets/`, not `/assets/`)
4. **Scroll offset**: Navigation anchors use `-80px` offset for fixed navbar
5. **Color scheme**: Resist adding colors - black/white only per design spec
6. **Codacy**: NEVER skip `codacy_cli_analyze` after edits (critical requirement)

## Key Files Reference

- `script.js` - All JavaScript functionality (single file, ~700 lines)
- `styles.css` - All styles (single file, ~1300 lines)
- `index.html` - Complete site structure (single page, ~1200 lines)
- `netlify.toml` - Hosting config (headers, caching, forms)
- `eslint.config.js` - Flat config format (ESLint 9.x)
- `.github/instructions/codacy.instructions.md` - Mandatory workflow rules

## Examples from Codebase

### Adding Portfolio Item

```html
<div class="work-item video music fade-in" data-filter="video">
  <div class="work-image">
    <img src="assets/videos/project-thumbnail.jpg" alt="Description" />
    <div class="work-overlay">
      <button class="view-btn" data-type="video" data-src="assets/videos/project.mp4">
        <i class="fas fa-play"></i> View
      </button>
    </div>
  </div>
  <h3>Project Title</h3>
</div>
```

- Must include `data-filter` attribute for filtering
- Thumbnail image automatically preloaded by cache system
- Button `data-type` and `data-src` drive lightbox behavior

### Notification System

```javascript
showNotification('Message sent!', 'success') // Green on white
showNotification('Error occurred', 'error') // White on red
showNotification('Processing...', 'info') // Black on white
```

- Auto-removes after 5 seconds
- Positioned top-right with slide-in animation
- Only one notification visible at a time

---

**Last Updated**: Generated for codebase state as of this analysis  
**Codacy Quality**: [![Codacy Badge](https://app.codacy.com/project/badge/Grade/ec2f0079b88148f180ce0034d8329d38)](https://app.codacy.com/gh/EthanPeters96/sowhatvisuals/dashboard)
