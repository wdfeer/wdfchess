class Game {
    static readonly boardSize = 8;
    static mirrorY(y: number) { return this.boardSize - 1 - y; }

    static isActive() {
        return Elements.isActive(Elements.game);
    }

    static start() {
        Elements.disableElement(Elements.connectedSuccessfully);
        Elements.enableElement(Elements.game);
        Render.initialize();
        this.restart();
    }
    static restart() {
        Player.restart();
        MoveManager.restart();

        this.setDefaultPosition();
        if (!Player.white) {
            this.pieces.forEach(p => p.y = this.mirrorY(p.y));
        }

        Elements.disableElement(Elements.gameEndScreen);

        Render.redraw();
    }


    static pieces: Piece[];
    static findPieceAt(x: number, y: number) { return this.pieces.find(p => p.x == x && p.y == y); }
    static anyPieceAt(x: number, y: number) { return this.findPieceAt(x, y) != undefined; }
    static anyPieceOfColorAt(x: number, y: number, white: boolean) {
        return this.pieces.some(p => p.white == white && p.x == x && p.y == y);
    }


    static onCanvasClick(x: number, y: number) {
        if (!Player.canMove) return;

        let targetX = Math.floor(x / Render.squareSize);
        let targetY = Math.floor(y / Render.squareSize);
        MoveManager.onClickSquare(targetX, targetY);

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
        Player.updatePlayerNamesAndScoresDisplay();
    }


    private static setDefaultPosition(): void {
        this.pieces = [];
        function addPawns(y: number, white: boolean) {
            for (let x = 0; x < Game.boardSize; x++) {
                Game.pieces.push(new Pawn(x, y, white));
            }
        }
        addPawns(1, false);
        addPawns(6, true);
        this.pieces.push(new King(4, 0, false));
        this.pieces.push(new King(4, 7, true));
        function addKnights(y: number, white: boolean) {
            for (let x = 0; x < Game.boardSize; x++) {
                if (x == 4) continue;
                Game.pieces.push(new Knight(x, y, white));
            }
        }
        addKnights(0, false);
        addKnights(7, true);
    }
}