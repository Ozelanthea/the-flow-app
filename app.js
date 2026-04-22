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

    tasks.appendChild(item);
    
    input.value = "";
})


