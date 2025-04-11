/**
 * Navigation highlighting script for scrolling sections
 * Adds active class to navigation links based on current scroll position
 */
export const initNavigationHighlighter = () => {
  // Get all navigation links in the header
  const navLinks = document.querySelectorAll("header ul li a");

  // Get the sections based on the href attributes in the navigation links
  const sections = Array.from(navLinks)
    .map((link) => {
      // Extract the section ID from the href attribute
      const href = link.getAttribute("href");
      // Handle both "#section-id" and "/#section-id" formats
      const sectionId = href.startsWith("/#")
        ? href.replace("/#", "")
        : href.replace("#", "");

      // Find the element with this ID (could be any tag, not just section)
      return document.getElementById(sectionId);
    })
    .filter(Boolean); // Remove any null values

  // Get header height to use as offset
  const headerHeight = 100; // Fixed header height as specified

  // Variable to store the last active section
  let lastActiveSection = null;

  // Add scroll event listener
  window.addEventListener("scroll", highlightNavigation);

  // Call once on load to set initial state
  highlightNavigation();

  function highlightNavigation() {
    // Get current scroll position
    const scrollPosition = window.scrollY + headerHeight;

    // Check if any section is currently in view
    let currentSectionInView = false;
    let currentSection = null;

    // Sort sections by their position from top to bottom
    const sortedSections = [...sections].sort(
      (a, b) => a.offsetTop - b.offsetTop
    );

    // Find the section that's currently in view
    for (const section of sortedSections) {
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
      document.body.offsetHeight - 50
    ) {
      // We're at the bottom of the page, highlight the last section
      currentSection =
        sortedSections[sortedSections.length - 1].getAttribute("id");
      lastActiveSection = currentSection;
    }

    // Update navigation links
    navLinks.forEach((link) => {
      // Remove green color from all links
      link.classList.remove("!text-[#96F50A]");

      const href = link.getAttribute("href");
      const linkSectionId = href.startsWith("/#")
        ? href.replace("/#", "")
        : href.replace("#", "");

      // Add green color to the active link
      if (currentSection && linkSectionId === currentSection) {
        link.classList.add("!text-[#96F50A]");
      }
    });
  }
};
