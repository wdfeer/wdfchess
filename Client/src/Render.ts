class Render {
    static initialize() {
        this.squareSize = Elements.canvas.width / Game.boardSize
        this.ctx = Elements.canvas.getContext('2d')!;
    }
    static ctx: CanvasRenderingContext2D;
    static squareSize: number;

    static redraw() {
        this.clear();
        this.drawGrid();
        this.drawAllPieces();
    }

    private static clear() {
        this.ctx.clearRect(0, 0, Elements.canvas.width, Elements.canvas.height);
    }
    private static drawGrid() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = ["#eeeed2", "#630"][(i + j) % 2];
                this.ctx.fillRect(j * Render.squareSize, i * Render.squareSize, Render.squareSize, Render.squareSize);
                this.ctx.closePath();
            }
        }


    }
    private static drawAllPieces() {
        Game.pieces.forEach(p => {
            this.drawPiece(p.img, p.x, p.y);
        });
    }
    private static drawPiece(image: HTMLImageElement, column: number, row: number) {
        this.ctx.drawImage(image, column * Render.squareSize, row * Render.squareSize, Render.squareSize, Render.squareSize);
    }
}