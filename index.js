const btnEncrypt = document.getElementById("btnEncrypt");
btnEncrypt.addEventListener("click", encrypt);
const btnDecrypt = document.getElementById("btnDecrypt");
btnDecrypt.addEventListener("click", decrypt);
const btnCopy = document.getElementById("btnCopy");
btnCopy.addEventListener("click", copyToClipboard);


function encrypt() {
    const inputText = document.getElementById("inputText").value;
    if (inputText.trim() === "") {
        Swal.fire({
            icon: "warning",
            title: "Escriba algo para encriptar",
            background: "#0e4280",
            position: "center",
            showConfirmButton: true
        })
    } else if (validate(inputText)) {
        printOutputText(encryptText(inputText));
    } else {
        Swal.fire({
            icon: "warning",
            title: "El texto no debe contener letras mayusculas ni caracteres especiales",
            background: "#0e4280",
            position: "center",
            showConfirmButton: true
        })
    }

}

function validate(text) {
    const pattern = new RegExp(/^[a-z\s]+$/g);
    return pattern.test(text);
}



function decrypt() {
    const inputText = document.getElementById("inputText").value;
    if (inputText.trim() === "") {
        Swal.fire({
            icon: "warning",
            title: "Escriba algo para desencriptar",
            background: "#0e4280",
            position: "center",
            showConfirmButton: true
        })
    } else if (validate(inputText)) {
        printOutputText(decryptText(inputText));
    } else {
        Swal.fire({
            icon: "warning",
            title: "El texto no debe contener letras mayusculas ni caracteres especiales",
            background: "#0e4280",
            position: "center",
            showConfirmButton: true
        })
    }


}

const encryptText = (text) => {
    return text.replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
}

const decryptText = (encryptedText) => {
    return encryptedText.replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}

function printOutputText(text) {
    const outputText = document.getElementById("outputText");
    if (getComputedStyle(outputText).getPropertyValue("display") === "none") {
        outputText.style.display = "block";
        btnCopy.style.display = "inline";
        const asideElements = document.getElementsByClassName("changeVisibility");
        for (const element of asideElements) {
            element.style.display = "none";
        }
    }
    outputText.value = text;

}



function copyToClipboard() {
    const outputTextarea = document.getElementById("outputText");
    const outputText = outputTextarea.value;
    navigator.clipboard.writeText(outputText)
        .then(() => {
            Swal.fire({
                toast: true,
                icon: "success",
                title: "Texto copiado al portapapeles",
                background: "#0e4280",
                /*showClass: {
                    backdrop: 'swal2-noanimation', // disable backdrop animation
                    popup: '',                     // disable popup animation
                    icon: ''                       // disable icon animation
                  },*/
                position: "center",
                showConfirmButton: false,
                timer: 1000,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        });
    outputTextarea.value = "";
    document.getElementById("inputText").value = "";
}