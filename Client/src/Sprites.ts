class Sprites {
    static loadPieceImage(path: string) {
        let img = new Image(Render.squareSize, Render.squareSize);
        img.src = path;
        Elements.disableElement(img);
        return Elements.body.appendChild(img);
    }

    static readonly kingWhite = this.loadPieceImage('./images/kingWhite.png');
    static readonly kingBlack = this.loadPieceImage('./images/kingBlack.png');
}
