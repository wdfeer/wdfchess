class Wazir extends Piece {
    protected getImage(): HTMLImageElement {
        return this.white ? Sprites.wazirWhite : Sprites.wazirBlack;
    }
    protected getType(): string {
        return this.white ? 'W' : 'w';
    }

    canVirtuallyMove(toX: number, toY: number): boolean {
        let absDiffX = Math.abs(toX - this.x);
        let absDiffY = Math.abs(toY - this.y);
        let totalAbsDiff = absDiffX + absDiffY;
        return totalAbsDiff == 1;
    }
}