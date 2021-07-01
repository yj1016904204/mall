export function debounce(func, delay = 200) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout((...args) => {
      func.apply(this, ...args);
    }, delay);
  };
}