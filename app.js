const btn = document.querySelector("#add-btn");
const tasks = document.querySelector("#task-list");
const input = document.querySelector("#task-input");

btn.addEventListener("click", (event) => {

    if (input.value === "") {
        return;
    }

    const item = document.createElement("li");
    item.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", (event) => {
        item.classList.toggle("completed-task");
    })

    const span = document.createElement("span");
    span.textContent = input.value;

    const button = document.createElement("button");

    button.addEventListener("click", (event) => {
        event.target.parentElement.remove();
    })

    button.textContent = "Delete"

    item.append(checkbox, span, button);

    tasks.appendChild(item);
    
    input.value = "";
})


