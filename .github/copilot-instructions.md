# Copilot Instructions – Green Journal Web App

This document defines the coding practices, architecture standards, and technology stack for the **Green Journal** application.  
All generated code should follow these rules.

---

## 1️⃣ Project Overview
**Goal:** A web platform for tracking eco-friendly actions, earning points, and engaging in challenges to promote sustainable living.

---

## 2️⃣ Tech Stack

Use TypeScript for type checking and improved developer experience.

**Frontend**
- Framework: React.js (v18+)
- Type Checking: TypeScript
- Styling: Tailwind CSS
- Routing: React Router (v6+)
- State Management: Redux Toolkit
- Testing: Jest + React Testing Library

**Backend**
- Type Checking: TypeScript
- Runtime: Node.js (v18+)
- Framework: Express.js
- Authentication: Firebase Auth or Auth0
- API Architecture: REST (JSON)
- Testing: Jest + Supertest

**Database**
- PostgreSQL
- ORM: Sequelize or Prisma
- Migrations & Seeds included

**Integrations**
- Push Notifications: Firebase Cloud Messaging
- Maps & Location: Mapbox or Leaflet.js
- AI Recommendations: OpenAI API or TensorFlow.js

**Hosting**
- Frontend: Vercel
- Backend: Railway or Render
- Database: Hosted PostgreSQL (Supabase / Railway / ElephantSQL)

---

## 3️⃣ Database Schema

Tables:
- **users**: `id`, `email`, `name`, `location`, `points`, `created_at`
- **actions**: `id`, `user_id`, `type`, `impact_score`, `date`
- **challenges**: `id`, `title`, `description`, `start_date`, `end_date`, `reward_points`
- **user_challenges**: `id`, `user_id`, `challenge_id`, `status`
- **rewards**: `id`, `title`, `description`, `cost_points`, `available`
- **user_rewards**: `id`, `user_id`, `reward_id`, `date_claimed`

Relationships:
users ────< actions 
└────< user_challenges >──── challenges 
└────< user_rewards >─────── rewards

---

## 4️⃣ Coding Standards

**General**
- Enforce ESLint (Airbnb or Standard config) + Prettier
- Use async/await (no `.then()` chains)
- Keep functions small and single-responsibility
- Write descriptive commit messages in English

**Frontend**
- Use functional components with React hooks
- Keep components < 300 lines
- Separate logic from UI (use custom hooks for data fetching)
- Use Tailwind utility classes; keep custom CSS minimal
- Implement mobile-first responsive design

**Backend**
- Use MVC pattern (Models, Controllers, Routes)
- Validate all request data with Joi or Zod
- Sanitize inputs to prevent SQL injection / XSS
- Use environment variables via `.env` + `dotenv`
- Structure:
backend/ 
├── src/ 
│ ├── models/ 
│ ├── controllers/ 
│ ├── routes/ 
│ ├── middlewares/ 
│ ├── services/ 
│ └── config/ 
├── tests/ 
└── server.js

---

## 5️⃣ API Guidelines

**Example REST endpoint structure:**
- `GET /api/users`
- `POST /api/users`
- `GET /api/actions`
- `POST /api/actions`
- `GET /api/challenges`
- `POST /api/user-challenges`

**Responses:**
- Always return JSON with `status`, `message`, and `data`
- Use proper HTTP status codes

---

## 6️⃣ Development Workflow

1. **Initialize Git repository** with main and dev branches
2. **Backend first** – set up server, connect DB, implement auth
3. Add migrations and seed scripts
4. Implement core API endpoints
5. Build frontend pages one by one
6. Add integrations (Mapbox, Firebase, AI)
7. Write unit and integration tests
8. Prepare CI/CD pipeline (GitHub Actions)
9. Deploy to production (Vercel + Railway/Render)

---

## 7️⃣ Security Rules

- Use HTTPS in production
- Hash passwords with bcrypt (if local auth)
- Store secrets in environment variables (never commit `.env`)
- Rate-limit API requests
- Validate JWT tokens on protected routes

---

## 8️⃣ Testing Standards

- **Backend:** unit tests for services and controllers
- **Frontend:** snapshot tests for components, integration tests for flows
- Aim for **80%+ coverage**

---

## 9️⃣ File Naming

- JavaScript/React files: `camelCase.ts` for utils/hooks, `PascalCase.tsx` for components
- Styles: `componentName.module.css` (if needed)
- Tests: `*.test.ts` or `*.spec.ts`

---

## 🔟 Deployment & Environment

- **Environments:** development, staging, production
- Each environment has its own `.env` file
- Use database migrations during deployment

---

By following these rules, all contributors and AI-assisted code generations will maintain a **consistent, scalable, and secure** codebase.