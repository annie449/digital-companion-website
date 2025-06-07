/**
 * URL redirects for extensionless URLs
 * This script handles redirects for URLs without file extensions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we need to redirect based on the current URL
    handleRedirects();
});

/**
 * Handle redirects for extensionless URLs
 */
function handleRedirects() {
    // Get the current path
    const currentPath = window.location.pathname;
    
    // Define redirects mapping (extensionless path to HTML file)
    const redirects = {
        '/about': '/about.html',
        '/contact': '/contact.html',
        '/emotional-support': '/emotional-support.html',
        '/practical-support': '/practical-support.html',
        '/pricing': '/pricing.html',
        '/faq': '/faq.html',
        '/resources': '/resources.html',
        '/signup': '/signup.html',
        '/how-it-works': '/how-it-works.html',
        '/terms': '/terms.html',
        '/privacy': '/privacy.html'
    };
    
    // Check if the current path needs a redirect
    if (currentPath in redirects) {
        // Get the target URL
        const targetUrl = redirects[currentPath];
        
        // Redirect to the target URL
        window.location.href = targetUrl;
    }
    
    // Handle subdirectory paths
    if (currentPath.endsWith('/')) {
        // Check for index.html in the current directory
        const indexPath = currentPath + 'index.html';
        
        // Try to fetch the index.html file
        fetch(indexPath)
            .then(response => {
                if (response.ok) {
                    // If the file exists and the current URL doesn't end with index.html, redirect
                    if (!currentPath.endsWith('index.html')) {
                        window.location.href = indexPath;
                    }
                }
            })
            .catch(error => {
                console.error('Error checking for index.html:', error);
            });
    }
}

/**
 * Update links to use extensionless URLs
 * This function can be called to update all links on the page to use extensionless URLs
 */
function updateLinks() {
    // Get all links on the page
    const links = document.querySelectorAll('a');
    
    // Define the extensions to remove
    const extensions = ['.html'];
    
    // Loop through all links
    links.forEach(link => {
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Skip if no href or external link
        if (!href || href.startsWith('http' ) || href.startsWith('mailto:') || href.startsWith('#')) {
            return;
        }
        
        // Check if the href ends with any of the extensions
        extensions.forEach(extension => {
            if (href.endsWith(extension)) {
                // Remove the extension
                const newHref = href.substring(0, href.length - extension.length);
                
                // Update the href attribute
                link.setAttribute('href', newHref);
            }
        });
    });
}
