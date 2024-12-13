const BASE_URL = 'https://snippets-manager-ft.onrender.com/api';
let snippets = null;

async function getSnippets(){
  const response = await fetch(`${BASE_URL}/snippets`);
  snippets = await response.json();
}

function createSnippetListItem(snippet, isActive = false) {
  return `
      <div class="snippet-item ${isActive ? 'active' : ''}"
           data-id="${snippet.id}"
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

function renderSnippets (snippets){
  const snippetList = document.querySelector('.snippets-list');
  const list = snippets.map((snippet) => createSnippetListItem(snippet));
  snippetList.innerHTML = list.join('');
}

async function main() {
  await getSnippets();
  renderSnippets(snippets);
}

main();
