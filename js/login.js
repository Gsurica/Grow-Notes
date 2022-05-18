const button = document.getElementById("button__login")
const login = document.getElementById("login")
const password = document.getElementById("pass")

const getDataBase = () => JSON.parse(localStorage.getItem("db_user")) ?? []

const readUserInDB = () => getDataBase()

const clearValues = () => {
    const inputs = document.querySelectorAll(".input__register")
    inputs.forEach(inputs => inputs.value = "")
}

const userLoginValidation = (login, password) => {
   if(localStorage.getItem("db_user") != null){
       const dbUser = readUserInDB()

       const getLogin = dbUser.map(login => login.login).join("")
       const getPass = dbUser.map(pass => pass.pass).join("")

       if(login == getLogin && password == getPass){
           alert("Logado com sucesso!")
           window.location.href = "notesPage.html"
       } else {
           alert("Login ou senha inválidos!")
       }
   } else {
       alert("Encontramos um erro: NÃO EXISTEM CONTAS REGISTRADAS NESSE LOGIN E SENHA!")
   }

}   


button.addEventListener("click", (event) => {
    userLoginValidation(login.value, password.value)
    clearValues()
    event.preventDefault()
})