import { cidrSubnet } from "ip";

export function checkConflicts(
  networks: Array<{ cidr: string; name: string }>
): Array<{ networkA: string; networkB: string }> {
  const conflicts: Array<{ networkA: string; networkB: string }> = [];

  for (let i = 0; i < networks.length; i++) {
    for (let j = i + 1; j < networks.length; j++) {
      const net1 = cidrSubnet(networks[i].cidr);
      const net2 = cidrSubnet(networks[j].cidr);

      // Check if either network contains the other's start or end address
      if (
        net1.contains(net2.networkAddress) ||
        net1.contains(net2.broadcastAddress) ||
        net2.contains(net1.networkAddress) ||
        net2.contains(net1.broadcastAddress)
      ) {
        conflicts.push({
          networkA: networks[i].name,
          networkB: networks[j].name,
        });
      }
    }
  }

  return conflicts;
}
