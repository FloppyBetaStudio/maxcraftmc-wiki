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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function driveScrollStory() {
  const world = document.querySelector("[data-mc-scroll-world]");
  if (!world || motionQuery.matches) return;

  const nodes = {
    spawn: document.querySelector(".mc-world-path__node--spawn"),
    rules: document.querySelector(".mc-world-path__node--rules"),
    world: document.querySelector(".mc-world-path__node--world"),
    archive: document.querySelector(".mc-world-path__node--archive"),
  };
  const storyBlocks = Array.from(document.querySelectorAll("[data-mc-story]"));
  const parallaxItems = Array.from(document.querySelectorAll("[data-mc-parallax]"));
  let ticking = false;

  function update() {
    const rect = world.getBoundingClientRect();
    const total = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp((0 - rect.top) / total, 0, 1);
    world.style.setProperty("--mc-scroll-progress", progress.toFixed(4));

    let activeStory = "spawn";
    storyBlocks.forEach((block) => {
      const blockRect = block.getBoundingClientRect();
      const midpoint = window.innerHeight * 0.42;
      if (blockRect.top <= midpoint && blockRect.bottom >= midpoint) {
        activeStory = block.dataset.mcStory;
      }
    });

    Object.entries(nodes).forEach(([name, node]) => {
      if (node) node.classList.toggle("is-active", name === activeStory);
    });

    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.mcParallax || 0);
      const itemRect = item.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - itemRect.top - itemRect.height / 2) * speed;
      item.style.setProperty("--mc-parallax-offset", `${offset.toFixed(1)}px`);
    });

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
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
driveScrollStory();
createParticleField();
decorateThemeToggle();
window.addEventListener("pointerdown", createClickBlock, { passive: true });
