// task.js

// Betöltjük a férj és feleség napi feladatait tartalmazó JSON fájlokat
const husbandTasks = 'taskhusband.json';
const wifeTasks = 'taskwife.json';

// Get today's date and calculate the day number (e.g., 1st day, 2nd day)
const today = new Date();
const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);

// Function to load and display tasks
function loadTasks() {
    // Load husband tasks only on husband page
    if (document.body.classList.contains('husband-page')) {
        fetch(husbandTasks)
            .then(response => response.json())
            .then(husbandData => {
                const husbandTaskContainer = document.querySelector('.husband-task-container');
                const taskIndex = dayOfYear % husbandData.tasks.length;  // Calculate the task index based on the day of the year
                const task = husbandData.tasks[taskIndex];
                displayTask(husbandTaskContainer, task);
            });
    }

    // Load wife tasks only on wife page
    if (document.body.classList.contains('wife-page')) {
        fetch(wifeTasks)
            .then(response => response.json())
            .then(wifeData => {
                const wifeTaskContainer = document.querySelector('.wife-task-container');
                const taskIndex = dayOfYear % wifeData.tasks.length;  // Same logic for the wife tasks
                const task = wifeData.tasks[taskIndex];
                displayTask(wifeTaskContainer, task);
            });
    }
}

// Function to display the task on the page
function displayTask(container, task) {
    container.innerHTML = `<p>${task}</p>`;
}

// Load tasks when the page is ready
document.addEventListener('DOMContentLoaded', loadTasks);
