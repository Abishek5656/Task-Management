import { requestService } from "./request.services.js";
import cache from "../../utils/cache.js";


export const requestController = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const data = await requestService.createRequest(userId, req.body);
      cache.del(`myRequests:${userId}`);
      res.status(201).json({ message: "Request created", data });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },


  async myRequests(req, res) {

    const userid = req.user.id

    const cacheKey = `myRequests:${userid}`;

    // 1. Try from cache
    let cached = cache.get(cacheKey);

    console.log("userId", userid)

    //Try from cache
    cached = cache.get(cacheKey);

    if (cached) {
      return res.status(200).json({
        fromCache: true,
        data: cached,
      });
    }

    try {
      const data = await requestService.getMyRequests(userid);
     // Save to cache
     cache.set(cacheKey, data);

     // res.status(200).json(data);
      return res.status(200).json({
      fromCache: false,
      data,
    });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async pendingApprovals(req, res) {
    try {
      const managerId = req.user.manager;
      console.log("@", req.user)
      const list = await requestService.getPendingApprovals(managerId);
      res.status(201).json({ data: list });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  async getById(req, res) {
    try {
      const id = req.params.id;
      const data = await requestService.getRequestById(id);
      res.status(201).json({ data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async approve(req, res) {
    try {
      const id = req.params.id;
      const { managerComment } = req.body;
      await requestService.approve(id, managerComment);
      res.status(201).json({ message: "Approved" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async reject(req, res) {
    try {
      const id = req.params.id;
      const { managerComment } = req.body;
      await requestService.reject(id, managerComment);
      res.json({ message: "Rejected" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


}