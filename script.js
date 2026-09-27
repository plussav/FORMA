document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // HEADER
    // ==========================================

    const header = document.querySelector(".header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader);


    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuButton = document.getElementById("menuButton");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {
            menuButton.classList.toggle("active");
            nav.classList.toggle("active");
        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                menuButton.classList.remove("active");
                nav.classList.remove("active");
            });

        });
    }


    // ==========================================
    // THEME
    // ==========================================

    const themeButton = document.getElementById("themeButton");

    if (themeButton) {

        const savedTheme = localStorage.getItem("forma-theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
            themeButton.textContent = "☀";
        }

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark-theme");

            const dark =
                document.body.classList.contains("dark-theme");

            localStorage.setItem(
                "forma-theme",
                dark ? "dark" : "light"
            );

            themeButton.textContent =
                dark ? "☀" : "☾";

        });
    }


    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target =
                document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // ==========================================
    // PROJECT FILTER
    // ==========================================

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            projectCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });


    // ==========================================
    // PROJECT DATA
    // ==========================================

    const projects = {

        aurora: {
            title: "Villa Aurora",
            location: "Алматы",
            year: "2024",
            type: "Residential",
            area: "420 м²"
        },

        line: {
            title: "LINE Office",
            location: "Астана",
            year: "2023",
            type: "Commercial",
            area: "1 850 м²"
        },

        museum: {
            title: "Forma Museum",
            location: "Ташкент",
            year: "2022",
            type: "Public",
            area: "4 200 м²"
        },

        mono: {
            title: "Mono Apartment",
            location: "Астана",
            year: "2024",
            type: "Interior",
            area: "118 м²"
        },

        north: {
            title: "North Tower",
            location: "Астана",
            year: "2021",
            type: "Commercial",
            area: "12 500 м²"
        },

        frame: {
            title: "Frame House",
            location: "Бурабай",
            year: "2023",
            type: "Residential",
            area: "280 м²"
        }

    };


    // ==========================================
    // CREATE MODAL
    // ==========================================

    const modal = document.createElement("div");

    modal.className = "project-modal";

    modal.innerHTML = `

        <div class="modal-overlay"></div>

        <div class="modal-window">

            <button
                class="modal-close"
                type="button"
                aria-label="Закрыть"
            >
                ×
            </button>

            <div class="modal-content">

                <span class="modal-label">
                    PROJECT
                </span>

                <h2 class="modal-title"></h2>

                <div class="modal-info">

                    <div>
                        <span>Локация</span>
                        <strong class="modal-location"></strong>
                    </div>

                    <div>
                        <span>Год</span>
                        <strong class="modal-year"></strong>
                    </div>

                    <div>
                        <span>Тип</span>
                        <strong class="modal-type"></strong>
                    </div>

                    <div>
                        <span>Площадь</span>
                        <strong class="modal-area"></strong>
                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    const modalTitle =
        modal.querySelector(".modal-title");

    const modalLocation =
        modal.querySelector(".modal-location");

    const modalYear =
        modal.querySelector(".modal-year");

    const modalType =
        modal.querySelector(".modal-type");

    const modalArea =
        modal.querySelector(".modal-area");

    const closeModalButton =
        modal.querySelector(".modal-close");

    const modalOverlay =
        modal.querySelector(".modal-overlay");


    // ==========================================
    // OPEN MODAL
    // ==========================================

    function openProject(id) {

        const project = projects[id];

        if (!project) {
            console.error(
                "Проект не найден:",
                id
            );
            return;
        }

        modalTitle.textContent =
            project.title;

        modalLocation.textContent =
            project.location;

        modalYear.textContent =
            project.year;

        modalType.textContent =
            project.type;

        modalArea.textContent =
            project.area;

        modal.classList.add("show");

        document.body.classList.add(
            "modal-open"
        );
    }


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    function closeModal() {

        modal.classList.remove("show");

        document.body.classList.remove(
            "modal-open"
        );

    }


    closeModalButton.addEventListener(
        "click",
        closeModal
    );

    modalOverlay.addEventListener(
        "click",
        closeModal
    );


    // ==========================================
    // PROJECT BUTTONS
    // ==========================================

    document.querySelectorAll(".project-open")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const card =
                        button.closest(".project-card");

                    if (!card) return;

                    const projectId =
                        card.dataset.project;

                    openProject(projectId);

                }
            );

        });


    // ==========================================
    // ESC CLOSE
    // ==========================================

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    // ==========================================
    // COUNTERS
    // ==========================================

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element =
                        entry.target;

                    const target =
                        Number(
                            element.dataset.counter
                        );

                    let current = 0;

                    const duration = 1200;

                    const start =
                        performance.now();


                    function animate(time) {

                        const progress =
                            Math.min(
                                (time - start) /
                                duration,
                                1
                            );

                        current =
                            Math.floor(
                                target * progress
                            );

                        element.textContent =
                            current;

                        if (progress < 1) {

                            requestAnimationFrame(
                                animate
                            );

                        } else {

                            element.textContent =
                                target;

                        }

                    }

                    requestAnimationFrame(
                        animate
                    );

                    counterObserver.unobserve(
                        element
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById("name");

                const phone =
                    document.getElementById("phone");

                const email =
                    document.getElementById("email");

                const message =
                    document.getElementById("message");


                if (
                    !name ||
                    !phone ||
                    !email ||
                    !message
                ) {
                    return;
                }


                if (
                    name.value.trim() === "" ||
                    phone.value.trim() === "" ||
                    email.value.trim() === "" ||
                    message.value.trim() === ""
                ) {

                    alert(
                        "Пожалуйста, заполните все поля."
                    );

                    return;

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    alert(
                        "Введите корректный email."
                    );

                    return;

                }


                alert(
                    "Спасибо! Ваша заявка отправлена."
                );

                contactForm.reset();

            }
        );

    }


    // ==========================================
    // PHONE MASK
    // ==========================================

    const phoneInput =
        document.getElementById("phone");


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                let value =
                    phoneInput.value
                        .replace(/\D/g, "");


                if (value.length === 0) {
                    phoneInput.value = "";
                    return;
                }


                if (value[0] === "8") {
                    value =
                        "7" + value.slice(1);
                }


                if (value[0] !== "7") {
                    value =
                        "7" + value;
                }


                value =
                    value.slice(0, 11);


                let result = "+7";


                if (value.length > 1) {
                    result +=
                        " (" +
                        value.slice(1, 4);
                }


                if (value.length >= 4) {
                    result += ") ";
                }


                if (value.length > 4) {
                    result +=
                        value.slice(4, 7);
                }


                if (value.length > 7) {
                    result +=
                        "-" +
                        value.slice(7, 9);
                }


                if (value.length > 9) {
                    result +=
                        "-" +
                        value.slice(9, 11);
                }


                phoneInput.value =
                    result;

            }
        );

    }


    // ==========================================
    // CURRENT YEAR
    // ==========================================

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    // ==========================================
    // REVEAL ANIMATION
    // ==========================================

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (revealElements.length > 0) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("revealed");

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    }


    // ==========================================
    // PAGE LOADED
    // ==========================================

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "FORMA website успешно запущен."
    );

});