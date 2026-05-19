const consultationsBody = document.getElementById('consultations-body');
const traitementsBody = document.getElementById('traitements-body');
const traitementsTitle = document.getElementById('traitements-title');
const reloadConsultationsBtn = document.getElementById('reload-consultations');
const filtreConsultationId = document.getElementById('filtre-consultation-id');
let toutesLesConsultations = [];

function afficherConsultations(consultations) {
  if (!consultations.length) {
    consultationsBody.innerHTML = '<tr><td colspan="6">Aucune consultation trouvée.</td></tr>';
    return;
  }

  consultationsBody.innerHTML = consultations.map(c => `
    <tr>
      <td>${escapeHtml(c.id_consultation)}</td>
      <td>${escapeHtml(c.date_consultation)}</td>
      <td>${escapeHtml(c.motif)}</td>
      <td>${escapeHtml(c.diagnostic)}</td>
      <td>${escapeHtml(c.id_animal)}</td>
      <td><button onclick="voirTraitements(${c.id_consultation})">Voir les traitements</button></td>
    </tr>
  `).join('');
}

async function chargerConsultations() {
  consultationsBody.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';
  try {
    toutesLesConsultations = await getAll('consultation');
    appliquerFiltre();
  } catch (error) {
    consultationsBody.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`;
  }
}

function appliquerFiltre() {
  const id = filtreConsultationId.value.trim();
  if (!id) {
    afficherConsultations(toutesLesConsultations);
    return;
  }
  const filtres = toutesLesConsultations.filter(c => String(c.id_consultation) === id);
  afficherConsultations(filtres);
}

async function voirTraitements(idConsultation) {
  traitementsTitle.textContent = `Traitements de la consultation ${idConsultation}`;
  traitementsBody.innerHTML = '<tr><td colspan="4">Chargement...</td></tr>';
  try {
    const traitements = await getTraitementsByConsultation(idConsultation);
    if (!traitements.length) {
      traitementsBody.innerHTML = '<tr><td colspan="4">Aucun traitement trouvé pour cette consultation.</td></tr>';
      return;
    }

    traitementsBody.innerHTML = traitements.map(t => `
      <tr>
        <td>${escapeHtml(t.id_traitement)}</td>
        <td>${escapeHtml(t.nom)}</td>
        <td>${escapeHtml(t.description)}</td>
        <td>${escapeHtml(t.dose)}</td>
      </tr>
    `).join('');
  } catch (error) {
    traitementsBody.innerHTML = `<tr><td colspan="4">${escapeHtml(error.message)}</td></tr>`;
  }
}

reloadConsultationsBtn.addEventListener('click', chargerConsultations);
filtreConsultationId.addEventListener('input', appliquerFiltre);
chargerConsultations();
