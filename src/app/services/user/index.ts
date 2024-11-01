const BASE_URL = "http://localhost:3000/api/user";

export async function getAllUser() {
  const response = await fetch(BASE_URL, {
    headers: {
      "content-Type": "application/json",
    },
  });

  const users = await response.json();

  return users;
}
