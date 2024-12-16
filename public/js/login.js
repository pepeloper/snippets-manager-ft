const loginForm = document.querySelector('.auth-form');
const errorMessage = document.querySelector('#error-message');

const showError = (message) => {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
};

const hideError = () => {
  errorMessage.textContent = '';
  errorMessage.classList.remove('show');
};

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideError();

  const formData = new FormData(loginForm);
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al iniciar sesión');
    }

    const { user, token } = await response.json();

    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      email: user.email,
      username: user.username,
    }));

    localStorage.setItem('token', token);

    window.location.href = '/';
  } catch (error) {
    showError(error.message);
  }
});
