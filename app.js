const btn = document.querySelector("#add-btn");
const tasks = document.querySelector("#task-list");
const input = document.querySelector("#task-input");
const selectedElement = document.querySelector("#category-select");
const taskCounter = document.querySelector("#task-counter");
let currentFilter = "all";

const filterButton = document.querySelectorAll(".filter-btn")
for (let i = 0; i < filterButton.length; i++) {
    filterButton[i].addEventListener("click", (event) => {
        currentFilter = event.target.dataset.filter;

        for (let i = 0; i < filterButton.length; i++) {
            filterButton[i].classList.remove("active");
        }

        event.target.classList.add("active");

        renderTasks();
    })
    
}


const taskArray = (JSON.parse(localStorage.getItem("taskArray")) || []);

function saveTasks() {
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

function renderTasks() {
    tasks.innerHTML = "";

    const counter = taskArray.filter((task) => !task.completed).length;
    if (counter === 1) {
        taskCounter.textContent = counter + " " + "task remaining.";
    } else {
        taskCounter.textContent = counter + " " + "tasks remaining.";
    }
    
    for (let i = 0; i < taskArray.length; i++) {
        if (currentFilter === "active" && taskArray[i].completed) {
            continue;
        } else if (currentFilter === "completed" && !taskArray[i].completed) {
            continue;
        }

        const item = document.createElement("li");
        item.classList.add("item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        if (taskArray[i].completed) {
            checkbox.checked = true;
            item.classList.add("completed-task");    
        }

        checkbox.addEventListener("change", (event) => {
            item.classList.toggle("completed-task");

            taskArray[i].completed = !taskArray[i].completed;

            saveTasks();
        })

        const span = document.createElement("span");
        span.textContent = taskArray[i].text;
        span.classList.add("task-span");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskArray[i].category;
        taskSpan.classList.add("task-text-span", taskArray[i].category);

        const button = document.createElement("button");
        button.classList.add("delete-button");

        button.addEventListener("click", (event) => {

            taskArray.splice(i, 1);

            saveTasks();
            renderTasks();
        })

        button.textContent = "Delete"

        item.append(taskSpan, checkbox, span, button);

        tasks.appendChild(item);
            
    }
}

saveTasks();
renderTasks();

btn.addEventListener("click", (event) => {

    if (input.value === "") {
        return;
    }

    const newTask = {text: input.value, completed: false, category: selectedElement.value};

    taskArray.push(newTask);

    saveTasks();

    renderTasks();
    
    input.value = "";
})


