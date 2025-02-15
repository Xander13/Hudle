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