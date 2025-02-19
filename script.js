//show and hide menu navbar
document.addEventListener("DOMContentLoaded", function () {
    const topMenu = document.getElementById("topMenu");
    const menuSpan = document.getElementById("menuSpan");

    function updateMenuVisibility() {
        if (window.scrollY > 50) {
            // Hide topMenu and show menuSpan
            topMenu.style.opacity = "0";
            topMenu.style.visibility = "hidden";
            topMenu.style.pointerEvents = "none";

            menuSpan.style.opacity = "1";
            menuSpan.style.visibility = "visible";
            menuSpan.style.pointerEvents = "auto";
        } else {
            // Show topMenu and hide menuSpan
            topMenu.style.opacity = "1";
            topMenu.style.visibility = "visible";
            topMenu.style.pointerEvents = "auto";

            menuSpan.style.opacity = "0";
            menuSpan.style.visibility = "hidden";
            menuSpan.style.pointerEvents = "none";
        }
    }

    // Run once on page load
    updateMenuVisibility();

    // Listen for scroll events
    window.addEventListener("scroll", updateMenuVisibility);
});



//key text highlighter when scroll items
document.addEventListener("DOMContentLoaded", function () {
    const keyItems = document.querySelectorAll(".key h1");
    const sections = document.querySelectorAll("div[id$='_section']");
    const asections = document.querySelectorAll("a[id$='_section']");
    let lastHighlighted = null;

    function highlightSection() {
        let highlighted = null;
        let minDistance = Infinity;
        const triggerPoint = window.innerHeight * 0.5; // 80% of viewport height

        //for div sections
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const sectionMid = rect.top + rect.height / 2; // Midpoint of section

            if (sectionMid >= 0 && sectionMid <= window.innerHeight) {
                const distanceFromTrigger = Math.abs(sectionMid - triggerPoint);

                if (distanceFromTrigger < minDistance) {
                    minDistance = distanceFromTrigger;
                    highlighted = section.id.replace("_section", "");
                }
            }
        })

        //for a sections
        asections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const sectionMid = rect.top + rect.height / 2; // Midpoint of section

            if (sectionMid >= 0 && sectionMid <= window.innerHeight) {
                const distanceFromTrigger = Math.abs(sectionMid - triggerPoint);

                if (distanceFromTrigger < minDistance) {
                    minDistance = distanceFromTrigger;
                    highlighted = section.id.replace("_section", "");
                }
            }
        });

        if (window.scrollY === 0) {
            highlighted = "introduction";
        }

        if (highlighted !== lastHighlighted) {
            keyItems.forEach((item) => {
                if (item.id === highlighted) {
                    item.classList.add("highlighted");
                } else {
                    item.classList.remove("highlighted");
                }
            });
            lastHighlighted = highlighted;
        }
    }

    keyItems.forEach((item) => {
        item.style.cursor = "pointer";

        item.addEventListener("click", function (event) {
            event.preventDefault();
            const sectionId = item.id + "_section";
            const section = document.getElementById(sectionId);

            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "center" });

                //Force highlight the clicked section immediately
                setTimeout(() => {
                    lastHighlighted = sectionId.replace("_section", "");
                    keyItems.forEach((key) => {
                        key.classList.toggle("highlighted", key.id === lastHighlighted);
                    });
                }, 300); // Small delay to ensure smooth highlight transition
            }
        });
    });

    highlightSection();
    window.addEventListener("scroll", highlightSection);
});

//set time for Detroit
function updateTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var time = hours + ":" + minutes;
    document.getElementById("detroitTime").innerHTML = time;
}
setInterval(updateTime, 1000);

//hide keys when footer appear
document.addEventListener("DOMContentLoaded", function () {
    const key = document.querySelector(".key");
    const footer = document.querySelector("footer"); // Ensure your footer has a <footer> tag

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                key.classList.add("hidden"); // Fade out when footer is visible
            } else {
                key.classList.remove("hidden"); // Fade back in when footer is not visible
            }
        },
        { threshold: 0.01 } // Triggers when 1% of the footer is in view
    );

    observer.observe(footer);
});


//full menu toggle 
document.addEventListener("DOMContentLoaded", function () {
    const menuSpan = document.querySelector("#menuSpan"); // Select by ID
    const fullMenuView = document.querySelector(".fullMenuView");
    const fullMenuContent = document.querySelector(".fullMenuContent");
    const body = document.body; // Select body

    menuSpan.addEventListener("click", function () {
        // Check if the menu is active
        if (fullMenuView.classList.contains("active")) {
            // Menu is closing, so first fade out content
            fullMenuContent.style.opacity = '0'; // Fade out the content
            fullMenuContent.style.transition = 'opacity 0.5s ease'; // Smooth fade-out transition

            // After the fade-out completes, collapse the menu
            setTimeout(() => {
                fullMenuView.style.height = '0'; // Collapse the menu to 0 height
                body.classList.remove("no-scroll"); // Allow scrolling again
            }, 500); // Wait for opacity transition (500ms)

            // Change menu text back to 'Menu'
            menuSpan.innerHTML = 'Menu';
        } else {
            // Menu is opening, so set height to 100% first
            fullMenuView.style.height = '100%'; // Expand the menu to full height
            body.classList.add("no-scroll"); // Prevent scrolling

            // After the height transition completes, fade in the content
            setTimeout(() => {
                fullMenuContent.style.opacity = '1'; // Fade in the content
                fullMenuContent.style.transition = 'opacity 0.5s ease'; // Smooth fade-in transition
            }, 500); // Wait for height transition (500ms)

            // Change menu text to 'Close'
            menuSpan.innerHTML = 'Close';
        }

        // Toggle the active class for the menu
        fullMenuView.classList.toggle("active");
    });
});



//Scroll back to top of site
const backToTopButton = document.getElementById('backtotop');

// When the user clicks on the button, scroll to the top of the document
backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//change color of page:
const button = document.getElementById("changeColor");
const body = document.body;

const themes = ["light-mode", "dark-mode", "gray-mode"];
let currentThemeIndex = 0;

button.addEventListener("click", () => {
    // Remove the previous theme
    body.classList.remove(themes[currentThemeIndex]);

    // Move to the next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    // Add the new theme
    body.classList.add(themes[currentThemeIndex]);
});
