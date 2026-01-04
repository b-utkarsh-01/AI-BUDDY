const vscode = acquireVsCodeApi();
const chatDiv = document.getElementById('chat');

document.getElementById('send').addEventListener('click', () => {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text) return;

  vscode.postMessage({ type: 'followup', text });
  input.value = '';
});

// Receive messages from extension
window.addEventListener('message', event => {
  const { chat } = event.data;
  chatDiv.innerHTML = chat;
  window.scrollTo(0, document.body.scrollHeight);
});
