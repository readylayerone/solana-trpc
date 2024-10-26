import { TRPCError, initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { OpenApiMeta } from 'trpc-openapi';
import z from 'zod';

export type Context = {
  req: FastifyRequest;
  res: FastifyReply;
};

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
  "", 
  "getAccountInfo", 
  "getBalance", 
  "getBlock", 
  "getBlockCommitment", 
  "getBlockHeight", 
  "getBlockProduction", 
  "getBlockTime", 
  "getBlocks", 
  "getBlocksWithLimit", 
  "getClusterNodes", 
  "getEpochInfo", 
  "getEpochSchedule", 
  "getFeeForMessage", 
  "getFirstAvailableBlock", 
  "getGenesisHash", 
  "getHealth", 
  "getHighestSnapshotSlot", 
  "getIdentity", 
  "getInflationGovernor", 
  "getInflationRate", 
  "getLargestAccounts", 
  "getLatestBlockhash", 
  "getLeaderSchedule", 
  "getMaxRetransmitSlot", 
  "getMaxShredInsertSlot", 
  "getMinimumBalanceForRentExemption", 
  "getMultipleAccounts", 
  "getProgramAccounts", 
  "getRecentPerformanceSample", 
  "getRecentPrioritizationFees", 
  "getSignatureStatuses", 
  "getSignaturesForAddress", 
  "getSlot", 
  "getSlotLeader", 
  "getSlotLeaders", 
  "getStakeMinimumDelegation", 
  "getSupply", 
  "getTokenAccountBalance", 
  "getTokenAccountsByDelegate", 
  "getTokenAccountsByOwner", 
  "getTokenLargestAccounts", 
  "getTokenSupply", 
  "getTransaction", 
  "getTransactionCount", 
  "getVersion", 
  "getVoteAccounts", 
  "isBlockhashValid", 
  "minimumLedgerSlot", 
  "requestAirdrop", 
  "sendTransaction", 
  "simulateTransaction"
]

const publicProcedure = t.procedure;

const rpcRouter = t.router(
  Object.assign({}, 
    ...Array.from(rpcMethods, (k) => ({
      [k]: publicProcedure
        .meta({
          openapi: {
            method: "POST",
            path: `/rpc/${k}`,
            tags: ["rpc"],
          },
        })
        .input(z.object({
          params: z.any().array()
        }))
        .output(z.object({}).catchall(z.any()))
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