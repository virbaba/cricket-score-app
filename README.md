# 🏏 Cricket Scoring App

A full-stack cricket scoring application built with **Express, MongoDB, and React 19**. It tracks match events like runs, wickets, and extras, and displays them in real-time.

---

## 🧠 Features

- Real-time event updates (LIFO sorted)
- Match, batsman, bowler, and team stats tracking
- Modern frontend using **React 19** + **Tailwind CSS**
- API built with **Express** + **Mongoose**
- TypeScript on both frontend and backend
- Environment configuration via `.env`

---

## 🗂️ Project Structure

```
cricket-scoring-app/
│
├── backend/              # Express + MongoDB + Mongoose + TypeScript
│   ├── src/
│   ├── dist/
│   ├── package.json
│   ├── tsconfig.json
│
├── frontend/             # React 19 + Tailwind CSS + Vite + TypeScript
│   ├── src/
│   ├── vite.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
```

---

## 🚀 Getting Started

### 🔧 Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Run in development mode:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

### 💻 Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app in development:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## ⚙️ Scripts

### Backend

| Script       | Description                     |
|--------------|---------------------------------|
| `npm run dev`| Start server with live reload   |
| `npm run build` | Compile TypeScript to `dist` |
| `npm start`  | Run compiled backend            |

### Frontend

| Script        | Description                 |
|---------------|-----------------------------|
| `npm run dev` | Start Vite dev server       |
| `npm run build` | Build for production      |
| `npm run preview` | Preview built app       |
| `npm run lint` | Lint the codebase          |

---

## 📦 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, Mongoose, TypeScript
- **Database**: MongoDB
- **Dev Tools**: ESLint, ts-node-dev

---

## 🛠️ To Do

- [ ] Add authentication
- [ ] Implement live socket updates
- [ ] Add admin panel for match setup
- [ ] Write unit and integration tests
