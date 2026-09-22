# FORENSIC AI
Multimodal Document Forgery Detection & Verification System

## Scope
- Bonafide Certificate
- Semester Marksheet
- Fee Receipt
- Leaving Certificate
- Diploma/Degree Certificate
- Birth Certificate

## Architecture
Upload -> Preprocess -> Document Classification -> ELA + OCR + Layout + Visual + Metadata
-> Feature Extraction -> Multimodal AI -> Verification -> Explainable Result -> PDF Report

## Run
1. Create/activate a virtual environment.
2. Install dependencies:
   pip install -r requirements.txt
3. Run:
   python app.py
4. Open http://127.0.0.1:5000

This package contains the complete project scaffold. Analysis modules are intentionally separated so real forensic algorithms/models can be added and tested independently.
