# Documentation: ShopFiesta Ecommerce
ShopFiesta is a React-based single-page application (SPA) currently at the completion of Phase 1. The application features a functional responsive frontend integrated with global state management and a third-party authentication provider. The project is version-controlled and continuously deployed to a production environment.

**Live Demo:** [Click here to view the live project](https://shopfiesta.vercel.app/)

## Technology Stack
* Frontend Framework: React 
* Routing: React Router DOM
* Styling Framework: Tailwind CSS
* State Management: Redux Toolkit
* Authentication Service: Firebase Authentication
* Hosting & CI/CD: Vercel
* Version Control: Git / GitHub

## Current Implementation Status

### 1. Authentication Architecture
* Initialized Firebase app environment (`src/firebase.js`) exporting `auth` and `googleProvider`.
* Implemented a global authentication observer (`onAuthStateChanged`) within the root `App.jsx` component. This listener automatically synchronizes the Firebase session with the Redux store on application load or refresh, ensuring session persistence.
* Developed `Login.jsx` utilizing `signInWithPopup` for Google OAuth and `signInWithEmailAndPassword` for credential-based authentication. Successful authentication triggers a programmatic redirect to the `/dashboard` route.

### 2. Global State Management (Redux)
* Configured a centralized Redux store utilizing two primary slices:
  * `authSlice.js`: Manages session data including the `user` object, `isAuthenticated` boolean, and `isLoading` status.
  * `cartSlice.js`: Manages client-side shopping cart logic, tracking added items, total quantities, and aggregate pricing.

### 3. Interface and Routing
* Configured core application routing parameters.
* Implemented a dynamic `Navbar.jsx` component that subscribes to the Redux `authSlice`. 
  * Unauthenticated state renders standard login navigation.
  * Authenticated state renders user-specific UI (avatar derived from `displayName` or `email`) and a functional logout mechanism invoking Firebase's `signOut` method.
* Resolved production environment routing errors (404 Not Found on direct URL access) by deploying a `vercel.json` configuration file at the project root. This implements rewrite rules mapping all wildcard routes `/(.*)` to `index.html`.

## Phase 2 Development Roadmap 
The immediate next objective is to transition the application to a full-stack architecture to support persistent database storage for user sessions and cart data.

1. Server Initialization: Scaffold a Node.js/Express backend service (`shopfiesta-api`).
2. Database Integration: Connect the server to a custom database (MongoDB or PostgreSQL).
3. Data Synchronization: Develop API endpoints to securely transmit and retrieve `cartItems` between the React frontend and the database, utilizing the Firebase user `uid` as the primary key.

## Running Locally
To run this project on your local machine:

1. Clone the repository: `git clone https://github.com/v-denny/shopfiesta.git`
2. Navigate to the directory: `cd shopfiesta`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file in the root and add your Firebase config keys.
5. Start the development server: `npm run dev`