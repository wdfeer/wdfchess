class MoveManager {
    static restart() {
        this.selected = null;
    }

    static tryMoveAsPlayer(x1: number, y1: number, x2: number, y2: number, netUpdate: boolean = false) {
        let moving = Game.pieces.find(p => p.x == x1 && p.y == y1);
        if (moving == null) throw new Error(`There's no piece at x:${x1} y:${y1} !`);
        if (moving.canMove(x2, y2)) {
            this.forceMove(moving, x2, y2, netUpdate);
            Player.canMove = false;
            console.log(`Moved piece to ${x2},${y2}`);
        }
        this.selected = null;
    }
    private static forceMove(moving: Piece, toX: number, toY: number, myMove: boolean = false) {
        if (myMove) Network.send(MessageType.Move, `${moving.x} ${moving.y} ${toX} ${toY}`);
        else Player.canMove = true;

        let attacked = Game.pieces.find(p => p.x == toX && p.y == toY);
        if (attacked != null) Game.pieces = Game.pieces.filter(p => p != attacked);

        moving.x = toX;
        moving.y = toY;

        if (!Game.pieces.some(p => p.type == 'K')) { // No white king
            Game.endGame(Player.white ? -1 : 1);
        } else if (!Game.pieces.some(p => p.type == 'k')) { // No black king
            Game.endGame(Player.white ? 1 : -1);
        }

        moving.postMove();
        Render.redraw();
        Sounds.MOVE.play();
    }

    static receiveMove(coords: number[]){
        if (coords.length < 4) throw new Error('Invalid number of coordinates received!');
        this.makeReceivedMove(Game.mirrorX(coords[0]), Game.mirrorY(coords[1]), Game.mirrorX(coords[2]), Game.mirrorY(coords[3]));
    }
    private static makeReceivedMove(x1: number, y1: number, x2: number, y2: number) {
        console.log(`Making a received move ${x1},${y1} -> ${x2},${y2}`);
        let moving = Game.pieces.find(p => p.x == x1 && p.y == y1);
        if (moving == null) throw new Error(`There's no piece at x:${x1} y:${y1} !`);
        this.forceMove(moving, x2, y2, false);
    }

    static selected: Piece | null = null;
    static onClickSquare(x: number, y: number) {
        if (!Player.canMove) return;

        if (this.selected == null) {
            this.trySelectPieceAt(x, y);
        } else {
            if (this.selected.x == x && this.selected.y == y) {
                this.selected = null;
                console.log('Unselected');
            } else {
                let ally = Game.pieces.find(p => p.white == Player.white && p.x == x && p.y == y);
                if (ally) {
                    this.selected = ally;
                } else
                    this.tryMoveAsPlayer(this.selected.x, this.selected.y, x, y, true);
            }
        }
    }
    private static trySelectPieceAt(x: number, y: number) {
        let piece = Game.findPieceAt(x, y);
        if (piece != null && piece.white == Player.white) {
            this.selected = piece;
            console.log(`Selected piece at ${x},${y}`);
        }
    }
}