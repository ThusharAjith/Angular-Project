A feature-rich web application for managing a shoe retail store. Built with Angular and Tailwind CSS, the project incorporates Firebase for backend services and user authentication.

**PROJECT OVERVIEW**
This project is divided into three main modules:
1. USER MODULE
   * Allows users to browse products, add items to cart and view their profile.
   * Components: Home, NavBar, Profile, Featured Products, Cart.

2. ADMIN MODULE
   * Enables admins to add/edit products and manage orders.
   * Complete access to the store.
   * Components: Cloned components with different functionalities used from user module and also has 1 additional admin exclusive component.

3. LOGIN MODULE
   * Authenticates users as either Users or Admins based on their "role" as user or admin, which is stored in firestore for every user.
   * Redirects users to their respective modules - user module or admin module.
   * Register component for registering new users, but not admins. Admins can only be added via firestore.
  
  **SERVICES**
  1. Auth Service
     * Service used for authenticating various users and for registering users.
     * Handles logic for authentication and user registration.
  2. Product Service
     * Contains logic for fetching various products from firestore and also for adding products into firestore (admin exclusive).
  3. UserData Service
     * Fetching user data for viewing in the profile component.
     * Handles logic for fetching user data from firestore.
