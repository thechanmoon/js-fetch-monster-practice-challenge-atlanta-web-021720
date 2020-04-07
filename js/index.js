// const btn_back = document.querySelector('#back')
// const btn_forward = document.querySelector('#forward')
const BASE_URL = 'http://localhost:3000'

function init(event) {

    createNewForm();

    getData(BASE_URL + '/monsters')
        .then(res => res.json())
        .then(data => {
            //debugger
            //console.log(data)
            parseData(data);
        });

}

function getData(router, option = null) {
    return fetch(router)
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


    form.method = "POST";

    element1.value = "";
    element1.name = "name";
    form.appendChild(element1);

    element2.value = "";
    element2.name = "age";
    form.appendChild(element2);

    element3.value = "";
    element3.name = "decription";
    form.appendChild(element3);

    div_create_monster.appendChild(form);
}

document.addEventListener('DOMContentLoaded', init);