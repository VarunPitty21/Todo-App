var todoArray = [];

function init(){

    // created two div elements which will form the structure
    var leftDivElement = document.createElement("div");
    var rightDivElement = document.createElement("div");
    //---------------------------------------------------------
    
    
    leftDivElement.setAttribute("id","leftDiv");
    rightDivElement.setAttribute("id","rightDiv");

    //-------------------------------------------------------


    var heading = document.createElement("h1");
    heading.innerHTML = "TO-Do List";
    leftDivElement.appendChild(heading);

    //-------------------------------------------------------


    var subHeading = document.createElement("h3");
    subHeading.innerHTML = "Create a new task in the right panel and press enter";
    leftDivElement.append(subHeading); 

    //-------------------------------------------------------
        //making of the conatiner which will hold all the todos


    var container = document.createElement("div");
    container.setAttribute("id","container");
    leftDivElement.appendChild(container);


    //------------------------------------------------------
        // makingof the data entry point

    var inputTodo = document.createElement("textarea");
    inputTodo.setAttribute("id","inputTodo");
    inputTodo.setAttribute("placeholder","Enter your task here");
    rightDivElement.appendChild(inputTodo);

    //----------------------------------------------------
        // appending both the static divs with their initial content

    document.body.appendChild(leftDivElement);
    document.body.appendChild(rightDivElement);
    

    //---------------------------------------------------
        // adding event listener to the input textarea and addingthe todo when pressed enter 

    inputTodo.addEventListener("keyup",function(event){
        
        var keyCode = event.code;
        //-------------------------------------------
        // if enter then and nonempty then only append the todo


        if(keyCode=="Enter"&&inputTodo.value!=="\n"){
            
            event.preventDefault();
            
            //--------------------------------------------------

            var newTask = document.createElement("div");
            newTask.setAttribute("class","task");

            //--------------------------------------------------

            var text = document.createElement('p');
            text.innerText = inputTodo.value;
            newTask.appendChild(text);

            //-------------------------------------------------

            var readButton = document.createElement("button");
            readButton.innerHTML = "Edit";
            newTask.appendChild(readButton);

            //-----------------------------------------------
            
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            newTask.appendChild(deleteButton);
            
            //-------------------------------------------------
            deleteButton.addEventListener("click",function(event){
                var parent = event.target.parentNode;

                var parentContainer = parent.parentNode;
                parentContainer.removeChild(parent);


                todoArray.splice(0,todoArray.length);
                // console.log(container.children); 
                for(var i = 0;i<container.children.length;i++){
                    todoArray.push(container.children[i].children[0].innerText);
                }
                localStorage.setItem("todos",JSON.stringify(todoArray));
            })
            
            //----------------------------------------------------------------------------------
            readButton.addEventListener("click",function(event){
                
                // getting the parent task
                var parent = event.target.parentNode;

                var tempText = document.createElement("textarea");
                tempText.value = parent.children[0].innerText;
                parent.replaceChild(tempText,parent.childNodes[0]);

                tempText.addEventListener("keyup",function(event2){
                    var key = event2.code;

                    if(key=='Enter'&&tempText.value!=="\n"&&tempText.value!==undefined){

                        var updatedText = document.createElement("p");
                        updatedText.innerHTML = tempText.value;

                        parent.replaceChild(updatedText,parent.childNodes[0]);

                        todoArray.splice(0,todoArray.length);
                        
                        var container = document.getElementById("container");

                        for(var i = 0;i<container.children.length;i++){

                            todoArray.push(container.children[i].children[0].innerText);
                        }
                        localStorage.setItem("todos",JSON.stringify(todoArray));
                    }
                    else{
                        if(tempText.value=="\n"){
                            tempText.value==null;
                            alert("Task cant't be empty");
                        }
                    }
                    
                })
            })

            //---------------------------------------------------------------------------------------

            todoArray.push(inputTodo.value);
            localStorage.setItem("todos",JSON.stringify(todoArray));

            inputTodo.value = null;
            container.appendChild(newTask);

            //------------------------------------------------------------------------------
        }
        else{
            if(inputTodo.value==="\n"){
                inputTodo.value=null;
            }
        }
    })
}

init();

//--------------------------------------------------------------------------
// getting the stored task from the local storage


var storedTodos = localStorage.getItem("todos");
// console.log(storedTodos);
if(storedTodos!==null){
    todoArray = JSON.parse(storedTodos);
}
//--------------------------------------------------------------------------------
// console.log(todoArray);
todoArray.forEach(
    function(data){
        //-------------------------------------------------------------------
        // making of the new task 

        var newTask = document.createElement("div");
            newTask.setAttribute("class","task");
        //------------------------------------------------------------------
            // conatiner and new text making from local storage

            var container = document.getElementById("container");
            var text = document.createElement('p');
            text.innerText = data;
            newTask.appendChild(text);

        //------------------------------------------------------------------
            // read button making

            var readButton = document.createElement("button");
            readButton.innerHTML = "Edit";
            newTask.appendChild(readButton);

        //--------------------------------------------------------------------
            // delete button making

            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            newTask.appendChild(deleteButton);

        //-------------------------------------------------------------------
            // delete button event listner

            deleteButton.addEventListener("click",function(event){
                var parent = event.target.parentNode;

                var parentContainer = parent.parentNode;
                parentContainer.removeChild(parent);

                todoArray.splice(0,todoArray.length);
                // console.log(container.children);
                for(var i = 0;i<container.children.length;i++){

                    todoArray.push(container.children[i].children[0].innerText);
                }
                localStorage.setItem("todos",JSON.stringify(todoArray));
            })
        
        //------------------------------------------------------------------
            //Read button event listner

            readButton.addEventListener("click",function(event){
                
                // getting the parent task
                var parent = event.target.parentNode;

                var tempText = document.createElement("textarea");
                tempText.value = parent.children[0].innerText;
                parent.replaceChild(tempText,parent.childNodes[0]);

                tempText.addEventListener("keyup",function(event2){
                    var key = event2.code;

                    if(key=='Enter'&&tempText.value!=="\n"&&tempText.value!==undefined){
                        var updatedText = document.createElement("p");
                        updatedText.innerHTML = tempText.value;

                        parent.replaceChild(updatedText,parent.childNodes[0]);

                        todoArray.splice(0,todoArray.length);
                        
                        var container = document.getElementById("container");

                        for(var i = 0;i<container.children.length;i++){

                            todoArray.push(container.children[i].children[0].innerText);
                        }
                        localStorage.setItem("todos",JSON.stringify(todoArray));
                    }
                    else{
                        if(tempText.value=="\n"){
                            tempText.value==null;
                            alert("Task cant't be empty");
                            
                        }
                    }
                })
            })

        //-------------------------------------------------------------------
            container.appendChild(newTask);
    }
)