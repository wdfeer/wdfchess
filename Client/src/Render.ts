type CanvasStyle = string | CanvasPattern | CanvasGradient;
class Render {
    static initialize() {
        this.squareSize = Elements.CANVAS.width / Game.BOARD_SIZE
        this.ctx = Elements.CANVAS.getContext('2d')!;
    }
    static ctx: CanvasRenderingContext2D;
    static squareSize: number;

    static redraw() {
        this.clear();
        this.drawGrid();
        this.drawAllPieces();
        this.drawLegalMoves();
    }

    private static clear() {
        this.ctx.clearRect(0, 0, Elements.CANVAS.width, Elements.CANVAS.height);
    }
    private static drawGrid() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                this.fillCell(j, i, ["#eeeed2", "#630"][(i + j) % 2])
            }
        }
    }
    private static drawAllPieces() {
        Game.pieces.forEach(p => {
            if (MoveManager.selected == p)
                this.fillCell(p.x, p.y, 'green');
            this.drawPiece(p.image, p.x, p.y);
        });
    }
    private static drawPiece(image: HTMLImageElement, column: number, row: number) {
        this.ctx.drawImage(image, column * Render.squareSize, row * Render.squareSize, Render.squareSize, Render.squareSize);
    }

    private static drawLegalMoves() {
        if (MoveManager.selected == null) return;
        let moves: V2[] = MoveManager.selected.getLegalMoves();
        moves.forEach(v2 => this.drawCellDot(v2.x + 1, v2.y + 1, 'yellow'));
    }

    private static fillCell(x: number, y: number, style: CanvasStyle) {
        this.fillRect(x * Render.squareSize, y * Render.squareSize, Render.squareSize, Render.squareSize, style);
    }
    private static fillRect(x: number, y: number, w: number, h: number, style: CanvasStyle) {
        this.ctx.beginPath();
        this.ctx.fillStyle = style;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.closePath();
    }

    private static drawCellDot(x: number, y: number, style: CanvasStyle) {
        x -= 0.5; y -= 0.5;
        this.fillCircle(x * Render.squareSize, y * Render.squareSize, Render.squareSize / 4, style);
    }
    private static fillCircle(x: number, y: number, radius: number, style: CanvasStyle) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = style;
        this.ctx.fill();
        this.ctx.closePath();
    }
}