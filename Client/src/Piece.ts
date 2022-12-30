class Piece {
    type: string;
    constructor(
        public img: HTMLImageElement,
        public x: number,
        public y: number,
        type: string | undefined = undefined) {
        if (type == undefined) {
            this.type = Piece.getTypeFromImage(img);
        } else this.type = type;
    }
    private static getTypeFromImage(img: HTMLImageElement): string {
        switch (img) {
            case Sprites.kingWhite:
                return 'K';
            case Sprites.kingBlack:
                return 'k';
            case Sprites.knightWhite:
                return 'N';
            case Sprites.knightBlack:
                return 'n';
            default:
                throw new Error("Failed to ascertain piece type!");
        }
    }


    isWhite() {
        return this.type == this.type.toUpperCase();
    }
}
