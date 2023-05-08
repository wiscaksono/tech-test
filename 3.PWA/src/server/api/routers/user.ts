import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        bidangUsaha: z.string(),
        NPWP: z.string(),
        alamat: z.string(),
        provinsi: z.string(),
        kotaKabupaten: z.string(),
        kecamatan: z.string(),
        kodepos: z.string(),
        NIB: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          bidangUsaha: input.bidangUsaha,
          NPWP: input.NPWP,
          alamat: input.alamat,
          provinsi: input.provinsi,
          kotaKabupaten: input.kotaKabupaten,
          kecamatan: input.kecamatan,
          kodepos: input.kodepos,
          NIB: input.NIB,
        },
      });
    }),
});
