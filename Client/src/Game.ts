class Game {
    static readonly boardSize = 8;
    static readonly maxPos = this.boardSize - 1;
    static mirrorX(x: number) { return this.maxPos - x; }
    static mirrorY(y: number) { return this.maxPos - y; }

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
            this.pieces.forEach(p => {
                p.x = this.mirrorX(p.x);
                p.y = this.mirrorY(p.y);
            });
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
        function addPieces(y: number, white: boolean) {
            for (let x = 0; x < Game.boardSize; x++) {
                if (x == 4) continue;
                let piece: Piece = x == 1 || x == 3 || x == Game.boardSize - 2 ? new Knight(x, y, white) : new Wazir(x, y, white) ;
                Game.pieces.push(piece);
            }
        }
        addPieces(0, false);
        addPieces(7, true);
    }
}