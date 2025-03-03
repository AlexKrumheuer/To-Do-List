//****************************************************************Code logic ****************************************
//Stack of oppened window
let stackOpenWindow = []

containerIcons.forEach((element) => {
    element.addEventListener("click", () => {
        let elementNum = element.getAttribute("data-icons")
        //Add each task settings icons to DOM
        switch (elementNum) {
            case "0":
                if (!DisplayCreate.createdElement) { addTaskbarChildElements(element, listTasks) }
                break
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

//When something is inputed in the "type your task camp"
inputContent.addEventListener("input", () => {
    containerAddTask.style.display = "flex"
    if (inputContent.value == '') {
        containerAddTask.style.display = 'none'
    }
})


document.body.addEventListener("click", (event) => {
    if (stackOpenWindow.length != 0) {
        if (event.target.closest(".clickVerify") != stackOpenWindow[stackOpenWindow.length - 1]) {
            DisplayCreate.createdElement = false
            stackOpenWindow[stackOpenWindow.length - 1].remove()
            stackOpenWindow.pop()
        }
    }
}) 
