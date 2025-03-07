let inputValue = document.getElementById('input');
let list = document.getElementById('list');
let typing = document.getElementById('typing');
let allTasks = document.getElementById('allTasks');
let activeTasks = document.getElementById('activeTasks');
let completedTasks = document.getElementById('completedTasks');
let clearCompleted = document.getElementById('clearCompleted');
let theme = document.getElementById('theme');
let sun = document.getElementById('sun');
let moon = document.getElementById('moon');
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check if the user has a saved theme preference
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
        themeToggle.src = "./images/icon-moon.svg";
    } else {
        themeToggle.src = "./images/icon-sun.svg";
    }
    
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");

    // Save user preference in localStorage
    const theme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

let toDoes = [
    {
        task: 'Complete online JavaScript course',
        isCompleted: true
    },
    {
        task: 'Jog around the park 3x',
        isCompleted: false
    }
]

function removeTask() {
    list.removeChild(list.lastChild);
}

function addTask() {
    let task = inputValue.value;
    if (task === '') {
        alert('Please enter a task');
        return;
    }
    toDoes.push({
        task: task,
        isCompleted: false
    });
    inputValue.value = '';
    renderToDoes();
}

function renderToDoes() {
    list.innerHTML = '';
    toDoes.forEach((toDo, index) => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let label = document.createElement('label');
        let removeBtn = document.createElement('button');
        let removeBtnImg = document.createElement('img');
        let checkedImage = document.createElement('img');
        checkedImage.src = './images/icon-check.svg';
        checkedImage.className = 'checkedImage';

        removeBtn.className = 'removeBtn';
        removeBtnImg.src = './images/icon-cross.svg';
        removeBtn.appendChild(removeBtnImg);

        span.className = 'circle';
        if (toDo.isCompleted) {
            span.appendChild(checkedImage);
            span.style.background = "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
            li.style.textDecoration = 'line-through';
            li.style.color = 'hsl(234, 11%, 52%)';
        }
        span.onclick = function () {
            toDoes[index].isCompleted  = !toDoes[index].isCompleted;
            renderToDoes();
        }
        li.appendChild(span);
        label.textContent = toDo.task;
        li.appendChild(label);

        removeBtn.onclick = function () {
            toDoes.splice(index, 1);
            renderToDoes();
        }
        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

renderToDoes();


inputValue.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

inputValue.addEventListener("input", () => {
    if (inputValue.value === '') {
        typing.style.display = 'none';
    } else {
        typing.style.display = 'block';
    }
});
