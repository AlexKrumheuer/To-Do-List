
//*********************1 **************/

//Creates a window that shows up when some of the task's customization options is clicked and show all the options to be chose
let customTaskCycle = document.getElementById("customTaskCycle")
let actualDisplay
let customTaskHtml = `
    <p>It'll repet every: </p>
    <div class="customTaskList">
        <input id="cycleInfoValue" class="infoValue" type="text">
        <input id="cycleTypeValue" class="typeOfInfoValue" list="browsers"type="text">
        <datalist id="browsers">
            <option value="Days"></option>
            <option value="Weeks"></option>
            <option value="Months"></option>
            <option value="Years"></option>
        </datalist>
    </div>
    <div>
        <button id="CycleCancelButton">Cancel</button>
        <button id="CycleSaveButton">Save</button>
    </div>

`

function addTaskbarChildElements(parent, list) { 
    //Create the window and add as children of clicked task config
    let display = new DisplayCreate("20rem", "20rem", parent)
    display.display.classList.add("container-icon")
    actualDisplay = display
    setTimeout(() => {
        stackOpenWindow.push(display.display)
    }, 50)

    //Pass by every element of each list and create a div with an icon and a paragraph
    list.forEach((listItem) => {
        let buttonDisplay = new WindowCreate("100%", "5rem")
        createTaskbarGridElements(buttonDisplay, listItem, display.display)
        //Remove selected items
        if (parent.children[1].textContent != "" && parent.getAttribute("data-icons") != "0") {
            if (listItem == list[list.length - 1]) {
                let buttonDisplay = new WindowCreate("100%", "5rem")
                createTaskbarGridElements(buttonDisplay, "Remove", display.display)
                buttonDisplay.display.addEventListener("click", () => buttonClicked(buttonDisplay.display, parent))
            }
        }

        //Creates the input element of flatpickr for Pick a Date and Pick a Date & Time element
        if (listItem.nome.includes("Pick a Date") || listItem.nome.includes("Pick a Date  & Time")) {
            if (!listItem.nome.includes("Pick a Date & Time")) {
                let flatpickrInput = document.createElement("input")
                flatpickrInput.classList.add("flatpickrInput")
                buttonDisplay.display.style.position = "relative"
                buttonDisplay.display.appendChild(flatpickrInput)


                flatpickr(flatpickrInput, {
                    dateFormat: "D, M, d",
                    onClose: function teste(selectedDates, dateStr, instance) {
                        //Add the classes of the selected element
                        buttonDisplay.display.children[1].textContent = dateStr
                        buttonClicked(buttonDisplay.display, parent)
                    }
                })
            } else if (listItem.nome.includes("Pick a Date & Time")) {
                let flatpickrInput = document.createElement("input")
                flatpickrInput.classList.add("flatpickrInput")
                buttonDisplay.display.style.position = "relative"
                buttonDisplay.display.appendChild(flatpickrInput)


                flatpickr(flatpickrInput, {
                    dateFormat: "D, M, d H:i",
                    enableTime: true,
                    onClose: function teste(selectedDates, dateStr, instance) {
                        //Add the classes of the selected element
                        buttonDisplay.display.children[1].textContent = dateStr
                        buttonClicked(buttonDisplay.display, parent)
                    }
                })
            }

        } else if (listItem.nome.includes("Custom")) {
            buttonDisplay.display.addEventListener("click", () => customCycleTask(parent))
        } else {
            buttonDisplay.display.addEventListener("click", () => buttonClicked(buttonDisplay.display, parent))
        }

    })
}




//*****************************2*************************** */
//Create the elements inside of each taskbar grid
function createTaskbarGridElements(buttonDisplay, listItem, parent) {
    buttonDisplay.display.classList.add("container-icon-childDiv")
    //Icon
    let i = document.createElement("i")
    let image
    if (listItem == "Remove") {
        image = "Remove"
    } else {
        image = listItem.image
    }
    c1 = classImages.get(image).c1
    c2 = classImages.get(image).c2
    i.classList.add(c1)
    i.classList.add(c2)

    //Paragraph
    let p = document.createElement("p")
    if (listItem == "Remove") {
        p.textContent = "Remove"
    } else {
        p.textContent = listItem.nome
    }

    //Adding as children
    buttonDisplay.display.appendChild(i)
    buttonDisplay.display.appendChild(p)

    parent.appendChild(buttonDisplay.display)
}


//*****************************2.1*************************** */
//CustomCycleTask button
function customCycleTask(parent) {
    let customCycleDiv = new WindowCreate("20rem", "none")
    customCycleDiv.display.setAttribute("id", "customTaskCycle")
    customCycleDiv.display.innerHTML = customTaskHtml
    parent.appendChild(customCycleDiv.display)
    stackOpenWindow.push(customCycleDiv.display)

    customCycleTaskEventClick(customCycleDiv)
}

function customCycleTaskEventClick(customCycleDiv) {
    let customCycleCancelButton = customCycleDiv.display.children[2].children[0]
    let customCycleSaveButton = customCycleDiv.display.children[2].children[1]

    //Cancel Button
    customCycleCancelButton.addEventListener("click", () => {
        stackOpenWindow[stackOpenWindow.length - 1].remove()
        setTimeout(() => {
            stackOpenWindow.pop()
        }, 50)
    })

    //Save Button
    customCycleSaveButton.addEventListener("click", () => {
        let inputValue = customCycleDiv.display.children[1].children[0]
        let inputTypeOfValue = customCycleDiv.display.children[1].children[1]

        if (!Number.isNaN(parseInt(inputValue.value)) && inputTypeOfValue.value != "") {
            customCycleTaskClicked(inputValue.value, inputTypeOfValue.value)
            inputValue.value = ""
            stackOpenWindow[stackOpenWindow.length - 1].remove()
            stackOpenWindow.pop()
        }
    })
}



//*****************************3*************************** */
function buttonClicked(buttonHtml, parent) {
    actualDisplay.fechar()
    stackOpenWindow.pop()
    if (buttonHtml.children[1].textContent == "Remove") {
        //Reset Icon
        let icon = parent.children[0]
        let parentId = parent.getAttribute("data-icons")
        switch(parentId) {
            case "1":
                icon.classList.add("fa-solid")
                icon.classList.add("fa-calendar")
                icon.classList.add("task-icon")
                break
            case "2":
                icon.classList.add("fa-solid")
                icon.classList.add("fa-stopwatch")
                icon.classList.add("task-icon")
                break
            case "3":
                icon.classList.add("fa-solid")
                icon.classList.add("fa-arrows-spin")
                icon.classList.add("task-icon")
                break   
        }
        //Reset text
        parent.children[1].textContent = ""
    } else {
        //icon
        let icon = buttonHtml.children[0]
        //paragraph
        let text = buttonHtml.children[1]

        let parentIcon = parent.children[0]
        parentIcon.removeAttribute("class")

        //Changes taskbar text
        let parentText = parent.children[1]

        //Changes taskbar icon
        for (let i = 0; i < icon.classList.length; i++) {
            parentIcon.classList.add(icon.classList[0])
            parentIcon.classList.add(icon.classList[1])
            parentIcon.classList.add("task-icon")
        }
        
        switch(parent.getAttribute("data-icons")){
            case "2":
                parentText.textContent = "Remember me " + text.textContent
                break
            case "3":
                parentText.textContent = "It'll repeat: " + text.textContent
                break
            default:
                parentText.textContent = text.textContent
        }
    }
}

function customCycleTaskClicked(inputValue, inputType) {
    let imageInfo = classImages.get("Custom")
    let parent = stackOpenWindow[stackOpenWindow.length - 1].parentElement
    let parentImage = parent.children[0]
    let parentText = parent.children[1]

    parentImage.removeAttribute("class")
    parentImage.classList.add(imageInfo.c1)
    parentImage.classList.add(imageInfo.c2)
    parentImage.classList.add("task-icon")

    parentText.textContent = "It'll repeat every: " + inputValue + " " + inputType
}