// toggle----------------------------------
// <p class="a b">hello world</p>
// const p_tag = document.querySelectorAll('p');
// p_tag.forEach(e => e.classList.toggle("c"));
// <p class="a b c">hello world</p>

// <p class="a b c">hello world</p>
// const p_tag = document.querySelectorAll('p');
// p_tag.forEach(e => e.classList.toggle("c"));
// <p class="a b">hello world</p>

// replace----------------------------------
// <p class="a b c">hello world</p>
// p_tag = document.querySelectorAll('p');
// p_tag.forEach(e => e.classList.replace('c', 'd'))
// <p class="a b d">hello world</p>

// <div class="contaniner1">
//      <div class="container2">hello</div>
// </div>
// const contaniner1 = document.createElement('div');
// contaniner1.classList.add('contaniner1');
// const container2 = document.createElement('div');
// container2.classList.add('container2');
// สร้างองค์ประกอบ div และกำหนดเนื้อหาใน container2
// const textNode = document.createTextNode('hello');
// container2.appendChild(textNode);
// เพิ่ม container2 เป็นลูกของ contaniner1
// contaniner1.appendChild(container2);
// เพิ่ม contaniner1 เป็นลูกของ body หรือตำแหน่งที่คุณต้องการ
// document.body.appendChild(contaniner1);

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
    const attribution = document.querySelector(".attribution");
    attribution.classList.toggle("fonttogglemode");
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
    const attribution = document.querySelector(".attribution");
    attribution.classList.toggle("fonttogglemode");
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
    checkbox0.style.display = "flex";
    emptybox0.style.display = "none";
    complete_todo = true;
});

checkbox0.addEventListener("click", function(){
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
        e3.classList.add("p-line");
        if (complete_todo == true){
            e3.classList.add("toggle");
        }
        e3.setAttribute("id", "p-line" + todolist.length.toString());
        e3.innerText = textbox0.value;
        task.appendChild(e3)

        const textboxclass = document.querySelector("#textbox0");
        textboxclass.value = "";

        const e4 = document.createElement('img');
        e4.src = "./images/icon-cross.svg";
        e4.classList.add("cross");
        if (mode == "white"){
            e4.classList.add("whitecross");
        }
        else if (mode == "dark"){
            e4.classList.add("darkcross");
        };
        e4.setAttribute("id", "cross" + todolist.length.toString());
        task.appendChild(e4)

        complete_todo ? e1.style.display  = "none" : e2.style.display = "none";
        
        e1.addEventListener("click", function(){
            e2.style.display = "flex";
            e1.style.display = "none";
            e3.classList.toggle("toggle");
            const id_number = this.id.substring(this.id.length - 1)
            todolist[id_number-1].complete_value = true;
            check_menu();
        });
        
        e2.addEventListener("click", function(){
            e1.style.display = "flex";
            e2.style.display = "none";
            e3.classList.toggle("toggle");
            const id_number = this.id.substring(this.id.length - 1)
            todolist[id_number-1].complete_value = false;
            check_menu();

        });

        e3.addEventListener("click", function(){
            const id_number = this.id.substring(this.id.length - 1)
            if (todolist[id_number-1].complete_value == true){
                e1.style.display = "flex";
                e2.style.display = "none";
                todolist[id_number-1].complete_value = false;
            }else if(todolist[id_number-1].complete_value == false){
                e1.style.display = "none";
                e2.style.display = "flex";
                todolist[id_number-1].complete_value = true;
            }
            e3.classList.toggle("toggle");

            check_menu();

        });

        e4.addEventListener("click", function(){
            const id_number = this.id.substring(this.id.length - 1)
            const element = document.getElementById("task"+id_number);
            element.remove();
            const filter_element = todolist.filter(todolist => todolist.id != id_number);
            todolist = filter_element;
            num = 0
            for (i in filter_element){
                num = num + 1;
                const taskid = document.querySelector("#task" + filter_element[i].id);
                const emptyid = document.querySelector("#emptybox" + filter_element[i].id);
                const checkid = document.querySelector("#checkbox" + filter_element[i].id);
                const plineid = document.querySelector("#p-line" + filter_element[i].id);
                const crossid = document.querySelector("#cross" + filter_element[i].id);
                taskid.id = "task" + num;
                emptyid.id = "emptybox" + num;
                checkid.id = "checkbox" + num;
                plineid.id = "p-line" + num;
                crossid.id = "cross" + num;
                todolist[i].id = parseInt(i)+1;
            };

            check_menu();
        });

        check_menu();
    }
});

function number_item(list){
    let mylist = list;
    num_item.innerText = mylist.length + " items left";
};

function choice_menu(value_menu){
    const all = document.querySelector("#all");
    const active = document.querySelector("#active");
    const completed = document.querySelector("#completed");
    const clear = document.querySelector("#clear");
    if (value_menu == "all" && mode == "white"){
        all.className = 'all toggle';
        active.className = 'active';
        completed.className = 'completed';}
    
    else if (value_menu == "all" && mode == "dark"){
            all.className = 'all toggle fonttogglemode';
            active.className = 'active fonttogglemode';
            completed.className = 'completed fonttogglemode';}

    else if (value_menu == "active"  && mode == "white"){
        all.className = 'all';
        active.className = 'active toggle';
        completed.className = 'completed';}
    
    else if (value_menu == "active"  && mode == "dark"){
            all.className = 'all fonttogglemode';
            active.className = 'active toggle fonttogglemode';
            completed.className = 'completed fonttogglemode';}
    
    
    else if (value_menu == "completed" && mode == "white"){
        all.className = 'all';
        active.className = 'active';
        completed.className = 'completed toggle';
    }

    else if (value_menu == "completed" && mode == "dark"){
        all.className = 'all fonttogglemode';
        active.className = 'active fonttogglemode';
        completed.className = 'completed toggle fonttogglemode';
    };
};

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
    choice_menu("all");
    for (i in todolist){
        const element = document.getElementById("task"+todolist[i].id);
        element.style.display = "flex";
    };
    number_item(todolist)
};

function active_filter_func(){
    menu_filter = "active";
    choice_menu("active");
    const filter_completed_true = todolist.filter(todolist => todolist.complete_value == false);
    for (i in filter_completed_true){
        const element = document.getElementById("task"+filter_completed_true[i].id).style.display = "flex";
    };
    const filter_completed_false = todolist.filter(todolist => todolist.complete_value == true);
    for (i in filter_completed_false){
        const element = document.getElementById("task"+filter_completed_false[i].id).style.display = "none";
    };
    number_item(filter_completed_true)
};

function completed_filter_func(){
    menu_filter = "completed";
    choice_menu("completed");
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
    number_item(filter_completed_true)
};

all.addEventListener("click", all_filter_func);
active.addEventListener("click", active_filter_func);
completed.addEventListener("click", completed_filter_func);

clear.addEventListener("click", function(){
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
        const checkid = document.querySelector("#checkbox" + filter_completed_false[i].id);
        const plineid = document.querySelector("#p-line" + filter_completed_false[i].id);
        const crossid = document.querySelector("#cross" + filter_completed_false[i].id);
        taskid.id = "task" + num;
        emptyid.id = "emptybox" + num;
        checkid.id = "checkbox" + num;
        plineid.id = "p-line" + num;
        crossid.id = "cross" + num;
        todolist[i].id = parseInt(i)+1;
    };
    check_menu(filter_completed_true);
});

