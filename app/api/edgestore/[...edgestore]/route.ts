import { auth } from "@clerk/nextjs";
import { initEdgeStore } from "@edgestore/server";
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.context<Context>().create();

type Context = {
  userId: string;
};

async function handleAuth({ req }: CreateContextOptions): Promise<Context> {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  return {
    userId: userId,
  };
}

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
  publicImages: es.imageBucket({
    maxSize: 1024 * 1024 * 4,
  }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext: handleAuth,
});
export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
