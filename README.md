# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Before starting the project, be sure to run either yarn install or npm install to ensure that all dependencies are properly installed. Once installed, you can begin working on your project with confidence.

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


Features
1. Users can add a new task to the list by clicking on the 'Add' button or by pressing the Enter key while the input field is in focus
2. Users can edit the text of a task by clicking on it. This will turn the text into an editable input field. Users can then edit the text and save the changes by either pressing the "Enter" key or by clicking outside of the input field to lose focus. The edited text will then be updated and saved in the list of tasks.
3. User can mark a task as complete by clicking the checkbox to the left of the task text. The completed task will appear with a strike-through effect and a lower opacity, indicating that it is no longer an active task. The user can also mark a completed task as incomplete by clicking the checkbox again, which will remove the strike-through effect and restore the task's full opacity
4. User have the ability to delete a task from the list by clicking on a red cross located to the right of the task text
5. User can sort tasks by dragging and dropping them in the desired order
6. User can filter only incomplete tasks by clicking the "Show only incomplete" checkbox. When the checkbox is checked, only the incomplete tasks will be displayed.
7. The app is responsive and has been designed to work seamlessly on all devices, including desktops, tablets, and mobile gadgets
8. The app uses local storage to persist the user's task list so that it is preserved between page refreshes
