class King extends Piece {
    protected getImage(): HTMLImageElement {
        return this.white ? Sprites.KING_WHITE : Sprites.KING_BLACK;
    }
    protected getType(): string {
        return this.white ? 'K' : 'k';
    }

    canVirtuallyMove(toX: number, toY: number): boolean {
        let absDiffX = Math.abs(toX - this.x);
        let absDiffY = Math.abs(toY - this.y);
        let totalAbsDiff = absDiffX + absDiffY;
        return totalAbsDiff > 0 && absDiffX <= 1 && absDiffY <= 1;
    }
}