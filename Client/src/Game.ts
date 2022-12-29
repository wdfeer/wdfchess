type Piece = {
    img: HTMLImageElement,
    x: number,
    y: number
}
class Game {
    static readonly boardSize = 8;
    static isGaming() {
        return Elements.isActive(Elements.canvas);
    }

    static start() {
        Elements.disableElement(Elements.connectedSuccessfully);
        Elements.enableElement(Elements.canvas);

        this.restart();
        render.initialize();
        render.drawBoard();
    }
    static restart() {
        this.pieces = [];
    }
    static pieces: Piece[];
}