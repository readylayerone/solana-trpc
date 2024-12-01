import { TRPCError, initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { OpenApiMeta } from 'trpc-openapi';
import z from 'zod';

export type Context = {
  req: FastifyRequest;
  res: FastifyReply;
};

export type rpcMethodConfig = {
  method: string; 
  input: z.ZodArray<z.ZodAny, "many">; 
  output: z.ZodNull | z.ZodRecord<z.ZodString, z.ZodAny>;
}

const t = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ error, shape }) => {
      if (error.code === 'INTERNAL_SERVER_ERROR' && process.env.NODE_ENV === 'production') {
        return { ...shape, message: 'Internal server error' };
      }
      return shape;
    },
  });

  export const createContext = async ({
    req,
    res,
  }: // eslint-disable-next-line @typescript-eslint/require-await
  CreateFastifyContextOptions): Promise<Context> => {
    return { req, res };
  };

const rpcMethods = [
  {
    method: "", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  {
    method: "getAccountInfo", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  {
    method: "getBalance", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  {
    method: "getBlock", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  {
    method:"getBlockCommitment", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getBlockHeight", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getBlockProduction", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getBlockTime", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getBlocks", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getBlocksWithLimit", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getClusterNodes", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getEpochInfo", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getEpochSchedule", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getFeeForMessage", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getFirstAvailableBlock", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getGenesisHash", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getHealth", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getHighestSnapshotSlot", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getIdentity",
    input: z.any().array(), 
    output: z.record(z.string(), z.any()) 
  }, 
  { 
    method: "getInflationGovernor", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getInflationRate", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getLargestAccounts", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getLatestBlockhash", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getLeaderSchedule", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getMaxRetransmitSlot", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getMaxShredInsertSlot", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getMinimumBalanceForRentExemption", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getMultipleAccounts", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getProgramAccounts", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getRecentPerformanceSample", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getRecentPrioritizationFees", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getSignatureStatuses", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getSignaturesForAddress", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getSlot", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getSlotLeader", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getSlotLeaders", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getStakeMinimumDelegation", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getSupply", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getTokenAccountBalance", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getTokenAccountsByDelegate", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getTokenAccountsByOwner", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getTokenLargestAccounts", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getTokenSupply", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getTransaction", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getTransactionCount", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getVersion", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "getVoteAccounts", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
   }, 
  { 
    method: "isBlockhashValid", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "minimumLedgerSlot", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "requestAirdrop", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "sendTransaction", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }, 
  { 
    method: "simulateTransaction", 
    input: z.any().array(), 
    output: z.record(z.string(), z.any())
  }
]

const publicProcedure = t.procedure;

const rpcRouter = t.router(
  Object.assign({}, 
    ...Array.from(rpcMethods, (k:rpcMethodConfig) => ({
      [k.method]: publicProcedure
        .meta({
          openapi: {
            method: "POST",
            path: `/rpc/${k.method}`,
            tags: ["rpc"],
          },
        })
        .input(z.object({
          params: k.input
        }))
        .output(k.output)
        .query(({ input }) => {

          const call = {
            method: k, 
            input: input
          }

          return call
        })
    }))
  )
);


export const appRouter = t.router({
  warehouse: rpcRouter,
});

export type AppRouter = typeof appRouter;