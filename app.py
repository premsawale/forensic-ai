from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    flash
)

import os
from werkzeug.utils import secure_filename


# ============================================================
# PROJECT BASE DIRECTORY
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# ============================================================
# FLASK APPLICATION
# ============================================================

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "static")
)

app.secret_key = "forensic-ai-secret-key"


# ============================================================
# UPLOAD CONFIGURATION
# ============================================================

UPLOAD_FOLDER = os.path.join(
    BASE_DIR,
    "uploads",
    "original"
)

ALLOWED_EXTENSIONS = {
    "pdf",
    "jpg",
    "jpeg",
    "png"
}

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB


app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = MAX_FILE_SIZE


# Create upload folder automatically
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ============================================================
# HELPER FUNCTION — CHECK FILE EXTENSION
# ============================================================

def allowed_file(filename):

    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )


# ============================================================
# LANDING PAGE
# ============================================================

@app.route("/")
def index():

    template_path = os.path.join(
        BASE_DIR,
        "templates",
        "landing",
        "index.html"
    )

    print()
    print("=" * 70)
    print("FORENSIC AI LANDING PAGE")
    print("TEMPLATE BEING USED:")
    print(template_path)
    print("=" * 70)
    print()

    return render_template(
        "landing/index.html"
    )


# ============================================================
# TEMPLATE TEST PAGE
# ============================================================

@app.route("/template-test")
def template_test():

    return """
    <!DOCTYPE html>

    <html>

    <head>

        <title>FORENSIC AI TEMPLATE TEST</title>

    </head>

    <body style="
        background:#050914;
        color:#00eaff;
        font-family:Arial,sans-serif;
        padding:80px;
        text-align:center;
    ">

        <h1>
            FORENSIC AI — TEMPLATE TEST
        </h1>

        <h2>
            THIS IS THE CURRENT FLASK APP
        </h2>

        <p>
            If you can see this page, the correct Flask
            application is running.
        </p>

        <a
            href="/investigation/new"
            style="
                display:inline-block;
                margin-top:30px;
                padding:15px 30px;
                background:#00eaff;
                color:#000;
                text-decoration:none;
                font-weight:bold;
                border-radius:8px;
            "
        >

            OPEN NEW INVESTIGATION

        </a>

    </body>

    </html>
    """


# ============================================================
# DASHBOARD
# ============================================================

@app.route("/dashboard")
def dashboard():

    return render_template(
        "dashboard/dashboard.html"
    )


# ============================================================
# NEW INVESTIGATION PAGE
# ============================================================

@app.route("/investigation/new")
def new_investigation():

    return render_template(
        "investigation/upload.html"
    )


# ============================================================
# START INVESTIGATION
# ============================================================

@app.route(
    "/investigation/start",
    methods=["POST"]
)
def start_investigation():

    # --------------------------------------------------------
    # GET FORM DATA
    # --------------------------------------------------------

    case_name = request.form.get(
        "case_name",
        ""
    ).strip()

    document_type = request.form.get(
        "document_type",
        ""
    ).strip()

    notes = request.form.get(
        "notes",
        ""
    ).strip()

    uploaded_file = request.files.get(
        "evidence_file"
    )


    # --------------------------------------------------------
    # VALIDATE CASE NAME
    # --------------------------------------------------------

    if len(case_name) < 3:

        flash(
            "Please enter a valid case name.",
            "danger"
        )

        return redirect(
            url_for("new_investigation")
        )


    # --------------------------------------------------------
    # VALIDATE DOCUMENT TYPE
    # --------------------------------------------------------

    if not document_type:

        flash(
            "Please select a document type.",
            "danger"
        )

        return redirect(
            url_for("new_investigation")
        )


    # --------------------------------------------------------
    # VALIDATE FILE
    # --------------------------------------------------------

    if (
        uploaded_file is None
        or uploaded_file.filename == ""
    ):

        flash(
            "Please select an evidence file.",
            "danger"
        )

        return redirect(
            url_for("new_investigation")
        )


    # --------------------------------------------------------
    # VALIDATE FILE TYPE
    # --------------------------------------------------------

    if not allowed_file(
        uploaded_file.filename
    ):

        flash(
            "Invalid file type. Only PDF, JPG, JPEG and PNG files are allowed.",
            "danger"
        )

        return redirect(
            url_for("new_investigation")
        )


    # --------------------------------------------------------
    # SECURE ORIGINAL FILE NAME
    # --------------------------------------------------------

    original_filename = secure_filename(
        uploaded_file.filename
    )


    # --------------------------------------------------------
    # CREATE FILE PATH
    # --------------------------------------------------------

    file_path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        original_filename
    )


    # --------------------------------------------------------
    # SAVE ORIGINAL EVIDENCE
    # --------------------------------------------------------

    uploaded_file.save(
        file_path
    )


    # --------------------------------------------------------
    # TEMPORARY INVESTIGATION ID
    # --------------------------------------------------------

    investigation_id = "FAI-2026-0001"


    # --------------------------------------------------------
    # PRINT INVESTIGATION INFORMATION
    # --------------------------------------------------------

    print()

    print("=" * 60)

    print(
        "        FORENSIC AI — NEW INVESTIGATION"
    )

    print("=" * 60)

    print(
        f"Investigation ID : {investigation_id}"
    )

    print(
        f"Case Name        : {case_name}"
    )

    print(
        f"Document Type    : {document_type}"
    )

    print(
        f"Evidence File    : {original_filename}"
    )

    print(
        f"Evidence Path    : {file_path}"
    )

    print(
        f"Notes            : {notes}"
    )

    print("=" * 60)

    print()


    # --------------------------------------------------------
    # GO TO PROCESSING PAGE
    # --------------------------------------------------------

    return redirect(
        url_for(
            "processing",
            investigation_id=investigation_id
        )
    )


# ============================================================
# PROCESSING PAGE
# ============================================================

@app.route(
    "/investigation/processing/<investigation_id>"
)
def processing(
    investigation_id
):

    return render_template(
        "investigation/processing.html",
        investigation_id=investigation_id
    )


# ============================================================
# FILE TOO LARGE ERROR
# ============================================================

@app.errorhandler(413)
def file_too_large(error):

    flash(
        "File is too large. Maximum allowed size is 20 MB.",
        "danger"
    )

    return redirect(
        url_for("new_investigation")
    )


# ============================================================
# 404 ERROR
# ============================================================

@app.errorhandler(404)
def page_not_found(error):

    return render_template(
        "errors/404.html"
    ), 404


# ============================================================
# 500 ERROR
# ============================================================

@app.errorhandler(500)
def internal_server_error(error):

    return render_template(
        "errors/500.html"
    ), 500


# ============================================================
# RUN FLASK APPLICATION
# ============================================================

if __name__ == "__main__":

    print()

    print("=" * 60)

    print(
        "        FORENSIC AI SYSTEM"
    )

    print("=" * 60)

    print(
        f"Project Directory : {BASE_DIR}"
    )

    print(
        "Server: http://127.0.0.1:5000"
    )

    print(
        "Status: FORENSIC ENGINE READY"
    )

    print("=" * 60)

    print()

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )