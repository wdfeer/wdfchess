class render {
    static initialize() {
        this.squareSize = Elements.canvas.width / Game.boardSize
        this.ctx = Elements.canvas.getContext('2d')!;
    }
    static ctx: CanvasRenderingContext2D;
    static squareSize: number;

    static drawBoard() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = ["#eeeed2", "#630"][(i + j) % 2];
                this.ctx.fillRect(j * render.squareSize, i * render.squareSize, render.squareSize, render.squareSize);
                this.ctx.closePath();
            }
        }

        Game.pieces.forEach(p => {
            this.drawPiece(p.img, p.x, p.y);
        });
    }

    static drawPiece(image: HTMLImageElement, column: number, row: number) {
        this.ctx.drawImage(image, column * render.squareSize, row * render.squareSize, render.squareSize, render.squareSize);
    }
}