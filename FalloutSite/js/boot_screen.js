const terminal = document.getElementById("terminal")

const bootText = `*************** PIP-OS(R) V7.1.0.8 ***************

COPYRIGHT 2075 ROBCO(R)
LOADER V1.1
EXEC VERSION 41.10
64K RAM SYSTEM
38911 BYTES FREE
NO HOLOTAPE FOUND
LOAD ROM(1): DEITRIX 303`;

let charIndex = 0

function typeBoot() {

    if (charIndex < bootText.length) {

        terminal.textContent += bootText.charAt(charIndex)
        charIndex++

        setTimeout(typeBoot, 35)

    } else {

        setTimeout(() => {
            window.location.href = "../pipboy.html"
        }, 1500)

    }

}

typeBoot()