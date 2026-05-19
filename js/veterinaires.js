const veterinairesBody = document.getElementById('veterinaires-body');
const veternaireForm = document.getElementById('veterinaire-form');
const reloadVeterinairesBtn = document.getElementById('reload-veterinaires');

async function chargerVeterinaires() {
  veterinairesBody.innerHTML = '<tr><td colspan="4">Chargement...</td></tr>';
  try {
    const veterinaires = await getAll('veterinaire');
    if (!veterinaires.length) {
      veterinairesBody.innerHTML = '<tr><td colspan="4">Aucun vétérinaire trouvé.</td></tr>';
      return;
    }

    veterinairesBody.innerHTML = veterinaires.map(v => `
      <tr>
        <td>${escapeHtml(v.id_veterinaire)}</td>
        <td>${escapeHtml(v.nom)}</td>
        <td>${escapeHtml(v.specialite)}</td>
        <td><button class="danger" onclick="supprimerVeterinaire(${v.id_veterinaire})">Supprimer</button></td>
      </tr>
    `).join('');
  } catch (error) {
    veterinairesBody.innerHTML = `<tr><td colspan="4">${escapeHtml(error.message)}</td></tr>`;
    setMessage('veterinaire-message', 'Impossible de charger les vétérinaires.', 'error');
  }
}

async function supprimerVeterinaire(id) {
  if (!confirm(`Supprimer le vétérinaire ${id} ?`)) return;
  try {
    await remove('veterinaire', id);
    setMessage('veterinaire-message', `Vétérinaire ${id} supprimé avec succès.`, 'success');
    chargerVeterinaires();
  } catch (error) {
    setMessage('veterinaire-message', error.message, 'error');
  }
}

veternaireForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nouveauVeterinaire = {
    nom: document.getElementById('nom_vet').value.trim(),
    specialite: document.getElementById('specialite').value.trim()
  };

  try {
    await create('veterinaire', nouveauVeterinaire);
    veternaireForm.reset();
    setMessage('veterinaire-message', 'Vétérinaire ajouté avec succès.', 'success');
    chargerVeterinaires();
  } catch (error) {
    setMessage('veterinaire-message', error.message, 'error');
  }
});

reloadVeterinairesBtn.addEventListener('click', chargerVeterinaires);
chargerVeterinaires();
