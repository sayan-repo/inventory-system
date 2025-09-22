# Intelligent Inventory Management System 

A feature-rich, role-based inventory management system designed to streamline warehouse operations through intelligent automation and data visualization. This project showcases a modern frontend built with **React** and **Tailwind CSS**, featuring a complete workflow from purchase order to final dispatch.

***

## Key Features

-   **Role-Based Access Control (RBAC)**: Five distinct user roles (**Admin**, **Purchase Manager**, **Gate Manager**, **Store Manager**, **Outgoing Manager**) with unique dashboards and permissions. The Admin has a master tabbed view of all roles.
-   **End-to-End QR Code Lifecycle**:
    -   **Generate & Download**: Create and download unique QR codes as PNGs for labeling incoming stock.
    -   **In-App Scanning**: Use the device's camera to scan products for receiving and dispatch, minimizing manual data entry errors.
-   **Advanced Data Visualization**:
    -   **Analytics Dashboard**: Interactive charts (powered by **Chart.js**) displaying key metrics like stock levels and category breakdowns.
    -   **Real-time Warehouse Map**: A novel visual grid representing warehouse occupancy to enhance spatial awareness and inventory planning.
-   **Intelligent Algorithms (Simulated)**:
    -   **Predictive Stock Alerts**: Warns users of low stock based on historical consumption velocity.
    -   **Optimal Storage Suggestions**: Recommends the best storage location for items based on their properties (e.g., velocity).

***

## Tech Stack

-   **Frontend**: React.js, Vite, JavaScript (ES6+), HTML5, CSS3
-   **Styling**: Tailwind CSS
-   **Routing**: React Router
-   **Data Visualization**: Chart.js
-   **QR Code Functionality**: `qrcode.react`, `html5-qrcode`
-   **Icons**: Lucide React
-   **State Management**: React Context API
-   **Backend (Mock)**: Simulated API with in-memory data to mimic Node.js/Express.js behavior.

***

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/inventory-system.git](https://github.com/your-username/inventory-system.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd inventory-system
    ```

3.  **Install the dependencies:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

***

## Login Credentials

Use the following mock credentials to log in and test the different roles. The password for all accounts is `password123`.

| Role               | Username   |
| ------------------ | ---------- |
| Admin              | `admin`    |
| Purchase Manager   | `purchase` |
| Gate Manager       | `gate`     |
| Store Manager      | `store`    |
| Outgoing Manager   | `outgoing` |

***
