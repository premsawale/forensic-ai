/* =========================================================
   FORENSIC AI — PROCESSING / ANALYSIS CONTROLLER
   ========================================================= */

(function () {

    "use strict";


    /* -------------------------------------------------------
       ELEMENTS
       ------------------------------------------------------- */

    const overlay =
        document.getElementById("forensicLoadingOverlay");

    const progressBar =
        document.getElementById("loaderProgressBar");

    const progressPercent =
        document.getElementById("loaderProgressPercent");

    const loaderStatus =
        document.getElementById("loaderStatus");

    const mainTitle =
        document.getElementById("loaderMainTitle");

    const description =
        document.getElementById("loaderDescription");

    const pipelineSteps =
        document.querySelectorAll(".pipeline-step");


    /* -------------------------------------------------------
       PIPELINE
       ------------------------------------------------------- */

    const pipeline = [

        {
            key: "preprocessing",
            title: "PREPROCESSING DOCUMENT",
            description:
                "Normalizing image quality and preparing document data."
        },

        {
            key: "ocr",
            title: "EXTRACTING DOCUMENT TEXT",
            description:
                "Transformer-based OCR is extracting and analyzing text regions."
        },

        {
            key: "ela",
            title: "RUNNING ELA ANALYSIS",
            description:
                "Inspecting compression patterns and possible editing regions."
        },

        {
            key: "layout",
            title: "COMPARING DOCUMENT LAYOUT",
            description:
                "Comparing document structure with trusted reference templates."
        },

        {
            key: "visual",
            title: "RUNNING VISUAL FORENSICS",
            description:
                "Analyzing fonts, images, alignment and visual inconsistencies."
        },

        {
            key: "metadata",
            title: "INSPECTING METADATA",
            description:
                "Analyzing file properties and available document metadata."
        },

        {
            key: "ai",
            title: "MULTIMODAL AI FUSION",
            description:
                "Combining forensic signals for an evidence-based assessment."
        },

        {
            key: "final",
            title: "GENERATING FORENSIC REPORT",
            description:
                "Compiling findings, confidence indicators and analysis evidence."
        }

    ];


    /* -------------------------------------------------------
       OPEN OVERLAY
       ------------------------------------------------------- */

    function openForensicLoader() {

        if (!overlay) {
            return;
        }

        overlay.classList.add("active");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "analysis-running"
        );

    }


    /* -------------------------------------------------------
       CLOSE OVERLAY
       ------------------------------------------------------- */

    function closeForensicLoader() {

        if (!overlay) {
            return;
        }

        overlay.classList.remove("active");

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "analysis-running"
        );

    }


    /* -------------------------------------------------------
       UPDATE PROGRESS
       ------------------------------------------------------- */

    function updateProgress(percent) {

        const safePercent =
            Math.max(
                0,
                Math.min(100, percent)
            );

        if (progressBar) {

            progressBar.style.width =
                `${safePercent}%`;

        }

        if (progressPercent) {

            progressPercent.textContent =
                `${Math.round(safePercent)}%`;

        }

    }


    /* -------------------------------------------------------
       UPDATE PIPELINE
       ------------------------------------------------------- */

    function updatePipeline(index) {

        pipelineSteps.forEach(
            (step, stepIndex) => {

                step.classList.remove(
                    "active",
                    "completed"
                );

                if (stepIndex < index) {

                    step.classList.add(
                        "completed"
                    );

                }

                if (stepIndex === index) {

                    step.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    /* -------------------------------------------------------
       RUN DEMO PIPELINE
       ------------------------------------------------------- */

    async function runDemoAnalysis() {

        if (!pipeline.length) {
            return;
        }

        openForensicLoader();

        updateProgress(0);

        for (
            let index = 0;
            index < pipeline.length;
            index++
        ) {

            const current =
                pipeline[index];

            const percent =
                Math.round(
                    (index /
                    pipeline.length) * 100
                );

            updatePipeline(index);

            updateProgress(percent);

            if (loaderStatus) {

                loaderStatus.textContent =
                    "PROCESSING";

            }

            if (mainTitle) {

                mainTitle.textContent =
                    current.title;

            }

            if (description) {

                description.textContent =
                    current.description;

            }

            await wait(
                900
            );

        }


        /* FINAL STATE */

        updatePipeline(
            pipeline.length
        );

        updateProgress(100);

        if (loaderStatus) {

            loaderStatus.textContent =
                "COMPLETE";

        }

        if (mainTitle) {

            mainTitle.textContent =
                "ANALYSIS COMPLETE";

        }

        if (description) {

            description.textContent =
                "Forensic findings have been compiled successfully.";

        }

    }


    /* -------------------------------------------------------
       WAIT HELPER
       ------------------------------------------------------- */

    function wait(milliseconds) {

        return new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    milliseconds
                )
        );

    }


    /* -------------------------------------------------------
       GLOBAL API
       ------------------------------------------------------- */

    window.ForensicLoader = {

        open: openForensicLoader,

        close: closeForensicLoader,

        progress: updateProgress,

        pipeline: updatePipeline,

        demo: runDemoAnalysis

    };


})();