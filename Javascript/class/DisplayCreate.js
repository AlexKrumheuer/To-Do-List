class DisplayCreate {
    //Verify if there's a window already oppened
    static createdElement = false
    //Create the element
    constructor(width, height, parent) {
        // ElementCreated
        DisplayCreate.createdElement = true

        //Element styling
        this.display = document.createElement("div")
        this.display.style.width = width
        this.display.style.height = height
        this.display.classList.add("displayCreate")

        //Class to verify click
        this.display.classList.add("clickVerify")


        //When the element is clicked, is closed
        //this.display.addEventListener("click", ()=> this.closeWindow());
        this.display.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede que o clique chegue no parent
        });

        //Adds and configs element to the parent element
        document.body.appendChild(this.display);
        this.positionNearButton(parent);
    }

    positionNearButton(button) {
        const rect = button.getBoundingClientRect(); // Pegar posição do botão
        const displayWidth = this.display.offsetWidth;
        const displayHeight = this.display.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let top = rect.bottom + 10; // Posição abaixo do botão por padrão
        let left = rect.left;

        // Evita que a janela ultrapasse a borda direita da tela
        if (left + displayWidth > windowWidth) {
            left = windowWidth - displayWidth - 10;
        }

        // Evita que a janela ultrapasse a borda inferior da tela
        if (top + displayHeight > windowHeight) {
            top = rect.top - displayHeight - 10;
        }

        // Aplicar as novas posições
        this.display.style.top = `${top}px`;
        this.display.style.left = `${left}px`;
    }


    //Get HTML element
    getDomElement() {
        return this.display;
    }
    //Closes the element
    closeWindow() {
        DisplayCreate.createdElement = false
        this.display.removeEventListener("click", () => { })
        document.body.removeEventListener("click", () => { })
        this.display.remove()
    }

    addClass(className) {
        this.display.classList.add(className)
    }
}


