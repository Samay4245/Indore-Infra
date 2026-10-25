# Shiv Shakti Construction

A premium, modern, and fully responsive full-stack website built for Shiv Shakti Construction, an Architecture, Interior Design, and Construction business based in Indore, Madhya Pradesh.

## 🚀 Features

### Frontend (React + Bootstrap 5)
- **Premium UI/UX**: Elegant, spacious, and modern design tailored for architecture and construction.
- **Dynamic Media**: Video background hero sections and high-quality image galleries.
- **Before & After Section**: Showcases transformational project journeys.
- **Project Details**: Clickable project cards leading to comprehensive detail pages with fullscreen image capabilities.
- **Mobile Responsive**: Fully optimized for mobile, tablet, and desktop with a mobile sticky CTA bar.
- **Device Simulator**: Built-in `/mobile-preview` route to simulate how the website looks on mobile and tablet devices directly from a desktop browser.
- **Lead Generation**: "Get a Quote" forms, integrated Google Maps location, WhatsApp direct chat, and click-to-call buttons.

### Backend (Node.js + Express + MySQL)
- **RESTful API**: Structured endpoints for projects, services, gallery, enquiries, and testimonials.
- **Database Schema**: Complete `schema.sql` included for easy database initialization.
- **Admin Panel**: Base setup for an admin dashboard to manage website content securely via JWT authentication.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Bootstrap 5, React-Router, React-Bootstrap, React-Icons
- **Backend**: Node.js, Express.js, MySQL (mysql2 pool), JSON Web Tokens (JWT), Bcrypt.js, Multer
- **Styling**: Custom CSS variables, Google Fonts (Inter, Outfit)

---

## 💻 Local Setup Instructions

### 1. Database Setup
1. Ensure **MySQL** is installed and running (via XAMPP, WAMP, or standalone).
2. Open your terminal or MySQL client and run the provided SQL script:
   ```bash
   mysql -u root -p < backend/schema.sql
   ```
   *This will create the `shiva_shakti` database and insert default settings.*

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment variables file and configure it:
   ```bash
   cp .env.example .env
   ```
   *(Update your database username and password in `.env` if they differ from the defaults)*
4. Start the server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*
5. To create or update the admin account, set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`, then run:
   ```bash
   node create_admin.js
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (usually `http://localhost:5173`) in your browser.

---

## 📂 Project Structure

```text
shiva-shakti-construction/
│
├── frontend/                # React (Vite) Frontend
│   ├── public/assets/       # Images and Videos
│   ├── src/                 
│   │   ├── components/      # Reusable UI components (Navbar, Footer, BeforeAfter)
│   │   ├── pages/           # Page layouts (Home, Projects, About, Location, MobilePreview)
│   │   ├── admin/           # Admin Dashboard pages
│   │   ├── App.jsx          # Router & layout wrapper
│   │   └── index.css        # Core design system and CSS tokens
│   └── package.json
│
└── backend/                 # Express.js Backend
    ├── config/db.js         # MySQL connection configuration
    ├── schema.sql           # Database schema
    ├── server.js            # API entry point
    ├── .env.example         # Template for environment variables
    └── package.json
```

---

## 📞 Business Details Used

- **Company Name**: INDORE INFRA CONSTRUCTION
- **Owner**: Roopnarayan Shukla
- **Location**: F-17, Ahinsa Tower, 7 MG Road, Near Indraprastha Tower, South Tukoganj, Indore, Madhya Pradesh, India
- **Contact**: +91 96691 71255

---

*Developed with passion for modern web experiences.*
