export function intToIp(int: number) {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join(".");
}
