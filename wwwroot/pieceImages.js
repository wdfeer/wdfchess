function loadPieceImage(path) {
    let img = new Image(squareSize, squareSize);
    img.src = path;
    img.className = 'disabled';
    return document.querySelector('body').appendChild(img);
}

const kingWhite = loadPieceImage('./images/kingWhite.png');
const kingBlack = loadPieceImage('./images/kingBlack.png');