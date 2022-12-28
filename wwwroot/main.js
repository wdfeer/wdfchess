const connectForm = document.querySelector('#connect-form');
const connectedSuccessfully = document.querySelector('#connected-text');
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
    };

    socket.onclose = () => {
        console.log('CLOSED');
    };
}
