import { authService } from "./auth.services.js";

export const authController = {
  async signup(req, res) {
    try {
      const response = await authService.signup(req.body);

      res.status(201).json({
        message: "Signup successful",
        user: response.user,
        token: response.token
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const response = await authService.login(email, password);

      res.status(200).json({
        message: "Login successful",
        user: response.user,
        token: response.token
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
