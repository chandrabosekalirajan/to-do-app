# Angular Signals Todo Application

A simple and responsive Todo application built with **Angular** using the **Signals API** for state management. The application demonstrates how Signals can be used to build a reactive UI without relying on RxJS for component state.

## Features

* Add new todos
* Mark todos as completed or pending
* Edit existing todos
* Delete todos
* Search todos by title
* Filter todos

  * All
  * Active
  * Completed
* Sort todos

  * Newest
  * Oldest
  * A–Z
  * Z–A
* Dashboard statistics

  * Total Todos
  * Completed Todos
  * Pending Todos
  * Completion Percentage
* Automatic Local Storage persistence
* Responsive and clean user interface
* Built completely using Angular Signals

---

## Technologies Used

* Angular
* TypeScript
* Angular Signals
* HTML5
* CSS3
* Local Storage API

---

## Project Structure

```
src/
│
├── app/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   └── app.config.ts
│
├── assets/
│
└── main.ts
```

---

## State Management

The application uses Angular Signals for reactive state management.

### Signals

* `todos`
* `newTodoTitle`
* `searchTerm`
* `filter`
* `sortOrder`
* `editingTodoId`
* `editingTitle`

### Computed Signals

* `visibleTodos`
* `totalCount`
* `completedCount`
* `pendingCount`
* `completionPercent`

---

## Functionality

### Add Todo

Creates a new todo with:

* Unique ID
* Title
* Completion status
* Creation timestamp

---

### Edit Todo

Allows updating the title of an existing todo.

---

### Delete Todo

Removes the selected todo from the list.

---

### Toggle Todo

Marks a todo as completed or active.

---

### Search

Filters todos by matching the entered search text with the todo title.

---

### Filter

Available filters include:

* All
* Active
* Completed

---

### Sorting

Todos can be sorted by:

* Newest
* Oldest
* Alphabetical (A–Z)
* Reverse Alphabetical (Z–A)

---

### Dashboard

Displays:

* Total number of todos
* Completed todos
* Pending todos
* Overall completion percentage

---

## Local Storage

The application automatically stores todos in the browser's Local Storage.

On application startup:

* Existing todos are loaded automatically.
* If no data exists, an empty todo list is initialized.

---

## How to Run

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project

```bash
cd <project-folder>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
ng serve
```

### 5. Open the application

Navigate to:

```
http://localhost:4200
```

---

## Build for Production

```bash
ng build
```

The production build will be generated inside the `dist/` directory.

---

## Learning Outcomes

This project demonstrates:

* Angular Signals
* Writable Signals
* Computed Signals
* Effects
* Reactive UI updates
* Local Storage integration
* Component-based application design
* CRUD operations in Angular
* Search, Filter, and Sort functionality

---

## Future Enhancements

Possible improvements include:

* Due dates
* Priority levels
* Categories
* Tags
* Drag-and-drop reordering
* Dark mode
* Subtasks
* Progress tracking
* Backend API integration
* User authentication
* Cloud synchronization

---

## Author

Developed as an Angular Signals Todo Application to demonstrate modern Angular state management using Signals and computed properties.
