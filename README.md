# 🚀 Shubham Bhavar - 3D Interactive Personal Portfolio

> A highly professional, modern, and interactive 3D personal portfolio website built with **Angular**, **Three.js**, **Bootstrap**, **Node.js**, **Express.js**, **MongoDB**, and **Nodemailer**.

---

## 👤 Personal Information
- **Name:** Shubham Bhavar
- **Role:** Full Stack Developer | Frontend Developer | Data Science Graduate
- **Location:** Pune, Maharashtra, India
- **Email:** [shubhambhavar2821@gmail.com](mailto:shubhambhavar2821@gmail.com)
- **WhatsApp:** [+91 9890982446](https://wa.me/919890982446?text=Hello%20Shubham%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.)
- **GitHub:** [github.com/shubhambhavar2821](https://github.com/shubhambhavar2821)
- **LinkedIn:** [linkedin.com/in/shubham-bhavar-a3506025b/](https://www.linkedin.com/in/shubham-bhavar-a3506025b/)

---

## 🛠️ Tech Stack & Architecture

### **Frontend (Angular)**
- **Angular 22** Standalone Architecture
- **Three.js** Interactive 3D WebGL developer canvas, particle starfield, and floating geometric nodes
- **TypeScript** Strict typed component logic and reactive services
- **Bootstrap & SCSS** Glassmorphic cyber dark theme, custom responsive grid, and micro-interactions
- **Bootstrap Icons** Modern developer iconography
- **Reactive Forms** Real-time field validation with visual error feedback

### **Backend (Node.js & Express)**
- **Node.js & Express.js** RESTful API with structured routing and middleware
- **Nodemailer** Automated styled HTML email dispatch to `shubhambhavar2821@gmail.com`
- **MongoDB & Mongoose** Persistent database storage for visitor inquiries and audit logs
- **CORS & Dotenv** Secure environment variables management and origin handling

---

## 📂 Project Structure

```
portfolio/
├── frontend/                                # Angular Modern Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── navbar/                  # Glassmorphism navigation + mobile menu + scroll spy
│   │   │   │   ├── hero/                    # 3D interactive Three.js developer scene + typewriter
│   │   │   │   ├── about/                   # Bio + 3D tilt stats cards + highlights
│   │   │   │   ├── skills/                  # Categorized skills + 3D floating icons + progress meters
│   │   │   │   ├── experience/              # Suguna Foods Pvt timeline with animated nodes
│   │   │   │   ├── education/               # MCA Data Science, BSc, Science cards with hover glow
│   │   │   │   ├── projects/                # Online Food Store & Fitness Club 3D cards + links
│   │   │   │   ├── certifications/          # MIT ADT & Spark IT certificate cards
│   │   │   │   ├── resume/                  # Dedicated CTA banner with 1-click PDF download
│   │   │   │   ├── contact/                 # Reactive contact form with validation, status toasts
│   │   │   │   ├── whatsapp-btn/            # Floating pulsing 3D WhatsApp button with pre-filled msg
│   │   │   │   └── footer/                  # Quick links, social icons, back-to-top, copyright
│   │   │   ├── services/
│   │   │   │   └── contact.service.ts       # HttpClient service calling /api/contact
│   │   │   ├── app.ts / app.html / app.scss
│   │   │   └── app.config.ts
│   │   ├── assets/
│   │   │   └── resume/
│   │   │       └── Shubham_Bhavar_Resume.pdf
│   │   ├── styles.scss                      # Global dark theme, neon gradients, glassmorphism
│   │   └── index.html                       # SEO meta tags, Google fonts, icons
│   ├── package.json
│   └── angular.json
│
├── backend/                                 # Node.js + Express.js API
│   ├── server.js                            # Express app, CORS, rate limiter, MongoDB init
│   ├── routes/
│   │   └── contact.js                       # POST /api/contact & GET /api/health routes
│   ├── controllers/
│   │   └── contactController.js             # Form validation, Nodemailer HTML mailer, DB storage
│   ├── models/
│   │   └── ContactMessage.js                # Mongoose schema for saving inquiries
│   ├── generate_resume_pdf.js               # Standalone PDF generator script
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── package.json                             # Root monorepo scripts
└── README.md
```

---

## ⚡ Quick Start Guide (Local Setup)

### 1. Prerequisites
- **Node.js** (v18 or higher recommended, tested on v24)
- **npm** (v9 or higher)
- **MongoDB** (Local instance or free MongoDB Atlas URI)

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and configure your Gmail App Password
cp .env.example .env

# Start backend server
npm start
# Server will run on http://localhost:5000
```

#### 🔑 Gmail App Password Setup (for Nodemailer):
1. Go to your **Google Account** > **Security**.
2. Under "How you sign in to Google", enable **2-Step Verification**.
3. Search for **App Passwords**.
4. Create an app named `Portfolio Mailer`.
5. Copy the generated 16-character password into `backend/.env`:
   ```env
   EMAIL_USER=shubhambhavar2821@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Angular development server
npm start
# Open http://localhost:4200 in your browser
```

---

## 🌐 Free Deployment Instructions

### A. Deploy Frontend for Free (Vercel / Netlify / GitHub Pages)

#### Option 1: Vercel (Recommended)
1. Push your repository to **GitHub**.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New Project** and import your GitHub repository.
4. Set:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Angular`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/frontend/browser`
5. Click **Deploy**. Your portfolio will be live with free SSL and CDN!

#### Option 2: Netlify
1. Log in to [Netlify](https://www.netlify.com).
2. Choose **Import from Git** > select repo.
3. Base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `frontend/dist/frontend/browser`
6. Add `_redirects` file in `public/` containing `/* /index.html 200`.

---

### B. Deploy Backend for Free (Render / Railway)

#### Option 1: Render (Recommended)
1. Create a free account on [Render](https://render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Set:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. In **Environment Variables**, add:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-vercel-domain.vercel.app`
   - `EMAIL_USER`: `shubhambhavar2821@gmail.com`
   - `EMAIL_PASS`: `<your-16-char-app-password>`
   - `RECEIVER_EMAIL`: `shubhambhavar2821@gmail.com`
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`
6. Click **Create Web Service**.

#### Option 2: MongoDB Atlas Free Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free M0 Shared Cluster.
3. In **Database Access**, create a user and password.
4. In **Network Access**, add `0.0.0.0/0` (Allow from anywhere).
5. Copy the connection string and paste it into `MONGO_URI`.

---

## 📄 License & Attribution
Designed & Engineered by **Shubham Bhavar** © 2026. All Rights Reserved.
