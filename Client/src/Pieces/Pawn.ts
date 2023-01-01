class Pawn extends Piece {
    protected getImage(): HTMLImageElement {
        return this.white ? Sprites.PAWN_WHITE : Sprites.PAWN_BLACK;
    }
    protected getType(): string {
        return this.white ? 'P' : 'p';
    }

    canVirtuallyMove(toX: number, toY: number): boolean {
        let absDiffX = Math.abs(toX - this.x);
        let diffY = toY - this.y;

        let canMove1Square = ((absDiffX == 1 && Game.anyPieceOfColorAt(toX, toY, !this.white)) ||
            absDiffX == 0 && !Game.anyPieceAt(toX, toY));
        return ((diffY == -1 && canMove1Square) ||
            (diffY == -2 && absDiffX == 0 && this.y == Game.BOARD_SIZE - 2));
    }

    postMove(): void {
        if ((this.y == 0 && this.white == Player.white) || (this.y == Game.BOARD_SIZE - 1 && this.white != Player.white)) {
            setTimeout(() => {
                Game.pieces = Game.pieces.filter(p => p != this);
                Game.pieces.push(new Knight(this.x, this.y, this.white));
                Render.redraw();
            }, 1);
        }
    }
}