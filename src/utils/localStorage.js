// src/utils/localstorage.js

export function getJsonFromLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  } catch (error) {
    console.error("Error parsing JSON from localStorage", error);
    return null;
  }
}
