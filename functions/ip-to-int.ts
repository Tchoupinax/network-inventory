export function ipToInt(ip: string) {
  return ip.split(".").reduce((sum, octet) => (sum << 8) + parseInt(octet), 0);
}
