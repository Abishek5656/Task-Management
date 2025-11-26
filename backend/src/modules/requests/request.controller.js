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


    async myRequests(req, res) {

    const userid = req.user.id
    console.log("userId", userid)
    try {
      const data = await requestService.getMyRequests(userid);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },



}