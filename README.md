# Documentation: ShopFiesta Ecommerce
ShopFiesta is a full-stack e-commerce application. Recently completing Phase 2 of development, the application features a functional responsive frontend integrated with global state management, third-party authentication, a persistent MongoDB database, and a secure payment gateway integration via Stripe.

**Live Demo:** [Click here to view the live project](https://shopfiesta.vercel.app/)

https://github.com/user-attachments/assets/61e66531-aae0-406a-8d2c-ee89a60285e0

## Technology Stack
**Frontend:**
* Framework: React (Vite)
* Routing: React Router DOM
* Styling Framework: Tailwind CSS
* State Management: Redux Toolkit (with Async Thunks)
* Performance Analytics: Vercel Speed Insights

**Backend & Infrastructure:**
* Environment: Node.js & Express.js
* Database: MongoDB & Mongoose
* Authentication Service: Firebase Authentication
* Payment Gateway: Stripe Checkout API
* Hosting & CI/CD: Vercel (Frontend) & Railway (Backend)
* Version Control: Git / GitHub

## Current Implementation Status

### 1. Authentication & User Synchronization
* Utilizes Firebase (`signInWithPopup` for Google OAuth and `signInWithEmailAndPassword`) for credential-based authentication.
* Implemented a global authentication observer (`onAuthStateChanged`). Upon login, the frontend automatically syncs the Firebase `uid` and email to the MongoDB backend, ensuring users exist in the database before interacting with carts or payments.

### 2. Global State & Database Integration (Redux + Express)
* Configured a centralized Redux store interacting seamlessly with backend APIs:
  * `authSlice.js`: Manages session data and protected route access.
  * `cartSlice.js`: Manages shopping cart logic. Actions dispatch async thunks to sync cart additions, modifications, and deletions directly to the MongoDB `User` document.
  * `wishlistSlice.js`: Allows authenticated users to save items for later, persistently synced to the database.

### 3. Secure Payment Processing (Stripe)
* Integrated Stripe Checkout for seamless transaction handling.
* Backend securely maps MongoDB database products to Stripe `line_items` to ensure pricing integrity (preventing client-side price manipulation).
* Implemented dynamic, environment-aware redirects.
* Added a secure `OrderConfirmation` route that validates Stripe `session_id` parameters, displaying a countdown warning and redirecting unauthorized users who attempt to manually access the success page.

### 4. Interface and Routing
* Dynamic `Navbar.jsx` that conditionally renders user avatars and cart counts based on global state.
* Utilizes `<ProtectedRoute>` wrappers to restrict access to the Dashboard, Wishlist, and Checkout flows for unauthenticated users.
* Resolved production environment routing errors by deploying a `vercel.json` configuration file, mapping all wildcard routes `/(.*)` to `index.html`.

## Phase 3 Development Roadmap 
The immediate next objectives focus on post-purchase flows and administrative features:

1. **Stripe Webhooks:** Implement backend webhooks to listen for `checkout.session.completed` events and securely generate an `Order` document in MongoDB.
2. **Order History:** Fetch and display real order history on the User Dashboard.
3. **Admin Panel:** Create a role-based access route for store admins to add/edit products directly from the UI.

## Running Locally
To run this project on your local machine, you will need to set up both the frontend and the backend environments.

1. Clone the repository: `git clone https://github.com/v-denny/shopfiesta.git`
2. Navigate to the frontend directory: `cd shopfiesta`
   * Install dependencies: `npm install`
   * Create a `.env` file and add your `VITE_FIREBASE_*` keys and `VITE_API_URL=http://localhost:5173`.
   * Start the React server: `npm run dev`
3. Navigate to your backend directory (if separated): `cd shopfiesta-backend`
   * Install dependencies: `npm install`
   * Create a `.env` file and add your `MONGO_URI`, `STRIPE_SECRET_KEY`, and `CLIENT_URL=http://localhost:5000`.
   * Start the Express server: `npm run start` (or `nodemon`)
 
