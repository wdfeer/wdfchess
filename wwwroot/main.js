const hostname = 'localhost'
const port = 9000;
const socket = new WebSocket(`ws://${hostname}:${port}`);
console.log(`Trying to connect to ${hostname} at port ${port}`);

socket.onmessage = ({ data }) => {
    console.log(`Message from server: ${data}`);
};

socket.onopen = () => {
    console.log('CONNECTED')
    socket.send('Hello!');
};

socket.onclose = () => {
    console.log('CLOSED');
};