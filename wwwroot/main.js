const connectForm = document.querySelector('#connect-form');
const connectedSuccessfully = document.querySelector('#connected-text');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
function connect() {
    const hostname = document.querySelector('#ip-input').value;
    const port = document.querySelector('#port-input').value;;
    const socket = new WebSocket(`ws://${hostname}:${port}`);
    console.log(`Trying to connect to ${hostname} at port ${port}`);

    socket.onmessage = ({ data }) => {
        console.log(`Message from server: ${data}`);
    };

    socket.onopen = () => {
        console.log('CONNECTED');
        socket.send(`r ${document.querySelector('#username-input').value}`);
        connectForm.classList.add('disabled');
        connectedSuccessfully.innerHTML =
            `Successfully connected to <br>
            ${hostname}:${port}`;
        connectedSuccessfully.classList.remove('disabled');
        setTimeout(() => {
            connectedSuccessfully.classList.add('disabled');
            canvas.classList.remove('disabled');
            drawBoard();
        }, 1000);
    };

    socket.onclose = () => {
        console.log('CLOSED');
    };
}

const squareSize = canvas.width / 8;
function drawBoard() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            ctx.beginPath();
            ctx.fillStyle = ["#eeeed2", "#630"][(i + j) % 2];
            ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
            ctx.closePath();
        }
    }
}