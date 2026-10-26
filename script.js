const sectionLinks = [...document.querySelectorAll(".navigation-links a")];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

document.querySelector(".wordmark").addEventListener("click", () => {
  for (const link of sectionLinks) {
    link.removeAttribute("aria-current");
  }
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        for (const link of sectionLinks) {
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      }
    },
    { rootMargin: "-20% 0px -20% 0px" },
  );

  for (const section of sections) {
    sectionObserver.observe(section);
  }
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
