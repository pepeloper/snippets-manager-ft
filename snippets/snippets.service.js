import snippetsRepository from "./snippets.repository.js";

const snippetsService = {
  getAll: () => {
    const snippets = snippetsRepository.findAll();
    return snippets;
  },
  create: (snippetData) => {

    const title = snippetData.title;
    const content = snippetData.content;
    const category = snippetData.category;
    const author =snippetData.author;

    if(title || content || category || author) {
      const snippet = snippetsRepository.create(snippetData);
      return snippet;
    } else {
      throw new Error("Missing required field");
    }
  }
}

export default snippetsService;