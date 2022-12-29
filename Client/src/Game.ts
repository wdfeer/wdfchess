class Game {
    static readonly boardSize = 8;
    static amWhite: boolean;
    static myName: string = 'Player';
    static enemyName: string = 'Opponent';

    static isGaming() {
        return Elements.isActive(Elements.game);
    }

    static start() {
        function setPlayerNames(my: string, enemy: string) {
            Elements.myName.innerText = `${my} (${Game.amWhite ? 'W' : 'B'})`;
            Elements.enemyName.innerText = `${enemy} (${Game.amWhite ? 'B' : 'W'})`;
        }
        setPlayerNames(this.myName, this.enemyName);

        Elements.disableElement(Elements.connectedSuccessfully);
        Elements.enableElement(Elements.game);

        this.restart();
        Render.initialize();
        Render.redraw();
    }
    static restart() {
        this.pieces = [
            new Piece(Sprites.kingWhite, 1, this.boardSize - 1),
            new Piece(Sprites.kingBlack, this.boardSize - 2, 0)];
        if (!this.amWhite) {
            this.pieces.forEach(p => p.y = this.mirrorY(p.y));
        }
    }

    static pieces: Piece[];
    static mirrorY(y: number) { return this.boardSize - 1 - y; }
    static move(x1: number, y1: number, x2: number, y2: number, netUpdate: boolean = false) {
        let target = this.pieces.find(p => p.x == x1 && p.y == y1);
        if (target == null) throw new Error(`There's no piece at x:${x1} y:${y1} !`);
        target.x = x2;
        target.y = y2;

        Render.redraw();

        if (netUpdate) Network.send(MessageType.Move, `${x1} ${y1} ${x2} ${y2}`);
    }
}