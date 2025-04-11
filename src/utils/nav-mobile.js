export function initializeMobileNav() {
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link-mobile");
    const mobileNavHeight = 77; // Fixed mobile nav height at bottom
    const menuHeight = 100; // Fixed menu height at top

    // Get all sections based on mobile nav links
    const sections = Array.from(navLinks)
      .map((link) => {
        // Extract the section ID from the href attribute
        const href = link.getAttribute("href");
        // Handle both "#section-id" and "/#section-id" formats
        const sectionId = href.startsWith("/#")
          ? href.replace("/#", "")
          : href.replace("#", "");

        // Find the element with this ID
        return document.getElementById(sectionId);
      })
      .filter(Boolean); // Remove any null values

    // Variable to store the last active section
    let lastActiveSection = null;

    function updateActiveNav(linkElement) {
      navLinks.forEach((nav) => {
        const img = nav.querySelector("img");
        const icon = nav.dataset.icon;
        img.src = `/images/nav-mobile-${icon}-icon.svg`;

        // Reset the associated span styling - find parent li and then span
        const parentLi = nav.closest("li");
        if (parentLi) {
          const span = parentLi.querySelector("span");
          if (span) {
            span.classList.remove("font-medium", "text-[#96F50A]");
          }
        }
      });

      const selectedImg = linkElement.querySelector("img");
      const selectedIcon = linkElement.dataset.icon;
      selectedImg.src = `/images/nav-mobile-${selectedIcon}-icon-active.svg`;

      // Add highlighting to the associated span
      const parentLi = linkElement.closest("li");
      if (parentLi) {
        const span = parentLi.querySelector("span");
        if (span) {
          span.classList.add("font-medium", "text-[#96F50A]");
        }
      }
    }

    // The rest of the function remains unchanged
    navLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        // Update active state on click
        updateActiveNav(this);
      });
    });

    // Add scroll event listener for highlighting
    window.addEventListener("scroll", highlightMobileNavigation);

    // Call once on load to set initial state
    highlightMobileNavigation();

    function highlightMobileNavigation() {
      // Get current scroll position
      // Account for both top menu and bottom mobile nav
      const scrollPosition = window.scrollY + menuHeight;

      // Check if any section is currently in view
      let currentSectionInView = false;
      let currentSection = null;

      // Sort sections by their position from top to bottom
      const sortedSections = [...sections]
        .filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop);

      // Find the section that's currently in view
      for (const section of sortedSections) {
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Check if the current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.getAttribute("id");
          currentSectionInView = true;
          lastActiveSection = currentSection;
          break;
        }
      }

      // If no section is in view, keep the last active section
      if (!currentSectionInView && lastActiveSection) {
        currentSection = lastActiveSection;
      }

      // Special case for the last section - if we're at the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - mobileNavHeight
      ) {
        // We're at the bottom of the page, highlight the last section
        currentSection =
          sortedSections[sortedSections.length - 1]?.getAttribute("id");
        lastActiveSection = currentSection;
      }

      // Update mobile navigation links
      if (currentSection) {
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          const linkSectionId = href.startsWith("/#")
            ? href.replace("/#", "")
            : href.replace("#", "");

          // Update active link icon
          if (linkSectionId === currentSection) {
            updateActiveNav(link);
          }
        });
      }
    }

    // Initial check on page load for direct URL access
    function checkActiveNavFromURL() {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace("#", "");
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          const linkSectionId = href.includes("#")
            ? href.substring(href.indexOf("#") + 1)
            : "";

          if (linkSectionId === sectionId) {
            updateActiveNav(link);
          }
        });
      } else {
        // If no hash, highlight the first section by default
        const firstLink = navLinks[0];
        if (firstLink) {
          updateActiveNav(firstLink);
        }
      }
    }

    checkActiveNavFromURL();
  });
}
