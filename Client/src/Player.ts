class Player {
    static amWhite: boolean;
    static myName: string = 'Player';
    static enemyName: string = 'Opponent';
    static myScore: number = 0;
    static enemyScore: number = 0;


    static updatePlayerNamesAndScores() {
        let firstGame = this.myScore + this.enemyScore == 0;
        Elements.myName.innerText = this.myName + (firstGame ? '' : `(${this.myScore})`);
        Elements.enemyName.innerText = this.enemyName + (firstGame ? '' : `(${this.enemyScore})`);
    }

    static onVictory() {
        Elements.resultText.innerText = 'You won!';
        Player.myScore++;
    }
    static onDefeat() {
        Elements.resultText.innerText = 'You lost!';
        Player.enemyScore++;
    }
    static onDraw() {
        Elements.resultText.innerText = 'Draw!';
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