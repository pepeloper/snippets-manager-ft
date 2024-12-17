const auth = checkAuth();

if (!auth) {
  window.location.href = '/login.html';
}

const BASE_URL = 'https://snippets-manager-ft.onrender.com/api';
let snippets = null;
let selectedSnippet = null;
let filteredSnippets = null;

const categoryMapper = {
  nodejs: 'Node.js',
  javascript: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  express: 'Express',
  npm: 'NPM',
};

function formatCategory(category) {
  return categoryMapper[category.toLowerCase()] || category;
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function getSnippets() {
  const response = await fetch(`${BASE_URL}/snippets`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = '/login.html';
      return;
    }
    throw new Error('Error fetching snippets');
  }

  snippets = await response.json();
}

function createSnippetListItem(snippet, isActive = false) {
  return `
      <div class="snippet-item ${isActive ? 'active' : ''}"
           data-id="${snippet._id}"
           tabindex="0"
           role="button"
           aria-selected="${isActive}">
          <div class="snippet-item-title-wrapper">
              <img class="snippet-item-author-img" src="/images/${snippet.author.toLowerCase()}.png" alt="${snippet.author}">
              <p class="snippet-item-title">${snippet.title}</p>
          </div>
          <div class="snippet-item-meta">
              <span class="snippet-item-language">${formatCategory(snippet.category)}</span>
          </div>
      </div>
  `;
}

function createSnippetView(snippet) {
  return `
      <div class="snippet-view">
          <div class="snippet-header">
              <h2 class="snippet-title">${snippet.title}</h2>
              <div class="snippet-meta">
                  <span class="language-tag">${formatCategory(snippet.category)}</span>
              </div>
          </div>
          <div class="snippet-description-wrapper">
              <p class="snippet-description">${snippet.description}</p>
          </div>
          <div class="code-wrapper">
              <button class="copy-button" onclick="copySnippetCode(this, ${JSON.stringify(
    snippet.code
  )})">
                  <span class="copy-text">Copiar</span>
              </button>
              <pre><code class="language-${snippet.category === 'nodejs' ? 'javascript' : snippet.category}">${escapeHtml(
  snippet.content
)}</code></pre>
          </div>
          <div class="snippet-author">
              <img class="snippet-author-img" src="/images/${snippet.author.toLowerCase()}.png" alt="${snippet.author}">
              <span>${snippet.author}</span>
          </div>
      </div>
  `;
}

function createEmptyState() {
  return `
      <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <h2>Ningún Snippet Seleccionado</h2>
          <p>Selecciona un snippet de la barra lateral o crea uno nuevo</p>
      </div>
  `;
}

function filterSnippets(category) {
  if (!category) {
    filteredSnippets = snippets;
  } else {
    filteredSnippets = snippets.filter((snippet) =>
      snippet.category.toLowerCase() === category.toLowerCase()
    );
  }
  selectedSnippet = null;
  renderSnippets();
}

function renderSnippets() {
  const snippetList = document.querySelector('.snippets-list');
  const contentContainer = document.getElementById('snippet-content');
  const list = filteredSnippets.map((snippet) => {
    const isActive = snippet._id === selectedSnippet?._id;
    return createSnippetListItem(snippet, isActive);
  });
  snippetList.innerHTML = list.join('');

  contentContainer.innerHTML = selectedSnippet
    ? createSnippetView(selectedSnippet)
    : createEmptyState();

  selectSnippets();
  Prism.highlightAll();
}

function selectSnippets() {
  const snippetElements = document.querySelectorAll('.snippet-item');

  snippetElements.forEach((snippet) => {
    snippet.addEventListener('click', () => {
      if (selectedSnippet?._id === snippet.dataset.id) {
        selectedSnippet = null;
      } else {
        selectedSnippet = snippets.find((s) => s._id === snippet.dataset.id);
      }
      renderSnippets();
    });
  });
}

async function main() {
  await getSnippets();
  filteredSnippets = snippets;
  renderSnippets();

  const filterSelect = document.getElementById('language-filter');
  filterSelect.addEventListener('change', (e) => filterSnippets(e.target.value));
}

async function copySnippetCode(button, code) {
  try {
    await navigator.clipboard.writeText(code);

    button.classList.add('copied');
    const textSpan = button.querySelector('.copy-text');
    textSpan.textContent = '¡Copiado!';

    setTimeout(() => {
      button.classList.remove('copied');
      textSpan.textContent = 'Copiar';
    }, 2000);
  } catch {
    const textSpan = button.querySelector('.copy-text');
    textSpan.textContent = 'Error al copiar';
    setTimeout(() => {
      textSpan.textContent = 'Copiar';
    }, 2000);
  }
}

// Make the function available globally
window.copySnippetCode = copySnippetCode;

main();
