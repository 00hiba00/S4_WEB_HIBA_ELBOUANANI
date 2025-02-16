const Form = document.querySelector('.add');
const addTodo = document.querySelector('.add input');
const todoList = document.querySelector('.todos');


Form.addEventListener('submit' , (e) => {
    e.preventDefault();
    let todo = addTodo.value.trim();
    console.log(todo);
    if (todo !== ''){
        const html = `  <li class="list-group-item d-flex justify-content-between align-items-center"> 
                        <span>${todo}</span> 
                        <i class="far fa-trash-alt delete" onclick="deleteTodo(this)"></i> 
                        </li> `;
        todoList.innerHTML += html;
        addTodo.value = '';
    };
});

function deleteTodo(element){
    element.parentElement.remove();
}

const searchBar = document.querySelector('.search input');

searchBar.addEventListener('input', (e) => {
    console.log("User typed:", e.target.value);
    const motRechercher = searchBar.value.toLowerCase();
    const todoElement = todoList.querySelectorAll('li');

    todoElement.forEach((item) => {
        todoText = item.querySelector('span').textContent.toLowerCase();
        if(todoText.includes(motRechercher)){
            item.classList.remove('hidden');
        }
        else{
            item.classList.add('hidden');
        }
    })

});


const searchFrom = document.querySelector('.search');

searchFrom.addEventListener('submit' , (e) => {
    e.preventDefault();
});

