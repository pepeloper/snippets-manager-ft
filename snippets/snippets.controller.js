import snippetsService from './snippets.service.js';
import constants from '../constants.config.js';

export const snippetsController = {
  index: async (req, res) => {
    try {
      const { PAGINATION } = constants;
      const { page = 1, itemsPerPage = PAGINATION.ITEMS_PER_PAGE } = req.query;
      const snippets = await snippetsService.getAll(page, itemsPerPage);
      res.json(snippets);
    } catch (error) {
      res.status(422).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const snippet = await snippetsService.create(req.body);
      res.json(snippet);
    } catch (error) {
      res.status(422).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const snippet = await snippetsService.update(req.params.id, req.body);
      res.json(snippet);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try{
      await snippetsService.delete(req.params.id);
      res.json({ deleted: true });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};
