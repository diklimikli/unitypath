// husband.js

document.addEventListener("DOMContentLoaded", () => {
  loadContent();
  setupCheckboxes();
});

function loadContent() {
  const today = new Date().toISOString().split('T')[0]; // pl. "2025-04-08"

  fetch('content.json')
    .then(response => response.json())
    .then(data => {
      const todayData = data[today];
      if (!todayData) {
        console.warn(`Nincs adat a következő dátumra: ${today}`);
        return;
      }

      document.querySelector('#prayer-topic p').textContent = todayData.prayerTopic;
      document.querySelector('#self-discovery-question p').textContent = todayData.selfDiscoveryQuestion;
      document.querySelector('#memory-vault p').textContent = todayData.memoryVault;
      document.querySelector('#task p').textContent = todayData.task;
      document.querySelector('#challenge p').textContent = todayData.challenge;
      document.querySelector('#reflection p').textContent = todayData.reflection;
    })
    .catch(error => console.error('Hiba a tartalom betöltésében:', error));
}


function setupCheckboxes() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });
  updateProgress(); // Inicializálás
}

function updateProgress() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const total = checkboxes.length;
  const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
  const percent = Math.round((completed / total) * 100);

  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-bar-text');

  progressBar.style.width = percent + '%';
  progressText.textContent = percent + '%';

  // Pulse effekt, ha elér egy új szintet
  progressBar.classList.remove('pulse');
  void progressBar.offsetWidth; // újraindítja az animációt
  progressBar.classList.add('pulse');
} 

// Pulse CSS-t a .progress-bar osztályhoz a CSS-ben kell hozzáadni:
// .pulse {
//   animation: pulse-animation 1s;
// }
// @keyframes pulse-animation {
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// }
