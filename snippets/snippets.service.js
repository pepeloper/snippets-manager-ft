import snippetsRepository from './snippets.repository.js';

const  validateSnippetFields = (snippetData) => {
  const requiredFields = ['title', 'content', 'category', 'author'];

  for (const field of requiredFields) {
    if (!snippetData[field]) {
      throw new Error('Missing required field');
    }
  }
};

const snippetsService = {
  getAll: () => {
    const snippets = snippetsRepository.findAll();
    return snippets;
  },
  create: (snippetData) => {
    validateSnippetFields(snippetData);

    const snippet = snippetsRepository.create(snippetData);
    return snippet;
  },
};

export default snippetsService;
