import { garageCars, getProductById } from "../data/mockData.js";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProductById(id) {
  await wait(120);
  return getProductById(id);
}

export async function fetchGarageCars() {
  await wait(120);
  return garageCars;
}
