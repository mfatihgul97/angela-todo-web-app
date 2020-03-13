const clear = document.querySelector(".fa-sync");
const list = document.getElementById("list");
const input = document.getElementById("input");


const CHECK = "fas";
const UNCHECK = "far";
const LINE_THROUGH = "lineThrough";

let LIST, id =0;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    parseList(LIST);
} else {
    LIST = [];
    id = 0;
}

function parseList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

function addToDo(todo, id, done, trash) {

    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
                    <li> 
                        <i class="${DONE} fa-check-circle" do="complete" id="${id}"></i>
                        <span class="text ${LINE}">${todo}</span>
                        <i class="fas fa-trash" do="remove" id="${id}"></i>
                    </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
    input.value = "";
}

document.addEventListener("keyup", function (event) {

    if(input.value != ' '){
        if (event.keyCode == 13) {
            const todo = input.value;

            if (todo) {
                addToDo(todo, id, false, false);
                LIST.push({
                    name: todo,
                    id: id,
                    done: false,
                    trash: false
                });
                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
            }
            input.value = "";
        }
    }

    

});

function completed(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
    
}
function removed(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.do.value;

    if(elementJob == "complete"){
        completed(element);
    } else if(elementJob == "remove"){
        removed(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

