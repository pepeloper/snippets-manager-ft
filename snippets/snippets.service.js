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
  getAll: (page, itemsPerPage) => {
    if (page < 0) {
      throw new Error('Page must not be negative.');
    }
    const skip = itemsPerPage * (page - 1);
    const snippets = snippetsRepository.findAll(itemsPerPage, skip);
    return snippets;
  },
  getById: async (id) => {
    const snippet = await snippetsRepository.find(id);
    return snippet;
  },
  create: (snippetData) => {
    validateSnippetFields(snippetData);

    const snippet = snippetsRepository.create(snippetData);
    return snippet;
  },
  update: async (id, snippetData) => {
    validateSnippetFields(snippetData);

    const snippet = await snippetsRepository.update(id, snippetData);
    if (!snippet) {
      throw new Error('Id not found.');
    }
    return snippet;
  },
  delete: async (id) => {
    const snippet = await snippetsRepository.delete(id);
    if (!snippet) {
      throw new Error('Id not found.');
    }
    return snippet;
  },
};

export default snippetsService;
