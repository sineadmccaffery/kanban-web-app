# 🗂️ Kanban Board

A clean and modern Kanban board for task management, built with **React**, **TypeScript**, **Tailwind CSS**, and **@dnd-kit**. This app supports full drag-and-drop functionality, task editing, filtering, and sorting — all with smooth transitions and visually pleasing styles.

---

## ✨ Features I Implemented

- ✅ **Drag and Drop Between Columns**  
  Using `@dnd-kit/core` and `@dnd-kit/sortable`, users can drag tasks between different sections or reorder them within the same section.

- 🎨 **Color-Coded Tasks**  
  Each task is styled based on its section and priority:
  - Section determines the base hue.
  - Priority controls the background transparency.
  - Colors are converted from hex to `rgba()` to support dynamic opacity levels.

- 🧭 **Filtering and Sorting**  
  Users can filter tasks by section, priority, or assignee.  
  Sorting options include:
  - Due date (ascending/descending)
  - Priority (Low → High or High → Low)

- 📝 **Task Detail Page**  
  Clicking the edit icon opens a full-page modal where users can edit a task’s metadata, including:
  - Title
  - Description
  - Priority
  - Due date
  - Assignee
  - Section

- ➕ **Floating Add Button**  
  A fixed-position button opens a modal to create new tasks.

- 🔁 **Smooth Animations**  
  Drag interactions are animated using `transform` values from `@dnd-kit`.  
  Transitions are styled with Tailwind’s `transition` and `ease-in-out` classes.  
  A small delay prevents premature updates until the user releases the task.

- 📱 **Responsive Layout**  
  The board uses `flex` and `overflow-x-auto` for scrollable columns, making it fully responsive on all screen sizes.

---

## 💡 Tradeoffs and Reasoning

- 📦 **Web-Only Drag Support**  
  I prioritized web compatibility for drag-and-drop using `@dnd-kit`, which has limited mobile-native gesture support.  
  Tradeoff: Touch gestures on mobile are not fully optimized, but this allowed a smoother and more feature-rich desktop experience.

- 🧪 **Mock API Over Persistent Backend**  
  Tasks are fetched from a local mock API (`fetchTasks()`), which simplifies development and avoids deployment complexity.  
  Tradeoff: Changes are not persisted across refreshes. A future step would be integrating Supabase or Firebase.

- 🔄 **Full Card Click Disabled for Detail View**  
  To avoid accidental task opens during drag, I scoped the detail view trigger to a dedicated edit icon.  
  Tradeoff: Slightly less intuitive, but greatly improves drag usability.

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **State Management:** React Context API
- **Drag & Drop:** `@dnd-kit/core`, `@dnd-kit/sortable`
- **Routing:** React Router
- **Styling:** Tailwind CSS

---
## File Structure

src/
├── api/              # Mock API to simulate task fetching
├── components/       # TaskCard, TaskModal, FilterBar, etc.
├── context/          # TaskContext for shared task state
├── screens/          # KanbanBoard and TaskDetail screens
├── types/            # TypeScript type definitions
├── App.tsx           # Main route setup
└── main.tsx          # React entry point

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board

### 2. Install Dependencies

npm install

### 3. Start the development server

npm run dev