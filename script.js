const inputbox = document.getElementById("inputbox");
const listContainer = document.getElementById("list-container");
const img = document.querySelector(".list>img");
let count = 1;
let listCount = document.querySelector("#listcount");
let priority = document.getElementById("priority");
let completedCount = document.getElementById("comlited");
let startedCount= document.getElementById("started");
// let date = document.getElementById("dueDate");
let highPriority = document.getElementById("highpriotity");
let countHigh = 1;
let highPriorityCompleted = document.getElementById("highpriotitycomplited");
let countHighCompleted = 1;

let currentFilterStatus = "all";
let currentFilterPriority = "all";

function addTask() {
    if (inputbox.value === "") {
        alert("You must write something!");
    } else {
        console.log(priority.value);

        img.style.display = "none";
        listCount.innerText = `${count++}`;
        let li = document.createElement("li");
        li.innerHTML = `${inputbox.value} <span style="color: white;text-align: right;padding-right: 70px">${priority.value}</span>`;
        // <span class="Date">Due Date ${date.value}</span>
        let statusSelect = document.createElement("select");
        statusSelect.innerHTML = `<option value="todo">To-do</option>
                                  <option value="inprogress">In Progress</option>
                                  <option value="done">Done</option>`;
        statusSelect.addEventListener("change", function () {
            updateStatus(this);
        });
        
        // let listPriority=document.createElement("span");
        // listPriority.id="listPriority";
        // listPriority.innerText=`Priority : ${priority.value}`;

        // li.appendChild(listPriority);
        li.appendChild(statusSelect);

        let removeBtn = document.createElement("span");
        removeBtn.innerHTML = `<i class="fa-solid fa-x" onclick="removeTask(this)"></i>`;
        li.appendChild(removeBtn);

       
        const selectedPriority = priority.value;
        li.classList.add(selectedPriority);

        listContainer.appendChild(li);

        if (selectedPriority === "high") {
            highPriority.innerText = `${countHigh++} of ${count - 1}`;
        }
    }
    inputbox.value = "";
    updateCounts();
    filterTasks();
    saveData();
}

function updateStatus(selectElement) {
    const selectedStatus = selectElement.value;
    const listItem = selectElement.parentElement;
    console.log(selectedStatus,listItem);
    listItem.className = selectedStatus=="todo"?"high":selectedStatus;
    updateCounts();
    filterTasks();
    saveData();
}

function removeTask(iconElement) {
    const listItem = iconElement.parentElement.parentElement;
    listItem.remove();
    updateCounts();
    filterTasks();
    saveData();
}

function updateCounts() {
    completedCount.innerText = document.querySelectorAll(".done").length;
    startedCount.innerText= document.querySelectorAll(".inprogress").length;
    highPriorityCompleted.innerText = document.querySelectorAll(".done.high").length;
}

function filterTasks() {
    currentFilterStatus = document.getElementById("filterStatus").value;
    currentFilterPriority = document.getElementById("filterPriority").value;

    const allTasks = document.querySelectorAll("#list-container li");

    allTasks.forEach(task => {
        const status = task.classList.contains(currentFilterStatus) || currentFilterStatus === "all";
        const priority = task.classList.contains(currentFilterPriority) || currentFilterPriority === "all";

        if (status && priority) {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }
    });
}

document.getElementById("filterStatus").addEventListener("change", filterTasks);
document.getElementById("filterPriority").addEventListener("change", filterTasks);

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "I" && e.target.classList.contains("fa-x")) {
        removeTask(e.target);
    }
});

window.onload = function () {
    updateCounts();
};
