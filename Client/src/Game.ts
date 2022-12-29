type Piece = {
    img: HTMLImageElement,
    x: number,
    y: number
}
class Game {
    static readonly boardSize = 8;
    static myName: string = 'Player';
    static enemyName: string = 'Opponent';

    static isGaming() {
        return Elements.isActive(Elements.game);
    }

    static start() {
        function setPlayerNames(my: string, enemy: string) {
            Elements.myName.innerText = my;
            Elements.enemyName.innerText = enemy;
        }
        setPlayerNames(this.myName, this.enemyName);

        Elements.disableElement(Elements.connectedSuccessfully);
        Elements.enableElement(Elements.game);

        this.restart();
        render.initialize();
        render.drawBoard();
    }
    static restart() {
        this.pieces = [];
    }
    static pieces: Piece[];
}