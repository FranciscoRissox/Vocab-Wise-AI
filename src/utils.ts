import { Timestamp } from "firebase/firestore";

export function randomInt(x: number, z: number) {
  return Math.floor(Math.random() * (z - x + 1)) + x;
}

export function convertToTimestamp(x: any) {
  return new Timestamp(x._seconds, x._nanoseconds);
}
