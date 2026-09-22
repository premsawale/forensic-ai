/* =========================================================
   FORENSIC AI — MODAL SYSTEM
   ========================================================= */

(function () {

    "use strict";


    let modal = null;


    /* -------------------------------------------------------
       CREATE MODAL
       ------------------------------------------------------- */

    function createModal() {

        if (modal) {
            return;
        }


        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "forensicGlobalModal";


        modal.className =
            "forensic-modal-overlay";


        modal.innerHTML = `

            <div class="forensic-modal">

                <div class="forensic-modal-header">

                    <span>
                        FORENSIC AI
                    </span>

                    <button
                        type="button"
                        class="forensic-modal-close"
                        aria-label="Close">

                        ×

                    </button>

                </div>


                <div class="forensic-modal-body">

                    <div class="forensic-modal-icon">
                        ◈
                    </div>

                    <h3 id="forensicModalTitle">
                        SYSTEM
                    </h3>

                    <p id="forensicModalMessage">
                    </p>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        const closeButton =
            modal.querySelector(
                ".forensic-modal-close"
            );


        closeButton.addEventListener(
            "click",
            close
        );


        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    close();

                }

            }
        );

    }


    /* -------------------------------------------------------
       OPEN
       ------------------------------------------------------- */

    function open(message) {

        createModal();


        const title =
            document.getElementById(
                "forensicModalTitle"
            );

        const content =
            document.getElementById(
                "forensicModalMessage"
            );


        if (title) {

            title.textContent =
                "SYSTEM MESSAGE";

        }


        if (content) {

            content.textContent =
                message ||
                "Forensic AI system interface.";

        }


        modal.classList.add(
            "active"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    /* -------------------------------------------------------
       CLOSE
       ------------------------------------------------------- */

    function close() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    /* -------------------------------------------------------
       GLOBAL API
       ------------------------------------------------------- */

    window.ForensicModal = {

        open: open,

        close: close

    };


})();