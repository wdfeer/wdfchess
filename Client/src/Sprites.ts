class Sprites {
    private static loadImage(path: string): HTMLImageElement {
        let img = new Image(Render.squareSize, Render.squareSize);
        img.src = path;
        Elements.disableElement(img);
        return Elements.BODY.appendChild(img);
    }

    static readonly KING_WHITE = this.loadImage('./images/kingWhite.png');
    static readonly KING_BLACK = this.loadImage('./images/kingBlack.png');

    static readonly KNIGHT_WHITE = this.loadImage('./images/knightWhite.png');
    static readonly KNIGHT_BLACK = this.loadImage('./images/knightBlack.png');

    static readonly PAWN_WHITE = this.loadImage('./images/pawnWhite.png');
    static readonly PAWN_BLACK = this.loadImage('./images/pawnBlack.png');

    static readonly WAZIR_WHITE = this.loadImage('./images/wazirWhite.png');
    static readonly WAZIR_BLACK = this.loadImage('./images/wazirBlack.png');
}
