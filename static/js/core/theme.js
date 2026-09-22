/* =========================================================
   FORENSIC AI — THEME CONTROLLER
   ========================================================= */

(function () {

    "use strict";


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initializeTheme();

        }
    );


    /* -------------------------------------------------------
       INITIALIZE
       ------------------------------------------------------- */

    function initializeTheme() {

        const themeButton =
            document.getElementById(
                "themeToggle"
            );


        /*
         * Load saved preference.
         */

        const savedTheme =
            localStorage.getItem(
                "forensic-theme"
            );


        if (savedTheme) {

            document.documentElement.setAttribute(
                "data-theme",
                savedTheme
            );

        }
        else {

            /*
             * Default theme.
             */

            document.documentElement.setAttribute(
                "data-theme",
                "dark"
            );

        }


        if (!themeButton) {
            return;
        }


        themeButton.addEventListener(
            "click",
            function () {

                toggleTheme();

            }
        );

    }


    /* -------------------------------------------------------
       TOGGLE
       ------------------------------------------------------- */

    function toggleTheme() {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            );


        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );


        localStorage.setItem(
            "forensic-theme",
            newTheme
        );


        updateThemeButton(
            newTheme
        );

    }


    /* -------------------------------------------------------
       BUTTON ICON
       ------------------------------------------------------- */

    function updateThemeButton(theme) {

        const button =
            document.getElementById(
                "themeToggle"
            );

        if (!button) {
            return;
        }


        const icon =
            button.querySelector("span");


        if (!icon) {
            return;
        }


        if (theme === "dark") {

            icon.textContent = "◐";

        }
        else {

            icon.textContent = "☼";

        }

    }


    /* -------------------------------------------------------
       GLOBAL API
       ------------------------------------------------------- */

    window.ForensicTheme = {

        toggle:
            toggleTheme

    };


})();