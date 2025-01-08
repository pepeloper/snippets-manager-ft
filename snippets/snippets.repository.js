import snippetsModel from './snippets.model.js';

const snippetsRepository = {
  findAll: (itemsPerPage, skip) => {
    const snippetsList = snippetsModel.find().skip(skip).limit(itemsPerPage).lean();
    return snippetsList;
  },
  find: async (id) => {
    const snippet = await snippetsModel.findById(id).lean();
    return snippet;
  },
  create: async (snippetData) => {
    const snippet = await snippetsModel.create(snippetData);
    return snippet;
  },
  update: async (id, snippetData) => {
    const filter = { _id: id };
    const snippet = await snippetsModel.findOneAndUpdate(filter, snippetData, {
      new: true,
    });
    return snippet;
  },
  delete: async (id) => {
    const filter = { _id: id };
    const snippet = await snippetsModel.findOneAndDelete(filter);
    return snippet;
  },
};

export default snippetsRepository;
