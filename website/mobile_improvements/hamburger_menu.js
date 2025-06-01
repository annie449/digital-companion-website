// Hamburger Menu JavaScript for Digital Companion™ Website

document.addEventListener('DOMContentLoaded', function() {
  // Create mobile navigation elements
  createMobileNavigation();
  
  // Add event listeners
  const hamburgerButton = document.querySelector('.hamburger-button');
  const closeButton = document.querySelector('.close-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  hamburgerButton.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    hamburgerButton.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  });
  
  closeButton.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    hamburgerButton.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });
  
  // Close menu when clicking on a menu item
  const menuItems = document.querySelectorAll('.mobile-menu a');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      hamburgerButton.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    });
  });
});

// Function to create mobile navigation structure
function createMobileNavigation() {
  // Create container for mobile navigation
  const mobileNavContainer = document.createElement('div');
  mobileNavContainer.className = 'mobile-nav-container';
  
  // Create hamburger button
  const hamburgerButton = document.createElement('button');
  hamburgerButton.className = 'hamburger-button';
  hamburgerButton.setAttribute('aria-label', 'Open navigation menu');
  
  // Create hamburger icon
  for (let i = 0; i < 3; i++) {
    const span = document.createElement('span');
    span.className = 'hamburger-icon';
    hamburgerButton.appendChild(span);
  }
  
  // Create mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  
  // Create close button
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.setAttribute('aria-label', 'Close navigation menu');
  closeButton.innerHTML = '&times;';
  
  // Create menu items by cloning from desktop navigation
  const desktopNav = document.querySelector('nav ul') || document.querySelector('header ul');
  const mobileMenuList = document.createElement('ul');
  
  if (desktopNav) {
    // Clone navigation items from desktop
    const navItems = desktopNav.querySelectorAll('li a');
    navItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.textContent.replace('Digital Companion', 'Digital Companion™');
      li.appendChild(a);
      mobileMenuList.appendChild(li);
    });
  } else {
    // Fallback navigation if desktop nav not found
    const navItems = [
      { text: 'Digital Companion™', href: '/' },
      { text: 'How It Works', href: '/how-it-works.html' },
      { text: 'Practical Support', href: '/practical-support.html' },
      { text: 'Emotional Support', href: '/emotional-support.html' },
      { text: 'Pricing', href: '/pricing.html' },
      { text: 'About Us', href: '/about.html' },
      { text: 'Notify Me When Launched', href: '/survey/form/index.html' }
    ];
    
    navItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      mobileMenuList.appendChild(li);
    });
  }
  
  // Assemble mobile menu
  mobileMenu.appendChild(closeButton);
  mobileMenu.appendChild(mobileMenuList);
  
  // Add elements to the page
  mobileNavContainer.appendChild(hamburgerButton);
  mobileNavContainer.appendChild(mobileMenu);
  
  // Insert at the beginning of the body
  document.body.insertBefore(mobileNavContainer, document.body.firstChild);
}
