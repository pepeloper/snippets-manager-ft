function checkAuth() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    window.location.href = '/login.html';
    return null;
  }

  return {
    token,
    user: JSON.parse(user),
  };
}

export { checkAuth };
