const btn = document.querySelector("#add-btn");
const tasks = document.querySelector("#task-list");
const input = document.querySelector("#task-input");

btn.addEventListener("click", (event) => {

    if (input.value === "") {
        return;
    }

    const item = document.createElement("li");
    item.classList.add("item");
    item.textContent = input.value;

    const button = document.createElement("button");

    button.addEventListener("click", (event) => {
        event.target.parentElement.remove();
    })

    button.textContent = "Delete"

    item.appendChild(button);

    tasks.appendChild(item);
    
    input.value = "";
})


