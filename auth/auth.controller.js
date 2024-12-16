import authService from './auth.service.js';

export const authController = {
  register: async (req, res) => {
    try {
      const user = await authService.register(req.body);
      res.json(user);
    } catch (error) {
      if(error.message === 'Email y/o usuario ya registrado.'){
        res.status(409).json({ error: error.message });
      }
      res.status(422).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const user = await authService.login(req.body.email, req.body.password);
      res.json(user);
    } catch (error) {
      if (error.message === 'No se encontró un usuario con este email') {
        return res.status(404).json({ error: error.message });
      }

      if (error.message === 'La contraseña no coincide') {
        return res.status(403).json({ error: error.message });
      }

      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
};
