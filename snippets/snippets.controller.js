import snippetsService from "./snippets.service.js";

export const snippetsController = {
  index: (req, res) => {
    res.json(snippetsService.getAll());
  }
}