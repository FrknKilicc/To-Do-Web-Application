const form = document.querySelector("#todoAddForm");
 const addInput = document.querySelector("#todoName");
 const toDoList= document.querySelector(".list-group");
 const firstCardBody=document.querySelectorAll(".card-body")[0];
 const secondCardBody=document.querySelectorAll(".card-body")[1];
 const clearSelect=document.querySelector("#clearButton");
 const filterInput=document.querySelector("#todoSearch");
 

 let todos=[];

runEvents();

 function runEvents(){
    
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",RemoveToDoToUI);
    clearSelect.addEventListener("click",allTodosRemove)
    filterInput.addEventListener("keyup",filter)

 };
 function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todos){
       addToDotoUI(todos);

    })
 }
 function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const toDoListt= document.querySelectorAll(".list-group-item");
    if(toDoListt.length>0){
        toDoListt.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : block !important")
            }else{
                todo.setAttribute("style","display : none !important")
            }
        })
    }
    else{
        showAlert("warning","Filtrelenecek öğe mevcut değil")
    }
 }
 function allTodosRemove(){
    const toDoAllList=document.querySelectorAll(".list-group-item");
    if(toDoAllList.length>0){
        toDoAllList.forEach(function(to){
            to.remove();
           
        })
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        
        showAlert("success","Kayıtlar Başarıyla Silindi")
    }else{
        showAlert("warning","Kayıt Mevcut Değil")
    }
 }
 function RemoveToDoToUI(e){
    if(e.target.className==="fa fa-remove"){
        const todo=e.target.parentElement.parentElement;
         todo.remove();
         removeToDoToStorage(todo.textContent);
         showAlert("success","Başarıyla Silindi")

    }
 }
 function removeToDoToStorage(removeStorage){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
    if(removeStorage===todo){
        todos.splice(index,1);
    }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
 }
 function addTodo (e){
    const inputText=addInput.value.trim();
    if(inputText==null || inputText==""){
       showAlert("danger","Kayıt Başarısız")
    }
    else{
        addToDotoUI(inputText);
        addToDotoStorage(inputText);
        showAlert("success","Kayıt Eklendi");
    }
    e.preventDefault();
 }

 function addToDotoUI (newToDo){
const li = document.createElement("li")
li.className="list-group-item d-flex justify-content-between";
li.textContent=newToDo;
const a = document.createElement("a");
a.href="#";
a.className="delete-item";
const i = document.createElement("i");
i.className="fa fa-remove";
a.appendChild(i);
li.appendChild(a);
toDoList.appendChild(li);
addInput.value="";
 }

function addToDotoStorage(newToDo){
   checkTodosFromStorage();
   todos.push(newToDo);
   localStorage.setItem("todos",JSON.stringify(todos));
}
 
function checkTodosFromStorage(){
    if ( localStorage.getItem("todos")===null){
        todos=[];
   }
   else{
       todos=JSON.parse(localStorage.getItem("todos"));
   }
}
function showAlert(type,message){
const div = document.createElement("div");
div.className=`alert alert-${type}`
div.textContent=message;
firstCardBody.appendChild(div);
setTimeout(()=>{
    div.remove();
},3000);
}
