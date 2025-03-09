const inputValue = document.getElementById('input');
const list = document.getElementById('list');
const typing = document.getElementById('typing');
const allTasks = document.getElementById('allTasks');
const activeTasks = document.getElementById('activeTasks');
const completedTasks = document.getElementById('completedTasks');
const clearCompleted = document.getElementById('clearCompleted');
const theme = document.getElementById('theme');
const itemsLeft = document.getElementById('items-left');
const themeToggle = document.getElementById("themeToggle");
const background = document.getElementById('background');
const body = document.body;

let toDoes = [
    {
        task: 'Complete online JavaScript course',
        isCompleted: true
    },
    {
        task: 'Jog around the park 3x',
        isCompleted: false
    }
];


// Check if the user has a saved theme preference
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
    const isDarkTheme = body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme", !isDarkTheme);
    themeToggle.src = isDarkTheme ? "./images/icon-sun.svg" : "./images/icon-moon.svg";
    background.style.backgroundImage = isDarkTheme ? "url('./images/bg-desktop-dark.jpg')" : "url('./images/bg-desktop-light.jpg')";
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
});

function updateItemsLeft() {
    itemsLeft.textContent = `${toDoes.filter(toDo => !toDo.isCompleted).length} items left`;
}

function createToDoElement(toDo, index) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const label = document.createElement('label');
    const removeBtn = document.createElement('button');
    const removeBtnImg = document.createElement('img');
    const checkedImage = document.createElement('img');

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
    span.onclick = () => {
        toDoes[index].isCompleted = !toDoes[index].isCompleted;
        renderToDoes();
    };
    li.appendChild(span);
    label.textContent = toDo.task;
    li.appendChild(label);

    removeBtn.onclick = () => {
        toDoes.splice(index, 1);
        renderToDoes();
    };
    li.appendChild(removeBtn);

    return li;
}

function renderToDoes(filter = () => true) {
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();
    toDoes.filter(filter).forEach((toDo, index) => {
        fragment.appendChild(createToDoElement(toDo, index));
    });
    list.appendChild(fragment);
    updateItemsLeft();
}

function addTask() {
    const task = inputValue.value.trim();
    if (task === '') {
        alert('Please enter a task');
        return;
    }
    toDoes.push({ task, isCompleted: false });
    inputValue.value = '';
    renderToDoes();
}



function removeTask() {
    list.removeChild(list.lastChild);
}


function clearCompletedTasks() {
    toDoes = toDoes.filter(toDo => !toDo.isCompleted);
    renderToDoes();
}

function showAllTasks() {
    allTasks.style.color = 'hsl(220, 98%, 61%)';
    activeTasks.style.color = 'hsl(234, 11%, 52%)';
    completedTasks.style.color = 'hsl(234, 11%, 52%)';
    renderToDoes();
}

function showActiveTasks() {
    allTasks.style.color = 'hsl(234, 11%, 52%)';
    activeTasks.style.color = 'hsl(220, 98%, 61%)';
    completedTasks.style.color = 'hsl(234, 11%, 52%)';
    renderToDoes(toDo => !toDo.isCompleted);
}

function showCompletedTasks() {
    allTasks.style.color = 'hsl(234, 11%, 52%)';
    activeTasks.style.color = 'hsl(234, 11%, 52%)';
    completedTasks.style.color = 'hsl(220, 98%, 61%)';
    renderToDoes(toDo => toDo.isCompleted);
}

clearCompleted.onclick = clearCompletedTasks;
allTasks.onclick = showAllTasks;
activeTasks.onclick = showActiveTasks;
completedTasks.onclick = showCompletedTasks;

inputValue.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

inputValue.addEventListener("input", () => {
    typing.style.display = inputValue.value === '' ? 'none' : 'block';
});

renderToDoes();