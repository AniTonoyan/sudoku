
'use strict';
let $container = document.getElementById('container');
let $tableSize = document.getElementById('table-size');
let tableSizeValue = $tableSize.value;
let groupSize = 3;
let tableLength = null;
let cells = [];
let groups = []; 
let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let mistakes = 0;

function createBoard() {
    $container.innerHTML = "";
    cells = [];
    groups = []; 
    tableSizeValue = $tableSize.value; 
    tableLength = tableSizeValue * groupSize;
    $container.classList.add("border");
   
 
    for (let i = 0; i < tableLength; i++) {
        let $row = document.createElement('div');
        let row = [];
        $row.className = 'row';
        cells.push(row);
        $container.appendChild($row);

        for (let j = 0; j < tableLength; j++) {
            let $cell = document.createElement('div');
            $cell.className = 'item';
            $row.appendChild($cell);  
            row.push({
                element: $cell,
                value: null
            }) 
        } 
    }

    for (let i = 0; i < tableSizeValue; i++) {
        let groupRow = [];
        groups.push(groupRow); 

        for (let j = 0; j < tableSizeValue; j++) {
            let item = {
                items: []
            }
            groupRow.push(item);
        } 
    }
}

function getRandomNumber(maxNumber) {
    return Math.floor(Math.random()*(maxNumber));
}

function getCoordinates() {
    let x = getRandomNumber(tableLength);
    let y = getRandomNumber(tableLength);

    return {x,y};
 }

function getRandNumberFromArr(numberArray) {
    return numberArray[getRandomNumber(numberArray.length)];
}

function getGroupByCoordinates (coordinates) {
    let {x,y} = coordinates;
    let groupX = parseInt(x/groupSize);
    let groupY = parseInt(y/groupSize);

    return groups[groupX][groupY];

 }

 function checkNumberByRow(coordinates, pointNumber) {
    let y = coordinates.y;

    for (let i = 0; i < tableLength; i++) {
        if (cells[i][y].value === pointNumber ) {
            return false;
        }
     }

     return true;
 }
 
 function checkNumberByColumn(coordinates, pointNumber) {
    let x= coordinates.x;
    for (let i = 0; i < tableLength; i++) {  
    if (cells[x][i].value === pointNumber ) {
            return false;
        }
     }

     return true;
     
} 

function checkNumberByGroup(coordinates, pointNumber, initialization) {
    let group = getGroupByCoordinates(coordinates);
    let items = group.items;

    if (initialization && items.length >= 5) {
        return false;
    }

    if (!(items.includes(pointNumber))) {
        return true;
    }
}

function createInputs() {
    for (let i = 0; i < tableLength; i++) {
        for (let j = 0; j < tableLength; j++) {
            if (cells[i][j].value === null) {
                let $input = document.createElement('input')
                cells[i][j].element.appendChild($input);
                $input.addEventListener("keyup", function(event) {
                    keyupHandler(event,i,j);
                });
            }
        } 
    }
 }

 function keyupHandler(event, x, y) {
     console.log(event.target.value, x, y);
     let coordinates = {x,y};
     console.log(event.target.value);
     if(isNaN(event.target.value)) {
        alert('Please enter number');
        return;
     }
     let pointNumber = event.target.value;
     if (!checkNumberByRow(coordinates, pointNumber)) {
         if (mistakes > 3) {
            alert('Sorry you cant continue game');
         }
        mistakes++;
        alert('Sorry you have mistake');
        return;
     };

     if (!checkNumberByColumn(coordinates, pointNumber)) {
        if (mistakes > 3) {
            alert('Sorry we cant continue game');
         }
        mistakes++;
        alert('Sorry we have mistake');
        return;
    }

    if (!checkNumberByGroup(coordinates, pointNumber, false)) {
        if (mistakes > 3) {
            alert('Sorry we cant continue game');
         }
        mistakes++;
        alert('Sorry we have mistake');
        return;
    }
    cells[x][y].element.innerHTML = pointNumber;
        cells[x][y].value = pointNumber;
        let group = getGroupByCoordinates(coordinates);
        let items = group.items;
        items.push(pointNumber);
 }

 function pointCoordinatesInTable() {
    for (let i = 0; i < tableLength; i++) {
        for (let j = 0; j < tableLength; j++) {
            if (cells[i][j].value != null) {
                cells[i][j].value = null;
                cells[i][j].element.innerHTML = '';
            }
        } 
    }
    for (let i = 0; i < tableSizeValue; i++) {
        for (let j = 0; j < tableSizeValue; j++) {
            groups[i][j].items = [];
        } 
    }

     let numberIteration = 0;
     let numberIterationCount = tableSizeValue * tableSizeValue * 5;
    
     while (numberIteration < numberIterationCount) {
        let coordinates = getCoordinates();
        let {x,y} = coordinates;
        let pointNumber = getRandNumberFromArr(numberArray); 
        
         if (cells[x][y].value !== null) {
            continue;
         }

         let group = getGroupByCoordinates(coordinates);
         let items = group.items;

         if (!checkNumberByRow(coordinates, pointNumber)) {
            continue;
         }

         if (!checkNumberByColumn(coordinates, pointNumber)) {
            continue;
        }

        if (!checkNumberByGroup(coordinates, pointNumber, true)) {
            continue;
        }

        cells[x][y].element.innerHTML = pointNumber;
            cells[x][y].value = pointNumber; 
            items.push(pointNumber);
            numberIteration++;
     }
     createInputs();
}

function  getInputNumber () {

}