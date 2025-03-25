//Verify if the taks button was clicked, if It's, then add the item to the list on the page's top
let taskHtml = `
    <div class="nameTask">
        <i class="fa-regular fa-circle buttonCompletedTask" data-status="unfinished"></i>
        <p class="inputTextTask"></p>
    </div>
    <div class="infoTask">
        
    </div>
`

let infoTaskHtml = `
        <i class="today-tasks-elements"></i>
        <p class="today-tasks-elements"></p>
`


addTaskButton.addEventListener("click", () => {
    if (inputContent.value != '' && !nameTaskAlreadyExists(inputContent.value)) {
        let elementTaskHtml = document.createElement("div")
        elementTaskHtml.classList.add("elementParent")
        elementTaskHtml.innerHTML = taskHtml
        elementTaskHtml.setAttribute("task-number", taskNumber)

        //Creating object's task and pushing it into tasks database (array)
        let objectInfo = document.querySelectorAll(".tasksParagraph")
        let elementObject = new Tasks(inputContent.value, objectInfo[0].textContent, objectInfo[1].textContent,
            objectInfo[2].textContent, objectInfo[3].textContent, taskNumber)
        tasks.push(elementObject)
        taskNumber++


        //Button conclusion click logic
        let conclusionTaskButton = elementTaskHtml.children[0].children[0]
        conclusionTaskButton.addEventListener("click", () => conclusionTaskButtonClicked(conclusionTaskButton, elementObject))

        let taskText = elementTaskHtml.children[0].children[1]
        taskText.textContent = elementObject.taskName


        //Add items of the second container of elementParent **********infoTask***********
        //Info about the task
        let infoTask = elementTaskHtml.children[1]
        let elementListType = addItem(0, infoTaskHtml, elementObject)
        infoTask.appendChild(elementListType)
        //Add info elements to grid
        if (elementObject.taskDate != "") {
            let elementCalendar = addItem(1, infoTaskHtml, elementObject)
            infoTask.appendChild(elementCalendar)
        }
        if (elementObject.taskAlarm != "") {
            let elementAlarm = addItem(2, infoTaskHtml, elementObject)
            infoTask.appendChild(elementAlarm)
        }
        if (elementObject.taskFrequency != "") {
            let elementCycle = addItem(3, infoTaskHtml, elementObject)
            infoTask.appendChild(elementCycle)
        }

        //Adding nameTask and infoTask to elementParent
        tasksContent.appendChild(elementTaskHtml)
        

        //Enable Sidebar
        voidSidebar(elementTaskHtml)

        //Reset info for the next task *********Reset info**********
        defaultTasks()
        containerAddTask.style.display = 'none'
    }
})












//When the task is added, return all the task elements to default



/*************************1****************************/
function defaultTasks() {
    inputContent.value = ''
    for (let i = 0; i < tasksText.length; i++) {
        if (tasksText[i].textContent != "") {
            tasksImage[i].removeAttribute("class")
            switch (i) {
                case 0:
                    tasksImage[i].classList.add("fa-solid")
                    tasksImage[i].classList.add("fa-clipboard-list")
                    break
                case 1:
                    tasksImage[i].classList.add("fa-solid")
                    tasksImage[i].classList.add("fa-calendar")
                    break
                case 2:
                    tasksImage[i].classList.add("fa-solid")
                    tasksImage[i].classList.add("fa-stopwatch")
                    break
                case 3:
                    tasksImage[i].classList.add("fa-solid")
                    tasksImage[i].classList.add("fa-arrows-spin")
                    break
            }
            tasksImage[i].classList.add("task-icon")
            if (i == 0) {
                tasksText[i].textContent = "Tasks"
            } else {
                tasksText[i].textContent = ""
            }
        }
    }
}

function nameTaskAlreadyExists(nameTask){
    if(tasks.some(task => task.taskName === nameTask)){
        alert("This name task is already in use")
        return true
    }
    return false
}







/**********************2*****************************/
function addItem(index, elementHtml, taskObject) {
    let parent = document.createElement("div")
    parent.classList.add("Task-elements__style")
    parent.innerHTML = elementHtml
    let p = parent.children[1]
    let i = parent.children[0]
    if (index == 0) {
        let elementObjectImage
        for (let i = 0; i < listTasks.length; i++) {
            if (listTasks[i].nome == taskObject.taskList) {
                elementObjectImage = listTasks[i].image
            }
        }
        let object = classImages.get(elementObjectImage)
        //class 1
        let c1 = object.c1
        //class 2
        let c2 = object.c2
        p.textContent = taskObject.taskList
        i.classList.add(c1)
        i.classList.add(c2)
    } else if (index == 1) {
        p.textContent = taskObject.taskDate
        i.classList.add("fa-solid")
        i.classList.add("fa-calendar")
    } else if (index == 2) {
        p.textContent = taskObject.taskAlarm
        i.classList.add("fa-regular")
        i.classList.add("fa-clock")
    } else if (index == 3) {
        p.textContent = taskObject.taskFrequency
        i.classList.add("fa-regular")
        i.classList.add("fa-calendar")
    }
    return parent


}

/**********************2.1*****************************/

function conclusionTaskButtonClicked(conclusionTaskButton, elementObject) {
    elementObject.taskFinished = !elementObject.taskFinished;   
    {conclusionTaskButtonChangeStatusAndAppearence(elementObject.taskFinished, conclusionTaskButton, elementObject)} 
}

function conclusionTaskButtonChangeStatusAndAppearence(finished, conclusionTaskButton, elementObject) {
    conclusionTaskButton.removeAttribute("class")
    conclusionTaskButton.classList.add("fa-regular")
    let circleIcon, attribute, display
    if(finished) {
        circleIcon = "fa-circle-xmark"
        display = "flex"
    } else{
        circleIcon = "fa-circle"
        display = "none"
    }
    conclusionTaskButton.classList.add(circleIcon)

    conclusionTaskButton.classList.add("buttonCompletedTask")
    
    tasksContent.appendChild(conclusionTaskButton.parentElement.parentElement)
    if (finishedTasksContainer.children.length == 1) {
        finishedTasksContainer.style.display = display
    }
    if(finished) {
        finishedTasksContainer.appendChild(conclusionTaskButton.parentElement.parentElement)
    }
}