class Network {
    static socket: WebSocket;
    static connect(hostname: string, port: number, username: string) {
        this.socket = new WebSocket(`ws://${hostname}:${port}`);
        console.log(`Trying to connect to ${hostname} at port ${port} as ${username}`);

        this.socket.onmessage = ({ data }) => {
            let msg = data as string;
            if (msg.length < 1) {
                throw new Error(`Message received is invalid: ${msg}`);
            }
            let msgType: MessageType = msg[0] as MessageType;
            this.onReceive(msgType, msg.slice(2))
        };

        this.socket.onopen = () => {
            console.log('CONNECTED');
            this.send(MessageType.Connected, username);
            Elements.disableElement(Elements.connectForm);
            Elements.connectedSuccessfully.innerHTML =
                `Successfully connected to <br>
                ${hostname}:${port} <br> <br>
                Waiting for the other player...`;
            Elements.enableElement(Elements.connectedSuccessfully);
        };

        this.socket.onclose = () => {
            console.log('CLOSED');
        };

        Player.myName = username;
    }
    static send(msgType: MessageType, data: string = '') {
        this.socket.send(`${msgType} ${data}`);
    }
    private static onReceive(msgType: MessageType, data: string) {
        switch (msgType) {
            case MessageType.Connected:
                return receiveConnected(data);
            case MessageType.Start:
                return receiveStart(data);
            case MessageType.Move:
                return receiveMove(data);
            case MessageType.Rematch:
                return receiveRematch();
            default: break;
        }

        function receiveConnected(username: string) {
            Player.white = Math.random() < 0.5;
            Network.send(MessageType.Start, `${Player.myName} ${Player.white ? 1 : 0}`);
            Player.enemyName = username;
            Game.start();
        }
        function receiveStart(data: string) {
            let args = data.split(' ');
            if (Game.isActive()) return;
            Player.enemyName = args[0];
            Player.white = args[1] == '0'; // 1 when the enemy is white
            Game.start();
        }
        function receiveMove(move: string) {
            let coords = move.split(' ').map(str => Number.parseInt(str));
            MoveManager.receiveMove(coords);
        }
        function receiveRematch() {
            Player.receiveRematch();
        }
    }
}
enum MessageType {
    Connected = 'r',
    Start = 's',
    Move = 'm',
    Rematch = 'S'
}