
(async function(){
  // 1. Récupère le JSON
  const response = await fetch('js/temp2.json');
  const hourlyData = await response.json();   // [{ hour: "00:00", temp_c: 22.2 }, …]

  // 2. Prépare les étiquettes (heures) et les valeurs (températures)
  const labels = hourlyData.map(d => d.hour);
  const values = hourlyData.map(d => d.temp_c);

  // 3. Initialise le graphique
  const ctx = document.getElementById('tempChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Température (°C)',
        data: values,
		backgroundColor:'blue',
		borderColor:'rgba(0,0,255,1)',
        spanGaps: false,       // laisse des blancs quand la valeur est null
        tension: 0.25,         // courbe douce
        pointRadius: 0,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { title: { display: true, text: 'Heure' } },
        y: { title: { display: true, text: 'Température (°C)' } }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => ctx.parsed.y !== null ? `${ctx.parsed.y} °C `: 'Pas de donnée'
          }
        }
      }
    }
  });
})();