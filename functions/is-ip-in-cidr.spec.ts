import { describe, it, expect } from "vitest";

import { isIpInCidr } from "./is-ip-in-cidr";

describe("coucou", () => {
  it.each([
    ["10.20.1.20", "10.20.1.64/25", true],
    ["10.20.2.20", "10.20.1.64/25", false],
  ])("fe", (ip, cidr, answer) => {
    expect(isIpInCidr(ip, cidr)).toEqual(answer);
  });
});
