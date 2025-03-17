export function initializeMobileNav() {
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link-mobile");

    function updateActiveNav(linkElement) {
      navLinks.forEach((nav) => {
        const img = nav.querySelector("img");
        const icon = nav.dataset.icon;
        img.src = `/images/nav-mobile-${icon}-icon.svg`;
      });

      const selectedImg = linkElement.querySelector("img");
      const selectedIcon = linkElement.dataset.icon;
      selectedImg.src = `/images/nav-mobile-${selectedIcon}-icon-active.svg`;
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        const linkHref = new URL(this.href, window.location.origin).pathname;
        const currentPath = window.location.pathname;

        if (linkHref === currentPath) {
          updateActiveNav(this);
        }
      });
    });

    function checkActiveNavFromURL() {
      const currentURL = window.location.href;
      navLinks.forEach((link) => {
        if (currentURL.includes(link.getAttribute("href"))) {
          updateActiveNav(link);
        }
      });
    }

    checkActiveNavFromURL();
  });
}
