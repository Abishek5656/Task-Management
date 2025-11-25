import { requestService } from "./request.services.js";


export const requestController = {
    async create(req, res) {
        try {
            const userId = req.user.id;

            
            const data = await requestService.createRequest(userId, req.body);
            res.status(201).json({ message: "Request created", data });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
}