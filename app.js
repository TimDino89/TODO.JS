;(function() {

// Add Zero
function addZero(time) {
  if (time < 10) {
    time = '0' + time;
  }

  return time;
}; 

// getDate
function createDate() {

  const now = new Date();
  
  const year = now.getFullYear();
  const month = addZero(now.getMonth());
  const day = addZero(now.getDate());
  const hour = addZero(now.getHours());
  const minutes = addZero(now.getMinutes());
  
  const date = day + '.' + month + '.' + year + ' ' + hour + ':' + minutes;

  return date;
}

  // Create Element
function createElement(element, obj, ...children) {
  const elem = document.createElement(element);

  for (var key in obj) {
    elem[key] = obj[key];
  };

  if (children.length > 0) {

    children.forEach(child => {

      if (typeof child === 'string') {
        child = document.createTextNode(child);
      }

      elem.appendChild(child);
    });
  }

  return elem;
};

// Create Task Item
function createTaskItem(title) {
  const date = createDate();
  
  const taskCheckbox = createElement('input', { className: 'input input__checkbox', type: 'checkbox' });
  const taskCheck = createElement('i', { className: 'task__icon fas fa-check' });
  const taskDate = createElement('span', { className: 'task__date' }, date);
  const taskTitle = createElement('h3', { className: 'task__title' }, title);
  const editInput = createElement('input', { className: 'input input__edit', type: 'text' });

  const editIcon = createElement('i', { className: 'task__icon fas fa-edit' });
  const deleteIcon = createElement('i', { className: 'task__icon fas fa-trash-alt' });
  const editButton = createElement('button', { className: 'btn btn__edit' }, editIcon);
  const deleteButton = createElement('button', { className: 'btn btn__delete' }, deleteIcon);

  const taskLabel = createElement('label', { className: 'task__label' }, taskCheckbox, taskCheck);
  const taskItem = createElement('li', { className: 'task__item' }, taskLabel, taskTitle, taskDate, editInput, editButton, deleteButton);

  bindEvents(taskItem);

  return taskItem;
};

function bindEvents(taskItem) {

  const taskCheck = taskItem.querySelector('.task__label');
  const editButton = taskItem.querySelector('.btn__edit');
  const deleteButton = taskItem.querySelector('.btn__delete');

  taskCheck.addEventListener('change', toggleTaskItem);
  deleteButton.addEventListener('click', removeTaskItem);
  editButton.addEventListener('click', editTaskItem);
};

// Remove Task Item
function removeTaskItem(event) {
  const taskItem = this.parentNode;
  taskList.removeChild(taskItem);
};

// Edit Task Item
function editTaskItem(event) {
  const taskItem = this.parentNode;
  const editInput = taskItem.querySelector('.input__edit');
  const taskTitle = taskItem.querySelector('.task__title');
  const editButton = taskItem.querySelector('.btn__edit');
  const editIcon = editButton.querySelector('.task__icon'); 

  taskItem.classList.toggle('js-editing');
  editInput.focus();
  editIcon.className = 'task__icon far fa-edit';

  if (taskItem.classList.contains('js-editing')) {
    editInput.value = taskTitle.innerText;
    editIcon.classList.toggle('fa-save');
  }

  taskTitle.innerText = editInput.value;
}

// Toggle Task Item
function toggleTaskItem(event) {
  const taskItem = this.parentNode;
  taskItem.classList.toggle('js-active');
}

// Add Task Item
function addTaskItem(event) {
  event.preventDefault();

  if (addInput.value) {

    const itemTitle = addInput.value;
    const taskItem = createTaskItem(itemTitle);
    taskList.appendChild(taskItem);
    addInput.value = '';
  }

};

const taskList = document.querySelector('.task__list');
const mainForm = document.querySelector('.form');
const addInput = document.querySelector('.input__add');


function main() {
  mainForm.addEventListener('submit', addTaskItem);
}

main();
})(document);