import { prisma } from "../src";

test("prisma", () => {
  expect(prisma).toBeTruthy();
});
