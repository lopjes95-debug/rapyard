import { QueueScheduler } from "bullmq";
import { redis } from "../shared/redis";

export const emailScheduler = new QueueScheduler("email", {
  connection: redis,
});
