const message = document.getElementById('message');

const renderPage = () => {
  const messageText = document.createElement('div');
  messageText.id = 'messageText';
  messageText.textContent = 'Tic Tac Toe';
  message.appendChild(messageText);

  const messageBtn = document.createElement('button');
  messageBtn.id = 'startBtn';
  messageBtn.innerText = 'Start';
  message.appendChild(messageBtn);
};

renderPage();
