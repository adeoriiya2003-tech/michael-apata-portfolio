/* =====================================================
   TASKFLOW TODO APPLICATION
   Main JavaScript
===================================================== */


/* =====================================================
   1. TASK DATA
===================================================== */

let tasks = JSON.parse(localStorage.getItem("taskflowTasks")) || [

    {
        id: 1,
        text: "Complete today's frontend challenge",
        completed: false
    },

    {
        id: 2,
        text: "Review HTML and CSS concepts",
        completed: true
    },

    {
        id: 3,
        text: "Practice JavaScript for 30 minutes",
        completed: false
    }

];


/* =====================================================
   2. CURRENT FILTER
===================================================== */

let currentFilter = "all";


/* =====================================================
   3. GET HTML ELEMENTS
===================================================== */

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const taskCountText = document.getElementById("taskCountText");
const emptyState = document.getElementById("emptyState");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");


/* =====================================================
   4. GET FILTERED TASKS
===================================================== */

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(function(task) {
            return !task.completed;
        });

    }


    if (currentFilter === "completed") {

        return tasks.filter(function(task) {
            return task.completed;
        });

    }


    return tasks;

}


/* =====================================================
   5. SAVE TASKS
===================================================== */

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}


/* =====================================================
   6. DISPLAY TASKS
===================================================== */

function displayTasks() {

    // Clear the current task list
    taskList.innerHTML = "";


    // Get tasks based on the current filter
    const filteredTasks = getFilteredTasks();


    // Create a card for every filtered task
    filteredTasks.forEach(function(task) {

        const taskItem = document.createElement("div");

        taskItem.classList.add("task-item");


        if (task.completed) {

            taskItem.classList.add("completed");

        }


        taskItem.setAttribute("data-id", task.id);


        taskItem.innerHTML = `
            <div class="task-left">

                <button
                    class="complete-btn"
                    aria-label="${task.completed ? "Mark task as incomplete" : "Mark task as complete"}"
                >
                    <i class="fa-solid fa-check"></i>
                </button>

                <span class="task-text"></span>

            </div>

            <button
                class="delete-btn"
                aria-label="Delete task"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;


        const taskTextElement =
            taskItem.querySelector(".task-text");


        taskTextElement.textContent = task.text;


        taskList.appendChild(taskItem);

    });


    // Update counter
    updateTaskCount(filteredTasks);


    // Update empty state
    updateEmptyState(filteredTasks);


    // Update Clear Completed button
    updateClearCompletedButton();

}


/* =====================================================
   7. ADD NEW TASK
===================================================== */

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const taskText = taskInput.value.trim();


    // Don't allow empty tasks
    if (taskText === "") {

        taskInput.classList.add("input-error");


        setTimeout(function() {

            taskInput.classList.remove("input-error");

        }, 500);


        taskInput.focus();


        return;

    }


    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add the new task
    tasks.push(newTask);


    // Save the updated tasks
    saveTasks();


    // Clear input
    taskInput.value = "";


    // Return to All tasks
    currentFilter = "all";


    updateFilterButtons();


    // Display updated task list
    displayTasks();


    // Focus input again
    taskInput.focus();

});


/* =====================================================
   8. COMPLETE / UNCOMPLETE TASK
===================================================== */

taskList.addEventListener("click", function(event) {

    const completeButton =
        event.target.closest(".complete-btn");


    if (completeButton) {

        const taskItem =
            completeButton.closest(".task-item");


        const taskId =
            Number(taskItem.dataset.id);


        const task =
            tasks.find(function(task) {

                return task.id === taskId;

            });


        if (task) {

            // Change completed status
            task.completed = !task.completed;


            // Save the change
            saveTasks();

        }


        // Refresh the task list
        displayTasks();


        return;

    }


    /* =================================================
       9. DELETE TASK
    ================================================= */

    const deleteButton =
        event.target.closest(".delete-btn");


    if (deleteButton) {

        const taskItem =
            deleteButton.closest(".task-item");


        const taskId =
            Number(taskItem.dataset.id);


        // Remove task from array
        tasks = tasks.filter(function(task) {

            return task.id !== taskId;

        });


        // Save the updated tasks
        saveTasks();


        // Refresh the task list
        displayTasks();

    }

});


/* =====================================================
   10. FILTER BUTTONS
===================================================== */

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Get the selected filter
        currentFilter = button.dataset.filter;


        // Update filter buttons
        updateFilterButtons();


        // Display filtered tasks
        displayTasks();

    });

});


/* =====================================================
   11. UPDATE FILTER BUTTONS
===================================================== */

function updateFilterButtons() {

    filterButtons.forEach(function(button) {

        const isActive =
            button.dataset.filter === currentFilter;


        button.classList.toggle(
            "active",
            isActive
        );


        button.setAttribute(
            "aria-pressed",
            isActive
        );

    });

}


/* =====================================================
   12. UPDATE TASK COUNT
===================================================== */

function updateTaskCount(filteredTasks) {

    let count;


    if (currentFilter === "all") {

        count = tasks.filter(function(task) {

            return !task.completed;

        }).length;


        taskCountText.textContent =
            count === 1
                ? "task remaining"
                : "tasks remaining";

    }


    else if (currentFilter === "active") {

        count = filteredTasks.length;


        taskCountText.textContent =
            count === 1
                ? "active task"
                : "active tasks";

    }


    else if (currentFilter === "completed") {

        count = filteredTasks.length;


        taskCountText.textContent =
            count === 1
                ? "completed task"
                : "completed tasks";

    }


    taskCount.textContent = count;

}


/* =====================================================
   13. EMPTY STATE
===================================================== */

function updateEmptyState(filteredTasks) {

    if (filteredTasks.length === 0) {

        taskList.style.display = "none";

        emptyState.style.display = "block";


        const emptyTitle =
            emptyState.querySelector("h2");


        const emptyMessage =
            emptyState.querySelector("p");


        if (currentFilter === "completed") {

            emptyTitle.textContent =
                "No completed tasks";


            emptyMessage.textContent =
                "Complete a task and it will appear here.";

        }


        else if (currentFilter === "active") {

            emptyTitle.textContent =
                "No active tasks";


            emptyMessage.textContent =
                "You're all caught up!";

        }


        else {

            emptyTitle.textContent =
                "No tasks yet";


            emptyMessage.textContent =
                "Add your first task above and start getting things done.";

        }

    }


    else {

        taskList.style.display = "flex";

        emptyState.style.display = "none";

    }

}


/* =====================================================
   14. CLEAR COMPLETED TASKS
===================================================== */

clearCompletedBtn.addEventListener("click", function() {

    // Remove completed tasks
    tasks = tasks.filter(function(task) {

        return !task.completed;

    });


    // Save the updated tasks
    saveTasks();


    // Return to All tasks
    currentFilter = "all";


    updateFilterButtons();


    // Display updated task list
    displayTasks();

});


/* =====================================================
   15. UPDATE CLEAR COMPLETED BUTTON
===================================================== */

function updateClearCompletedButton() {

    const completedTasks =
        tasks.filter(function(task) {

            return task.completed;

        });


    if (completedTasks.length === 0) {

        clearCompletedBtn.disabled = true;

    }


    else {

        clearCompletedBtn.disabled = false;

    }

}


/* =====================================================
   16. INITIAL DISPLAY
===================================================== */

displayTasks();