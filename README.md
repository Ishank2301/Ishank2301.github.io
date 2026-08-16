# Ishank Mishra — Portfolio

A modern, responsive personal portfolio built with **Vite + React** and deployed to GitHub Pages via an automated GitHub Actions workflow.

## 🚀 Live Demo

Visit the live site: [https://ishank2301.github.io/](https://ishank2301.github.io/)

---

## 📋 Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local Development](#local-development)
- [Building for Production](#building-for-production)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
  - [Automatic Deployment (CI/CD)](#automatic-deployment-cicd)
  - [Manual Deployment (optional)](#manual-deployment-optional)
- [Customization](#customization)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🛠 Technologies Used

- **React** – UI library
- **Vite** – Build tool and development server
- **Tailwind CSS** (if applicable) – Utility-first CSS framework
- **GitHub Actions** – CI/CD for automatic deployment
- **GitHub Pages** – Hosting platform

---

## ✨ Features

- Fully responsive design
- Fast load times with Vite
- Automatic deployment on every push to `main`
- Clean, modern UI
- Easy to customize and extend

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ishank2301/Ishank2301.github.io.git
   cd Ishank2301.github.io

    Install dependencies:
    bash

    npm install

Local Development

Start the development server with hot reload:
bash

npm run dev

Open http://localhost:5173 to view it in your browser. The page will automatically reload when you make changes.
📦 Building for Production

To create an optimized production build:
bash

npm run build

The output will be generated in the dist/ folder. This folder is not committed to the repository because the GitHub Actions workflow builds and deploys it automatically.

You can preview the production build locally:
bash

npm run preview

🌐 Deployment to GitHub Pages

The site is deployed using GitHub Pages with a GitHub Actions workflow.
Automatic Deployment (CI/CD)

    Push the project to the main branch of your repository (Ishank2301/Ishank2301.github.io).

    In GitHub, go to Settings → Pages for the repository.

    Under Build and deployment, set the source to GitHub Actions.

    The workflow .github/workflows/deploy.yml runs automatically on every push to main.

    Once the workflow succeeds, the site will be available at https://ishank2301.github.io/.

    Note: The base option in vite.config.js is set to "/" for a user site. If you change the repository name, update the base accordingly.

Manual Deployment (optional)

If you prefer to deploy manually, you can build the project and use the gh-pages package or simply push the dist folder to the gh-pages branch. However, the automated workflow is recommended for simplicity.
🎨 Customization

To personalize the portfolio:

    Edit the content in src/ (e.g., components, data files).

    Update the public/ folder with your own images, favicon, etc.

    Modify the styles (Tailwind classes or CSS) to change the look and feel.

    Adjust the site title, description, and meta tags in index.html.

📁 Project Structure
text

.
├── public/                 # Static assets
├── src/                    # React components and styles
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable UI components
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Entry point
├── .github/workflows/      # GitHub Actions deployment workflow
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation

🤝 Contributing

Contributions are welcome! If you have suggestions or improvements:

    Fork the repository.

    Create a feature branch (git checkout -b feature/your-feature).

    Commit your changes (git commit -m 'Add some feature').

    Push to the branch (git push origin feature/your-feature).

    Open a Pull Request.

📄 License

This project is open source and available under the MIT License.
💬 Contact

Created by Ishank Mishra.
Feel free to reach out via GitHub or LinkedIn (if applicable).
text


---

Simply copy the entire block above and paste it into your `README.md` file. You can remove or adjust sections like the "Technologies Used" or "License" as needed to match your actual project. If you don't have a `LICENSE` file, feel free to omit that section.

