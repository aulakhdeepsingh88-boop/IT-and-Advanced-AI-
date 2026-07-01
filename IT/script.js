const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const animateCounters = () => {
  document.querySelectorAll('.count').forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    const update = () => {
      current += step;
      if (current >= target) {
        counter.textContent = `${target}${target === 98 ? '%' : '+'}`;
        return;
      }
      counter.textContent = `${current}${target === 98 ? '%' : '+'}`;
      requestAnimationFrame(update);
    };

    update();
  });
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector('.stats');
statsSection && counterObserver.observe(statsSection);

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name')?.value.trim() || 'there';
  const email = document.getElementById('email')?.value.trim() || 'your email';
  const message = document.getElementById('message')?.value.trim() || 'Hello';

  const subject = encodeURIComponent(`New inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:hello@futuretech.com?subject=${subject}&body=${body}`;
  formStatus.textContent = `Thanks, ${name}! Your message is ready to send.`;
  contactForm.reset();
});
