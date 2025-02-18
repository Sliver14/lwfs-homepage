// import { cookies } from "next/headers";

// export async function POST() {
//   cookies().delete("authToken");
//   return new Response("Logged out", { status: 200 });
// }

import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies(); // Wait for the promise to resolve
  cookieStore.delete("authToken"); // Now you can call delete
  return new Response("Logged out", { status: 200 });
}
