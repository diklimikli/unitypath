// meter.js – Kapcsolat-hőmérő interaktív funkció

// Állapotok és azokhoz tartozó értékek
const states = [
    { state: 'Mérges', color: 'red' },
    { state: 'Csalódott', color: 'orange' },
    { state: 'Örömteljes', color: 'yellow' },
    { state: 'Boldog', color: 'green' }
  ];
  
  // A csúszka beállítások
  const relationshipSlider = document.getElementById('relationship-slider');
  const stateText = document.getElementById('slider-value');
  
  // A csúszka eseménykezelője
  relationshipSlider.addEventListener('input', updateState);
  
  // Az állapot frissítése a csúszka pozíciója alapján
  function updateState() {
    const value = relationshipSlider.value;
    let stateIndex = 0;
  
    if (value <= 25) {
      stateIndex = 0; // Mérges
    } else if (value <= 50) {
      stateIndex = 1; // Csalódott
    } else if (value <= 75) {
      stateIndex = 2; // Örömteljes
    } else {
      stateIndex = 3; // Boldog
    }
  
    // Az állapot szövegének és színének frissítése
    stateText.innerHTML = states[stateIndex].state;
    stateText.style.color = states[stateIndex].color;
  }
  
  // Kezdő érték beállítása
  updateState();