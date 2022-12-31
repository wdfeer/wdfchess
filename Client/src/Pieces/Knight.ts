class Knight extends Piece {
    protected getImage(): HTMLImageElement {
        return this.white ? Sprites.knightWhite : Sprites.knightBlack;
    }
    protected getType(): string {
        return this.white ? 'N' : 'n';
    }

    canVirtuallyMove(toX: number, toY: number): boolean {
        let absDiffX = Math.abs(toX - this.x);
        let absDiffY = Math.abs(toY - this.y);
        let totalAbsDiff = absDiffX + absDiffY;
        return totalAbsDiff == 3 && absDiffX <= 2 && absDiffY <= 2;
    }
}