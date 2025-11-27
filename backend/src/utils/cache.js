import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 30,       // cache for 30 seconds
  checkperiod: 60,  // clean-up interval
});

export default cache;
