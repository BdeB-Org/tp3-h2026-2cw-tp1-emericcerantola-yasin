const animauxBody = document.getElementById('animaux-body');
const searchAnimaux = document.getElementById('search-animaux');
const reloadAnimauxBtn = document.getElementById('reload-animaux');
let tousLesAnimaux = [];

function afficherAnimaux(animaux) {
  if (!animaux.length) {
    animauxBody.innerHTML = '<tr><td colspan="6">Aucun animal trouvé.</td></tr>';
    return;
  }

  animauxBody.innerHTML = animaux.map(a => `
    <tr>
      <td>${escapeHtml(a.id_animal)}</td>
      <td>${escapeHtml(a.nom)}</td>
      <td>${escapeHtml(a.espece)}</td>
      <td>${escapeHtml(a.race)}</td>
      <td>${escapeHtml(a.date_naissance ? a.date_naissance.substring(0, 10) : '—')}</td>
      <td>${escapeHtml(a.id_proprietaire)}</td>
    </tr>
  `).join('');
}

async function chargerAnimaux() {
  animauxBody.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';
  try {
    tousLesAnimaux = await getAll('animal');
    afficherAnimaux(tousLesAnimaux);
  } catch (error) {
    animauxBody.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`;
  }
}

searchAnimaux.addEventListener('input', () => {
  const terme = searchAnimaux.value.trim().toLowerCase();
  const filtres = tousLesAnimaux.filter(a =>
    String(a.nom || '').toLowerCase().includes(terme) ||
    String(a.espece || '').toLowerCase().includes(terme)
  );
  afficherAnimaux(filtres);
});

reloadAnimauxBtn.addEventListener('click', chargerAnimaux);
chargerAnimaux();
