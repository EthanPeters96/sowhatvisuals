# SowhatVisuals - Netlify Deployment Guide

## Quick Deployment to Netlify

### Method 1: Drag & Drop (Easiest)

1. **Prepare files**: Ensure all files are in the project root
2. **Visit Netlify**: Go to [netlify.com](https://netlify.com) and sign up/log in
3. **Deploy**: Drag the entire project folder to the Netlify deploy area
4. **Configure**: Your site will be live immediately with a random URL

### Method 2: Git Repository (Recommended)

1. **Create Git Repository**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: SowhatVisuals website"
   ```

2. **Push to GitHub** (or GitLab/Bitbucket):
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your local repository

3. **Connect to Netlify**:
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Use these build settings:
     - **Build command**: (leave empty)
     - **Publish directory**: (leave empty or use ".")

## Netlify Configuration

The site includes a `netlify.toml` file with optimized settings:

- **Form handling**: Automatically configured for contact form
- **Security headers**: Enhanced security for all pages
- **Asset caching**: Optimized performance for images and static files
- **Build settings**: Configured for static HTML deployment

## Contact Form Features

✅ **Netlify Forms Integration**:

- Automatic spam protection with honeypot field
- Form submissions appear in Netlify dashboard
- Email notifications for new submissions
- Custom success page after form submission

✅ **Form Data**:

- Accessible via Netlify admin panel
- Exportable to CSV
- Integration with Zapier, webhooks available

## Custom Domain Setup

1. **In Netlify Dashboard**:
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `sowhatvisuals.com`)

2. **DNS Configuration**:
   - Point your domain's A record to Netlify's load balancer IP
   - Or use Netlify's nameservers for full DNS management

3. **SSL Certificate**:
   - Netlify provides free SSL certificates automatically
   - HTTPS will be enabled within minutes

## Environment Variables (if needed)

If you need to add environment variables:

1. Go to Site settings > Environment variables
2. Add any required variables
3. Redeploy if necessary

## Form Notifications Setup

1. **In Netlify Dashboard**:
   - Go to Site settings > Forms
   - Click on "contact" form
   - Set up email notifications
   - Configure notification recipients

2. **Advanced Options**:
   - Slack notifications
   - Webhook integrations
   - Custom form processing

## Performance Optimizations

The site is configured for optimal Netlify performance:

- **CDN**: Global content delivery network
- **Image optimization**: Automatic image compression
- **Asset caching**: Long-term caching for static assets
- **Compression**: Automatic gzip compression

## Post-Deployment Checklist

- [ ] Test contact form submission
- [ ] Verify all images load correctly
- [ ] Check mobile responsiveness
- [ ] Test navigation and lightbox functionality
- [ ] Confirm social media links work
- [ ] Set up custom domain (if applicable)
- [ ] Configure form notifications in Netlify dashboard

## Troubleshooting

**Form not working?**

- Check Netlify dashboard under Forms section
- Ensure `data-netlify="true"` is present in form tag
- Verify form has a `name` attribute

**Images not loading?**

- Check file paths are relative to project root
- Ensure image files are included in deployment

**Site not updating?**

- Check deployment status in Netlify dashboard
- Trigger manual deploy if needed
- Clear browser cache

## Support

For Netlify-specific issues:

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://community.netlify.com/)
- [Netlify Support](https://www.netlify.com/support/)

---

**Deployment Ready**: This site is fully configured for Netlify hosting with optimized performance and working contact forms!
