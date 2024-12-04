import { defineEventHandler } from "h3";
import { existsSync, readFileSync } from "node:fs";

type Network = {
  name: string;
  cidr: string; // "10.10.10.10/16" — https://cidr.xyz
  color: string;
  devices?: Array<{ name: string; ip: string }>;
};

export default defineEventHandler(() => {
  const path = process.cwd() + "/local.json";
  if (existsSync(path)) {
    const data = JSON.parse(readFileSync(path, "utf-8"));
    return data;
  }

  return [
    { name: "Docker", cidr: "172.17.0.0/16", color: "#64b5f6" },
    { name: "k3s", cidr: "10.42.0.0/16", color: "#ffc61c" },
  ] satisfies Array<Network>;
});
