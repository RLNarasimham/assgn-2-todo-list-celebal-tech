# 📝 Todo List App

This is a simple and responsive **Todo List application** built with **React.js**. It allows users to add, edit, mark as complete, delete, and filter tasks. The app also stores tasks in the browser using `localStorage`, ensuring persistence across sessions.

---

## 🚀 Features

- ✅ Add new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ✅ Mark tasks as completed or active
- 🔍 Filter tasks (All / Active / Completed)
- 📚 Tasks saved in browser (`localStorage`)
- 🎨 Clean and responsive UI with sorting options

---

## 📁 Project Structure

todolist-app/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── tests/
│   │   ├── FilterSortControls.test.js
│   │   ├── TaskForm.test.js
│   │   ├── TaskItem.test.js
│   │   └── ToDoList.test.js
│   ├── components/
│   │   ├── FilterSortControls.js
│   │   ├── TaskForm.js
│   │   ├── TaskItem.js
│   │   └── ToDoList.js
│   ├── hooks/
│   │   ├── useFilteredSortedTasks.js
│   │   └── useLocalStorage.js
│   ├── styles/
│   │   └── styles.js
│   ├── utils/
│   │   └── storage.js
│   ├── App.js
│   ├── App.test.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── README.md
└── package-lock.json

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RLNarasimham/assgn-2-todo-list-celebal-tech.git
   cd todolist-app

2. **Install dependencies**:

```bash
  npm install
```
3. **Install the required dependencies**:

```bash
npm start
```
Open your browser at http://localhost:3000 to view the app.

🧪 Testing Guidance (Manual)
You can test the core functionalities manually:

Add a task – You can give some input in the input field and click on "Add".

Edit a task – Click on "Edit" button to change the text, and save.

Delete a task – Click on "Delete" button to remove a task.

Mark as complete – Tick the checkbox to mark the task as done.

Sort/Filter – Use dropdowns to change task view.

Persistence – Refresh the page. You can still find the earlier Tasks via localStorage.

📸 Screenshots
**ToDo-List App in Light Mode**:
![image](https://github.com/user-attachments/assets/75f26766-eee0-44a0-af99-c8e2c85c46b2)

**ToDo-List App in Dark Mode**:
![image](https://github.com/user-attachments/assets/1b2a7f7f-e7b3-40f1-b9f4-5482da98fefb)

🧑‍💻 Author
Lakshmi Narasimham Rallabandi
