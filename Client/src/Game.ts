class Game {
    static readonly boardSize = 8;

    static isGaming() {
        return Elements.isActive(Elements.game);
    }

    static start() {
        Elements.disableElement(Elements.connectedSuccessfully);
        Elements.enableElement(Elements.game);
        Render.initialize();
        this.restart();
    }
    static restart() {
        Player.updatePlayerNamesAndScores();

        Player.receivedRematch = false;
        Player.sentRematch = false;
        this.selected = null;
        this.pieces = [
            new Piece(Sprites.kingWhite, 1, this.boardSize - 1),
            new Piece(Sprites.kingBlack, this.boardSize - 2, 0),
            new Piece(Sprites.knightWhite, 0, this.boardSize - 1),
            new Piece(Sprites.knightBlack, this.boardSize - 1, 0)];
        if (!Player.amWhite) {
            this.pieces.forEach(p => p.y = this.mirrorY(p.y));
        }

        Elements.disableElement(Elements.gameEndScreen);

        Render.redraw();
    }


    static pieces: Piece[];
    static mirrorY(y: number) { return this.boardSize - 1 - y; }
    static move(x1: number, y1: number, x2: number, y2: number, netUpdate: boolean = false) {
        let attacked = this.pieces.find(p => p.x == x2 && p.y == y2);
        if (attacked != null) this.pieces = this.pieces.filter(p => p != attacked);

        let moving = this.pieces.find(p => p.x == x1 && p.y == y1);
        if (moving == null) throw new Error(`There's no piece at x:${x1} y:${y1} !`);
        moving.x = x2;
        moving.y = y2;

        if (!this.pieces.some(p => p.type == 'K')) { // No white king
            this.endGame(Player.amWhite ? -1 : 1);
        } else if (!this.pieces.some(p => p.type == 'k')) { // No black king
            this.endGame(Player.amWhite ? 1 : -1);
        }

        Render.redraw();

        if (netUpdate) Network.send(MessageType.Move, `${x1} ${y1} ${x2} ${y2}`);
    }

    static selected: Piece | null = null;
    static onCanvasClick(x: number, y: number) {
        let targetX = Math.floor(x / Render.squareSize);
        let targetY = Math.floor(y / Render.squareSize);
        if (this.selected == null || this.selected.img == null) {
            let clicked = this.pieces.find(p => p.x == targetX && p.y == targetY);
            if (clicked != null) {
                this.selected = clicked;
                console.log(`Selected piece at ${targetX},${targetY}`);
            }
        } else {
            if (this.selected.x == targetX && this.selected.y == targetY) {
                this.selected = null;
                console.log('Unselected');
            } else {
                this.move(this.selected.x, this.selected.y, targetX, targetY, true);
                this.selected = null;
                console.log(`Moved selected piece to ${targetX},${targetY}`);
            }
        }
        Render.redraw();
    }

    static endGame(scoreDiff: number) {
        Elements.enableElement(Elements.gameEndScreen);
        if (scoreDiff > 0)
            Player.onVictory();
        else if (scoreDiff < 0)
            Player.onDefeat();
        else
            Player.onDraw();
        Player.updatePlayerNamesAndScores();
    }
}