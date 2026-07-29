const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function initNavigation() {
  const nav = document.querySelector("[data-mc-nav]");
  const toggle = document.querySelector("[data-mc-nav-toggle]");
  const menu = document.querySelector("[data-mc-nav-menu]");
  if (!nav || !toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("mc-nav--open");
    menu.classList.toggle("mc-nav__links--open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

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
  const storyByName = storyBlocks.reduce((map, block) => {
    map[block.dataset.mcStory] = block;
    return map;
  }, {});
  const parallaxItems = Array.from(document.querySelectorAll("[data-mc-parallax]"));
  let ticking = false;
  let scrollSettleTimer = 0;
  let isProgrammaticScroll = false;
  let activeStory = "spawn";

  function update() {
    const rect = world.getBoundingClientRect();
    const total = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp((0 - rect.top) / total, 0, 1);
    world.style.setProperty("--mc-scroll-progress", progress.toFixed(4));

    activeStory = "spawn";
    storyBlocks.forEach((block) => {
      const blockRect = block.getBoundingClientRect();
      const midpoint = window.innerHeight * 0.42;
      if (blockRect.top <= midpoint && blockRect.bottom >= midpoint) {
        activeStory = block.dataset.mcStory;
      }
    });

    Object.entries(nodes).forEach(([name, node]) => {
      if (!node) return;
      const isActive = name === activeStory;
      node.classList.toggle("is-active", isActive);
      if (isActive) {
        node.setAttribute("aria-current", "step");
      } else {
        node.removeAttribute("aria-current");
      }
    });

    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.mcParallax || 0);
      const itemRect = item.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - itemRect.top - itemRect.height / 2) * speed;
      item.style.setProperty("--mc-parallax-offset", `${offset.toFixed(1)}px`);
    });

    ticking = false;
  }

  function storyScrollTop(block) {
    const rect = block.getBoundingClientRect();
    const scrollPadding = 92;
    return Math.max(0, window.scrollY + rect.top - scrollPadding);
  }

  function smoothScrollTo(block) {
    isProgrammaticScroll = true;
    window.scrollTo({
      top: storyScrollTop(block),
      behavior: "smooth",
    });
    window.setTimeout(() => {
      isProgrammaticScroll = false;
    }, 900);
  }

  function nearestStoryBlock() {
    const anchorLine = window.innerHeight * 0.32;
    return storyBlocks.reduce((nearest, block) => {
      const rect = block.getBoundingClientRect();
      const distance = Math.abs(rect.top - anchorLine);
      if (!nearest || distance < nearest.distance) return { block, distance };
      return nearest;
    }, null);
  }

  function settleNearStory() {
    if (isProgrammaticScroll || window.innerWidth < 760) return;

    const nearest = nearestStoryBlock();
    if (!nearest || nearest.distance > window.innerHeight * 0.24) return;

    const targetTop = storyScrollTop(nearest.block);
    if (Math.abs(window.scrollY - targetTop) < 28) return;

    smoothScrollTo(nearest.block);
  }

  function requestUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }

    window.clearTimeout(scrollSettleTimer);
    scrollSettleTimer = window.setTimeout(settleNearStory, 180);
  }

  Object.entries(nodes).forEach(([name, node]) => {
    if (!node || !storyByName[name]) return;
    node.addEventListener("click", () => smoothScrollTo(storyByName[name]));
  });

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
    particle.style.left = `${Math.random() * 96}%`;
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

function initCopyButtons() {
  if (!navigator.clipboard?.writeText) return;

  document.querySelectorAll("[data-mc-copy-address]").forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", async () => {
      const status = button.getAttribute("aria-describedby")
        ? document.getElementById(button.getAttribute("aria-describedby"))
        : null;

      try {
        await navigator.clipboard.writeText(button.dataset.mcCopyAddress);
        if (status) status.textContent = `${button.dataset.mcCopyLabel}已复制。`;
      } catch {
        if (status) status.textContent = "复制失败，请手动选择地址复制。";
      }
    });
  });
}

function initSearch() {
  const form = document.querySelector("[data-mc-search]");
  const results = document.querySelector("[data-mc-search-results]");
  const status = document.querySelector("[data-mc-search-status]");
  if (!form || !results || !status) return;

  const input = form.elements.q;
  let entries;

  async function loadIndex() {
    if (!entries) {
      const response = await fetch(form.dataset.mcSearchIndex);
      if (!response.ok) throw new Error(`Search index returned ${response.status}`);
      entries = await response.json();
    }
    return entries;
  }

  async function search(query) {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    results.replaceChildren();
    if (!normalizedQuery) {
      status.textContent = "请输入搜索关键词。";
      return;
    }

    status.textContent = "正在搜索...";
    try {
      const index = await loadIndex();
      const matches = index.filter((entry) =>
        `${entry.title} ${entry.summary} ${entry.content}`.toLocaleLowerCase().includes(normalizedQuery)
      ).slice(0, 30);

      matches.forEach((entry) => {
        const link = document.createElement("a");
        const title = document.createElement("span");
        const summary = document.createElement("small");
        link.href = entry.url;
        title.textContent = entry.title;
        summary.textContent = entry.summary || "打开此页面查看详情。";
        link.append(title, summary);
        results.append(link);
      });
      status.textContent = matches.length ? `找到 ${matches.length} 条结果。` : "没有找到匹配内容，请尝试更短的关键词。";
    } catch {
      status.textContent = "搜索索引加载失败，请稍后重试或从导航浏览资料。";
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value;
    const url = new URL(window.location.href);
    query.trim() ? url.searchParams.set("q", query.trim()) : url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
    search(query);
  });

  const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
  if (initialQuery) {
    input.value = initialQuery;
    search(initialQuery);
  }
}

revealOnScroll();
initNavigation();
driveScrollStory();
createParticleField();
decorateThemeToggle();
initCopyButtons();
initSearch();
window.addEventListener("pointerdown", createClickBlock, { passive: true });
