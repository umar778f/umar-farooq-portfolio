# Umar Farooq — Personal Portfolio

A fast, responsive, and modern developer portfolio built with semantic HTML5, modern CSS3 glassmorphism, and vanilla JavaScript. Features smooth animations, an interactive typewriter subtitle, custom cursor physics, 3D ambient perspective tilt, and dynamic profile data hydration.

---

## 🚀 Live Demo & Profiles

- **GitHub Profile**: [github.com/umar778f](https://github.com/umar778f)
- **LinkedIn Profile**: [linkedin.com/in/umar778f](https://www.linkedin.com/in/umar778f/)
- **Contact Email**: [25005376088@skt.umt.edu.pk](mailto:25005376088@skt.umt.edu.pk)

---

## 🛠️ Technologies Used

### Frontend & Design
- **HTML5**: Semantic document structure, accessibility landmarks, Open Graph & Twitter Card social meta tags.
- **CSS3**: Custom design tokens, glassmorphism (`backdrop-filter: blur(16px)`), CSS Grid, Flexbox, and 11 keyframe animations.
- **JavaScript (ES6+)**: Zero-dependency vanilla engine for dynamic typing, cursor trailing physics, 3D perspective tilt, scroll spy, and mobile drawer controls.
- **Google Fonts**: [Poppins](https://fonts.google.com/specimen/Poppins) (weights: 300, 400, 500, 600, 700).
- **Icons**: [FontAwesome 6.4.0](https://fontawesome.com/) via CDN.

### Backend & Local Tooling
- **Node.js**: Built-in HTTP server (`server.js`) with MIME type handling, CORS support, and path traversal protection. Zero third-party npm runtime dependencies required.

---

## ✨ Features

- **Dark Glassmorphism Aesthetic**: Deep cosmic space palette (`#05060a`), multi-layered floating ambient orbs, and frosted glass cards.
- **Typewriter Subtitle**: Dynamically cycles through professional roles (`Full Stack Developer`, `Software Engineer`, `AI & ML Developer`) with tab-visibility recovery and `prefers-reduced-motion` support.
- **Interactive Custom Cursor**: Lerp-interpolated follower ring with smooth scaling on hoverable targets.
- **Ambient 3D Tilt**: Perspective rotation on portrait responds smoothly to cursor movements.
- **Sticky Glass Navbar & Mobile Drawer**: Header blur and elevation shadow activate upon scrolling; mobile navigation drawer includes accessible focus trapping and keyboard `Escape` support.
- **Categorized Technical Skills**: Dynamically displays confirmed competencies:
  - **Programming**: Python
  - **AI & Machine Learning**: PyTorch, TensorFlow, OpenCV, Hugging Face
  - **Frameworks & GenAI**: FastAPI, OpenAI, LangChain
  - **Tools & Infrastructure**: Docker, Git, n8n
- **Education Timeline**: Highlights degree in BS Artificial Intelligence at University of Management and Technology (UMT).
- **Contact Form & Direct Email**: Interactive form with floating label micro-interactions, input validation, and direct email composition fallback to `25005376088@skt.umt.edu.pk`.
- **Fully Responsive**: Optimized across desktop (1440px+), tablet (768px–1024px), and mobile (320px–480px).

---

## 📁 Project Structure

```
umar-farooq-portfolio/
├── assets/
│   ├── favicon.svg          # Custom vector monogram favicon (UF)
│   └── umar.png             # Transparent circular portrait
├── css/
│   └── styles.css           # Modular glassmorphism stylesheet & animations
├── data/
│   └── profile.json         # Structured profile, education, and skills data
├── js/
│   └── main.js              # Core UI controller and interaction engine
├── .gitignore               # Ignored system, log, and editor artifacts
├── index.html               # Main semantic HTML entry point
├── package.json             # Project metadata and run scripts
├── README.md                # Project documentation
├── server.js                # Zero-dependency local development server
└── site.webmanifest         # Progressive Web App (PWA) manifest
```

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- Alternatively, any static HTTP server (e.g., Python's `http.server`, VS Code Live Server).

### Running with Node.js
1. Clone or open the repository:
   ```bash
   git clone https://github.com/umar778f/portfolio.git
   cd portfolio
   ```

2. Start the local server:
   ```bash
   npm start
   ```
   *(Or run `node server.js` directly)*

3. Open your browser and navigate to:
   ```
   http://localhost:3000/
   ```

### Running with Python
```bash
python -m http.server 3000
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

