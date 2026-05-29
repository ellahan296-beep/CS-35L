# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


CampusTrade
A second-hand marketplace for college students. You can post items, browse listings, and search for things you need on campus. Users need a valid email to create an account.
Tech Stack
Frontend: React + Vite + Material UI
Backend: Node.js + Express
Database: SQLite
Auth: bcrypt + JWT
Project Structure
CS-35L/
├── src/                  # frontend code
│   ├── frontend/         # all the pages
│   │   ├── Login_Signup.jsx
│   │   ├── dashboard.jsx
│   │   ├── ListingsPage.jsx
│   │   ├── CreateListing.jsx
│   │   ├── ListingDetail.jsx
│   │   ├── Search.jsx
│   │   └── Profile.jsx
│   └── services/         # API calls
│       ├── authService.js
│       ├── listingService.js
│       └── profileService.js
└── server/               # backend code
    ├── index.js          # all the routes
    ├── database.js       # database setup
    └── uploads/          # uploaded images go here
How to Run Locally:
Requirements
Node.js (v18 or higher)
npm
1. Clone the repo
git clone https://github.com/ellahan296-beep/CS-35L.git
cd CS-35L
2. Install frontend dependencies
npm install
3. Install backend dependencies
cd server
npm install
cd ..
4. Start the backend
Open a terminal and run:
npm run backend
You should see: Server running at http://localhost:9999
5. Start the frontend
Open a new terminal tab and run:
npm run dev
Then open your browser and go to http://localhost:5173
Features
-Sign up and log in with email and password
-Browse all active listings on the home page
-Search for listings by keyword
-Browse your own listing page when you log in
-Post a new listing with title, description, price, category, campus, and image
-Click into a listing to see full details and seller info
-Mark your listing as sold
-Delete your listing
-View your profile

Architecture
System Architecture
Browser (React + Vite)
        |
        | HTTP requests (fetch)
        |
Express Server (Node.js) — port 9999
        |
        | SQL queries
        |
SQLite Database (campustrade.db)

Page Flow
/login or /signup
        |
        | login success
        |
/dashboard  ──────────────────→  /search
        |                              
        | click Listings button        
        |                              
/listings  ──→  /listings/new (post a listing)
        |
        | click a listing card
        |
/listings/:id (listing detail + seller info)
        |
        | click seller name
        |
/profile
