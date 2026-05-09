import { z } from 'zod';

export const rpcDefinitions = {
  get_profile: {
    params: z.object({ user_id: z.string().uuid() }),
    result: z.object({
      id: z.string().uuid(),
      username: z.string(),
      avatar_url: z.string().nullable(),
    }),
  },
};

export type RpcName = keyof typeof rpcDefinitions;
export type RpcParams<T extends RpcName> = z.infer<(typeof rpcDefinitions)[T]['params']>;
export type RpcResult<T extends RpcName> = z.infer<(typeof rpcDefinitions)[T]['result']>;
