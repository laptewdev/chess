const pieceSelected = "#f4f774"
let turn = "W";

//Окрашивание клеток и удаление подсказок
function coloring() {
    const tiles = document.querySelectorAll('.tile');
    let isEvenRow = false;
    let counter = 0;

    tiles.forEach(tile => {
        if(counter % 8 === 0) {
            isEvenRow = !isEvenRow;
        }
        if((isEvenRow && counter % 2 === 0) || (!isEvenRow && counter % 2 !== 0)) {
            tile.style.backgroundColor = '#eaebc8';
        }else {
            tile.style.backgroundColor = '#638644';
        }
        if(tile.classList.contains('hintMove')) {
            tile.classList.remove('hintMove');
        }
        if(tile.classList.contains('hintEat')) {
            tile.classList.remove('hintEat');
        }
        counter++;
    });
}
coloring();

//Вставка картинок
function insertImage() {
    document.querySelectorAll('.tile').forEach(image => {
        if (image.innerText.length !== 0) {
            image.innerHTML = `${image.innerText}<img class='img' src="images/${image.innerText}.png" alt="${image.innerText}">`;
            image.style.cursor = 'pointer';
        }
    });
}
insertImage();


document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', function() {
        coloring();
        if(tile.innerText.length !== 0) {
            if(tile.innerText[0] === turn) {
                tile.style.backgroundColor = pieceSelected;
                const pieceName = tile.innerText.slice(1);
                const position = tile.id;
                console.log(pieceName, position);
                const moves = hintMoves(pieceName, position);
                movePiece(moves, pieceName, position);
            }
        }
    });
}); 

//Подсказки куда может ходить эта фигура
function hintMoves(pieceName, position) {
    const moves = [];
    //Преобразование позиции в координаты
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const row = parseInt(position[0]);
    const col = letters.indexOf(position[1]) + 1;
    console.log(row, col);
    console.log(pieceName);

    //ПЕШКА
    if(pieceName === "pawn") {
        //Проверка на нахождение в стартовой позиции
        let isFirstMove = false;
        if (row === 2 && turn === "W") {
            isFirstMove = true;
        }else if(row === 7 && turn === "B") {
            isFirstMove = true;
        }

        //Проверка на возможность хода
        if(isFirstMove && turn === "W") {
            //Может переместится на одну или две клетки вперед
            if(checkForPiece(`${row + 1}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row + 1, col]);
            }
            if(checkForPiece(`${row + 2}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row + 2, col]);
            }

            //Может переместится по диагонали, если есть вражеская фигура для съедения
            try {
                if(checkForPiece(`${row + 1}${letters[col - 2]}`, turn) === "pieceEnemy") {
                    moves.push([row + 1, col - 1]);
                }
            }catch(err) {
                console.log(err);
            }
            try {
                if(checkForPiece(`${row + 1}${letters[col]}`, turn) === "pieceEnemy") {
                    moves.push([row + 1, col + 1]);
                }
            }catch(err) {
                console.log(err);
            }
            
        }else if(turn === "W") {
            //Может переместится на одну клетку вперед
            if(checkForPiece(`${row + 1}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row + 1, col]);
            }

            //Может переместится по диагонали, если есть вражеская фигура для съедения
            try {
                if(checkForPiece(`${row + 1}${letters[col - 2]}`, turn) === "pieceEnemy") {
                    moves.push([row + 1, col - 1]);
                }
            }catch(err) {
                console.log(err);
            }
            try {
                if(checkForPiece(`${row + 1}${letters[col]}`, turn) === "pieceEnemy") {
                    moves.push([row + 1, col + 1]);
                }
            }catch(err) {
                console.log(err);
            }
        }
        if(isFirstMove && turn === "B") {
            //Может переместится на одну клетку вперед
            if(checkForPiece(`${row - 1}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row - 1, col]);
            }
            if(checkForPiece(`${row - 2}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row - 2, col]);
            }

            //Может переместится по диагонали, если есть вражеская фигура для съедения
            try {
                if(checkForPiece(`${row - 1}${letters[col - 2]}`, turn) === "pieceEnemy") {
                    moves.push([row - 1, col - 1]);
                }
            }catch(err) {
                console.log(err);
            }
            try {
                if(checkForPiece(`${row - 1}${letters[col]}`, turn) === "pieceEnemy") {
                    moves.push([row - 1, col + 1]);
                }
            }catch(err) {
                console.log(err);
            }
        }else if(turn === "B") {
            //Может переместится на одну клетку вперед
            if(checkForPiece(`${row - 1}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row - 1, col]);
            }

            //Может переместится по диагонали, если есть вражеская фигура для съедения
            try {
                if(checkForPiece(`${row - 1}${letters[col - 2]}`, turn) === "pieceEnemy") {
                    moves.push([row - 1, col - 1]);
                }
            }catch(err) {
                console.log(err);
            }
            try {
                if(checkForPiece(`${row - 1}${letters[col]}`, turn) === "pieceEnemy") {
                    moves.push([row - 1, col + 1]);
                }
            }catch(err) {
                console.log(err);
            }
        }
    }

    //ЛАДЬЯ
    if(pieceName === "rook") {
        //Может двигаться вверх
        for(let i = row + 1; i <= 8; i++) {
            if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                moves.push([i, col]);
            }else if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, col]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вниз
        for(let i = row - 1; i >= 1; i--) {
            if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                moves.push([i, col]);
            }else if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, col]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вправо
        for(let i = col + 1; i <= 8; i++) {
            if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                moves.push([row, i]);
            }else if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                moves.push([row, i]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться влево
        for(let i = col - 1; i >= 1; i--) {
            if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                moves.push([row, i]);
            }else if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                moves.push([row, i]);
                break;
            }else {
                break;
            }
        }
        //рокировка
    }

    //КОНЬ
    if(pieceName === "knight") {
        //Может двигаться на две вверх и одну вправо
        try {
            if(checkForPiece(`${row + 2}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row + 2, col + 1]);
            }
        }catch(err) {
            console.log(err);
        }
        //Может двигаться на две вверх и одну влево
        try {
            if(checkForPiece(`${row + 2}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row + 2, col - 1]);
            }
        }catch(err) {
            console.log(err);
        }
        //Может двигаться на две вниз и одну вправо
        try {
            if(checkForPiece(`${row - 2}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row - 2, col + 1]);
            }
        }catch(err) {
            console.log(err);
        }
        //Может двигаться на две вниз и одну влево
        try {
            if(checkForPiece(`${row - 2}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row - 2, col - 1]);
            }
        }catch(err) {
            console.log(err);
        }
        //Может двигаться на одну вверх и две вправо
        try {
            if(checkForPiece(`${row + 1}${letters[col + 1]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col + 2]);
            }
        }catch(err) {
            console.log(err);
        }
        //Может двигаться на одну вверх и две влево
        try {
            if(checkForPiece(`${row + 1}${letters[col - 3]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col - 2]);
            }
        }catch(err) {
            console.log(err);
        }
        //Может двигаться на одну вниз и две вправо
        try {
            if(checkForPiece(`${row - 1}${letters[col + 1]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col + 2]);
            }
        }catch(err) {
            console.log(err);
        }
        //Может двигаться на одну вниз и две влево
        try {
            if(checkForPiece(`${row - 1}${letters[col - 3]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col - 2]);
            }
        }catch(err) {
            console.log(err);
        }
    }

    //СЛОН
    if(pieceName === "bishop") {
        //Может двигаться вверх вправо
        for(let i = row + 1, j = col + 1; i <= 8 && j <= 8; i++, j++) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вверх влево
        for(let i = row + 1, j = col - 1; i <= 8 && j >= 1; i++, j--) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вниз вправо
        for(let i = row - 1, j = col + 1; i >= 1 && j <= 8; i--, j++) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вниз влево
        for(let i = row - 1, j = col - 1; i >= 1 && j >= 1; i--, j--) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
    }

    //КОРОЛЕВА
    if(pieceName === "queen") {
        //Может двигаться вверх вправо
        for(let i = row + 1, j = col + 1; i <= 8 && j <= 8; i++, j++) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вверх влево
        for(let i = row + 1, j = col - 1; i <= 8 && j >= 1; i++, j--) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вниз вправо
        for(let i = row - 1, j = col + 1; i >= 1 && j <= 8; i--, j++) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вниз влево
        for(let i = row - 1, j = col - 1; i >= 1 && j >= 1; i--, j--) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вверх
        for(let i = row + 1; i <= 8; i++) {
            if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                moves.push([i, col]);
            }else if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, col]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вниз
        for(let i = row - 1; i >= 1; i--) {
            if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                moves.push([i, col]);
            }else if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, col]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться вправо
        for(let i = col + 1; i <= 8; i++) {
            if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                moves.push([row, i]);
            }else if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                moves.push([row, i]);
                break;
            }else {
                break;
            }
        }
        //Может двигаться влево
        for(let i = col - 1; i >= 1; i--) {
            if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                moves.push([row, i]);
            }else if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                moves.push([row, i]);
                break;
            }else {
                break;
            }
        }
    }

    //КОРОЛЬ
    if(pieceName === "king") {
        //Может двигаться вверх вправо на одну
        if(row + 1 <= 8 && col + 1 <= 8) {
            if(checkForPiece(`${row + 1}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col + 1]);
            }
        }
        //Может двигаться вверх влево на одну
        if(row + 1 <= 8 && col - 1 >= 1) {
            if(checkForPiece(`${row + 1}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col - 1]);
            }
        }
        //Может двигаться вниз вправо на одну
        if(row - 1 >= 1 && col + 1 <= 8) {
            if(checkForPiece(`${row - 1}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col + 1]);
            }
        }
        //Может двигаться вниз влево на одну
        if(row - 1 >= 1 && col - 1 >= 1) {
            if(checkForPiece(`${row - 1}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col - 1]);
            }
        }
        //Может двигаться вверх на одну
        if(row + 1 <= 8) {
            if(checkForPiece(`${row + 1}${letters[col - 1]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col]);
            }
        }
        //Может двигаться вниз на одну
        if(row - 1 >= 1) {
            if(checkForPiece(`${row - 1}${letters[col - 1]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col]);
            }
        }
        //Может двигаться вправо на одну
        if(col + 1 <= 8) {
            if(checkForPiece(`${row}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row, col + 1]);
            }
        }
        //Может двигаться влево на одну
        if(col - 1 >= 1) {
            if(checkForPiece(`${row}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row, col - 1]);
            }
        }
    }
    
    //Конвертирование координат обратно в формат позиций
    const validMoves = [];
    moves.forEach(move => {
        const row = move[0];
        const col = move[1];
        const position = `${row}${letters[col - 1]}`;
        validMoves.push(position);
    });
    giveHints(validMoves);
    console.log(validMoves);
    return validMoves;
}

//Проверка, если на клетке вражеская фигура
function checkForPiece(position, myColor) {
    const tile = document.getElementById(position);
    if(tile.innerText.length !== 0) {
        if(tile.innerText[0] !== myColor) {
            return "pieceEnemy";
        }else {
            return "pieceTeam";
        }
    }else {
        return "noPiece";
    }
}

//Подсказки по правильным ходам
function giveHints(validMoves) {
    validMoves.forEach(move => {
        const tile = document.getElementById(move);
        if(tile.innerText.length !== 0) {
            tile.classList.add('hintEat');
        }else {
            tile.classList.add('hintMove');
        }
    });
}

//Перемещение фигуры в выбранный квадрат
function movePiece(moves, pieceName, position) {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', function() {
            moves.forEach(move => {
                if(tile.id === move) {
                    tile.innerText = pieceName;
                    tile.innerHTML = `${turn + tile.innerText}<img class='img' src="images/${turn + tile.innerText}.png" alt="${turn + tile.innerText}">`;
                    tile.style.cursor = 'pointer';
                    const previousTile = document.getElementById(position);
                    previousTile.innerText = "";
                    previousTile.style.cursor = "default";
                    if(winner() === 1) {
                        alert("Победа чёрных", true);
                    }else if(winner() === 2) {
                        alert("Победа белых", true);
                    }else {
                        toggleTurn(turn);
                    }
                    moves = [];
                }else {
                    moves = [];
                }
            });
        });
    });
}

//Создание уведомлений
function alert(text, end) {
    const alert = document.querySelector('.container-turn');
    alert.style.visibility = 'visible';
    alert.style.opacity = '1';

    const imgTurn = document.getElementById('imgTurn');
    if(text === "Ход белых" || text === "Победа белых") {
        imgTurn.src = "images/Wking.png";
        imgTurn.alt = "Wking";
    }else {
        imgTurn.src = "images/Bking.png";
        imgTurn.alt = "Bking";
    }

    const turnElement = document.getElementById('turn');
    turnElement.innerText = text;

    if(end === true) {
        setTimeout(function(){
            alert.style.visibility = 'hidden';
            alert.style.opacity = '0';
            window.location.reload();
        }, 3000);
    }else {
        setTimeout(function(){
            alert.style.visibility = 'hidden';
            alert.style.opacity = '0';
        }, 1000);
    } 
}

//Смена хода
function toggleTurn() {
    if(turn === "W") {
        turn = "B";
        alert("Ход Чёрных", false)
    }else {
        turn = "W";
        alert("Ход белых", false)
    }
}

//Проверка, есть ли победитель
function winner() {
    let winnerW = false;
    let winnerB = false;
    document.querySelectorAll('.tile').forEach(tile => {
        if(tile.innerText === "Wking") {
            winnerW = true;
        }
        if(tile.innerText === "Bking") {
            winnerB = true;
        }
    });
    if(winnerW === false) {
        return 1;
    }else if(winnerB === false) {
        return 2;
    }
}