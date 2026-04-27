const btn = document.querySelector("#add-btn");
const tasks = document.querySelector("#task-list");
const input = document.querySelector("#task-input");

const taskArray = (JSON.parse(localStorage.getItem("taskArray")) || []);

function saveTasks() {
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

function renderTasks() {
    tasks.innerHTML = "";
    
    for (let i = 0; i < taskArray.length; i++) {
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

        const button = document.createElement("button");

        button.addEventListener("click", (event) => {
            event.target.parentElement.remove();

            taskArray.splice(i, 1);

            saveTasks();
        })

        button.textContent = "Delete"

        item.append(checkbox, span, button);

        tasks.appendChild(item);
            
    }
}

saveTasks();
renderTasks();

btn.addEventListener("click", (event) => {

    if (input.value === "") {
        return;
    }

    const newTask = {text: input.value, completed: false};

    taskArray.push(newTask);

    saveTasks();

    renderTasks();
    
    input.value = "";
})


