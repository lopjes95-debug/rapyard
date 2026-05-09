import { Worker } from "bullmq";
import { redis } from "../shared/redis";

export const emailWorker = new Worker(
  "email",
  async job => {
    console.log("Processing email job:", job.data);
  },
  { connection: redis }
);
