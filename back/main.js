// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.querySelector('.faq-content');
  
    faqContainer.addEventListener('click', (e) => {
      const groupHeader = e.target.closest('.faq-group-header');
  
      if (!groupHeader) return;
  
      const group = groupHeader.parentElement;
      const groupBody = group.querySelector('.faq-group-body');
      const icon = groupHeader.querySelector('i');
  
      // Toggle icon
      icon.classList.toggle('fa-plus');
      icon.classList.toggle('fa-minus');
  
      // Toggle visibility of body
      groupBody.classList.toggle('open');
  
      // Close other open FAQ bodies
      const otherGroups = faqContainer.querySelectorAll('.faq-group');
  
      otherGroups.forEach((otherGroup) => {
        if (otherGroup !== group) {
          const otherGroupBody = otherGroup.querySelector('.faq-group-body');
          const otherIcon = otherGroup.querySelector('.faq-group-header i');
  
          otherGroupBody.classList.remove('open');
          otherIcon.classList.remove('fa-minus');
          otherIcon.classList.add('fa-plus');
        }
      });
    });
  });
  
  // Mobile Menu
  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');
  
    hamburgerButton.addEventListener('click', () =>
      mobileMenu.classList.toggle('active')
    );
  });

// On Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
  const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  const elements = document.querySelectorAll(
    '.hero, .sobrenos, .testimonials.bg-dark, .pricing, .faq.bg-light, .footer.bg-black, .all'
  );

  elements.forEach((element) => myObserver.observe(element));

  
  const footerCard = document.querySelector('.footer .card');
  if (footerCard) {
    myObserver.observe(footerCard); 
  }

  const cards = document.querySelectorAll('.testimonials-grid .card, .pricing-grid .card');
  const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      const card = entry.target;
      if (entry.isIntersecting) {
        setTimeout(() => {
          card.classList.add('animate');
        }, index * 300); 
      } else {
        card.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.3
  });

  cards.forEach(card => cardsObserver.observe(card));
});


