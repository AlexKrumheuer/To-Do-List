//Right click in a task ***************Right click*****************
let elementParentObject


/*******************Selecting sidebar elements *******************/
let taskTextValue
let sidebarContainer

//Select sidebar and grid of tasks. Turn sidebar visible and decrease task's grid size
const sidebarTaskConfigContainer = document.querySelector(".sidebarTaskConfigContainer")
let taskGrid = document.querySelector(".today-tasks__grid")
let listButtonsEditSidebar = document.querySelectorAll(".sidebarTaskButtonsEdit")
let sidebarDiv
let conclusionTaskButton

//Sidebar components
let buttonsSaveCancel
let sidebarImages
let sidebarText

let sidebarParent = document.querySelector(".today-tasks")
let sidebarHtml = `
                        <div class="sidebarTaskMainContent">
                            <div class="sidebarTaskMainContent__closebutton">
                                <i class="fa-solid fa-trash trash"></i>
                            </div>

                            <div class="sidebarTaskMainContentChild">
                                <div class="sidebar-titleContainer">
                                    <div class="sidebar-titleTask">
                                        <i class="fa-regular fa-circle sidebarTaskMainContent__finishedTaskButton"></i>
                                        <input type="text" id="taskNameValue">
                                    </div>
                                </div>
                            </div>

                            <div class="sidebarTaskMainContentChild sidebarTaskButtonsEdit" data-icons="1">
                                <i class="fa-solid fa-calendar sidebarTaskImage"></i>
                                <p class="sidebarTaskText">Remind me</p>
                            </div>
                            <div class="sidebarTaskMainContentChild sidebarTaskButtonsEdit" data-icons="2">
                                <i class="fa-solid fa-stopwatch sidebarTaskImage"></i>
                                <p class="sidebarTaskText">Add due date</p>
                            </div>
                            <div class="sidebarTaskMainContentChild sidebarTaskButtonsEdit" data-icons="3">
                                <i class="fa-solid fa-arrows-spin sidebarTaskImage"></i>
                                <p class="sidebarTaskText">Repeat</p>
                            </div>

                            <textarea class="sidebarTaskMainContentChild" id="taskNotes"></textarea>
                        </div>
                        <div class="buttonSaveCancelContainer">
                            <button class="buttonSidebarTask">Cancel</button>
                            <button class="buttonSidebarTask">Save</button>
                        </div>
`

function voidSidebar(elementParent) {
    elementParent.addEventListener("contextmenu", (event) => {
        event.preventDefault()
        if (isSidebarOpen()) {
            return
        }

        let sidebarElementParent = event.target.closest(".elementParent")



        //Picking the task's object element clicked
        tasks.forEach((task) => {
            if (task.taskName == elementParent.children[0].children[1].textContent) {
                elementParentObject = task
            }
        })
        elementNumber = sidebarElementParent.getAttribute("task-number")



        taskGrid.style.width = "75%"

        sidebarDiv = document.createElement("div")
        sidebarDiv.classList.add("sidebarTaskConfigContainer")
        sidebarDiv.innerHTML = sidebarHtml
        sidebarParent.appendChild(sidebarDiv)
        setSidebarVariables(sidebarDiv)
        //Add flatpickr to task elements in the sidebar && cycle tasks option
        listButtonsEditSidebar.forEach((element) => {
            element.addEventListener("click", () => {
                let elementId = element.getAttribute("data-icons")
                switch (elementId) {
                    case "1":
                        if (!DisplayCreate.createdElement) { addTaskbarChildElements(element, listDateTasks) }
                        break
                    case "2":
                        if (!DisplayCreate.createdElement) { addTaskbarChildElements(element, listClockTasks) }
                        break
                    case "3":
                        if (!DisplayCreate.createdElement) { addTaskbarChildElements(element, cycleTasks) }
                        break
                }
            })
        })
        deleteTask()
        sidebarPutInfo()
        finishedSidebarButton()


        /****************Cancel and save button of sidebar************/
        buttonSaveCancelSidebar(sidebarElementParent)


    })
}



function isSidebarOpen() {
    let sidebarParentChildren = sidebarParent.children
    for (let i = 0; i < sidebarParentChildren.length; i++) {
        if (sidebarParentChildren[i].classList.contains("sidebarTaskConfigContainer")) {
            return true
        }
    }
    return false
}

function buttonSaveCancelSidebar(sidebarElementParent) {
    buttonsSaveCancel.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.textContent == "Cancel") {
                sidebarDiv.remove()
                taskGrid.style.width = "100%"
            } else if (button.textContent == "Save") {
                updateObjectSidebarInfo()
                updateHtmlTaskContent(sidebarElementParent)
                elementParentObject.taskFinished = !elementParentObject.taskFinished
                conclusionTaskButtonClicked(sidebarElementParent.children[0].children[0],elementParentObject )
                sidebarDiv.remove()
                taskGrid.style.width = "100%"
                
            }
        })
    })
}



function setSidebarVariables(sidebarDiv) {
    taskTextValue = sidebarDiv.children[0].children[1].children[0].children[0].children[1]

    sidebarContainer = document.querySelectorAll(".sidebarTaskMainContentChild")

    sidebarImages = document.querySelectorAll(".sidebarTaskImage")
    sidebarText = document.querySelectorAll(".sidebarTaskText")
    buttonsSaveCancel = document.querySelectorAll(".buttonSidebarTask")
    listButtonsEditSidebar = document.querySelectorAll(".sidebarTaskButtonsEdit")
}

function sidebarPutInfo() {
    taskTextValue.value = elementParentObject.taskName
    for (let i = 0; i < sidebarImages.length; i++) {
        switch (i) {
            case 0:
                if (elementParentObject.taskDate != "") {
                    sidebarText[0].textContent = elementParentObject.taskDate
                }
                break
            case 1:
                if (elementParentObject.taskAlarm != "") {
                    sidebarText[1].textContent = elementParentObject.taskAlarm
                }
                break
            case 2:
                if (elementParentObject.taskFrequency != "") {
                    sidebarText[2].textContent = elementParentObject.taskFrequency
                }
                break
        }
        if (sidebarContainer[4].value != undefined) {
            sidebarContainer[4].value = elementParentObject.taskInfo
        } else {
            sidebarContainer[4].value = ""
        }

    }
}


function finishedSidebarButton() {
    conclusionTaskButton = document.querySelector(".sidebarTaskMainContent__finishedTaskButton")
    if(elementParentObject.taskFinished) {
        conclusionTaskButton.removeAttribute("class")
            conclusionTaskButton.classList.add("sidebarTaskMainContent__finishedTaskButton")
            conclusionTaskButton.classList.add("fa-regular")
            conclusionTaskButton.classList.add("fa-circle-xmark")
    }
    conclusionTaskButton.addEventListener("click", () => {
        if (!elementParentObject.taskFinished) {
            elementParentObject.taskFinished = true
            conclusionTaskButton.removeAttribute("class")
            conclusionTaskButton.classList.add("sidebarTaskMainContent__finishedTaskButton")
            conclusionTaskButton.classList.add("fa-regular")
            conclusionTaskButton.classList.add("fa-circle-xmark")
        } else {
            elementParentObject.taskFinished = false
            conclusionTaskButton.removeAttribute("class")
            conclusionTaskButton.classList.add("sidebarTaskMainContent__finishedTaskButton")
            conclusionTaskButton.classList.add("fa-regular")
            conclusionTaskButton.classList.add("fa-circle")
        }

    })
}

function deleteTask() {
    const deleteButton = document.querySelector(".trash")
    deleteButton.addEventListener("click", ()=>{
        let deleteAnswer = confirm("This action will delete your task and its data permanently, would you like to procede?")
        if(deleteAnswer) {
            sidebarDiv.remove()
            taskGrid.style.width = "100%"

            let tasksFinder = tasks.find(task => task.taskName === elementParentObject.taskName)
            let indexTasksFinder = tasks.indexOf(tasksFinder)
            if(indexTasksFinder != -1) {
                tasks.splice(indexTasksFinder,1)
            }

            let parentTasks = taskGrid.children[0].children
            let parentFinishedTasks = taskGrid.children[1].children

            let parentTaskVerification = Array.from(parentTasks).find(task => task.children[0].children[1].textContent == elementParentObject.taskName)
            if(parentTaskVerification) {
                parentTaskVerification.remove()
            } else {
                parentTaskVerification = Array.from(parentFinishedTasks).slice(1).find(task => task.children[0].children[1].textContent == elementParentObject.taskName)
                parentTaskVerification.remove()
                if (!(finishedTasksContainer.children.length > 1)) {
                    finishedTasksContainer.style.display = "none"
                }
            }

    }})
}




///*******************************2*******************************/
function updateObjectSidebarInfo() {
    let taskNameValue = sidebarContainer[0].children[0].children[0].children[1].value
    let nameTaskContainer = elementParentObject.taskName
    if(taskNameValue != nameTaskContainer){
        if(!nameTaskAlreadyExists(taskNameValue)){
            nameTaskContainer = sidebarContainer[0].children[0].children[0].children[1].value
        }
    }
    let dateTaskContainer = sidebarContainer[1].children[1].textContent
    let alarmTaskContainer = sidebarContainer[2].children[1].textContent
    let frequencyTaskContainer = sidebarContainer[3].children[1].textContent
    let textareaTaskContainer = sidebarContainer[4].value


    elementParentObject.setObjectInfo(nameTaskContainer, dateTaskContainer, alarmTaskContainer,
        frequencyTaskContainer, textareaTaskContainer)
}




/****************************3 *****************************/
function updateHtmlTaskContent(sidebarElementParent) {
    let taskNameHtml = sidebarElementParent.children[0].children[1]
    taskNameHtml.textContent = elementParentObject.taskName

    let infoTask = sidebarElementParent.children[1]
    infoTask.innerHTML = ""
    let elementListType = addItem(0, infoTaskHtml, elementParentObject)
    infoTask.appendChild(elementListType)
    if (elementParentObject.taskDate != "") {
        let elementCalendar = addItem(1, infoTaskHtml, elementParentObject)
        infoTask.appendChild(elementCalendar)
    }
    if (elementParentObject.taskAlarm != "") {
        let elementAlarm = addItem(2, infoTaskHtml, elementParentObject)
        infoTask.appendChild(elementAlarm)
    }
    if (elementParentObject.taskFrequency != "") {
        let elementCycle = addItem(3, infoTaskHtml, elementParentObject)
        infoTask.appendChild(elementCycle)
    }
}