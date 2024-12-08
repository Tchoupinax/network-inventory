export function isIpInCidr(ipAddress: string, cidr: string): boolean {
  try {
    const [cidrBase, prefixLengthStr] = cidr.split("/");
    const prefixLength = parseInt(prefixLengthStr, 10);

    if (prefixLength < 0 || prefixLength > 32) {
      throw new Error("Invalid prefix length");
    }

    const ipToBinary = (ip: string) => {
      return ip
        .split(".")
        .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
        .join("");
    };

    const binaryIp = ipToBinary(ipAddress);
    const binaryCidrBase = ipToBinary(cidrBase);

    // Compare only the bits within the prefix length
    return (
      binaryIp.substring(0, prefixLength) ===
      binaryCidrBase.substring(0, prefixLength)
    );
  } catch (e) {
    console.error("Invalid IP or CIDR format:", e);
    return false;
  }
}
