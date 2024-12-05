import { describe, it, expect } from "vitest";

import { calculateNetworkDetails } from "./calculate-network-details";

describe("coucou", () => {
  it.each([["10.20.1.64/25", "10.20.1.1", "10.20.1.126"]])(
    "fe",
    (cidr, answer) => {
      expect(calculateNetworkDetails(cidr).firstIP).toEqual(answer);
    }
  );
});
