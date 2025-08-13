# DragMe

![DragMe Logo](https://raw.githubusercontent.com/MarioLJFerreira/mini-dragme/main/src/assets/logo.svg)

**DragMe** is a simple, intuitive Kanban board web application designed to help you and your team manage tasks and visualize project workflows with ease. With its powerful drag-and-drop functionality, customizable views, and a clean, modern interface, DragMe makes organization effortless.

---

## ✨ Features

-   **Drag-and-Drop:** Seamlessly move task cards between columns or reorder them within a column.
-   **Grid & List Views:** Switch between a classic Kanban board (Grid View) and a simplified task list (List View).
-   **Task Cards:** Create and manage individual task cards with titles and tags.
-   **Tagging System:** Categorize tasks with custom tags for better organization and filtering.
-   **Dark Mode:** A comfortable viewing experience with a user-friendly dark theme.
-   **Filtering:** Quickly narrow down tasks on your board by filtering with specific tags.
-   **Customizable Boards:** Add new columns to your board to fit your unique workflow.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   npm (Comes with Node.js)

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/MarioLJFerreira/mini-dragme
    ```
2.  Navigate to the project directory:
    ```sh
    cd mini-dragme
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```

The app will be available at `http://localhost:5173`.

---

## 🧪 Running Tests

The project uses **Vitest** as the testing framework. You can run the tests with the following command:

```sh
npm test
````

-----

## 📂 Project Structure

The project is structured to be modular and scalable, with clear separation of concerns. Below is a detailed breakdown of the main directories and their contents.

```
mini-dragme/
│
├── index.html              # Main HTML entry point for the Vite application.
├── package.json            # Project dependencies and scripts configuration.
├── package-lock.json       # Locked versions of dependencies for consistent installs.
├── vite.config.js          # Vite build tool configuration.
├── .gitignore              # Git ignore rules for the project.
├── eslint.config.js        # ESLint configuration for code quality.
├── README.md               # Project documentation and setup instructions.
│
└── src/                    # Source code directory.
    │
    ├── assets/             # Static images, icons, and logos.
    │   └── logo.svg        # App's logo.
    │
    ├── components/         # Reusable UI components.
    │   ├── ui/             # Small, foundational UI elements.
    │   │   ├── Button.jsx  # All button types (primary, secondary, danger).
    │   │   ├── Input.jsx   # Input fields for forms, search, etc.
    │   │   ├── Modal.jsx   # Modal component for creating/editing tasks or projects.
    │   │   ├── Tag.jsx     # Visual component for task tags/categories.
    │   │   └── Avatar.jsx  # User profile image component.
    │   │
    │   ├── layout/         # Structural components for the application's layout.
    │   │   ├── Header.jsx      # Top navigation bar.
    │   │   ├── Sidebar.jsx     # Side navigation for project lists, filters, etc.
    │   │   └── MainContent.jsx # The main container for the board area.
    │   │
    │   └── board/          # Core components for the drag-and-drop board.
    │       ├── Board.jsx         # The main container for the entire board.
    │       ├── BoardColumn.jsx     # Represents a single column/list in the board. This component will contain the Droppable logic.
    │       ├── TaskCard.jsx        # A single task card component. This component will contain the Draggable logic.
    │       ├── AddTaskCard.jsx     # A button/form for adding new tasks to a column.
    │       └── ColumnHeader.jsx    # Component for the column title, settings, and menu.
    │
    ├── pages/              # Page-level components that compose the application's views.
    │   ├── Dashboard.jsx   # The main landing page after login.
    │   ├── Login.jsx       # The user login page.
    │   ├── Register.jsx    # The user registration page.
    │   └── ProjectView.jsx # The primary component for a single project board.
    │
    ├── hooks/              # Custom React hooks for shared logic.
    │   ├── useAuth.js      # Handles user authentication state and logic.
    │   └── useDarkMode.js  # Manages dark mode state and local storage.
    │
    ├── context/            # React Context API for global state management.
    │   ├── AuthContext.jsx     # Manages authentication state across the app.
    │   ├── ThemeContext.jsx    # Manages the light/dark mode theme.
    │   └── BoardContext.jsx    # Manages the state for the current board (tasks, columns, etc.).
    │
    ├── lib/                # Utility functions and helper modules.
    │   ├── api.js          # Functions for making API calls to the backend.
    │   └── dndHelpers.js   # Helper functions for the drag-and-drop logic (e.g., reordering arrays).
    │
    ├── styles/             # Tailwind CSS Modules for component-specific styling.
    │   ├── buttons.module.css
    │   ├── cards.module.css
    │   ├── forms.module.css
    │   ├── layout.module.css
    │   └── tags.module.css
    │
    ├── App.jsx             # The root component that renders the application's pages.
    ├── App.css             # Main application styles.
    ├── index.jsx           # The entry point for the React application.
    ├── index.css           # Global CSS styles and Tailwind imports.
    ├── main.jsx            # Main entry point that renders the React app.
    └── tailwind.config.js  # Configuration for Tailwind CSS.
```

-----

### Implementation Details:

  - **React DnD (@hello-pangea/dnd):** The core drag-and-drop logic will be implemented with this library. The `Draggable` and `Droppable` components will be primarily placed within `TaskCard.jsx` and `BoardColumn.jsx`, respectively.
  - **Drag Logic:** Reordering and moving functions will be housed in `lib/dndHelpers.js` for clean separation and reusability.
  - **Board State:** The state of the board (tasks, columns, etc.) will be managed within a combination of `BoardContext.jsx` and the `pages/ProjectView.jsx` component to ensure a single source of truth.

-----

## 🤝 Contributing
### Commit and Branching Practices

To contribute to this project, you must first create a new branch for your changes. This practice keeps our `main` branch clean and ensures that your contributions are reviewed before being merged.

#### How to Create a New Branch

1.  Start by ensuring you are on the `main` branch and that it's up to date.

    ```sh
    git checkout main
    git pull origin main
    ```

2.  Create a new branch with a descriptive name. Your branch name should start with a prefix indicating the type of change, followed by a short, kebab-cased description.

      - **`feature/your-feature-name`**: For adding a new feature.
      - **`bugfix/your-fix-name`**: For fixing a bug.
      - **`enhancement/your-improvement-name`**: For improving an existing feature.
      - **`docs/your-doc-change`**: For changes to documentation.
      - **`refactor/your-refactor-name`**: For code refactoring.
      - **`chore/your-chore-name`**: For maintenance tasks or build changes.

    Example:

    ```sh
    git checkout -b feature/add-dark-mode
    ```

3.  Make your changes in this new branch.

#### Committing Your Changes

Once you've made your changes, you can commit them to your new branch.

1.  Stage your changes:

    ```sh
    git add .
    ```

2.  Commit your changes with a clear and concise message. The first line should be a brief summary (under 50 characters), followed by a more detailed description if needed.

    Example:

    ```sh
    git commit -m "feat: add dark mode toggle"
    ```

3.  Push your branch to the remote repository:

    ```sh
    git push origin feature/add-dark-mode
    ```

4.  Finally, open a Pull Request from your branch to the `main` branch to have your changes reviewed and merged.


-----

Project Link: [https://github.com/MarioLJFerreira/mini-dragme](https://github.com/MarioLJFerreira/mini-dragme)
