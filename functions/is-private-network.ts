import { ipToInt } from "./ip-to-int";

export function isPrivateCIDR(cidr: string) {
  const [baseIp] = cidr.split("/");
  const baseIpInt = ipToInt(baseIp);
  if (
    (baseIpInt >= ipToInt("10.0.0.0") &&
      baseIpInt <= ipToInt("10.255.255.255")) || // 10.0.0.0/8
    (baseIpInt >= ipToInt("172.16.0.0") &&
      baseIpInt <= ipToInt("172.31.255.255")) || // 172.16.0.0/12
    (baseIpInt >= ipToInt("192.168.0.0") &&
      baseIpInt <= ipToInt("192.168.255.255")) // 192.168.0.0/16
  ) {
    return true;
  }
  return false;
}
