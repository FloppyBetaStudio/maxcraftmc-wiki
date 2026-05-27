const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function revealOnScroll() {
  const items = document.querySelectorAll(".mc-hero__copy, .mc-launcher, .mc-section__wrap, .mc-page-hero__inner, .mc-page-content, .mc-footer__inner");
  if (motionQuery.matches) {
    items.forEach((item) => item.classList.add("mc-reveal--visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("mc-reveal--visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.14 });

  items.forEach((item) => {
    item.classList.add("mc-reveal");
    observer.observe(item);
  });
}

function createParticleField() {
  const field = document.querySelector("[data-mc-particles]");
  if (!field || motionQuery.matches) return;

  const particleCount = 34;
  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    particle.className = "mc-particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 9}s`;
    particle.style.animationDuration = `${7 + Math.random() * 8}s`;
    particle.style.opacity = `${0.35 + Math.random() * 0.55}`;
    field.appendChild(particle);
  }
}

function createClickBlock(event) {
  if (motionQuery.matches) return;

  const block = document.createElement("span");
  block.className = "mc-click-block";
  block.style.left = `${event.clientX}px`;
  block.style.top = `${event.clientY}px`;
  document.body.appendChild(block);
  window.setTimeout(() => block.remove(), 720);
}

function decorateThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle || motionQuery.matches) return;

  toggle.addEventListener("click", () => {
    const flash = document.createElement("span");
    flash.className = "mc-theme-flash";
    document.body.appendChild(flash);
    window.setTimeout(() => flash.remove(), 680);
  });
}

revealOnScroll();
createParticleField();
decorateThemeToggle();
window.addEventListener("pointerdown", createClickBlock, { passive: true });
