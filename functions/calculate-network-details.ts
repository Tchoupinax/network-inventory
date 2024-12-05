import ip from "ip";

import { intToIp } from "./int-to-ip";
import { ipToInt } from "./ip-to-int";

export type Details = {
  baseIp: string;
  baseIpInt: number;
  broadcast: string;
  broadcastInt: number;
  cidr: string;
  firstIP: string | null;
  lastIP: string | null;
  numAddresses: number;
  prefix: string;
  subnetMask: string;
  usableRange: string;
};

export function calculateNetworkDetails(cidr: string): Details {
  const [baseIp, prefix] = cidr.split("/");
  const maskBits = parseInt(prefix, 10);
  const hostBits = 32 - maskBits;
  const numAddresses = 2 ** hostBits;

  const baseIpInt = ipToInt(baseIp);
  const broadcastInt = baseIpInt + numAddresses - 1;

  const subnetMask = intToIp((0xffffffff << (32 - maskBits)) >>> 0);

  const data = ip.cidrSubnet(cidr);

  return {
    cidr,
    baseIp,
    prefix,
    numAddresses,
    subnetMask,
    broadcast: intToIp(broadcastInt),
    firstIP: data.firstAddress,
    lastIP: data.lastAddress,
    usableRange:
      maskBits < 31 ? `${data.firstAddress} - ${data.lastAddress}` : "N/A",
    baseIpInt,
    broadcastInt,
  };
}
