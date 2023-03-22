export const wait = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 4000))
