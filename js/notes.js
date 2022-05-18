


const postButton = document.querySelector("#post-button")
const title = document.querySelector("#note-title")
const body = document.querySelector("#note-body")
const editExcButton = document.querySelector("#note-table>tbody")


const getData = () => JSON.parse(localStorage.getItem("db_notes")) ?? [] 
const setData = (value) => localStorage.setItem("db_notes", JSON.stringify(value))


const createNoteObject = (title, body) => {
    const obj = {
        title: title,
        body: body
    }
    return obj
}


const clearValues = () => {
    document.querySelectorAll(".input-note").forEach(value => value.value = "")
}

const createNoteInDataBase = (note) => {
    const dbNotes = getData()
    dbNotes.push(note)
    setData(dbNotes)
}

const readNoteInDataBase = () => getData()

const updateNoteOnDataBase = (index, newNote) => {
    const dbNotes = getData()
    dbNotes[index] = newNote
    setData(dbNotes)
}

const deleteNoteOnDataBase = (index) => {
    const dbNotes = getData()
    dbNotes.splice(index, 1)
    setData(dbNotes)
}

const createNoteOnScreen = (note, index) => {
    const newNoteOnScreen = document.createElement("tr")
    newNoteOnScreen.innerHTML = 
    `
        <tr>
            <td>
                ${note.title}
            </td>
            <td>
                ${note.body}
            </td>
            <td>
                <button name="edit" id="${index}">Editar</button>
                <button name="delete" id="${index}">Excluir</button>
            </td>
        </tr>

    `

    document.querySelector("#note-table>tbody").appendChild(newNoteOnScreen)
}

const updateNoteOnScreen = () => {
    const dbNotes = getData()
    dbNotes.forEach(createNoteOnScreen)
}

updateNoteOnScreen()

const refresh = () => window.location.reload()

const editNotes = (index) => {
    const dbNote = getData()[index]
    const arrayNote = new Array 
    arrayNote.push(dbNote)
    arrayNote.forEach(element => {
        const title = element.title
        const body = element.body 

        document.querySelector("#note-title").value = title 
        document.querySelector("#note-body").value = body
    })

    deleteNoteOnDataBase(index)
}

postButton.addEventListener("click", (event) => {
    createNoteInDataBase(createNoteObject(title.value, body.value))
    clearValues()
    refresh()
    event.preventDefault()
})

editExcButton.addEventListener("click", (event) => {
    if(event.target.type == "submit"){
        if(event.target.name == "delete"){
            const index = event.target.id 
            const question = confirm("deseja realmente excluir a nota?")
            if(question){
                deleteNoteOnDataBase(index)
                alert("Excluido com sucesso")
                refresh()
            } else {
                alert("Mantendo a nota...")
            }
        } else if (event.target.name == "edit") {
            const index = event.target.id 
            editNotes(index)
        }
    }
})

