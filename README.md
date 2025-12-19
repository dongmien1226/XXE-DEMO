# XXE Demo Lab

This repository is a deliberate security-testing environment designed to demonstrate various **XML External Entity (XXE)** vulnerabilities within a Java Spring Boot and React ecosystem.

## 🚀 Features & Vulnerabilities

### Backend (Spring Boot)

* **In-band XXE**: Standard order processing that leaks file contents directly in the HTTP response.
* **Blind XXE**: A "silent" endpoint designed for Out-of-Band (OOB) exfiltration testing.
* **PDF Rendering XXE**: Vulnerable HTML-to-PDF conversion using `ITextRenderer`.
* **Tika Content Extraction**: File scanning that can be exploited via malicious document uploads - CVE-2025-54988

### Frontend (React + Vite)

* Modern UI with specialized components for each attack vector (`XmlOrder.jsx`, `PdfGenerator.jsx`, etc.).

---

## 🛠️ Installation & Setup

### Prerequisites

* **Java JDK 17+**
* **Node.js 20+**
* **Maven**

### 1. Run the Backend

```bash
cd backend
mvn clean spring-boot:run

```

The backend will start on `http://localhost:8080`.

### 2. Run the Frontend

```bash
cd bookshop-frontend
npm install
npm run dev

```

The frontend will start on `http://localhost:5173`.

---

## ⚠️ Disclaimer

This project is for **educational purposes only**. Do not deploy this to a production environment as it intentionally contains critical security flaws.

---
