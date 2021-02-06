var questionSubject = document.getElementById("subjectInput") 
var questionDis = document.getElementById("questionInput")
var questionSubmit = document.getElementById("questionSubmit")
var viewingArea = document.getElementById("viewingArea")
var questionForm = document.getElementById("questionForm")
var newQuestionButton = document.getElementById("newQuestionButton")
var responseSubjectShow = document.getElementById("responseSubjectShow")
var responseQuestionShow = document.getElementById("responseQuestionShow")
var resolveButton = document.getElementById("resolveButton")
var responseHeading = document.getElementById("responseHeading")
var responses = document.getElementById("responses")
var responseSubmitButton = document.getElementById("responseSubmitButton")
var responseCommentInput = document.getElementById("responseCommentInput")
var responseNameInput = document.getElementById("responseNameInput")
var searchBox = document.getElementById("searchBox")

responseForm.style.display = "none"
noMatchesFound.style.display = "none"
responses.style.display = "none"
responseHeading.style.display = "none"

var list = []
if(JSON.parse(localStorage.getItem("list") !== null)) {
    list = JSON.parse(localStorage.getItem("list"))
}
var selectedID = -1;
var idCount = 1;

if(list.length > 0) {
    list.map(li=>{
        var div = document.createElement("div")
        div.id = li.id
    div.className = "question border-bottom"
    div.innerHTML = `<h3 class = "questionText">${li.ques.subject}</h3><h6 class = "questionText">${li.ques.description}</h6>`
    div.addEventListener('click',()=>{
        responses.innerHTML = ""
        responseSubjectShow.innerHTML = div.children[0].innerText
        responseQuestionShow.innerHTML = div.children[1].innerText
        selectedID = li.id
        console.log(li.id)
        responseForm.style.display = "block"
        questionForm.style.display = "none"
            list.map(item=>{
        if(item.id === selectedID) {
            if(item.res.length > 0)
            {
                responseHeading.style.display = responses.style.display = "block"
                item.res.map(cmt=>{
                var div = document.createElement("div")
                div.className = "question border-bottom"
                div.innerHTML = `<h3 class = "questionText">${cmt.name}</h3><h6 class = "questionText">${cmt.comment}</h6>`
                responses.appendChild(div)
                })
            }
            else {
                responseHeading.style.display = responses.style.display = "none"
            }
        }
    })
    })
    viewingArea.appendChild(div)
    })
}

function showNew() {
    if(selectedID === -1) {
        responseForm.style.display = "none"
        questionForm.style.display = "block"
    }
}

searchBox.addEventListener('keyup', ()=>{
    var count = 0
    list.map(li=>{
        if(li !== null && li.ques.subject.indexOf(searchBox.value) === -1) {
            document.getElementById(li.id).style.display = "none"
            count ++
        }
        else {
            document.getElementById(li.id).style.display = "block"
        }
        if(count == list.length) {
            noMatchesFound.style.display = "block"
        }
        else {
            noMatchesFound.style.display = "none"
        }
    })
})

responseSubmitButton.addEventListener('click', ()=>{
    if(responseNameInput.value === '' || responseCommentInput.value === ''){
        return alert("Name and/or Comment fields can't be empty.")
    }
    resp = {
        name : responseNameInput.value,
        comment : responseCommentInput.value
    }
    list.map(item=>{
        if(item.id === selectedID) {
            item.res.push(resp);
        }
    })
    responses.innerHTML = ""
    responseHeading.style.display = "block"
    responses.style.display = "block"
    list.map(item=>{
        if(item.id === selectedID) {
            item.res.map(cmt=>{
                var div = document.createElement("div")
                div.className = "question border-bottom"
                div.innerHTML = `<h3 class = "questionText">${cmt.name}</h3><h6 class = "questionText">${cmt.comment}</h6>`
                responses.appendChild(div)
            })
        }
    })
    responseCommentInput.value = ""
    responseNameInput.value = ""
    console.log(list);
    localStorage.setItem("list",JSON.stringify(list))
})

resolveButton.addEventListener('click', ()=>{
      for( var i = 0; i < list.length; i++){
        if ( list[i].id === selectedID) { 
            list.splice(i, 1);
            viewingArea.removeChild(document.getElementById(selectedID))
        }
    }
    selectedID = -1;
    responses.innerHTML = ""
    showNew()
    localStorage.setItem("list",JSON.stringify(list))
})

newQuestionButton.addEventListener('click', ()=>{
    selectedID = -1;
    responseForm.style.display = "none"
    questionForm.style.display = "block"
    responses.style.display = "none"
    responseHeading.style.display = "none"
})

questionSubmit.addEventListener("click",()=>{
    if(questionSubject.value === '' || questionDis.value === ''){
        return alert("Subject and/or Question fields can't be empty.")
    }
    var query = {
        ques : {
            subject : questionSubject.value,
            description : questionDis.value
        },
        res : [],
        favo : false,
        id : idCount
    }
    list.push(query)
    var div = document.createElement("div")
    div.id = idCount
    idCount++;
    div.className = "question border-bottom"
    div.innerHTML = `<h3 class = "questionText">${questionSubject.value}</h3><h6 class = "questionText">${questionDis.value}</h6>`
    div.addEventListener('click',()=>{
        responses.innerHTML = ""
        responseSubjectShow.innerHTML = div.children[0].innerText
        responseQuestionShow.innerHTML = div.children[1].innerText
        selectedID = query.id
        responseForm.style.display = "block"
        questionForm.style.display = "none"
            list.map(item=>{
        if(item.id === selectedID) {
            if(item.res.length > 0)
            {
                responseHeading.style.display = responses.style.display = "block"
                item.res.map(cmt=>{
                var div = document.createElement("div")
                div.className = "question border-bottom"
                div.innerHTML = `<h3 class = "questionText">${cmt.name}</h3><h6 class = "questionText">${cmt.comment}</h6>`
                responses.appendChild(div)
                })
            }
            else {
                responseHeading.style.display = responses.style.display = "none"
            }
        }
    })
    })
    viewingArea.appendChild(div)
    questionSubject.value = ""
    questionDis.value = ""

    console.log(list)
    localStorage.setItem("list",JSON.stringify(list))
})
