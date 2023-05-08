import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const salesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.sales.findMany({
      include: {
        partner: true,
      },
    });
  }),
});
