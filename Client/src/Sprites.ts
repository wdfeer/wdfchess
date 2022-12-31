class Sprites {
    static loadPieceImage(path: string) {
        let img = new Image(Render.squareSize, Render.squareSize);
        img.src = path;
        Elements.disableElement(img);
        return Elements.body.appendChild(img);
    }

    static readonly kingWhite = this.loadPieceImage('./images/kingWhite.png');
    static readonly kingBlack = this.loadPieceImage('./images/kingBlack.png');

    static readonly knightWhite = this.loadPieceImage('./images/knightWhite.png');
    static readonly knightBlack = this.loadPieceImage('./images/knightBlack.png');

    static readonly pawnWhite = this.loadPieceImage('./images/pawnWhite.png');
    static readonly pawnBlack = this.loadPieceImage('./images/pawnBlack.png');
}
