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
        const result = encryptText(inputText);
        printOutputText(result);
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
    const outputText = document.getElementById("outputText");
    outputText.value = "";
    printOutputText(decryptText(inputText));

}

const encryptText = (text) => {
    let encryptText = text.replace(/e/g, "enter");
    encryptText = encryptText.replace(/i/g, "imes");
    encryptText = encryptText.replace(/a/g, "ai");
    encryptText = encryptText.replace(/o/g, "ober");
    encryptText = encryptText.replace(/u/g, "ufat");
    return encryptText;
}

const decryptText = (encryptedText) => {
    let text = encryptedText.replace(/enter/g, "e");
    text = text.replace(/imes/g, "i");
    text = text.replace(/ai/g, "a");
    text = text.replace(/ober/g, "o");
    text = text.replace(/ufat/g, "u");
    return text;
}

function printOutputText(text) {
    const outputText = document.getElementById("outputText");
    outputText.style.display = "block";
    btnCopy.style.display = "inline";
    const asideElements = document.getElementsByClassName("changeVisibility");
    for (const element of asideElements) {
        element.style.display = "none";
    }
    outputText.value = text;

}



function copyToClipboard() {
    const outputText = document.getElementById("outputText").value;
    if (!outputText.length == 0) {
        navigator.clipboard.writeText(outputText)
            .then(() => {
                Swal.fire({
                    toast: true,
                    icon: "success",
                    title: "Texto copiado al portapapeles",
                    background: "#0e4280",
                    /*showClass: {
                        //backdrop: 'swal2-noanimation', // disable backdrop animation
                        //popup: '',                     // disable popup animation
                        //icon: ''                       // disable icon animation
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
    }
}

// Swal.fire({
//     toast: true,
//     icon: 'success',
//     title: 'Posted successfully',
//     animation: false,
//     position: 'bottom',
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//         toast.addEventListener('mouseenter', Swal.stopTimer)
//         toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
// })