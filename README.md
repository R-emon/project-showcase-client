# DevFolio - Project Showcase Frontend

![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js) ![React](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript) ![Mantine UI](https://img.shields.io/badge/UI-Mantine-blueviolet)

This repository contains the frontend for the DevFolio Project Showcase application. It is a modern, responsive, and fully-featured web application built with Next.js and the Mantine UI component library.

This application is designed to consume a [Spring Boot REST API backend](https://github.com/R-emon/project-showcase-api), which handles all data storage and business logic. The live site is deployed on Vercel.

## Live Link: [DevFolio](https://project-showcase-client.vercel.app)

## ✨ Features

- **Dynamic Project Gallery:** Fetches and displays a grid of all user-submitted projects on the homepage.
- **Dynamic Routing:** Individual, server-rendered detail pages for each project (`/projects/[id]`).
- **Complete Authentication Flow:**
    - User registration and login pages.
    - Global state management using React Context to maintain user sessions.
    - Dynamic UI that changes based on authentication status (e.g., showing "Logout" vs. "Login").
- **Protected Routes & Actions:**
    - Forms for creating and editing projects are only accessible to authenticated users.
    - "Edit" and "Delete" buttons are only visible to the project's owner.
- **Client-Side & Server-Side Rendering:** Utilizes the Next.js App Router for optimal performance, fetching static data on the server and handling interactive elements on the client.
- **Form Handling & Validation:** Robust forms built with the `@mantine/form` hook for a great user experience.
- **Responsive Design:** The UI is fully responsive and works well on devices of all sizes, thanks to Mantine UI's grid and components.

## 🛠️ Technology Stack

- **Framework:** Next.js 14.x (App Router)
- **Language:** TypeScript
- **UI Library:** Mantine UI 7.x
- **State Management:** React Context
- **Form Handling:** @mantine/form
- **Build Tool:** Next.js CLI (with Turbopack/Webpack)
- **Deployment:** Vercel

## 🚀 Getting Started Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need the following tools installed on your machine:
- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/R-emon/project-showcase-client.git](https://github.com/R-emon/project-showcase-client.git)
    cd project-showcase-client
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set Up Environment Variables:**
    The application needs to know the address of the backend API.
    -   Create a new file in the **root** of the project named `.env.local`.
    -   Add the following line to the file, pointing to your local backend server:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
    ```

4.  **Run the Development Server:**
    ```sh
    npm run dev
    ```
    The application will now be running on `http://localhost:3000`.

## 🚢 Deployment

This application is deployed on **Vercel**. The deployment process is automated via a connection to the GitHub repository.

The following environment variable must be set in the Vercel project settings for a successful deployment:
-   `NEXT_PUBLIC_API_BASE_URL`: The full, public URL of the live backend API (e.g., `https://project-showcase-api.onrender.com`).