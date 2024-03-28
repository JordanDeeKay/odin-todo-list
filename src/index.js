import './style.css';

const todoAddBtn = document.querySelector('.todoAddBtn');
const todoDialogForm = document.querySelector('#todoAddDialog');
const dialogConfirmBtn = document.querySelector('#dialogConfirmBtn');
const dialogCancelBtn = document.querySelector('#dialogCancelBtn');
const newProjectBtn = document.querySelector('.newProjectBtn');
const projectDialogForm = document.querySelector('#projectAddDialog');
const projectConfirmBtn = document.querySelector('#projectConfirmBtn');
const projectCancelBtn = document.querySelector('#projectDialogCancelBtn');
const editDialogForm = document.querySelector('#todoEditDialog');
const editDialogConfirmBtn = document.querySelector('#editDialogConfirmBtn');
const editDialogCancelBtn = document.querySelector('#editDialogCancelBtn');
const projectEditDialogForm = document.querySelector('#projectEditDialog');
const projectEditConfirmBtn = document.querySelector('#projectEditDialogConfirmBtn');
const projectEditCancelBtn = document.querySelector('#projectEditDialogCancelBtn');
let todoEditIndex;
let projectEditIndex;

let projectList = []

function createTodoItem(title, description, dueDate) {
    let priority = 0;
    let isComplete = false;

    return {title, description, dueDate, priority, isComplete}
}

function createProject(name) {
    let todos = []

    return {name, todos}
}

function initialDisplay() {
    // const headerTitle = document.querySelector('.headerTitle');
    const contentDiv = document.querySelector('.content');
    const contentP = document.createElement('p');

    // headerTitle.innerHTML = 'Welcome!'
    contentP.classList.add('initialGreeting');
    todoAddBtn.setAttribute('hidden', 'hidden');
    contentP.innerHTML = 'Create a new todo list or select an existing list to get started!';

    contentDiv.appendChild(contentP);
}

function displayProjects() { 
    const sidebar = document.querySelector(".sidebar");
    const sidebarProjectContainer = document.querySelector('.sidebarProjectContainer');
    sidebarProjectContainer.innerHTML = '';
    todoAddBtn.removeAttribute('hidden');

    for (let i = 0; i < projectList.length; i++) {
        const sidebarProjectDiv = document.createElement('div');
        const projectTitle = document.createElement('p');
        const btnDiv = document.createElement('div');
        const editBtn = document.createElement('button');
        const trashBtn = document.createElement('button');
        const headerTitle = document.querySelector('.headerTitle');

        sidebarProjectDiv.classList.add('sidebarProjectDiv');
        btnDiv.classList.add('sidebarListBtnDiv');
        projectTitle.classList.add('projectTitle');
        editBtn.classList.add('listEditBtn');
        trashBtn.classList.add('listTrashBtn');
        projectTitle.setAttribute('data-project-id', i);

        projectTitle.innerHTML = projectList[i].name;
        editBtn.innerHTML = 'Edit';
        trashBtn.innerHTML = 'Trash';

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(trashBtn);
        sidebarProjectDiv.appendChild(projectTitle);
        sidebarProjectDiv.appendChild(btnDiv);
        sidebarProjectContainer.appendChild(sidebarProjectDiv);
        sidebar.appendChild(sidebarProjectContainer);

        projectTitle.addEventListener('click', (e) => {
            displayTodos(projectList[parseInt(e.target.dataset.projectId)]);
            headerTitle.setAttribute('data-index', parseInt(e.target.dataset.projectId));
        });

        editBtn.addEventListener('click', (e) => {
            const projectEditTitle = document.querySelector('#projectEditTitle');
            projectEditTitle.value = projectTitle.innerHTML;

            projectEditIndex = i;

            projectEditDialogForm.showModal();
        });

        trashBtn.addEventListener('click', () => {
            projectList.splice(i, 1);
            displayProjects();
            initialDisplay();
        });
    }
}

function displayTodos(project) {
    const content = document.querySelector('.content');
    content.innerHTML = '';

    const headerTitle = document.querySelector('.headerTitle');
    headerTitle.innerHTML = project.name;

    for (let i = 0; i < project.todos.length; i++) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todoDiv');

        const leftDiv = document.createElement('div');
        const priorityDiv = document.createElement('div');
        const checkBoxDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        const title = document.createElement('p')

        const rightDiv = document.createElement('div');
        const date = document.createElement('p');
        const btnDiv = document.createElement('div');
        const editBtn = document.createElement('button');
        const trashBtn = document.createElement('button');

        leftDiv.classList.add('left');
        priorityDiv.classList.add('priorityDiv');
        checkBoxDiv.classList.add('checkBoxDiv');
        checkbox.classList.add('statusCheckBox');
        checkbox.setAttribute('type', 'checkbox');
        title.classList.add('todoTitle');
        title.innerHTML = project.todos[i].title;
        checkbox.checked = project.todos[i].isComplete;

        rightDiv.classList.add('right');
        date.classList.add('todoDate');
        btnDiv.classList.add('todoBtnDiv');
        editBtn.classList.add('todoEditBtn');
        trashBtn.classList.add('todoTrashBtn');
        date.innerHTML = project.todos[i].dueDate;
        editBtn.innerHTML = 'Edit';
        trashBtn.innerHTML = 'Trash';

        checkBoxDiv.appendChild(checkbox);
        leftDiv.appendChild(priorityDiv);
        leftDiv.appendChild(checkBoxDiv);
        leftDiv.appendChild(title);

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(trashBtn);
        rightDiv.appendChild(date);
        rightDiv.appendChild(btnDiv);

        todoDiv.appendChild(leftDiv);
        todoDiv.appendChild(rightDiv);
        content.appendChild(todoDiv);


        // Conditionals that set the initial priority and isComplete status of the todo item when information is displayed
        if (project.todos[i].priority === 0) {
            priorityDiv.style.backgroundColor = 'rgb(26, 193, 26)';
        } else if (project.todos[i].priority === 1) {
            priorityDiv.style.backgroundColor = 'yellow';
        } else if (project.todos[i].priority === 2) {
            priorityDiv.style.background = 'red';
        }

        if (project.todos[i].isComplete === false) {
            title.style.textDecoration = 'none';
        } else {
            title.style.textDecoration = 'line-through';
        }

        priorityDiv.addEventListener('click', (e) => {
            if (project.todos[i].priority === 0) {
                priorityDiv.style.backgroundColor = 'yellow';
                project.todos[i].priority++;
            } else if (project.todos[i].priority === 1) {
                priorityDiv.style.backgroundColor = 'red';
                project.todos[i].priority++;
            } else if (project.todos[i].priority === 2) {
                priorityDiv.style.background = 'rgb(26, 193, 26)';
                project.todos[i].priority = 0;
            }
        });

        checkbox.addEventListener('change', () => {
            if (project.todos[i].isComplete === false) {
                title.style.textDecoration = 'line-through';
                project.todos[i].isComplete = true;
            } else {
                title.style.textDecoration = 'none';
                project.todos[i].isComplete = false;
            }
        });

        editBtn.addEventListener('click', () => {
            const title = document.querySelector('#todoEditTitle');
            const description = document.querySelector('#todoEditDescription');
            const dueDate = document.querySelector('#todoEditDueDate');

            title.value = project.todos[i].title;
            description.value = project.todos[i].description;
            dueDate.value = project.todos[i].dueDate;

            todoEditIndex = i;

            editDialogForm.showModal();
        });

        trashBtn.addEventListener('click', () => {
            project.todos.splice(i, 1);
            displayTodos(projectList[parseInt(headerTitle.dataset.index)]);
        });
    }
}

todoAddBtn.addEventListener('click', () => {
    todoDialogForm.showModal();
});

dialogConfirmBtn.addEventListener('click', (e) => {
    const dialog = document.querySelector('#todoAddDialog');
    const headerTitle = document.querySelector('.headerTitle');
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;

    projectList[parseInt(headerTitle.dataset.index)].todos.push(createTodoItem(title, description, dueDate));

    displayTodos(projectList[parseInt(headerTitle.dataset.index)]);

    e.preventDefault();
    todoDialogForm.close();
    dialog.querySelector('#title').value = '';
    dialog.querySelector('#description').value = '';
    dialog.querySelector('#dueDate').value = '';
});

dialogCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todoDialogForm.close();
});

newProjectBtn.addEventListener('click', () => {
    projectDialogForm.showModal();
});

projectConfirmBtn.addEventListener('click', (e) => {
    const dialog = document.querySelector('#projectAddDialog');
    const headerTitle = document.querySelector('.headerTitle');
    const title = document.querySelector('#projectTitle').value;

    if (headerTitle.dataset.index == null) {
        headerTitle.setAttribute('data-index', 0);
        projectList.push(createProject(title));

        displayProjects();
        displayTodos(projectList[headerTitle.dataset.index]);

        e.preventDefault();
        projectDialogForm.close();
        dialog.querySelector('#projectTitle').value = '';
    } else {
        projectList.push(createProject(title));

        displayProjects();
        displayTodos(projectList[parseInt(headerTitle.dataset.index)]);

        e.preventDefault();
        projectDialogForm.close();
        dialog.querySelector('#projectTitle').value = '';
    }
});

projectCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projectDialogForm.close();
});

editDialogConfirmBtn.addEventListener('click', (e) => {
    const dialog = document.querySelector('#todoEditDialog');
    const headerTitle = document.querySelector('.headerTitle');
    const title = document.querySelector('#todoEditTitle').value;
    const description = document.querySelector('#todoEditDescription').value;
    const dueDate = document.querySelector('#todoEditDueDate').value;

    projectList[parseInt(headerTitle.dataset.index)].todos[todoEditIndex].title = title;
    projectList[parseInt(headerTitle.dataset.index)].todos[todoEditIndex].description = description;
    projectList[parseInt(headerTitle.dataset.index)].todos[todoEditIndex].dueDate = dueDate;

    displayTodos(projectList[parseInt(headerTitle.dataset.index)]);

    e.preventDefault();
    dialog.close();
    dialog.querySelector('#todoEditTitle').value = '';
    dialog.querySelector('#todoEditDescription').value = '';
    dialog.querySelector('#todoEditDueDate').value = '';
});

editDialogCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    editDialogForm.close();
});

projectEditConfirmBtn.addEventListener('click', (e) => {
    const dialog = document.querySelector('#projectEditDialog');
    const name = document.querySelector('#projectEditTitle').value;
    const header = document.querySelector('.headerTitle');

    projectList[projectEditIndex].name = name;
    header.innerHTML = name;
    displayProjects();

    e.preventDefault();
    dialog.close();
    dialog.querySelector('#projectEditTitle').value = '';
});

projectEditCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projectEditDialogForm.close();
});

// newProjectBtn.addEventListener('click', (e) => {
//     const dialog = document.querySelector('#todoAddDialog');
//     const headerTitle = document.querySelector('.headerTitle');
//     const title = document.querySelector('#title').value;
//     const description = document.querySelector('#description').value;
//     const dueDate = document.querySelector('#dueDate').value;

//     projectList[parseInt(headerTitle.dataset.index)].todos.push(createTodoItem(title, description, dueDate, 'now'));

//     displayTodos(projectList[parseInt(headerTitle.dataset.index)]);

//     e.preventDefault();
//     todoDialogForm.close();
//     dialog.querySelector('#title').value = '';
//     dialog.querySelector('#description').value = '';
//     dialog.querySelector('#dueDate').value = '';
// });

// const project = createProject('Grocery');
// project.todos[0] = createTodoItem("Carrot", "Japanese Curry ingredient for tonight's dinner", "today");
// project.todos[1] = createTodoItem("Potato", "Japanese Curry ingredient for tonight's dinner", "today");
// projectList.push(project);

// const project2 = createProject('Study');
// project2.todos[0] = createTodoItem("Read", "Biology", "today");
// projectList.push(project2)

// console.log(project.todos[0]);
// console.log(project.name);

initialDisplay();
// displayProjects();
// displayTodos(projectList[0]);