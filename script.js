//show and hide menu navbar
document.addEventListener("DOMContentLoaded", function () {
    const topMenu = document.getElementById("topMenu");
    const menuSpan = document.getElementById("menuSpan");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            topMenu.style.opacity = "0";
            topMenu.style.pointerEvents = "none";
            menuSpan.style.opacity = "1";
        } else {
            topMenu.style.opacity = "1";
            topMenu.style.pointerEvents = "auto";
            topMenu.classList.add("fade-in");
            menuSpan.style.opacity = "0";
        }
    });
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