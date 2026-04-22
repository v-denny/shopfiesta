# Documentation: ShopFiesta Ecommerce
ShopFiesta is a full-stack e-commerce application. Recently completing Phase 2 of development, the application features a functional responsive frontend integrated with global state management, third-party authentication, a persistent MongoDB database, and a secure payment gateway integration via Stripe.

> **Backend Integration:** This frontend is powered by the ShopFiesta Node.js API. You can find the backend repository [here](https://github.com/v-denny/shopfiesta-backend).

**Live Demo:** [Click here to view the live project](https://shopfiesta.vercel.app/)

https://github.com/user-attachments/assets/61e66531-aae0-406a-8d2c-ee89a60285e0

## 🛠 Technology Stack
* **Framework:** React (Vite)
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **State Management:** Redux Toolkit (with Async Thunks)
* **Authentication:** Firebase (Google OAuth & Email/Password)
* **Hosting & Analytics:** Vercel & Vercel Speed Insights

## ✨ Key Features & Implementation
* **Dynamic Global State:** Utilizes Redux Toolkit to manage complex shopping cart and wishlist logic. Actions dispatch asynchronous thunks to keep the client UI perfectly synced with the backend database.
* **Authentication Observer:** Implements a global `onAuthStateChanged` listener. Upon successful login, the frontend automatically syncs the user's Firebase UID and email to the backend.
* **Protected Routing:** Employs `<ProtectedRoute>` wrappers to restrict unauthorized access to the Dashboard, Wishlist, and Checkout flows. 
* **Secure Checkout Flow:** Integrates with the backend to generate Stripe Checkout sessions. Includes a secure `OrderConfirmation` route that validates session parameters and actively rejects manual URL spoofing.
* **Production-Ready Routing:** Configured with a `vercel.json` file mapping wildcard routes `/(.*)` to `index.html` to prevent 404 errors on page refreshes.

## 🚀 Future Roadmap (Phase 3)
* **User Dashboard:** Build UI components to fetch and display dynamic order history.
* **Admin Panel:** Create role-based protected routes allowing store administrators to add, edit, and manage products directly from the interface.

## 💻 Running Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/shopfiesta.git](https://github.com/YOUR_USERNAME/shopfiesta.git)
   cd shopfiesta

2. Install dependencies: `npm install`

3. Create a .env file in the root directory and add your keys:
   ```VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   
### Ensure this points to your running backend server
`VITE_API_URL=http://localhost:5000`

4. Start the development server: `npm run dev`
