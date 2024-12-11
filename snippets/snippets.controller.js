import snippetsService from "./snippets.service.js";

export const snippetsController = {
  index: async (req, res) => {
    const snippets = await snippetsService.getAll()
    res.json(snippets);
  }
}