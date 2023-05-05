import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const lessonRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lesson.findMany({
      include: {
        tags: true,
      },
    });
  }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.lesson.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
