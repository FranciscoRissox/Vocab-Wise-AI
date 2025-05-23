export const Texts = {
  Spanish: {
    easy: async () => (await import("../texts/spanish/easy.json")).default,
    medium: async () => (await import("../texts/spanish/medium.json")).default,
    hard: async () => (await import("../texts/spanish/hard.json")).default,
  },
  English: {
    easy: async () => (await import("../texts/english/easy.json")).default,
    medium: async () => (await import("../texts/english/medium.json")).default,
    hard: async () => (await import("../texts/english/hard.json")).default,
  },
  Portugues: {
    easy: async () => (await import("../texts/portuguese/easy.json")).default,
    medium: async () =>
      (await import("../texts/portuguese/medium.json")).default,
    hard: async () => (await import("../texts/portuguese/hard.json")).default,
  },
};
