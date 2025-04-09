// script.js – dinamikus napi tartalom betöltés és megjelenítés
import { Analytics } from "@vercel/analytics/react"
// A mai dátum lekérése
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // A tartalom betöltése a content.json fájlból
  const loadContent = async () => {
    try {
        const currentDate = getCurrentDate();
        const response = await fetch('content.json');
        
        if (!response.ok) {
            throw new Error('Hiba történt a fájl betöltése közben.');
        }

        const data = await response.json();
        const content = data[currentDate];

        if (content) {
            // Férj és feleség napi tartalom megjelenítése
            displayContent('husband', content.husband);
            displayContent('wife', content.wife);
        } else {
            console.log(`Nincs elérhető tartalom a mai napra (${currentDate}).`);
        }
    } catch (error) {
        console.error('Hiba a tartalom betöltésében:', error);
    }
};

  
  // A tartalom megjelenítése a megfelelő oldalon
  const displayContent = (role, content) => {
    const devotionElement = document.querySelector(`#${role}-devotion`);
    const challengeElement = document.querySelector(`#${role}-challenge`);
    if (devotionElement && challengeElement) {
      devotionElement.innerHTML = `<strong>Mai igeszakasz:</strong> ${content.devotion.verse}<br><strong>Elmélkedj:</strong> ${content.devotion.prompt}`;
      challengeElement.innerHTML = `<strong>Mai kihívás:</strong> ${content.challenge}`;
    }
  };

  
  
  // Oldal betöltésekor tartalom betöltése
  window.onload = loadContent;