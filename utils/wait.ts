export function wait(seconds: number = 2) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
