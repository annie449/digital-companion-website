/* Integration Script for Mobile Improvements */

// Function to add CSS files to the head
function addStylesheet(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  document.head.appendChild(link);
}

// Function to add JavaScript files to the end of body
function addScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}

// Function to update all instances of "Digital Companion" to include ™
function addTrademarkSymbol() {
  const textNodes = [];
  
  // Function to find all text nodes
  function findTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.includes('Digital Companion') && !node.textContent.includes('Digital Companion™')) {
        textNodes.push(node);
      }
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        findTextNodes(node.childNodes[i]);
      }
    }
  }
  
  // Find all text nodes in the document
  findTextNodes(document.body);
  
  // Replace text in all found nodes
  textNodes.forEach(node => {
    node.textContent = node.textContent.replace(/Digital Companion/g, 'Digital Companion™');
  });
  
  // Update title if needed
  if (document.title.includes('Digital Companion') && !document.title.includes('Digital Companion™')) {
    document.title = document.title.replace(/Digital Companion/g, 'Digital Companion™');
  }
}

// Add mobile improvements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add stylesheets
  addStylesheet('/mobile_improvements/hamburger_menu.css');
  addStylesheet('/mobile_improvements/touch_targets.css');
  
  // Add scripts
  addScript('/mobile_improvements/hamburger_menu.js');
  
  // Add trademark symbol to all instances
  addTrademarkSymbol();
  
  console.log('Mobile improvements loaded successfully');
});
