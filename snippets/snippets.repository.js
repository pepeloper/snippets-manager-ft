import snippetsModel from './snippets.model.js';

const snippetsRepository = {
  findAll: () => {
    const snippetsList = snippetsModel.find().lean();
    return snippetsList;
  },
  create: async (snippetData) => {
    const snippet = await snippetsModel.create(snippetData);
    return snippet;
  },
};

export default snippetsRepository;
