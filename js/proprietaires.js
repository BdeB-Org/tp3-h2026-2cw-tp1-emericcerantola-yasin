const proprietairesBody = document.getElementById('proprietaires-body');
const proprietaireForm = document.getElementById('proprietaire-form');
const reloadProprietairesBtn = document.getElementById('reload-proprietaires');

async function chargerProprietaires() {
  proprietairesBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
  try {
    const proprietaires = await getAll('proprietaire');
    if (!proprietaires.length) {
      proprietairesBody.innerHTML = '<tr><td colspan="5">Aucun propriétaire trouvé.</td></tr>';
      return;
    }

    proprietairesBody.innerHTML = proprietaires.map(p => `
      <tr>
        <td>${escapeHtml(p.id_proprietaire)}</td>
        <td>${escapeHtml(p.nom)}</td>
        <td>${escapeHtml(p.courriel)}</td>
        <td>${escapeHtml(p.telephone)}</td>
        <td><button class="danger" onclick="supprimerProprietaire(${p.id_proprietaire})">Supprimer</button></td>
      </tr>
    `).join('');
  } catch (error) {
    proprietairesBody.innerHTML = `<tr><td colspan="5">${escapeHtml(error.message)}</td></tr>`;
    setMessage('proprietaire-message', 'Impossible de charger les propriétaires. Vérifiez BASE_URL et ORDS.', 'error');
  }
}

async function supprimerProprietaire(id) {
  if (!confirm(`Supprimer le propriétaire ${id} ?`)) return;
  try {
    await remove('proprietaire', id);
    setMessage('proprietaire-message', `Propriétaire ${id} supprimé avec succès.`, 'success');
    chargerProprietaires();
  } catch (error) {
    setMessage('proprietaire-message', error.message, 'error');
  }
}

proprietaireForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nouveauProprietaire = {
    nom: document.getElementById('nom').value.trim(),
    courriel: document.getElementById('courriel').value.trim(),
    telephone: document.getElementById('telephone').value.trim()
  };

  try {
    await create('proprietaire', nouveauProprietaire);
    proprietaireForm.reset();
    setMessage('proprietaire-message', 'Propriétaire ajouté avec succès.', 'success');
    chargerProprietaires();
  } catch (error) {
    setMessage('proprietaire-message', error.message, 'error');
  }
});

reloadProprietairesBtn.addEventListener('click', chargerProprietaires);
chargerProprietaires();
