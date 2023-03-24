let mode = "white";

const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const whitemode_bgim = document.querySelector(".whitemode_bgim");
const darkmode_bgim = document.querySelector(".darkmode_bgim");

moon.addEventListener("click", function(){
    mode = "dark";
    moon.style.display = "none";
    sun.style.display = "flex";
    whitemode_bgim.style.display = "none";
    darkmode_bgim.style.display = "flex";
    document.querySelectorAll('.whitebox').forEach(e => e.classList.replace('whitebox', 'darkbox'));
    document.querySelectorAll('.whitemode_bd').forEach(e => e.classList.replace('whitemode_bd', 'darkmode_bd'));
    const p_tag = document.querySelectorAll('p');
    p_tag.forEach(e => e.classList.toggle("fonttogglemode"));
    const input_tag = document.querySelectorAll('input');
    input_tag.forEach(e => e.classList.toggle("inputtogglemode"));
});

sun.addEventListener("click", function(){
    mode = "white";
    sun.style.display = "none";
    moon.style.display = "flex";
    whitemode_bgim.style.display = "flex";
    darkmode_bgim.style.display = "none";
    document.querySelectorAll('.darkbox').forEach(e => e.classList.replace('darkbox', 'whitebox'));
    document.querySelectorAll('.darkmode_bd').forEach(e => e.classList.replace('darkmode_bd', 'whitemode_bd'));
    const p_tag = document.querySelectorAll('p');
    p_tag.forEach(e => e.classList.toggle("fonttogglemode"));
    const input_tag = document.querySelectorAll('input');
    input_tag.forEach(e => e.classList.toggle("inputtogglemode"));
});

const checkbox0 = document.querySelector("#checkbox0");
const emptybox0 = document.querySelector("#emptybox0");
const textbox0 = document.querySelector("#textbox0");
const list = document.querySelector("#list");
const num_item = document.querySelector("#number-item");

let menu_filter = "all";

let complete_todo = false;
const btn = document.querySelector(".btn");

emptybox0.addEventListener("click", function(){
    console.log("hell111o");
    checkbox0.style.display = "flex";
    emptybox0.style.display = "none";
    complete_todo = true;
});

checkbox0.addEventListener("click", function(){
    console.log("hell111o");
    emptybox0.style.display = "flex";
    checkbox0.style.display = "none";
    complete_todo = false;
});


let todolist = [];

const todolist_filter = [];

textbox0.addEventListener("keypress", function(enter){
    if (textbox0.value != "" && enter.key === 'Enter'){
        todolist.push({id : (todolist.length+1).toString(), text_value : textbox0.value, complete_value : complete_todo});
        const task = document.createElement('div');
        task.classList.add("flex");
        if (mode == "white"){
            task.classList.add("whitebox");
        }
        else if (mode == "dark"){
            task.classList.add("darkbox");
        };
        task.setAttribute("id", "task" + todolist.length.toString());
        list.appendChild(task)

        const e1 = document.createElement('div');
        e1.classList.add("empty-input");
        e1.setAttribute("id", "emptybox" + todolist.length.toString());
        task.appendChild(e1)

        const e2 = document.createElement('img');
        e2.src = "./images/icon-check.svg";
        e2.classList.add("check-box");
        e2.setAttribute("id", "checkbox" + todolist.length.toString());
        task.appendChild(e2)

        const e3 = document.createElement('p');
        if (mode == "dark"){
            e3.classList.add("fonttogglemode");
        };
        e3.innerText = textbox0.value;
        task.appendChild(e3)

        complete_todo ? e1.style.display  = "none" : e2.style.display = "none";
        
        e1.addEventListener("click", function(){
            e2.style.display = "flex";
            e1.style.display = "none";
            const id_number = this.id.substring(this.id.length - 1)
            todolist[id_number-1].complete_value = true;
            check_menu();
        });
        
        e2.addEventListener("click", function(){
            e1.style.display = "flex";
            e2.style.display = "none";
            const id_number = this.id.substring(this.id.length - 1)
            todolist[id_number-1].complete_value = false;
            check_menu();
        });
        number_item();
        check_menu();
    }
});

function number_item(){
    num_item.innerText = todolist.length + " items left";
};
console.log("hello");

const all = document.querySelector("#all");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");
const clear = document.querySelector("#clear");

function check_menu(){
    if (menu_filter == "all"){
        all_filter_func();
    } else if (menu_filter == "active"){
        active_filter_func();
    } else if (menu_filter == "completed"){
        completed_filter_func();
    };
};

function all_filter_func(){
    menu_filter = "all";
    for (i in todolist){
        const element = document.getElementById("task"+todolist[i].id).style.display = "flex";
    }
};

function active_filter_func(){
    menu_filter = "active";
    const filter_completed_true = todolist.filter(todolist => todolist.complete_value == false);
    for (i in filter_completed_true){
        const element = document.getElementById("task"+filter_completed_true[i].id).style.display = "flex";
    };
    const filter_completed_false = todolist.filter(todolist => todolist.complete_value == true);
    for (i in filter_completed_false){
        const element = document.getElementById("task"+filter_completed_false[i].id).style.display = "none";
    };
};

function completed_filter_func(){
    menu_filter = "completed";
    const filter_completed_true = todolist.filter(todolist => todolist.complete_value == true);
    if (filter_completed_true.length > 0){
        for (i in filter_completed_true){
            const element = document.getElementById("task"+filter_completed_true[i].id).style.display = "flex";
        };
    };
    const filter_completed_false = todolist.filter(todolist => todolist.complete_value == false);
    if (filter_completed_false.length > 0){
        for (i in filter_completed_false){
            const element = document.getElementById("task"+filter_completed_false[i].id).style.display = "none";
        };
    };
};

all.addEventListener("click", all_filter_func);
active.addEventListener("click", active_filter_func);
completed.addEventListener("click", completed_filter_func);

clear.addEventListener("click", function(){
    console.log("clear func");
    const filter_completed_true = todolist.filter(todolist => todolist.complete_value == true);
    for (i in filter_completed_true){
        const element = document.getElementById("task"+filter_completed_true[i].id);
        element.remove();
    };

    const filter_completed_false = todolist.filter(todolist => todolist.complete_value == false);

    todolist = filter_completed_false;

    num = 0
    for (i in filter_completed_false){
        num = num + 1;
        const taskid = document.querySelector("#task" + filter_completed_false[i].id);
        const emptyid = document.querySelector("#emptybox" + filter_completed_false[i].id);
        taskid.id = "task" + num;
        emptyid.id = "emptybox" + num;
        todolist[i].id = parseInt(i)+1;
    };
    number_item();
    check_menu();
});

