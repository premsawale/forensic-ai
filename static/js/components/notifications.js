/* =========================================================
   FORENSIC AI — NOTIFICATION CONTROLLER
   ========================================================= */

(function () {

    "use strict";


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initializeNotifications();

        }
    );


    /* -------------------------------------------------------
       INITIALIZE
       ------------------------------------------------------- */

    function initializeNotifications() {

        const button =
            document.getElementById(
                "notificationBtn"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                showNotificationMessage();

            }
        );

    }


    /* -------------------------------------------------------
       NOTIFICATION
       ------------------------------------------------------- */

    function showNotificationMessage() {

        /*
         * Real notifications will later
         * come from Flask/database.
         */

        console.log(
            "No new forensic notifications."
        );


        /*
         * Remove notification indicator.
         */

        const dot =
            document.querySelector(
                ".notification-dot"
            );


        if (dot) {

            dot.style.display =
                "none";

        }

    }


})();