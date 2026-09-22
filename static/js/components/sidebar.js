/* =========================================================
   FORENSIC AI — SIDEBAR CONTROLLER
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        initializeSidebar();

    });



    /* =====================================================
       INITIALIZE SIDEBAR
    ===================================================== */

    function initializeSidebar() {

        /*
         * IMPORTANT:
         * This class matches sidebar.html
         */

        const sidebar =
            document.querySelector(".forensic-sidebar");


        const collapseButton =
            document.getElementById("sidebarCollapseBtn");


        /*
         * Stop if sidebar doesn't exist.
         */

        if (!sidebar) {

            console.warn(
                "Forensic AI: .forensic-sidebar not found."
            );

            return;

        }


        /*
         * Restore saved sidebar state.
         */

        const savedState =
            localStorage.getItem("forensic-sidebar");


        if (
            savedState === "collapsed" &&
            window.innerWidth > 768
        ) {

            sidebar.classList.add("collapsed");

            document.body.classList.add(
                "sidebar-collapsed"
            );

            updateCollapseIcon(true);

        }


        /*
         * Collapse / Expand button.
         */

        if (collapseButton) {

            collapseButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    toggleSidebar(sidebar);

                }
            );

        } else {

            console.warn(
                "Forensic AI: #sidebarCollapseBtn not found."
            );

        }


        /*
         * Initialize navigation.
         */

        initializeActiveNavigation();

    }



    /* =====================================================
       TOGGLE SIDEBAR
    ===================================================== */

    function toggleSidebar(sidebar) {

        /*
         * Add/remove collapsed class.
         */

        const collapsed =
            sidebar.classList.toggle("collapsed");


        /*
         * Update body class.
         */

        document.body.classList.toggle(
            "sidebar-collapsed",
            collapsed
        );


        /*
         * Save user's preference.
         */

        localStorage.setItem(
            "forensic-sidebar",
            collapsed
                ? "collapsed"
                : "expanded"
        );


        /*
         * Change arrow direction.
         */

        updateCollapseIcon(collapsed);

    }



    /* =====================================================
       UPDATE ARROW ICON
    ===================================================== */

    function updateCollapseIcon(collapsed) {

        const collapseButton =
            document.getElementById(
                "sidebarCollapseBtn"
            );


        if (!collapseButton) {

            return;

        }


        /*
         * Your sidebar.html uses:
         *
         * <span>‹</span>
         *
         * NOT an <i> element.
         */

        const arrow =
            collapseButton.querySelector("span");


        if (!arrow) {

            return;

        }


        if (collapsed) {

            arrow.textContent = "›";

            collapseButton.setAttribute(
                "aria-label",
                "Expand sidebar"
            );

        } else {

            arrow.textContent = "‹";

            collapseButton.setAttribute(
                "aria-label",
                "Collapse sidebar"
            );

        }

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function initializeActiveNavigation() {

        /*
         * This matches sidebar.html:
         *
         * class="sidebar-link"
         */

        const links =
            document.querySelectorAll(
                ".sidebar-link"
            );


        const currentPath =
            window.location.pathname;


        links.forEach(function (link) {

            const href =
                link.getAttribute("href");


            /*
             * Don't process empty/# links.
             */

            if (
                !href ||
                href === "#"
            ) {

                return;

            }


            if (currentPath === href) {

                link.classList.add("active");

            }

        });

    }



    /* =====================================================
       RESPONSIVE SIDEBAR
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            const sidebar =
                document.querySelector(
                    ".forensic-sidebar"
                );


            if (!sidebar) {

                return;

            }


            /*
             * Mobile view.
             */

            if (window.innerWidth <= 768) {

                sidebar.classList.remove(
                    "collapsed"
                );

                document.body.classList.remove(
                    "sidebar-collapsed"
                );

                updateCollapseIcon(false);

            }

        }
    );


})();