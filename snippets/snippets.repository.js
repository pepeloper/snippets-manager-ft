import snippetsModel from "./snippets.model.js";

const snippetsRepository = {
  findAll: () => {
    const snippetsList = snippetsModel.find().lean();
    return snippetsList;
  }
}

export default snippetsRepository;