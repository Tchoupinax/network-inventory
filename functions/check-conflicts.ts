import { cidrSubnet } from "ip";

export type Conflict = { networkA: string; networkB: string };

export function checkConflicts(
  networks: Array<{ cidr: string; name: string }>,
): Array<Conflict> {
  const conflicts: Array<Conflict> = [];

  for (let i = 0; i < networks.length; i++) {
    for (let j = i + 1; j < networks.length; j++) {
      const networkA = networks[i];
      const networkB = networks[j];
      if (!networkA || !networkB) {
        continue;
      }

      const net1 = cidrSubnet(networkA.cidr);
      const net2 = cidrSubnet(networkB.cidr);

      // Check if either network contains the other's start or end address
      if (
        net1.contains(net2.networkAddress) ||
        net1.contains(net2.broadcastAddress) ||
        net2.contains(net1.networkAddress) ||
        net2.contains(net1.broadcastAddress)
      ) {
        conflicts.push({
          networkA: networkA.name,
          networkB: networkB.name,
        });
      }
    }
  }

  return conflicts;
}
