const loadingTime = 4000; // 4 seconds

window.onload = function() {
  setTimeout(function() {
    document.querySelector('.laptop-loader').style.display = 'none';
    document.getElementById('main-content').classList.add('show');
    
    // Reinitialize AOS after showing content
    AOS.init();

    // Initialize Particle.js after showing content
    particlesJS.load('particles-js', './particles.json', function() {
      console.log('Particle.js loaded');
    });
  }, loadingTime);
};

document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll("#nav ul li a");
  const nav = document.getElementById("nav");
  const header = document.getElementById("header");

  // Function to handle smooth scrolling to section
  function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      window.scrollTo({
        top: offsetTop - 30, // Adjusted to offset for sticky nav height
        behavior: "smooth"
      });

      // Mark the clicked link as active
      navLinks.forEach(function(link) {
        link.parentNode.classList.remove("active");
      });
      document.querySelector(`#nav ul li a[href="#${targetId}"]`).parentNode.classList.add("active");
    }
  }

  // Smooth scrolling on click for each nav link
  navLinks.forEach(function(navLink) {
    navLink.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = navLink.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });

  // Function to handle changing navbar background color on scroll
  function changeNavbarBackground() {
    if (window.scrollY > header.clientHeight) {
      nav.style.backgroundColor = '#fff'; 
    } else {
      nav.style.backgroundColor = '#D0D1D4'; // Default color when scrolled back to top
    }
  }

  // Highlight active link on scroll
  function highlightActiveLink() {
    const scrollPosition = window.scrollY + (window.innerHeight / 2);
  
    navLinks.forEach(function(navLink) {
      const targetId = navLink.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY; // Calculate absolute top position
  
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + rect.height) {
          navLinks.forEach(function(link) {
            link.parentNode.classList.remove("active");
          });
          navLink.parentNode.classList.add("active");
        }
      }
    });
  }

  // Event listeners for scroll and page load
  window.addEventListener("scroll", function() {
    changeNavbarBackground();
    highlightActiveLink();
  });

  // Change navbar background on page load
  changeNavbarBackground();
});
