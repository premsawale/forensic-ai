document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // ELEMENTS
    // ============================================

    const form = document.getElementById("investigationForm");

    const browseButton = document.getElementById("browseButton");
    const fileInput = document.getElementById("evidenceFile");
    const uploadZone = document.getElementById("uploadZone");

    const selectedFile = document.getElementById("selectedFile");
    const fileName = document.getElementById("fileName");
    const fileSize = document.getElementById("fileSize");
    const fileIcon = document.getElementById("fileIcon");
    const fileProgress = document.getElementById("fileProgress");
    const removeFile = document.getElementById("removeFile");

    const caseName = document.getElementById("caseName");
    const documentType = document.getElementById("documentType");
    const startButton = document.getElementById("startInvestigation");


    // ============================================
    // SETTINGS
    // ============================================

    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png"
    ];

    const maxFileSize = 20 * 1024 * 1024;


    // ============================================
    // BROWSE BUTTON
    // ============================================

    if (browseButton && fileInput) {

        browseButton.addEventListener("click", function (event) {

            event.preventDefault();

            fileInput.click();

        });

    }


    // ============================================
    // FILE INPUT CHANGE
    // ============================================

    if (fileInput) {

        fileInput.addEventListener("change", function () {

            if (fileInput.files.length > 0) {

                handleFile(fileInput.files[0]);

            }

        });

    }


    // ============================================
    // DRAG & DROP
    // ============================================

    if (uploadZone) {

        uploadZone.addEventListener("dragover", function (event) {

            event.preventDefault();

            uploadZone.classList.add("drag-over");

        });


        uploadZone.addEventListener("dragleave", function () {

            uploadZone.classList.remove("drag-over");

        });


        uploadZone.addEventListener("drop", function (event) {

            event.preventDefault();

            uploadZone.classList.remove("drag-over");

            const files = event.dataTransfer.files;

            if (files.length > 0) {

                try {

                    const dataTransfer = new DataTransfer();

                    dataTransfer.items.add(files[0]);

                    fileInput.files = dataTransfer.files;

                    handleFile(files[0]);

                } catch (error) {

                    console.error("Could not attach dropped file:", error);

                    handleFile(files[0]);

                }

            }

        });

    }


    // ============================================
    // HANDLE FILE
    // ============================================

    function handleFile(file) {

        clearError();


        // File type validation

        if (!allowedTypes.includes(file.type)) {

            showError(
                "Invalid file type. Please select PDF, JPG, JPEG or PNG."
            );

            resetFile();

            return;

        }


        // File size validation

        if (file.size > maxFileSize) {

            showError(
                "File is too large. Maximum allowed size is 20 MB."
            );

            resetFile();

            return;

        }


        displayFile(file);

        updateFormState();

    }


    // ============================================
    // DISPLAY SELECTED FILE
    // ============================================

    function displayFile(file) {

        if (!selectedFile) {
            return;
        }


        selectedFile.style.display = "flex";


        if (fileName) {

            fileName.textContent = file.name;

        }


        if (fileSize) {

            fileSize.textContent = formatFileSize(file.size);

        }


        if (fileIcon) {

            if (file.type === "application/pdf") {

                fileIcon.className =
                    "bi bi-filetype-pdf";

            }

            else if (file.type === "image/jpeg") {

                fileIcon.className =
                    "bi bi-filetype-jpg";

            }

            else if (file.type === "image/png") {

                fileIcon.className =
                    "bi bi-filetype-png";

            }

        }


        if (fileProgress) {

            fileProgress.style.width = "100%";

        }

    }


    // ============================================
    // REMOVE FILE
    // ============================================

    if (removeFile) {

        removeFile.addEventListener("click", function (event) {

            event.preventDefault();

            resetFile();

            updateFormState();

        });

    }


    function resetFile() {

        if (fileInput) {

            fileInput.value = "";

        }


        if (selectedFile) {

            selectedFile.style.display = "none";

        }


        if (fileProgress) {

            fileProgress.style.width = "0%";

        }


        if (fileName) {

            fileName.textContent = "";

        }


        if (fileSize) {

            fileSize.textContent = "";

        }

    }


    // ============================================
    // FORM FIELD EVENTS
    // ============================================

    if (caseName) {

        caseName.addEventListener(
            "input",
            updateFormState
        );

    }


    if (documentType) {

        documentType.addEventListener(
            "change",
            updateFormState
        );

    }


    // ============================================
    // ENABLE / DISABLE START BUTTON
    // ============================================

    function updateFormState() {

        const validCaseName =
            caseName &&
            caseName.value.trim().length >= 3;


        const validDocumentType =
            documentType &&
            documentType.value !== "";


        const validFile =
            fileInput &&
            fileInput.files &&
            fileInput.files.length > 0;


        const formReady =
            validCaseName &&
            validDocumentType &&
            validFile;


        if (startButton) {

            startButton.disabled = !formReady;

        }

    }


    // ============================================
    // ⭐ START INVESTIGATION BUTTON
    // ============================================

    if (startButton) {

        startButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                console.log(
                    "FORENSIC AI: Start Investigation clicked."
                );


                // Check case name

                if (
                    !caseName ||
                    caseName.value.trim().length < 3
                ) {

                    showError(
                        "Please enter a valid case name."
                    );

                    caseName.focus();

                    return;

                }


                // Check document type

                if (
                    !documentType ||
                    documentType.value === ""
                ) {

                    showError(
                        "Please select a document type."
                    );

                    documentType.focus();

                    return;

                }


                // Check file

                if (
                    !fileInput ||
                    !fileInput.files ||
                    fileInput.files.length === 0
                ) {

                    showError(
                        "Please select an evidence file."
                    );

                    return;

                }


                // Make sure form exists

                if (!form) {

                    console.error(
                        "FORENSIC AI ERROR: investigationForm not found."
                    );

                    showError(
                        "Investigation form could not be found."
                    );

                    return;

                }


                console.log(
                    "FORENSIC AI: Form validation passed."
                );

                console.log(
                    "Case:",
                    caseName.value
                );

                console.log(
                    "Document:",
                    documentType.value
                );

                console.log(
                    "File:",
                    fileInput.files[0].name
                );


                // ========================================
                // DISABLE BUTTON WHILE SUBMITTING
                // ========================================

                startButton.disabled = true;


                const originalButtonHTML =
                    startButton.innerHTML;


                startButton.innerHTML =
                    '<span class="spinner-border spinner-border-sm me-2"></span>' +
                    'Starting Investigation...';


                // ========================================
                // ACTUAL FORM SUBMISSION
                // ========================================

                console.log(
                    "FORENSIC AI: Submitting form to Flask..."
                );


                form.submit();

            }
        );

    }


    // ============================================
    // FORM SUBMIT SAFETY
    // ============================================

    if (form) {

        form.addEventListener("submit", function () {

            console.log(
                "FORENSIC AI: FORM SUBMIT EVENT FIRED."
            );

        });

    }


    // ============================================
    // FILE SIZE FORMAT
    // ============================================

    function formatFileSize(bytes) {

        if (bytes < 1024) {

            return bytes + " B";

        }


        if (bytes < 1024 * 1024) {

            return (
                (bytes / 1024).toFixed(1)
                + " KB"
            );

        }


        return (
            (bytes / (1024 * 1024)).toFixed(2)
            + " MB"
        );

    }


    // ============================================
    // ERROR MESSAGE
    // ============================================

    function showError(message) {

        let errorBox =
            document.getElementById("uploadError");


        if (!errorBox) {

            errorBox =
                document.createElement("div");

            errorBox.id =
                "uploadError";

            errorBox.className =
                "upload-error";


            if (uploadZone) {

                uploadZone.appendChild(errorBox);

            }

        }


        errorBox.innerHTML =
            '<i class="bi bi-exclamation-triangle"></i> '
            + message;


        errorBox.style.display =
            "block";

    }


    // ============================================
    // CLEAR ERROR
    // ============================================

    function clearError() {

        const errorBox =
            document.getElementById("uploadError");


        if (errorBox) {

            errorBox.style.display =
                "none";

        }

    }


    // ============================================
    // INITIAL STATE
    // ============================================

    updateFormState();


    console.log(
        "FORENSIC AI: Upload module initialized."
    );

});