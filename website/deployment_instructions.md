# Digital Companion™ Website Deployment Instructions

## Overview

This document provides instructions for deploying the Digital Companion™ website to a permanent hosting environment. The website has been developed as a static site with HTML, CSS, and JavaScript.

## Files and Structure

The website consists of the following key components:

- **HTML Pages**: Main website pages in the `/public` directory
- **CSS Styles**: Main stylesheet in `/public/styles.css`
- **JavaScript**: Mobile improvements and redirects in `/public/mobile_improvements/` and `/public/js/`
- **Images**: Logo and visual assets in `/public/images/`
- **Survey Form**: Interactive survey in `/public/survey/form/`
- **Marketing Materials**: Email templates, graphics, and brochures in `/marketing_materials/`

## Known Issues to Address During Deployment

### URL Redirect Handling

The development environment has limitations with URL redirects. During permanent deployment, implement one of these solutions:

1. **Server-side Redirects**: Configure the hosting server to handle redirects from extensionless URLs to their .html counterparts. This is the preferred solution.

   For Apache servers, the provided `.htaccess` file should work:
   ```
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME}.html -f
   RewriteRule ^(.*)$ $1.html [L,R=301]
   
   RewriteRule ^notify$ /survey/form/index.html [L,R=301]
   RewriteRule ^survey$ /survey/form/index.html [L,R=301]
   ```

   For Nginx servers, add to your server configuration:
   ```
   location / {
     if (!-d $request_filename) {
       rewrite ^/([^.]+)$ /$1.html last;
     }
     rewrite ^/notify$ /survey/form/index.html permanent;
     rewrite ^/survey$ /survey/form/index.html permanent;
   }
   ```

2. **Client-side Redirects**: The website includes JavaScript redirects in `/public/js/redirects.js`, which should be loaded on all pages.

3. **Custom 404 Page**: Configure a custom 404 page that attempts to redirect to the .html version of the requested URL.

## Deployment Steps

1. **Choose a Hosting Provider**:
   - Recommended: Netlify, Vercel, or any static site hosting service
   - Alternatives: Traditional web hosting with Apache/Nginx

2. **Domain Setup**:
   - Register or configure the domain (digitalcompanion.com)
   - Set up DNS records to point to your hosting provider

3. **Upload Files**:
   - Upload the entire `/public` directory to your hosting provider
   - Ensure all file permissions are correctly set

4. **Configure Redirects**:
   - Implement the redirect solution as described above
   - Test all navigation paths to ensure no 404 errors

5. **SSL Setup**:
   - Enable HTTPS for secure connections
   - Most modern hosting providers offer this automatically

6. **Testing**:
   - Verify all pages load correctly
   - Test the survey form functionality
   - Check mobile responsiveness
   - Validate all links and navigation

## Post-Deployment Tasks

1. **Analytics Setup**:
   - Implement Google Analytics or similar tracking
   - Set up conversion tracking for the survey form

2. **Marketing Launch**:
   - Upload email templates to your email marketing platform
   - Prepare social media posts using the provided graphics
   - Distribute the digital brochure to partners

3. **Monitoring**:
   - Set up uptime monitoring
   - Configure error notifications

## Support and Maintenance

Regular maintenance should include:
- Security updates for any dependencies
- Content updates as needed
- Regular backups of the website
- Monitoring of form submissions

## Contact

For technical assistance with deployment, contact:
- Email: tech@digitalcompanion.com

---

© 2025 Digital Companion™. All rights reserved.
