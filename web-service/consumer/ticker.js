const numberBox = document.getElementById('number-box');
const tickButton = document.getElementById('tick-button');
const clearButton = document.getElementById('clear-button');
const jumpButton = document.getElementById('jump-button');


tickButton.addEventListener('click', () =>{
    fetch("http://localhost:3000/tick")
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            numberBox.value = data.number;
        });
});

clearButton.addEventListener('click', () =>{
    const options = {
        method: 'DELETE'
    }
    fetch("http://localhost:3000/clear", options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            numberBox.value = data.number;
        });
});

jumpButton.addEventListener('click', () =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({number: parseInt(numberBox.value)})
    }
    fetch("http://localhost:3000/jump", options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            numberBox.value = data.number;
        });
});

function checkForErrors(response){
    if(!response.ok){
        throw Error(`${response.status}: ${response.statusText}`);
    }
    console.log(response);
    return response;
}