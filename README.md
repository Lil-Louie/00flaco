# 00Flacco.com

Personal website repository for **00Flacco.com**.

This project contains a React frontend and a backend service, organized in a single monorepo. 
The backend is not implemented at this moement since it is not needed. 

---

##Description
Welcome to my portfolio website. This site is designed to showcase my work as a software engineer, with a focus on front-end development and practical engineering skills.
The site features several projects, including:
Tevent
GameUp
Solano Solar Cleaning
In addition, I’ve built two games — Wordle and Snake — to demonstrate deeper problem-solving, performance awareness, and data-structure-driven design.
Both games will eventually be published as standalone GitHub repositories once final cleanup and documentation are complete.

---

##Snake
The Snake game was built using React, JavaScript, Tailwind CSS, and MUI.
The core goal of this project was to implement Snake using a preallocated free-pool data structure, allowing for:
O(1) segment updates (movement, growth, and reuse)
Constant-time memory recycling
Zero runtime memory allocation during gameplay
By reusing preallocated snake segments rather than allocating new ones, the game achieves predictable performance and smooth updates regardless of snake length.
This project emphasizes performance-conscious design, data structure selection, and real-world application of Big-O analysis.

---

##Wordle
The Wordle game is a front-end focused implementation designed to showcase state management, UI feedback, and clean component architecture in React.

---

## Project Structure

```text
00Flacco.com/
  backend/
  frontend/
    public/
    src/
      assets/
      components/
      pages/
      games/
      App.js
      index.js
      index.css
  package.json
  README.md
```

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- PostCSS
- JavaScript

### Backend
- Node.js

---

## Getting Started

### Install dependencies

From the repository root:

```bash
npm install
```

Frontend dependencies:

```bash
cd frontend
npm install
```

Backend dependencies:

```bash
cd ../backend
npm install
```

---

## Running the Project

### Frontend
```bash
cd frontend
npm start
```

### Backend
```bash
cd backend
npm start
```

---

## Build (Frontend)

```bash
cd frontend
npm run build
```

---

## Notes

- Frontend source code is located in `frontend/src/`
- Pages are located in `frontend/src/pages/`
- Reusable components are located in `frontend/src/components/`

---

## License

Flacco. All rights reserved.
