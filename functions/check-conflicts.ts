import { calculateNetworkDetails } from "./calculate-network-details";

export function checkConflicts(
  networks: Array<{ cidr: string; name: string }>
) {
  const conflicts = [];
  for (let i = 0; i < networks.length; i++) {
    for (let j = i + 1; j < networks.length; j++) {
      const netA = calculateNetworkDetails(networks[i].cidr);
      const netB = calculateNetworkDetails(networks[j].cidr);

      if (
        (netA.baseIpInt <= netB.broadcastInt &&
          netA.broadcastInt >= netB.baseIpInt) ||
        (netB.baseIpInt <= netA.broadcastInt &&
          netB.broadcastInt >= netA.baseIpInt)
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
