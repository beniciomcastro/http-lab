import { getResources, API_BASE_URL, API_URL } from './config.js';
import { api } from './api/index.js';
import { applyTranslations } from './i18n.js';

const modal = document.getElementById('resource-modal');
const options = document.getElementById('resource-options');
const lab = document.getElementById('lab');
const form = document.getElementById('record-form');
const fieldsContainer = document.getElementById('form-fields');
const recordsGrid = document.getElementById('records-grid');
const languageToggle = document.getElementById('language-toggle');
const scrollTopButton = document.getElementById('scroll-top');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const menuOverlay = document.getElementById('menu-overlay');

let language = localStorage.getItem('httpLabLanguage') || 'pt';
let resources = getResources(language);
let activeResource = null;
let editingId = null;
let cache = [];

const copy = {
  pt: {
    explanations: {
      GET: 'O frontend solicitou a lista atual de registros. GET consulta dados sem alterá-los.',
      POST: 'O formulário enviou um novo objeto para a API. POST cria um novo recurso.',
      PUT: 'O registro foi enviado por completo para substituir os dados anteriores.',
      PATCH: 'Apenas os campos alterados foram enviados para atualização parcial.',
      DELETE: 'A API recebeu o ID e removeu o recurso correspondente.'
    },
    noData: ['Nenhum registro ainda.', 'Use o formulário para criar o primeiro.'],
    loadError: ['Não foi possível carregar os dados.', 'Confira se o backend está ativo na porta 8000.'],
    confirmDelete: 'Excluir este registro?', edit: 'Editar', remove: 'Excluir', newRecord: 'Novo registro', editing: 'Editando registro', save: 'Salvar alterações', create: 'Criar registro', cancel: 'Cancelar edição', noRequest: 'Sem corpo de requisição.', defaultError: 'Não foi possível concluir a operação.', waiting: 'Aguardando', genericExplanation: 'A aplicação realizou uma requisição HTTP.', requestEmpty: 'Nenhuma requisição enviada.', responseEmpty: 'Nenhuma resposta recebida.'
  },
  en: {
    explanations: {
      GET: 'The frontend requested the current list of records. GET retrieves data without changing it.',
      POST: 'The form sent a new object to the API. POST creates a new resource.',
      PUT: 'The complete record was sent to replace the previous data.',
      PATCH: 'Only changed fields were sent for a partial update.',
      DELETE: 'The API received the ID and removed the corresponding resource.'
    },
    noData: ['No records yet.', 'Use the form to create the first one.'],
    loadError: ['The data could not be loaded.', 'Check whether the backend is running on port 8000.'],
    confirmDelete: 'Delete this record?', edit: 'Edit', remove: 'Delete', newRecord: 'New record', editing: 'Editing record', save: 'Save changes', create: 'Create record', cancel: 'Cancel editing', noRequest: 'No request body.', defaultError: 'The operation could not be completed.', waiting: 'Waiting', genericExplanation: 'The application performed an HTTP request.', requestEmpty: 'No request sent.', responseEmpty: 'No response received.'
  }
};

function t() { return copy[language]; }

function renderResourceOptions() {
  options.innerHTML = '';
  Object.entries(resources).forEach(([key, resource], index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'resource-option';
    button.innerHTML = `<span>0${index + 1}</span><div><b>${resource.label}</b><small>${resource.description}</small></div><i>→</i>`;
    button.addEventListener('click', () => openLab(key));
    options.appendChild(button);
  });
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  localStorage.setItem('httpLabLanguage', language);
  resources = getResources(language);
  applyTranslations(language);
  languageToggle.querySelectorAll('span').forEach((span) => span.classList.toggle('active', span.textContent.toLowerCase() === language));
  languageToggle.setAttribute('aria-label', language === 'pt' ? 'Mudar idioma para inglês' : 'Change language to Portuguese');
  renderResourceOptions();
  if (activeResource) {
    document.getElementById('lab-title').textContent = resources[activeResource].label;
    document.getElementById('records-title').textContent = resources[activeResource].label;
    renderFields();
    renderRecords();
    resetForm();
  }
}

function openMobileMenu() {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('open');
  menuToggle.classList.add('active');
  menuToggle.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
}
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu());
mobileMenuClose.addEventListener('click', closeMobileMenu);
menuOverlay.addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('a, [data-open-lab]').forEach((element) => element.addEventListener('click', closeMobileMenu));
languageToggle.addEventListener('click', () => setLanguage(language === 'pt' ? 'en' : 'pt'));

window.addEventListener('scroll', () => scrollTopButton.classList.toggle('visible', window.scrollY > 520), { passive: true });
scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('[data-open-lab]').forEach((button) => button.addEventListener('click', () => modal.showModal()));
document.querySelectorAll('[data-resource]').forEach((button) => button.addEventListener('click', () => openLab(button.dataset.resource)));

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && window.matchMedia('(pointer: fine)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroVisual.style.transform = `perspective(1100px) rotateX(${-y * 2.4}deg) rotateY(${x * 3.2}deg)`;
  });
  heroVisual.addEventListener('pointerleave', () => { heroVisual.style.transform = ''; });
}

modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
document.getElementById('change-resource').addEventListener('click', () => modal.showModal());
document.getElementById('close-lab').addEventListener('click', closeLab);
document.getElementById('refresh-button').addEventListener('click', loadRecords);
document.getElementById('cancel-edit').addEventListener('click', resetForm);

function openLab(resourceKey) {
  activeResource = resourceKey;
  editingId = null;
  modal.close();
  document.body.classList.add('lab-open');
  lab.classList.remove('hidden');
  lab.scrollTo({ top: 0 });
  document.getElementById('lab-title').textContent = resources[resourceKey].label;
  document.getElementById('records-title').textContent = resources[resourceKey].label;
  renderFields();
  resetForm();
  resetHttpPanel();
  loadRecords();
}
function closeLab() { document.body.classList.remove('lab-open'); lab.classList.add('hidden'); resetForm(); }
function renderFields() {
  fieldsContainer.innerHTML = resources[activeResource].fields.map((field) => `<label><span>${field.label}</span><input name="${field.name}" type="${field.type}" ${field.step ? `step="${field.step}"` : ''} required></label>`).join('');
}
async function loadRecords(showInPanel = true) {
  recordsGrid.setAttribute('aria-busy', 'true');
  const result = await api.list(activeResource);
  recordsGrid.removeAttribute('aria-busy');
  if (showInPanel) updateHttpPanel(result);
  if (!result.ok) { recordsGrid.innerHTML = `<div class="empty-state"><b>${t().loadError[0]}</b><span>${t().loadError[1]}</span></div>`; return result; }
  cache = Array.isArray(result.response.items) ? result.response.items : [];
  renderRecords();
  return result;
}
function renderRecords() {
  if (!cache.length) { recordsGrid.innerHTML = `<div class="empty-state"><b>${t().noData[0]}</b><span>${t().noData[1]}</span></div>`; return; }
  recordsGrid.innerHTML = cache.map((record) => {
    const details = resources[activeResource].fields.map((field) => `<span><small>${field.label}</small>${formatValue(field.name, record[field.name])}</span>`).join('');
    return `<article class="record-card" data-id="${record.id}"><header><b>#${record.id}</b><div><button data-action="edit">${t().edit}</button><button data-action="delete">${t().remove}</button></div></header><div>${details}</div></article>`;
  }).join('');
}
function formatValue(field, value) {
  if (field === 'price') return Number(value).toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: language === 'pt' ? 'BRL' : 'USD' });
  return value;
}
recordsGrid.addEventListener('click', async (event) => {
  const action = event.target.dataset.action;
  if (!action) return;
  const id = Number(event.target.closest('.record-card').dataset.id);
  if (action === 'edit') startEdit(id);
  if (action === 'delete') {
    if (!window.confirm(t().confirmDelete)) return;
    const result = await api.remove(activeResource, id);
    updateHttpPanel(result);
    if (result.ok) { await loadRecords(false); updateHttpPanel(result); }
  }
});
function startEdit(id) {
  const record = cache.find((item) => item.id === id);
  if (!record) return;
  editingId = id;
  resources[activeResource].fields.forEach((field) => { form.elements[field.name].value = record[field.name]; });
  document.getElementById('form-mode').textContent = t().editing;
  document.getElementById('form-title').textContent = `${resources[activeResource].singular} #${id}`;
  document.getElementById('submit-button').textContent = t().save;
  document.getElementById('cancel-edit').classList.remove('hidden');
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function resetForm() {
  editingId = null;
  form.reset();
  document.getElementById('form-mode').textContent = t().newRecord;
  if (activeResource) document.getElementById('form-title').textContent = `${t().create} ${resources[activeResource].singular.toLowerCase()}`;
  document.getElementById('submit-button').textContent = t().create;
  document.getElementById('cancel-edit').classList.add('hidden');
  document.getElementById('form-error').textContent = '';
}
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());
  resources[activeResource].fields.forEach((field) => { if (field.type === 'number') payload[field.name] = Number(payload[field.name]); });
  const result = editingId ? await api.replace(activeResource, editingId, payload) : await api.create(activeResource, payload);
  updateHttpPanel(result);
  if (!result.ok) { document.getElementById('form-error').textContent = result.response.error || t().defaultError; return; }
  resetForm(); await loadRecords(false); updateHttpPanel(result);
});
function updateHttpPanel(result) {
  document.getElementById('http-method').textContent = result.method;
  document.getElementById('http-method').className = `method-${result.method.toLowerCase()}`;
  document.getElementById('http-endpoint').textContent = result.endpoint;
  document.getElementById('http-status').textContent = `${result.status || 'Error'} · ${result.duration} ms`;
  document.getElementById('http-status').className = result.ok ? 'status-ok' : 'status-error';
  document.getElementById('http-explanation').textContent = t().explanations[result.method] || t().genericExplanation;
  document.getElementById('http-request').textContent = result.request ? JSON.stringify(result.request, null, 2) : t().noRequest;
  document.getElementById('http-response').textContent = JSON.stringify(result.response, null, 2);
}
function resetHttpPanel() {
  document.getElementById('http-method').textContent = 'GET';
  document.getElementById('http-endpoint').textContent = `/api/${activeResource}`;
  document.getElementById('http-status').textContent = t().waiting;
  document.getElementById('http-explanation').textContent = language === 'pt' ? 'Execute uma ação para acompanhar a comunicação entre frontend e API.' : 'Perform an action to follow the communication between frontend and API.';
  document.getElementById('http-request').textContent = t().requestEmpty;
  document.getElementById('http-response').textContent = t().responseEmpty;
}


document.querySelectorAll('.swagger-link').forEach((link) => {
  link.href = `${API_BASE_URL}/docs.html`;
});
const apiAddress = document.getElementById('api-address');
if (apiAddress) apiAddress.textContent = API_URL.replace(/^https?:\/\//, '');

setLanguage(language);
