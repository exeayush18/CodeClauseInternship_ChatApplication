const socket = io();

const chatContainer = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chat message', { message });
        messageInput.value = '';
    }
});

socket.on('chat message', (data) => {
    const { message, user } = data;
    const messageElement = document.createElement('div');
    messageElement.className = `message ${socket.id === user ? 'user-message' : 'other-message'}`;
    messageElement.textContent = message;
    
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    messageContainer.appendChild(messageElement);

    chatContainer.appendChild(messageContainer);
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
