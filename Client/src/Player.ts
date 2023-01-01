class Player {
    static white: boolean;
    static myName: string = 'Player';
    static enemyName: string = 'Opponent';
    static myScore: number = 0;
    static enemyScore: number = 0;
    static canMove: boolean = false;
    static restart() {
        this.updatePlayerNamesAndScoresDisplay();
        this.receivedRematch = false;
        this.sentRematch = false;
        this.canMove = this.white;
    }
    static updatePlayerNamesAndScoresDisplay() {
        let firstGame = this.myScore + this.enemyScore == 0;
        Elements.MY_NAME.innerText = this.myName + (firstGame ? '' : `(${this.myScore})`);
        Elements.ENEMY_NAME.innerText = this.enemyName + (firstGame ? '' : `(${this.enemyScore})`);
    }


    static onVictory() {
        Elements.GAME_RESULT.innerText = 'You won!';
        Player.myScore++;
    }
    static onDefeat() {
        Elements.GAME_RESULT.innerText = 'You lost!';
        Player.enemyScore++;
    }
    static onDraw() {
        Elements.GAME_RESULT.innerText = 'Draw!';
    }


    static receivedRematch = false;
    static sentRematch = false;
    static receiveRematch() {
        console.log('Received a rematch offer');
        this.receivedRematch = true;
        this.checkRematchAgreement();
    }
    static sendRematch() {
        this.sentRematch = true;
        Network.send(MessageType.Rematch);
        this.checkRematchAgreement();
    }
    private static checkRematchAgreement() {
        if (this.receivedRematch && this.sentRematch) {
            Game.restart();
        }
    }
}