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
    return ctx.prisma.inventory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        isExpired: z.boolean().default(false),
        stock: z.number().default(0),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.inventory.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          isExpired: input.isExpired,
          stock: input.stock,
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

  countInventoryStatus: protectedProcedure.query(async ({ ctx }) => {
    enum InventoryStatus {
      READY = "READY",
      NEW_ORDER = "NEW_ORDER",
      PREPARE_ORDER = "PREPARE_ORDER",
      WAITING_PICKUP = "WAITING_PICKUP",
      SENT = "SENT",
      CANCEL = "CANCEL",
      DONE = "DONE",
    }
    const statuses = Object.values(InventoryStatus);

    type InventoryCounts = {
      [key in InventoryStatus]: number;
    };

    const counts: InventoryCounts = {
      READY: 0,
      NEW_ORDER: 0,
      PREPARE_ORDER: 0,
      WAITING_PICKUP: 0,
      SENT: 0,
      CANCEL: 0,
      DONE: 0,
    };

    for (const status of statuses) {
      const count = await ctx.prisma.inventory.count({
        where: {
          status,
        },
      });

      counts[status] = count;
    }

    return counts;
  }),
});
