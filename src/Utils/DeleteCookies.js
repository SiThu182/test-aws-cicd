import { getCookie } from "./GetCookies";

// Function to delete a cookie by name
export function deleteCookie(name) {
  let token = getCookie(name);
  while (token !== null && token !== undefined) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    token = getCookie(name);
    console.log(token);
  }
}
