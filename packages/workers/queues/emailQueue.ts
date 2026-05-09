import { Queue } from "bullmq";
import { redis } from "../shared/redis";

export const emailQueue = new Queue("email", { connection: redis });
