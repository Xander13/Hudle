document.addEventListener("DOMContentLoaded", function () {
    const topMenu = document.getElementById("topMenu");
    const menuSpan = document.getElementById("menuSpan");
    const menuCorner = document.getElementById("menuCorner"); // Fixed `this.getElementById`

    function updateMenuVisibility() {
        if (window.innerWidth <= 601) {
            // Ensure menuCorner is visible on small screens
            menuCorner.style.opacity = "1";
            menuCorner.style.visibility = "visible";
            menuCorner.style.pointerEvents = "auto";

            topMenu.style.opacity = "0";
            topMenu.style.visibility = "hidden";
            topMenu.style.pointerEvents = "none";

            window.removeEventListener("scroll", updateMenuVisibility);
            return;
        }

        if (window.scrollY > 50) {
            topMenu.style.opacity = "0";
            topMenu.style.visibility = "hidden";
            topMenu.style.pointerEvents = "none";

            menuCorner.style.opacity = "1";
            menuCorner.style.visibility = "visible";
            menuCorner.style.pointerEvents = "auto";
        } else {
            topMenu.style.opacity = "1";
            topMenu.style.visibility = "visible";
            topMenu.style.pointerEvents = "auto";

            menuCorner.style.opacity = "0";
            menuCorner.style.visibility = "hidden";
            menuCorner.style.pointerEvents = "none";
        }
    }

    function checkWindowSize() {
        if (window.innerWidth > 601) {
            updateMenuVisibility();
            window.addEventListener("scroll", updateMenuVisibility);
        } else {
            // Hide topMenu and show menuCorner explicitly for small screens
            topMenu.style.opacity = "0";
            topMenu.style.visibility = "hidden";
            topMenu.style.pointerEvents = "none";

            menuCorner.style.opacity = "1";
            menuCorner.style.visibility = "visible";
            menuCorner.style.pointerEvents = "auto";

            window.removeEventListener("scroll", updateMenuVisibility);
        }
    }

    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
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
// const backToTopButton = document.getElementById('backtotop');

// // When the user clicks on the button, scroll to the top of the document
// backToTopButton.addEventListener('click', function () {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// });


//nav slides down on mobile settings
document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const slider = document.getElementById("slider");
    let timeout; // Store timeout for resetting

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down, hide the nav
            slider.classList.add("hide-nav");
        } else {
            // Scrolling up, show the nav
            slider.classList.remove("hide-nav");
        }

        lastScrollTop = scrollTop;

        // Clear previous timeout and set new one
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            slider.classList.remove("hide-nav"); // Show menu after inactivity
        }, 3000); // 3 seconds delay
    });
});

//nice menu scroll
const menuList = document.querySelector(".menuList");

// Function to duplicate the items in the menu
function duplicateItems() {
    const items = [...menuList.children]; // Get all children in the menuList
    items.forEach(item => {
        const clone = item.cloneNode(true); // Clone each item
        menuList.appendChild(clone); // Append the cloned items
    });
}

// Duplicate the items initially
duplicateItems();

// Function to handle smooth infinite scroll
menuList.addEventListener("scroll", () => {
    if (menuList.scrollTop + menuList.clientHeight >= menuList.scrollHeight) {
        // If we reached the bottom, scroll to the top
        menuList.scrollTop = 0;
    } else if (menuList.scrollTop <= 0) {
        // If we reached the top, scroll to the bottom
        menuList.scrollTop = menuList.scrollHeight / 2;
    }
});

