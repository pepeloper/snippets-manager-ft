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
  update: async (id, snippetData) => {
    const filter = { _id: id }
    const snippet = await snippetsModel.findOneAndUpdate(filter, snippetData, {
      new: true
    });
    return snippet;
  },
};

export default snippetsRepository;
