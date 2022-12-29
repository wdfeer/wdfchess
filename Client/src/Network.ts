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
    }
    static send(msgType: MessageType, data: string = '') {
        this.socket.send(`${msgType} ${data}`);
    }
    private static onReceive(msgType: MessageType, data: string) {
        switch (msgType) {
            case MessageType.Connected:
                return receiveConnected(data);
            case MessageType.Start:
                return receiveStart();
            case MessageType.Move:
                return receiveMove(data);
            default: break;
        }
        function receiveConnected(username: string) {
            if (Game.isGaming()) return;
            Network.send(MessageType.Start);
            Game.start();
        }
        function receiveStart() {
            if (Game.isGaming()) return;
            Game.start();
        }
        function receiveMove(move: string) {
            throw new Error("UNIMPLEMENTED");
        }
    }
}
enum MessageType {
    Connected = 'r',
    Start = 's',
    Move = 'm'
}