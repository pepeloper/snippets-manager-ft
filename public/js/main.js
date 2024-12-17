import { checkAuth } from './auth.js';

const auth = checkAuth();
if (!auth) {
  window.location.href = '/login.html';
}

const BASE_URL = 'https://snippets-manager-ft.onrender.com/api';
let snippets = null;
let selectedSnippet = null;

async function getSnippets() {
  const response = await fetch(`${BASE_URL}/snippets`);

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
              <span class="snippet-item-language">${snippet.category}</span>
          </div>
      </div>
  `;
}

function renderSnippets() {
  const snippetList = document.querySelector('.snippets-list');
  const list = snippets.map((snippet) => {
    const isActive = snippet._id === selectedSnippet?._id;
    return createSnippetListItem(snippet, isActive);
  });
  snippetList.innerHTML = list.join('');
  selectSnippets();
}

function selectSnippets() {
  const snippetElements = document.querySelectorAll('.snippet-item');

  snippetElements.forEach((snippet) => {
    snippet.addEventListener('click', () => {
      selectedSnippet = snippets.find((s) => s._id === snippet.dataset.id);
      renderSnippets();
    });
  });
}

async function main() {
  await getSnippets();
  renderSnippets(snippets);
}

main();
