document.addEventListener("DOMContentLoaded", () => {
    loadContent();
  });
  
  function loadContent() {
    const today = new Date().toISOString().split("T")[0];
    fetch('content.json')
      .then(response => response.json())
      .then(data => {
        if (!data[today]) {
          console.warn("Nincs tartalom a mai napra: ", today);
          return;
        }
        const content = data[today];
  
        updateBlock('#prayer-topic blockquote', content.prayerTopic);
        updateBlock('#self-discovery-question blockquote', content.selfDiscoveryQuestion);
        updateBlock('#task blockquote', content.task);
        updateBlock('#challenge blockquote', content.challenge);
        updateBlock('#reflection blockquote', content.reflection);
      })
      .catch(error => console.error('Hiba a tartalom betöltésénél:', error));
  }
  
  function updateBlock(selector, text) {
    const el = document.querySelector(selector);
    if (el) {
      el.textContent = text;
    } else {
      console.warn('Nem található elem: ', selector);
    }
  }
  