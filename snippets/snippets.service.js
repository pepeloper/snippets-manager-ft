import snippetsRepository from "./snippets.repository.js";

const snippetsService = {
  getAll: () => {
    const snippets = snippetsRepository.findAll();
    return snippets;
  }
}

export default snippetsService;