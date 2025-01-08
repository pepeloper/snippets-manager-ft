import snippetsService from '../snippets/snippets.service.js';

const unauthorized = (res) => {
  res.status(401).json({ message: 'Unauthorized' });
};

export const isAuthor = async (req, res, next) => {
  const snippet = await snippetsService.getById(req.params.id);
  if (req.user.username !== snippet.author) {
    return unauthorized(res);
  }

  return next();
};
