import { initTRPC } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import superjson from "superjson";
import Zod from "zod";
import { bookings } from "../data/bookings.ts";

const t = initTRPC.create({
  transformer: superjson,
});

export type Booking = {
  start: Date;
  end: Date;
  staffName: string;
  customers: {
    name: string;
    email: string;
  }[];
};

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export const router = t.router({
  getBookings: t.procedure
    .input(
      Zod.object({
        filterByNumberOfCustomers: Zod.number()
          .min(1)
          .optional()
          .describe(
            "If set, returns only bookings with this number of customers"
          ),
      })
    )
    .query(async ({ input }): Promise<Booking[]> => {
      return bookings
        .map((booking) => {
          return {
            ...booking,
            start: new Date(booking.start),
            end: new Date(booking.end),
          };
        })
        .filter((booking) => {
          return (
            !input.filterByNumberOfCustomers ||
            booking.customers.length === input.filterByNumberOfCustomers
          );
        });
    }),
});

export type Router = typeof router;
