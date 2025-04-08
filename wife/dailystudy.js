// dailystudy.js

document.addEventListener('DOMContentLoaded', function () {
    const dailyStudyContainer = document.querySelector('.daily-study');
    const today = new Date().getDate(); // Az aktuális nap száma
    loadDailyStudy(today);
    
    async function loadDailyStudy(day) {
      try {
        const response = await fetch('./dailystudy.json');  // Az aktuális JSON fájl betöltése
        const data = await response.json(); // JSON parse
        const study = data[day];  // A napi áhítat
        displayStudy(study);
      } catch (error) {
        console.error("Hiba történt az áhítatok betöltésekor:", error);
        dailyStudyContainer.innerHTML = "<p>Hiba történt a napi áhítat betöltésekor.</p>";
      }
    }
  
    function displayStudy(study) {
      if (study) {
        const quoteElement = document.createElement('blockquote');
        quoteElement.textContent = `"${study.quote}"`;
        const reflectionElement = document.createElement('p');
        reflectionElement.textContent = `Elmélkedj: ${study.reflection}`;
  
        dailyStudyContainer.appendChild(quoteElement);
        dailyStudyContainer.appendChild(reflectionElement);
      } else {
        dailyStudyContainer.innerHTML = "<p>Nincs napi áhítat elérhető.</p>";
      }
    }
  });
  