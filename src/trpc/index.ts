import { TRPCError } from '@trpc/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  authCallback: publicProcedure.query(() => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user.id || !user.email) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    // check if the user is in the database

    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
