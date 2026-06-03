// Máscara para Telefone

document.addEventListener("DOMContentLoaded", function() {
    const foneInput = document.getElementById("Telefone");

    foneInput.addEventListener("input", function () {
        let v = foneInput.value.replace(/\D/g, '').slice(0, 9);
        v = v.replace()
    })
})
