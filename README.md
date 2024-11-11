# Shopping List Drag and Drop

This is a simple shopping list application that allows users to add, remove, rearrange, and organize items using drag-and-drop functionality.

## Features

- **Add Items**: Add new items to the list by clicking the "Submit" button.
- **Drag and Drop**: 
  - Move items to the "To Buy" section.
  - Rearrange items within the list.
  - Drag items to the trash to remove them from the list.
- **Live Updates**: Changes are reflected instantly as you interact with the app.

## Technologies Used

- **HTML5**: The foundational markup language used to structure the app.
- **CSS3**: Used for styling the layout, positioning, and visual appearance of the app.
- **Vanilla JavaScript**: The primary language used for all the logic of the application, including drag-and-drop functionality, DOM manipulation, event handling, and state management.
- **Parcel**: A zero-config web application bundler used to bundle, serve, and run the project with ease.
- **npm**: The package manager used to install project dependencies and manage project scripts.
- **loglevel**: A lightweight logging utility used for debugging and tracking events in the application.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (https://nodejs.org/)
- **npm** (usually comes with Node.js)

## Installation

1. Clone the repository using HTTPS:
```bash
git clone https://github.com/DamiXioR/ShoppingList.git
cd ShoppingList
```

2. Alternatively clone the repository using SSH:
```bash
git clone git@github.com:DamiXioR/ShoppingList.git
cd ShoppingList
```

3. Install dependencies:
  ```bash
  npm install
  ```

Running the Project
-------------------

Once the dependencies are installed, you can start the project using Parcel.
```bash
npx parcel index.html
```

This will:

-   Start a local development server.
-   Automatically open the app in your default browser.
-   Support hot module reloading (HMR), so the page will refresh automatically as you make changes to the code.

The development server will usually be available at `http://localhost:1234/`, unless specified otherwise in the terminal output.

## Usage

-   **Click** the "Submit" button to add new items to the list.
-   **Drag** items to the "To Buy" section to move them.
-   **Drag** items to the trash to remove them from the list.
-   **Rearrange** items by dragging and dropping them within the list.

## Skills Demonstrated

This project demonstrates my proficiency in the following areas:

-   **DOM Manipulation**: Working with and modifying the HTML DOM using JavaScript to build dynamic, interactive applications.
-   **Event Handling**: Implementing event listeners and managing user interactions such as clicks, drag-and-drop, and mouse events.
-   **Drag and Drop API**: Implementing custom drag-and-drop functionality to allow users to interact with and organize items in a list.
-   **State Management**: Using JavaScript arrays to manage the state of the shopping list and dynamically update the UI.
-   **Modular JavaScript**: Organizing the application's logic into clean, reusable functions to ensure maintainability and scalability.
-   **Debugging and Logging**: Using tools like `loglevel` to track and debug events and application flow during development.
-   **Responsive Design (in progress)**: Ensuring that the app's UI looks good on different screen sizes (if applicable).

## Contributing

Feel free to fork this project and contribute by opening issues or submitting pull requests.

## License

This software is licensed under the **MIT License**.

Copyright (c) 2024 Damian Jankowski

Permission is hereby granted, free of charge, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

