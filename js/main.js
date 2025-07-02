let toDoApp = document.querySelector(".toDoApp");
let taskInput = document.querySelector("#taskInput");
let addTaskBtn = document.querySelector("#addTaskBtn");
let emptyTask = document.querySelector("#emptyTask");
let allTask = document.querySelector(".allTask");
let error = document.querySelector("#error");
let error2 = document.querySelector("#error2");
let deleteAll = document.querySelector(".deleteAll");
let finshTask = document.querySelector(".finshTask");
let pendingTask = document.querySelector(".pendingTask");
let numberTask = document.querySelector(".numberTask");
let mode = document.querySelector(".btnn");
let conforme = document.querySelector(".conforme");
let yes = document.querySelector("#yes");
let no = document.querySelector("#no");
let countCompleted = 0;
let countUnCompleted = 0;
let countAllTask = 0;
let soundAdd = new Audio("../assets/sound/add.mp3");
let soundDone = new Audio("../assets/sound/compoleted.mp3");
let soundDeleteItem = new Audio("../assets/sound/deletItem.mp3");
let soundDeleteAll = new Audio("../assets/sound/deletAll.mp3");
let soundHow = new Audio("../assets/sound/how.mp3");
let items = [];
let checkEmptyTask = () => {
  if (allTask.children.length == 0) {
    emptyTask.classList.remove("none");
    deleteAll.classList.add("none");
    allTask.classList.add("none")
  } else {
    // emptyTask.classList.add("none");
    // deleteAll.classList.remove("none");
     allTask.classList.remove("none")
  }
};

let addTask = () => {
  let InputValue = taskInput.value;
  if (InputValue.trim() == "") {
    error.classList.remove("none");
    error2.classList.add("none");
    taskInput.classList.add("enterTaskError");
    // soundHow.play() new
  } else { 
    if (!items.includes(InputValue.trim())) {
      if (!(InputValue.length < 3 || InputValue.value > 20)) {
        taskInput.classList.remove("enterTaskError");
        error.classList.add("none");
        error2.classList.add("none");
        emptyTask.classList.add("none");
        deleteAll.classList.remove("none");
        // checkEmptyTask();

        items.push(InputValue);

        allTask.innerHTML += `
     <div class="div">
      ${InputValue}
      <i class="deleteTask fa-solid fa-trash fa-bounce"></i>
     </div>
    `;
        let randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);

        // function getRandomColor() {
        //   const r = Math.floor(Math.random() * 256);
        //   const g = Math.floor(Math.random() * 256);
        //   const b = Math.floor(Math.random() * 256);
        //   return `rgb(${r}, ${g}, ${b})`;
        // }  // new
        allTask.style.backgroundColor = randomColor;
        // let alertDiv = document.createElement("div");
        // alertDiv.classList = "div";
        // alertDiv.append(InputValue);
        // allTask.append(alertDiv);
        // // create icon
        // let iconDelete = document.createElement("i");
        // iconDelete.classList = "fa-solid fa-trash";
        // alertDiv.append(iconDelete);
        numberTask.innerHTML = ++countAllTask;
        pendingTask.innerHTML = ++countUnCompleted;
        soundAdd.play()
      } else {
        error2.classList.remove("none");
        error.classList.add("none");
        taskInput.classList.add("enterTaskError");
      }
    } else {
      alert("This text already exists❌");
    }
  }
  taskInput.value = "";
  checkEmptyTask() // new
};

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteTask")) {
    e.target.parentElement.remove();
    checkEmptyTask();
    if (countCompleted > 0) {
      finshTask.innerHTML = --countCompleted;
    }
    if (countAllTask > 0) {
      numberTask.innerHTML = --countAllTask;
    }
                                            // new
    if (countUnCompleted > 0 && !(e.target.parentElement.classList.contains("checked"))) {
      pendingTask.innerHTML = --countUnCompleted;
    }
  }
});
let conformeDelete = () => {
  allTask.innerHTML = "";
  checkEmptyTask();
  finshTask.innerHTML = 0;
  numberTask.innerHTML = 0;
  pendingTask.innerHTML = 0;
  countCompleted = 0;
  countUnCompleted = 0;
  countAllTask = 0;
  items = [];
  conforme.classList.add("none");
  // allTask.style.backgroundColor = "#3A1078"; 
};
yes.addEventListener("click", conformeDelete);
let unconformeDelete = () => {
  conforme.classList.add("none");
};
no.addEventListener("click", unconformeDelete);
let deleteAllTask = () => {
  conforme.classList.remove("none");
};
deleteAll.addEventListener("click", deleteAllTask);

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("div")) {
    e.target.classList.toggle("checked");
    if ((e.target.classList.contains("checked"))) {
      finshTask.innerHTML = ++countCompleted;
       pendingTask.innerHTML = --countUnCompleted;
    } else {
      finshTask.innerHTML = --countCompleted;
      pendingTask.innerHTML = ++countUnCompleted;
    }
  }
});

mode.onclick = function () {
  document.body.classList.toggle("lightMode");
  mode.classList.toggle("lightMode");
  taskInput.style.backgroundColor = "";
  if (mode.classList.contains("lightMode")) {
    mode.textContent = "Dark Mode";
  } else {
    mode.textContent = "Light Mode";
  }
};
