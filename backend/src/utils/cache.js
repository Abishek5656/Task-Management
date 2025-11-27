import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 10,       // cache for 30 seconds
  checkperiod: 10,  // clean-up interval
});

export default cache;
