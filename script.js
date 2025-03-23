// Sidebar Toggle Function
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Theme Toggle Function
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  
  // Change the moon/sun icon
  const themeIcon = document.querySelector(".theme-btn i");
  if (themeIcon.classList.contains("fa-moon")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

// Smooth Scroll
document.querySelectorAll('.sidebar ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById("sidebar").classList.remove("active");
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form Submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // In a real implementation, you would send form data to a server
  // For now, just show an alert
  alert("Thank you for your message! I'll get back to you soon.");
  this.reset();
});

// Add animation to project cards when they come into view
const projectCards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.3 });

projectCards.forEach(card => {
  card.style.transform = 'translateY(20px)';
  card.style.opacity = '0';
  card.style.transition = 'transform 0.5s, opacity 0.5s';
  observer.observe(card);
});