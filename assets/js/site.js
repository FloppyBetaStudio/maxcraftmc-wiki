const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

createParticleField();
window.addEventListener("pointerdown", createClickBlock, { passive: true });
