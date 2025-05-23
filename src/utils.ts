export function randomInt(x: number, z: number) {
  return Math.floor(Math.random() * (z - x + 1)) + x;
}
