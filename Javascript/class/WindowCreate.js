class WindowCreate {
    static createdWindow = false
    constructor(width, height) {
       if(WindowCreate.createdWindow){
            return;
        }
        // ElementCreated
        DisplayCreate.createdElement = true

        //Element styling
        this.display = document.createElement("div")
        this.display.style.width = width
        this.display.style.height = height
        this.display.classList.add("windowCreate")

        //Class to verify click
        this.display.classList.add("clickVerify")
        
    }
    
    addClass(className) {
        this.display.classList.add(className)
    }
}