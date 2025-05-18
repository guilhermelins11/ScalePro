document.addEventListener("DOMContentLoaded", function() {
    const cnpjInput = document.getElementById("CNPJ");

    cnpjInput.addEventListener("input", function () {
        let v = cnpjInput.value.replace(/\D/g, '').slice(0, 14);
        v = v.replace()
    })
})