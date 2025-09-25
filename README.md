# SowhatVisuals Portfolio Website

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ec2f0079b88148f180ce0034d8329d38)](https://app.codacy.com/gh/EthanPeters96/sowhatvisuals/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

A modern, minimalist portfolio website for Gyles Belgrave (SowhatVisuals) - Videographer & Content Creator.

## Features

- **Modern Design**: Clean, minimalist layout with black and white color scheme
- **Responsive**: Fully responsive design that works on mobile, tablet, and desktop
- **Interactive Gallery**: Lightbox functionality for viewing photos and videos
- **Smooth Animations**: Fade-in effects and smooth scrolling throughout
- **Contact Form**: Functional contact form with validation
- **Brand Showcase**: Display of collaborated brands and logos
- **Pricing Section**: Clean pricing cards for different service packages

## Design Specifications

### Color Scheme

- Primary: Black (#000000)
- Secondary: White (#FFFFFF)
- Accent: Various shades of gray for subtle contrast

### Typography

- **Font Family**: Montserrat (Google Fonts)
- **Weights**: Bold (700) and ExtraBold (800)
- **Usage**: ExtraBold for headings, Bold for body text

### Layout Inspiration

Based on the clean, modern layout from the reference site with emphasis on:

- Full-screen hero sections
- Grid-based content organization
- Generous white space
- Minimal navigation

## Sections

1. **Hero Section**: Full-screen video background with overlay text
2. **About Me**: Professional bio and statistics
3. **My Work**: Filterable portfolio gallery (photo/video)
4. **Brands**: Showcase of collaborated brands
5. **Pricing**: Service packages and pricing
6. **Contact**: Contact form and social media links

## File Structure

```text
/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── assets/
│   ├── logos/          # Logo files
│   ├── images/         # Photo portfolio images
│   └── videos/         # Video portfolio files
└── SWV Assets/         # Original asset files
    ├── brands ive worked with/
    ├── logos/
    └── packages/
```

## Setup Instructions

1. **Assets Setup**:
   - Replace placeholder video in hero section with your showreel
   - Add portfolio images to `assets/images/`
   - Add portfolio videos to `assets/videos/`
   - Update the `src` attributes in HTML accordingly

2. **Content Customization**:
   - Update contact information in the contact section
   - Modify pricing packages as needed
   - Add/remove brand logos in the brands section
   - Update social media links

3. **Technical Requirements**:
   - Modern web browser with ES6 support
   - **Hosting**: Optimized for Netlify deployment
   - **Contact form**: Integrated with Netlify Forms (no backend required)

## Netlify Deployment

This website is fully configured for Netlify hosting with:

- **✅ Contact Form Integration**: Works with Netlify's built-in form handling
- **✅ Optimized Configuration**: Includes `netlify.toml` with performance settings
- **✅ Custom Success Page**: Professional form submission confirmation
- **✅ Spam Protection**: Built-in honeypot field for form security

### Quick Deploy to Netlify

1. **Drag & Drop**: Simply drag the project folder to [netlify.com](https://netlify.com)
2. **Git Integration**: Connect your GitHub repo for automatic deployments
3. **Custom Domain**: Add your domain in Netlify dashboard settings

📖 **Detailed deployment guide**: See `NETLIFY_DEPLOYMENT.md` for complete instructions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Lazy loading for images
- Optimized animations
- Compressed assets
- Minimal external dependencies

## Assets to Replace

### Hero Section

- `assets/videos/showreel-placeholder.mp4` - Replace with your video showreel

### About Section

- Add a professional headshot image

### Work Section

Portfolio items (update the src attributes in HTML):

- `assets/videos/project1.mp4` - Music video project
- `assets/videos/project2.mp4` - Brand commercial
- `assets/videos/project3.mp4` - Documentary style content
- `assets/images/project1.jpg` - Portrait session
- `assets/images/project2.jpg` - Event coverage
- `assets/images/project3.jpg` - Brand shoot

### Contact Information

Update the following in the HTML:

- Email address
- Phone number
- Social media handles (already configured for @sowhatvisuals)

## Customization Tips

### Adding More Portfolio Items

1. Add new work items in the HTML following the existing structure
2. Update the JavaScript arrays in `script.js` if needed
3. Ensure proper `data-filter` attributes for filtering functionality

### Modifying Pricing

1. Update the pricing cards in the HTML
2. Modify the prices and features as needed
3. Pricing buttons automatically scroll to contact form

### Color Scheme Changes

If you need to modify colors (while keeping black/white theme):

1. Update CSS custom properties in `styles.css`
2. Maintain contrast ratios for accessibility

## Technical Notes

- Uses CSS Grid and Flexbox for responsive layouts
- Intersection Observer API for scroll animations
- No jQuery dependency - vanilla JavaScript only
- Font Awesome icons for UI elements
- Google Fonts integration for typography

## SEO Considerations

- Semantic HTML5 structure
- Meta tags for description and viewport
- Alt text for images (add as you replace placeholders)
- Structured navigation

---

**Created for**: Gyles Belgrave - SowhatVisuals
**Created by**: Ethan Peters - Developer
**Design Style**: Modern Minimalist
**Color Scheme**: Black & White Only
**Fonts**: Montserrat Bold & ExtraBold
