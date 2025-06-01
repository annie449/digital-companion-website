// Client-side redirects for extensionless URLs
document.addEventListener('DOMContentLoaded', function() {
    // Get current path
    const path = window.location.pathname;
    
    // Check if the path doesn't end with .html and isn't the root
    if (path !== '/' && !path.endsWith('.html') && !path.endsWith('/')) {
        // Check if this is a known page that should have .html
        const knownPages = [
            '/how-it-works',
            '/practical-support',
            '/emotional-support',
            '/pricing',
            '/about',
            '/terms',
            '/privacy',
            '/team',
            '/careers',
            '/contact',
            '/resources'
        ];
        
        if (knownPages.includes(path)) {
            // Redirect to the .html version
            window.location.href = path + '.html';
        }
    }
    
    // Special redirects
    if (path === '/notify' || path === '/survey') {
        window.location.href = '/survey/form/index.html';
    }
});
