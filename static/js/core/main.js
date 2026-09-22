/* =========================================================
   FORENSIC AI — CORE JAVASCRIPT
   ========================================================= */

(function () {

    "use strict";


    /* -------------------------------------------------------
       DOM READY
       ------------------------------------------------------- */

    document.addEventListener("DOMContentLoaded", function () {

        initializeApplication();

    });


    /* -------------------------------------------------------
       APPLICATION INITIALIZATION
       ------------------------------------------------------- */

    function initializeApplication() {

        initializeMobileMenu();

        initializeSearchShortcut();

        initializeAlertDismissal();

        initializeGlobalKeyboardEvents();

        initializeSmoothLinks();

        console.log(
            "%c FORENSIC AI ",
            "background:#05070D;color:#25D9FF;padding:6px 10px;font-weight:bold;"
        );

        console.log(
            "%c FAI CORE SYSTEM INITIALIZED ",
            "color:#35E39A;font-family:monospace;"
        );

    }


    /* -------------------------------------------------------
       MOBILE MENU
       ------------------------------------------------------- */

    function initializeMobileMenu() {

        const menuButton =
            document.getElementById("mobileMenuBtn");

        const sidebar =
            document.querySelector(".command-sidebar");

        if (!menuButton || !sidebar) {
            return;
        }


        menuButton.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "mobile-open"
                );

                menuButton.classList.toggle(
                    "active"
                );

                document.body.classList.toggle(
                    "sidebar-mobile-open"
                );

            }
        );


        /* Close when clicking outside */

        document.addEventListener(
            "click",
            function (event) {

                const clickedInsideSidebar =
                    sidebar.contains(event.target);

                const clickedMenu =
                    menuButton.contains(event.target);


                if (
                    !clickedInsideSidebar &&
                    !clickedMenu &&
                    sidebar.classList.contains(
                        "mobile-open"
                    )
                ) {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "sidebar-mobile-open"
                    );

                }

            }
        );

    }


    /* -------------------------------------------------------
       SEARCH SHORTCUT
       ------------------------------------------------------- */

    function initializeSearchShortcut() {

        const searchButton =
            document.getElementById(
                "navbarSearchBtn"
            );

        if (!searchButton) {
            return;
        }


        searchButton.addEventListener(
            "click",
            function () {

                openSearchInterface();

            }
        );

    }


    function openSearchInterface() {

        /*
         * Search system will be connected
         * to investigation history later.
         */

        console.log(
            "Forensic search interface requested."
        );

        if (
            window.ForensicModal &&
            typeof window.ForensicModal.open ===
            "function"
        ) {

            window.ForensicModal.open(
                "Search investigations"
            );

        }

    }


    /* -------------------------------------------------------
       KEYBOARD SHORTCUTS
       ------------------------------------------------------- */

    function initializeGlobalKeyboardEvents() {

        document.addEventListener(
            "keydown",
            function (event) {

                /*
                 * CTRL + K
                 */

                if (
                    (event.ctrlKey ||
                     event.metaKey) &&
                    event.key.toLowerCase() === "k"
                ) {

                    event.preventDefault();

                    openSearchInterface();

                }


                /*
                 * ESCAPE
                 */

                if (
                    event.key === "Escape"
                ) {

                    closeActiveInterfaces();

                }

            }
        );

    }


    /* -------------------------------------------------------
       CLOSE ACTIVE UI
       ------------------------------------------------------- */

    function closeActiveInterfaces() {

        /*
         * Close mobile sidebar
         */

        const sidebar =
            document.querySelector(
                ".command-sidebar"
            );

        if (sidebar) {

            sidebar.classList.remove(
                "mobile-open"
            );

        }


        const menuButton =
            document.getElementById(
                "mobileMenuBtn"
            );

        if (menuButton) {

            menuButton.classList.remove(
                "active"
            );

        }


        document.body.classList.remove(
            "sidebar-mobile-open"
        );


        /*
         * Close modal
         */

        if (
            window.ForensicModal &&
            typeof window.ForensicModal.close ===
            "function"
        ) {

            window.ForensicModal.close();

        }

    }


    /* -------------------------------------------------------
       ALERT DISMISSAL
       ------------------------------------------------------- */

    function initializeAlertDismissal() {

        document.addEventListener(
            "click",
            function (event) {

                const closeButton =
                    event.target.closest(
                        ".alert-close"
                    );

                if (!closeButton) {
                    return;
                }


                const alert =
                    closeButton.closest(
                        ".forensic-alert"
                    );

                if (!alert) {
                    return;
                }


                alert.classList.add(
                    "alert-removing"
                );


                setTimeout(
                    function () {

                        alert.remove();

                    },
                    250
                );

            }
        );

    }


    /* -------------------------------------------------------
       SMOOTH INTERNAL LINKS
       ------------------------------------------------------- */

    function initializeSmoothLinks() {

        document.addEventListener(
            "click",
            function (event) {

                const link =
                    event.target.closest(
                        'a[href^="#"]'
                    );

                if (!link) {
                    return;
                }


                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* -------------------------------------------------------
       GLOBAL HELPERS
       ------------------------------------------------------- */

    window.ForensicCore = {

        closeInterfaces:
            closeActiveInterfaces,

        openSearch:
            openSearchInterface

    };


})();
