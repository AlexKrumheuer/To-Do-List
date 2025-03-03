//Right click in a task ***************Right click*****************
let elementParentObject


/*******************Selecting sidebar elements *******************/
let taskTextValue
let sidebarContainer

//List of tasks
let listItems = document.querySelectorAll(".listItems")
//Text of list's tasks
let textListItems = document.getElementById("listItemsText")
//Image of list's tasks
let imageListItems = document.getElementById("listTask")
//Select sidebar and grid of tasks. Turn sidebar visible and decrease task's grid size
const sidebarTaskConfigContainer = document.querySelector(".sidebarTaskConfigContainer")
const taskGrid = document.querySelector(".today-tasks__grid")
//All the img's
let sidebarImages = document.querySelectorAll(".sidebarTaskImage")
//All the paragraphs
let sidebarText = document.querySelectorAll(".sidebarTaskText")
let listButtonsEditSidebar = document.querySelectorAll(".sidebarTaskButtonsEdit")

let sidebarParent = document.querySelector("today-tasks")
let sidebarHtml = `
                        <div class="sidebarTaskMainContent">
                            <div class="sidebarTaskMainContent__closebutton">
                                <i class="fa-solid fa-x"></i>
                            </div>

                            <div class="sidebarTaskMainContentChild">
                                <div class="sidebar-titleContainer">
                                    <div class="sidebar-titleTask">
                                        <i class="fa-regular fa-circle sidebarTaskMainContent__finishedTaskButton"></i>
                                        <input type="text" id="taskNameValue">
                                    </div>
                                    <i class="fa-regular fa-star"></i>
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

        let sidebarElementParent = event.target.closest(".elementParent")



        //Picking the task's object element clicked
        tasks.forEach((task) => {
            if (task.taskName == elementParent.children[0].children[1].textContent) {
                elementParentObject = task
            }
        })
        elementNumber = sidebarElementParent.getAttribute("task-number")



        taskGrid.style.width = "75%"

        let sidebarDiv = document.createElement("div")
        sidebarDiv.classList.add("sidebarTaskConfigContainer")
        sidebarDiv.innerHTML = sidebarHtml
        setSidebarVariables(sidebarDiv)
        sidebarParent.appendChild(sidebarDiv)


        resetSidebarInfo()


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

        sidebarPutInfo()
        finishedSidebarButton()


        /****************Cancel and save button of sidebar************/
        buttonSaveCancelSidebar(sidebarElementParent)


    })
}





function buttonSaveCancelSidebar(sidebarElementParent) {
    let buttonsSaveCancel = document.querySelectorAll(".buttonSidebarTask")
    buttonsSaveCancel.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.textContent == "Cancel") {
                sidebarTaskConfigContainer.style.display = "none"
                taskGrid.style.width = "100%"
            } else if (button.textContent == "Save") {
                updateObjectSidebarInfo()
                updateHtmlTaskContent(sidebarElementParent)
                sidebarTaskConfigContainer.style.display = "none"
                taskGrid.style.width = "100%"
            }
        })
    })
}



function setSidebarVariables(sidebarDiv) {
    taskTextValue = sidebarDiv.children[0].children[1].children[0].children[0].children[1]

    let sidebarContainerParent = sidebarDiv.children[0]
    sidebarContainer = [sidebarContainerParent.children[1], sidebarContainerParent.children[2], sidebarContainerParent.children[3], 
    sidebarContainerParent.children[4], sidebarContainerParent.children[5]]

    //List of tasks
    let listItems = document.querySelectorAll(".listItems")
    //Text of list's tasks
    let textListItems = document.getElementById("listItemsText")
    //Image of list's tasks
    let imageListItems = document.getElementById("listTask")
    //Select sidebar and grid of tasks. Turn sidebar visible and decrease task's grid sizec
    const sidebarTaskConfigContainer = document.querySelector(".sidebarTaskConfigContainer")
    const taskGrid = document.querySelector(".today-tasks__grid")
    //All the img's
    let sidebarImages = document.querySelectorAll(".sidebarTaskImage")
    //All the paragraphs
    let sidebarText = document.querySelectorAll(".sidebarTaskText")
    let listButtonsEditSidebar = document.querySelectorAll(".sidebarTaskButtonsEdit")
}

function resetSidebarInfo() {
    //Reset sidebarText info
    for (let i = 0; i < sidebarText.length; i++) {
        switch (i) {
            case 0:
                sidebarText[0].textContent = "Remind me"
                break
            case 1:
                sidebarText[1].textContent = "Add due date"
                break
            case 2:
                sidebarText[2].textContent = "Repeat"
                break
        }
    }
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
    let finishedButton = document.querySelector(".sidebarTaskMainContent__finishedTaskButton")
    finishedButton.addEventListener("click", () => {
        if (!elementParentObject.taskFinished) {
            elementParentObject.taskFinished = true
            finishedButton.removeAttribute("class")
            finishedButton.classList.add("sidebarTaskMainContent__finishedTaskButton")
            finishedButton.classList.add("fa-regular")
            finishedButton.classList.add("fa-circle-xmark")
            conclusionTaskButtonClicked(conclusionTaskButton)
        } else {
            elementParentObject.taskFinished = false
            finishedButton.removeAttribute("class")
            finishedButton.classList.add("sidebarTaskMainContent__finishedTaskButton")
            finishedButton.classList.add("fa-regular")
            finishedButton.classList.add("fa-circle")
        }

    })
}







///*******************************2*******************************/
function updateObjectSidebarInfo() {
    let nameTaskContainer = sidebarContainer[0].children[0].children[0].children[1].value
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