function connect() {
    const hostname = document.querySelector('#ip-input').value;
    const port = document.querySelector('#port-input').value;;
    const socket = new WebSocket(`ws://${hostname}:${port}`);
    console.log(`Trying to connect to ${hostname} at port ${port}`);

    socket.onmessage = ({ data }) => {
        console.log(`Message from server: ${data}`);
    };

    socket.onopen = () => {
        console.log('CONNECTED')
        socket.send(`r ${document.querySelector('#username-input').value}`)
    };

    socket.onclose = () => {
        console.log('CLOSED');
    };
}
