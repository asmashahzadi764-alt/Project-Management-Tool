const { io } = require('socket.io-client');

const base = process.argv[2] || 'http://localhost:5001';
const userId = process.argv[3];
const projectId = process.argv[4];

if (!userId || !projectId) {
  console.error('Usage: node socketTestClient.js [base] <userId> <projectId>');
  process.exit(1);
}

const socket = io(base, { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('connected', socket.id);
  socket.emit('joinUser', userId);
  socket.emit('joinProject', projectId);
});

socket.on('notification', (n) => {
  console.log('notification:', n);
});

socket.on('taskCreated', (t) => console.log('taskCreated:', t));
socket.on('commentAdded', (c) => console.log('commentAdded:', c));
socket.on('taskMoved', (t) => console.log('taskMoved:', t));

socket.on('disconnect', () => console.log('disconnected'));
