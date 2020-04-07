const BASE_URL = 'http://localhost:3000/'
let page = 1;

function init(event) {

    createNewForm();
    getData();
    addNavListeners();

}

function getData(page) {
    fetch(BASE_URL + `monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(data => {
            //debugger
            //console.log(data)
            parseData(data);
        });
}

function parseData(array) {

    array.forEach(element => {
        parseElement(element);
    });

}

function parseElement(element) {
    let div_monster_container = document.querySelector('#monster-container')

    let div_monster = document.createElement('div');
    let h1 = document.createElement('h1');
    let h2 = document.createElement('h2');
    let p1 = document.createElement('p');

    h1.innerText = "Name: " + element.name;
    h2.innerText = "Age: " + element.age;
    p1.innerText = "Description:\n" + element.description;
    div_monster.append(h1, h2, p1);
    div_monster_container.appendChild(div_monster);
}

function createNewForm() {
    const div_create_monster = document.querySelector('#create-monster')

    let form = document.createElement("form");
    let element1 = document.createElement("input");
    let element2 = document.createElement("input");
    let element3 = document.createElement("input");
    let element4 = document.createElement('button');

    // form.method = "POST";
    form.id = 'monster-form'

    element1.value = "";
    element1.id = "name";
    form.appendChild(element1);

    element2.value = "";
    element2.id = "age";
    form.appendChild(element2);

    element3.value = "";
    element3.id = "description";
    form.appendChild(element3);


    element4.innerHTML = 'Create'
    form.appendChild(element4);

    div_create_monster.appendChild(form);
    addSubmitEventListener()
}

function addSubmitEventListener(){ 
    document.querySelector('#monster-form')
    .addEventListener('submit', 
    a => { 
        a.preventDefault(), 
        console.log('submitted', getFormData()), 
        postNewData(getFormData()), clearForm() }) 
}

function getFormData(){
    let input_name = document.querySelector('#name'),
        input_age = document.querySelector('#age'),
        input_descripton = document.querySelector('#description');
    return { name: input_name.value, age: parseFloat(input_age.value), description: input_descripton.value }
}
function postNewData(new_data){
    let url = BASE_URL + `monsters`,
        config = { 
            method: 'POST', 
            headers: { 'Content-type': 'application/json', 
            Accept: 'application/json' }, 
            body: JSON.stringify(new_data) 
        };
    fetch(url, config)
    .then(res => res.json())
    .then(data => console.log('new monster', data))
}

function clearForm(){ 
    document.querySelector('#monster-form').reset() 
}

function addNavListeners(){
    let button_back = document.querySelector('#back'),
        button_forward = document.querySelector('#forward');
        button_back.addEventListener('click', () => { pageDown() }), 
        button_forward.addEventListener('click', () => { pageUp() })
}
function pageUp(){ page++, getData(page) }
function pageDown(){ 1 < page ? (page--, getData(page)) : alert('no monsters') }

document.addEventListener('DOMContentLoaded', init);