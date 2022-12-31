class Game {
    static readonly boardSize = 8;

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

        this.selected = null;
        this.setDefaultPosition();
        if (!Player.white) {
            this.pieces.forEach(p => p.y = this.mirrorY(p.y));
        }

        Elements.disableElement(Elements.gameEndScreen);

        Render.redraw();
    }


    static pieces: Piece[];
    static anyPieceAt(x: number, y: number) { return this.pieces.some(p => p.x == x && p.y == y); }
    static anyPieceOfColorAt(x: number, y: number, white: boolean) {
        return this.pieces.some(p => p.white == white && p.x == x && p.y == y);
    }
    static mirrorY(y: number) { return this.boardSize - 1 - y; }
    static tryMoveAsPlayer(x1: number, y1: number, x2: number, y2: number, netUpdate: boolean = false) {
        let moving = this.pieces.find(p => p.x == x1 && p.y == y1);
        if (moving == null) throw new Error(`There's no piece at x:${x1} y:${y1} !`);
        if (moving.canMove(x2, y2)) {
            this.forceMove(moving, x2, y2, netUpdate);
            Player.canMove = false;
            console.log(`Moved piece to ${x2},${y2}`);
        }
        this.selected = null;
    }
    static forceMove(moving: Piece, toX: number, toY: number, myMove: boolean = false) {
        if (myMove) Network.send(MessageType.Move, `${moving.x} ${moving.y} ${toX} ${toY}`);
        else Player.canMove = true;

        let attacked = this.pieces.find(p => p.x == toX && p.y == toY);
        if (attacked != null) this.pieces = this.pieces.filter(p => p != attacked);

        moving.x = toX;
        moving.y = toY;

        if (!this.pieces.some(p => p.type == 'K')) { // No white king
            this.endGame(Player.white ? -1 : 1);
        } else if (!this.pieces.some(p => p.type == 'k')) { // No black king
            this.endGame(Player.white ? 1 : -1);
        }

        moving.postMove();
        Render.redraw();
    }
    static forceMoveByCoords(x1: number, y1: number, x2: number, y2: number, netUpdate: boolean = false) {
        let moving = this.pieces.find(p => p.x == x1 && p.y == y1);
        if (moving == null) throw new Error(`There's no piece at x:${x1} y:${y1} !`);
        this.forceMove(moving, x2, y2, netUpdate);
    }

    static selected: Piece | null = null;
    static onCanvasClick(x: number, y: number) {
        if (!Player.canMove) return;

        let targetX = Math.floor(x / Render.squareSize);
        let targetY = Math.floor(y / Render.squareSize);
        if (this.selected == null) {
            let clicked = this.pieces.find(p => p.x == targetX && p.y == targetY);
            if (clicked != null && clicked.white == Player.white) {
                this.selected = clicked;
                console.log(`Selected piece at ${targetX},${targetY}`);
            }
        } else {
            if (this.selected.x == targetX && this.selected.y == targetY) {
                this.selected = null;
                console.log('Unselected');
            } else {
                let ally = this.pieces.find(p => p.white == Player.white && p.x == targetX && p.y == targetY);
                if (ally) {
                    this.selected = ally;
                } else
                    this.tryMoveAsPlayer(this.selected.x, this.selected.y, targetX, targetY, true);
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