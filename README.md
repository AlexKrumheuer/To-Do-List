# To-Do List Project

This is a simple beginner project built using JavaScript, HTML, and CSS. It was my first project of this scale (although not large, it still took some time to complete), and it focuses solely on the front-end.

During development, I experimented with a few ideas, such as using classes to create windows (with `DisplayCreate` and `WindowCreate`) to streamline the coding process.

This project was loosely inspired by the Microsoft To-Do List app.

Ultimately, this was a test project. In the future, as I learn new tools and techniques, I plan to improve it and turn it into a truly useful To-Do List website.

## Notes About the Website

This website was designed with multiple sections accessible via the left sidebar. However, for this first version, I decided to keep only the Tasks page.

For the icons, I've mostly used Font Awesome icons.

## Explanation of Each JavaScript File

### `dom.js`
This file contains all DOM declarations that are used across multiple files. There may be a few stray variable declarations in other documents.

### `ui.js`
This file holds all the lists and maps. Since this is a front-end-only project, I used a normal array to store tasks. I also implemented a map system for each icon (`i`), where you can retrieve an icon's two class names (`c1` and `c2`) using `classImages.get(imageName)`.

Additionally, this file includes lists for:
- Available task lists
- Number of days for scheduling a task
- Task notification methods
- Task repetition options

### `index.js`
This is the website's main file. It adds an `input` event listener to the task name input field. When something is typed, it displays customization options for the task (list selection, task date, reminder date, and repetition), with the list being the only required field.

Each element also has a `click` event listener that directs behavior based on which element was clicked. A static variable within the `DisplayCreate` class is set to `true` whenever a window opens. The function `addTaskbarChildElements()` is only called if no windows are open, and it receives the clicked element along with its corresponding list.

Additionally, a `click` event listener on the body detects clicks anywhere on the page. An array called `stackOpenWindow` tracks open windows. When a user clicks outside a window, the last opened window is removed from this list and from the DOM, closing it and updating `DisplayCreate.createElement` to `false`.

### `AddTaskToMain.js`
This file manages the appearance of customization options for tasks, such as selecting a task list.

It initializes key variables:
- `customTaskHtml`: Stores the HTML for the custom task repetition option.
- `actualDisplay`: Stores the currently open window.

It first creates a display using the `DisplayCreate` class, then adds it to the list of open windows with a timeout to prevent synchronization bugs.

Each list element from `ui.js` is iterated over to generate an HTML element using `WindowCreate`. Once created, the `createTaskbarGridElements` class assigns icons and text.

Handling Click Events:
- **Exceptions:**
  - *"Pick a Date" and "Pick a Date & Time"*: Use Flatpickr to allow manual date selection.
  - *Custom*: Opens a new window with task repetition settings.
- **Regular Elements:**
  - Calls `buttonClicked()`, which either resets the task customization (if removing an option) or applies the selected customization.

### `addTask.js`
Handles events after clicking the "Add Task" button:
1. Checks if the task name is unique and not empty.
2. Creates a task object and adds it to the task list.
3. Tracks the task count.
4. Adds the task completion button with event listeners:
   - `conclusionTaskButtonClicked`: Toggles task completion.
   - `conclusionTaskButtonChangeStatusAndAppearence`: Updates the button appearance and moves the task if completed.
5. Generates task HTML using the `addItem` class.
6. Resets global variables via `defaultTasks()`.

### `Sidebar.js`
Handles the right-click task menu (sidebar for task editing).

#### Global Variables
- `elementParentObject`: Stores the selected task object.
- Sidebar elements: `sidebarContainer`, `taskTextValue`, `taskGrid`, etc.
- `sidebarHtml`: Contains the sidebar template.

#### `voidSidebar()`
Triggered on right-click:
1. Prevents default context menu.
2. Checks if the sidebar is already open (`isSidebarOpen()`).
3. Identifies the clicked task.
4. Adjusts the layout (shrinks task grid to 75%).
5. Creates and displays the sidebar.
6. Configures sidebar button events:
   - Delete task (`deleteTask()`).
   - Load task info (`sidebarPutInfo()`).
   - Mark as completed (`finishedSidebarButton()`).
   - Save/Cancel buttons (`buttonSaveCancelSidebar()`).

#### Key Functions
- `isSidebarOpen()`: Checks if a sidebar is already open.
- `buttonSaveCancelSidebar()`: Saves or cancels edits.
- `sidebarPutInfo()`: Fills sidebar fields with task data.
- `finishedSidebarButton()`: Toggles task completion and updates UI.
- `deleteTask()`: Confirms and deletes a task from the list and DOM.
- `updateObjectSidebarInfo()`: Updates task object properties.
- `updateHtmlTaskContent()`: Updates the task's displayed HTML.

### `Classes`

#### `DisplayCreate.js`
Simplifies creating parent divs containing elements.
- Constructor parameters: `width`, `height`, `parentElement`.
- Static variable `createdElement` prevents multiple window openings.
- Key methods:
  - `positionNearButton()`: Positions element near parent.
  - `getDomElement()`: Returns the created HTML element.
  - `closeWindow()`: Removes element from DOM and resets `createdElement`.
  - `addClass()`: Dynamically adds a class.

#### `WindowCreate.js`
Similar to `DisplayCreate`, but for child elements within a display.

#### `Tasks.js`
Handles task object creation.

---

This project was a learning experience, and I plan to refine and expand it as I gain more knowledge in web development. 🚀
