# Contributing to SowhatVisuals

Thank you for your interest in contributing to the SowhatVisuals portfolio website! This document provides guidelines and information for contributors.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Git**
- **Code Editor** (VS Code recommended)

### Local Development Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/EthanPeters96/sowhatvisuals.git
   cd sowhatvisuals
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development**:
   - Open `index.html` in your browser
   - Or use a local server like Live Server extension in VS Code

### Code Quality

Before submitting any changes:

```bash
# Run ESLint to check code quality
npm run lint

# Fix auto-fixable issues
npx eslint script.js --fix
```

## 📁 Project Structure

```text
sowhatvisuals/
├── index.html              # Main website page
├── styles.css              # CSS styling
├── script.js               # JavaScript functionality
├── success.html            # Form success page
├── netlify.toml            # Netlify configuration
├── assets/                 # Website assets
│   └── logos/              # Logo files
├── SWV Assets/             # Original design assets
│   ├── brands ive worked with/
│   ├── logos/
│   └── packages/
└── docs/
    ├── README.md           # Main documentation
    └── NETLIFY_DEPLOYMENT.md
```

## 🎨 Design Guidelines

### Color Scheme

- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Gray shades for subtle contrast

### Typography

- **Font**: Montserrat (Google Fonts)
- **Weights**: Bold (700) and ExtraBold (800)
- **Usage**: ExtraBold for headings, Bold for body text

### Responsive Design

- **Mobile First**: Design starts with mobile layout
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 💻 Development Guidelines

### HTML

- Use semantic HTML5 elements
- Maintain accessibility standards
- Include proper meta tags
- Use descriptive alt text for images

### CSS

- Follow BEM methodology for class naming
- Use CSS Grid and Flexbox for layouts
- Maintain responsive design principles
- Keep specificity low

### JavaScript

- Use modern ES6+ syntax
- Follow ESLint configuration
- Write vanilla JavaScript (no jQuery)
- Add comments for complex logic

### Performance

- Optimize images before adding
- Use lazy loading for images
- Minimize HTTP requests
- Test on mobile devices

## 🔧 Making Changes

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `style/description` - Style/design changes

### Commit Message Format

```text
type(scope): brief description

Detailed explanation if needed
- What was changed
- Why it was changed
- Any breaking changes
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Process

1. **Create a branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Follow the coding guidelines
   - Test your changes thoroughly
   - Run ESLint to check code quality

3. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add new portfolio section"
   ```

4. **Push to GitHub**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**:
   - Use descriptive title and description
   - Reference any related issues
   - Include screenshots for UI changes

## 🧪 Testing

### Manual Testing Checklist

- [ ] Test on mobile, tablet, and desktop
- [ ] Verify all navigation links work
- [ ] Test contact form functionality
- [ ] Check image loading and lightbox
- [ ] Verify smooth scrolling and animations
- [ ] Test with keyboard navigation
- [ ] Check browser compatibility

### Cross-Browser Testing

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

## 📝 Content Updates

### Adding Portfolio Items

1. **Add images/videos** to appropriate folders in `assets/`
2. **Update HTML** in the work section
3. **Ensure proper data attributes** for filtering
4. **Test lightbox functionality**

### Updating Pricing

1. **Modify pricing cards** in `index.html`
2. **Update pricing amounts** and features
3. **Test responsive layout**

### Brand Logos

1. **Optimize images** (PNG/JPG, max 200KB)
2. **Add to brands section** in HTML
3. **Test on dark background**
4. **Ensure proper alt text**

## 🚀 Deployment

### Netlify Deployment

This site is configured for Netlify:

1. **Automatic deployments** from main branch
2. **Form handling** with Netlify Forms
3. **CDN optimization** for global performance
4. **SSL certificate** automatically provided

### Environment Variables

If needed, add environment variables in:

- **Local**: Create `.env` file (add to `.gitignore`)
- **Netlify**: Site Settings > Environment Variables

## 📋 Issue Reporting

### Bug Reports

Include:

- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Browser and device information**
- **Screenshots if applicable**

### Feature Requests

Include:

- **Description** of the feature
- **Use case** and benefits
- **Mockups or examples** if available

## 📞 Support

- **Repository Issues**: Use GitHub Issues for bugs and features
- **General Questions**: Contact via the website form
- **Urgent Issues**: Create high-priority GitHub issue

## 📜 License

This project is private and proprietary. All rights reserved to SowhatVisuals.

---

**Happy Contributing!** 🎉

Thank you for helping make the SowhatVisuals website better!
