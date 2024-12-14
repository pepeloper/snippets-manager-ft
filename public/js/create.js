document.querySelector('.create-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    category: document.getElementById('language').value,
    content: document.getElementById('code').value,
    author: document.getElementById('author').value,
  };

  try {
    const response = await fetch('/api/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      throw new Error('Failed to create snippet');
    }
  } catch (error) {
    /* eslint-disable-next-line */
    console.error('Error creating snippet:', error);
    alert('Failed to create snippet. Please try again.');
  }
});
