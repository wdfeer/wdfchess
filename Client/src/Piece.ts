abstract class Piece {
    constructor(
        public x: number,
        public y: number,
        public white: boolean) {
        this.image = this.getImage();
        this.type = this.getType();
    }

    image: HTMLImageElement;
    protected abstract getImage(): HTMLImageElement;
    type: string;
    protected abstract getType(): string;

    getLegalMoves(): V2[] {
        let allSquares: V2[] = [];
        for (let x = 0; x < Game.boardSize; x++) {
            for (let y = 0; y < Game.boardSize; y++) {
                allSquares.push({ x: x, y: y });
            }
        }
        return allSquares.filter(v2 => this.canMove(v2.x, v2.y));
    }

    canMove(toX: number, toY: number): boolean {
        return this.canVirtuallyMove(toX, toY) && !Game.pieces.some(
            p => p.white == this.white && p.x == toX && p.y == toY
        );
    }
    protected abstract canVirtuallyMove(toX: number, toY: number): boolean;
}
