const snippetValidator = {
  isValidCategory: (category) => {
    const validCategories = ['javascript', 'nodejs', 'html', 'css', 'express', 'npm'];
    return validCategories.includes(category.toLowerCase());
  },

  formatSnippetContent: (content) => {
    if (typeof content !== 'string') {
      throw new Error('Content must be a string');
    }

    content = content.trim();

    if (content.length === 0) {
      throw new Error('Content cannot be empty');
    }

    return content;
  },

  validateTitle: (title) => {
    if (typeof title !== 'string' || title.trim().length < 3) {
      throw new Error('Title must be at least 3 characters long');
    }
    return title.trim();
  },
};

export default snippetValidator;
