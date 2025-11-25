import { authService } from "./auth.services.js";

export const authController = {
  async signup(req, res) {
    try {
      const response = await authService.signup(req.body);

      console.log("response",response)

      res.cookie("token", response.token, {
      // httpOnly: true,    
      // sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

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


      res.cookie("token",response?.token)

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
