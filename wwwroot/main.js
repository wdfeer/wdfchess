const socket = new WebSocket('ws://127.0.0.1:80');

socket.onmessage = ({ data }) => {
    console.log(`Message from server: ${data}`);
};

socket.onopen = () => {
    console.log('CONNECTED')
    socket.send('Hello!');
};