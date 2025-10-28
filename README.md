# 🎟️ TicketApp — Vue.js Implementation

This is the **Vue 3** version of the **Multi-Framework Ticket Management Web App**, built for **HNG Frontend Stage 2**.

It replicates the same structure, layout, and logic as the Twig and React implementations, with full feature parity and responsive UI consistency.

Live Preview:

React:
Vue:
Twig: 

---

## 🚀 Features

### 🏠 Landing Page
- Hero section with smooth **wavy background** and **decorative circles** (Tailwind clip-path + blur effects)
- Responsive layout (max width 1440px)
- Clear CTA buttons: **Login** and **Get Started**
- Consistent footer across pages

### 🔐 Authentication
- **Signup** and **Login** pages with inline validation and toasts
- LocalStorage-based auth simulation (`ticketapp_user` + `ticketapp_session`)
- Protected routes: Dashboard and Ticket Management
- Redirects unauthorized users to `/auth/login`

### 📊 Dashboard
- Displays **ticket statistics**:
  - Total tickets
  - Open tickets
  - In-progress tickets
- “Manage Tickets” button links to Ticket CRUD page
- Logout clears session and redirects to home

### 🎟️ Ticket Management (CRUD)
- Create, View, Edit, and Delete tickets
- Inline and toast validation using **Zod**
- Status badges:
  - `open` → Green  
  - `in_progress` → Amber  
  - `closed` → Gray
- Real-time updates stored in LocalStorage (`ticketapp_tickets`)

### ⚙️ Validation Rules (Zod)
| Field | Type | Requirement | Example |
|-------|------|-------------|----------|
| `title` | string | required | "Login Bug" |
| `status` | enum | `open`, `in_progress`, `closed` | "open" |
| `description` | string | optional | "Fix login redirect issue" |
| `priority` | string | optional | "high" |

---

## 🧠 Tech Stack

| Category | Tools / Libraries |
|-----------|------------------|
| Framework | Vue 3 (Composition API) |
| State Management | Pinia |
| Routing | Vue Router 4 |
| Validation | Zod |
| Styling | Tailwind CSS 4 |
| Toast Notifications | Custom Vue component |
| Storage | LocalStorage (mock backend) |
| Build Tool | Vite |

---

## 🗂️ Folder Structure

vue-ticket-app/
├─ src/
│ ├─ assets/
│ ├─ components/
│ │ ├─ Navbar.vue
│ │ ├─ Toast.vue
│ │ └─ AuthGuard.vue
│ ├─ pages/
│ │ ├─ Home.vue
│ │ ├─ Dashboard.vue
│ │ ├─ Tickets.vue
│ │ └─ auth/
│ │ ├─ Login.vue
│ │ └─ Signup.vue
│ ├─ stores/
│ │ └─ auth.js
│ ├─ router/
│ │ └─ index.js
│ ├─ App.vue
│ ├─ main.js
│ └─ assets/main.css
├─ package.json
├─ tailwind.config.js
└─ README.md