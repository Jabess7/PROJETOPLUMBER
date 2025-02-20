document.getElementById("entrar").addEventListener("click", function() {
    validarLogin();
});

document.addEventListener("keydown", function(event) {
    // Verifica se a tecla pressionada foi "Enter" (código 13)
    if (event.key === "Enter") {
        validarLogin();
    }
});

function validarLogin() {
    var usuario = document.getElementById("username").value;
    var senha = document.getElementById("password").value;
    var resposta = document.getElementById("resposta")

    if(usuario <= 0 && senha <= 0){
        window.alert("Você precisa preencher os campos abaixo!")
    }

    // Verifica se o usuário e senha estão corretos
    else if (usuario == "jabes" && senha === "12345678") {
        // Redireciona para login.html
        window.location.href = "login.html";
    } else {
        // Não exibe nada na página caso a senha ou usuário estejam errados
        resposta.style.display="flex";
        resposta.style.justifyContent = "center";
        

    }
}