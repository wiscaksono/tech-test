import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        isExpired: z.boolean().default(false),
        stock: z.number().default(0),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.inventory.create({
        data: {
          name: input.name,
          isExpired: input.isExpired,
          stock: input.stock,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.inventory.findMany();
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.inventory.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  deleteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.inventory.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
