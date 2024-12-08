export type Network = {
  name: string;
  cidr: string; // "10.10.10.10/16" — https://cidr.xyz
  color: string;
  devices?: Array<{ name: string; ip: string; color: string }>;
  vlan?: string;
};
