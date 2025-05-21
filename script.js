const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Generate chatbot response
function generateResponse(input) {
  const lower = input.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return "Hey there! How can I help you today?";
  }
  if (lower.includes('portfolio')) {
    return "Check out my projects and work experience above!";
  }
  if (lower.includes('projects')) {
    return "Here are some of my recent projects:\n" +
           "1. Cloud Computing Portfolio Website\n" +
           "2. AI Chat Assistant\n" +
           "3. Financial Systems Portal\n" +
           "4. Telecom Network Simulator\n" +
           "5. Real-time Data Analytics Dashboard";
  }
  if (lower.includes('skills')) {
    return "My skills include Cloud Computing, DevOps and Automation, Networking, Full-stack Development, and Terraform & IaC.";
  }
  if (lower.includes('experience') || lower.includes('work')) {
    return "I've worked as a Cloud Intern at TC Energy, and Network Automation Engineer at NetTech Corp";
  }
  if (lower.includes('certifications')) {
    return "I hold AWS Certified Solutions Architect – Associate, Google Associate Cloud Engineer, Microsoft Azure Fundamentals, Terraform – HashiCorp, Docker & Kubernetes Certification.";
  }
  if (lower.trim() === '') {
    return "Please type something!";
  }
  return "I'm still learning, but feel free to ask me about my work or skills!";
}

// Create message element with avatar
function createMessageElement(text, sender = 'bot') {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.textContent = sender === 'user' ? '👤' : '🤖';

  const textDiv = document.createElement('div');
  textDiv.classList.add('text');
  textDiv.textContent = text;

  if (sender === 'user') {
    msgDiv.appendChild(textDiv);
    msgDiv.appendChild(avatar);
  } else {
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(textDiv);
  }

  return msgDiv;
}

// Append message to chat box
function appendMessage(text, sender) {
  const messageEl = createMessageElement(text, sender);
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight; // auto scroll
}

// Simulate bot typing
function simulateTyping(callback, delay = 800) {
  sendBtn.disabled = true;
  let dots = 0;
  userInput.placeholder = 'HarshitGPT is typing';

  const typingInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    userInput.placeholder = 'HarshitGPT is typing' + '.'.repeat(dots);
  }, 300);

  setTimeout(() => {
    clearInterval(typingInterval);
    userInput.placeholder = 'Type your message...';
    sendBtn.disabled = false;
    callback();
  }, delay);
}

// Handle sending message
function sendMessage() {
  const inputText = userInput.value.trim();
  if (!inputText) return;

  appendMessage(inputText, 'user');
  userInput.value = '';

  // Animate button press
  sendBtn.classList.add('pressed');
  setTimeout(() => sendBtn.classList.remove('pressed'), 150);

  simulateTyping(() => {
    const response = generateResponse(inputText);
    appendMessage(response, 'bot');
  }, 1000);
}

// Dark mode toggle
function toggleDarkMode() {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }

  localStorage.setItem('darkMode', body.classList.contains('dark'));
}

// Load dark mode on page load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark');
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }
});

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});
darkModeToggle.addEventListener('click', toggleDarkMode);
