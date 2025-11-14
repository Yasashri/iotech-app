import { cmsFetch } from "@/lib/cmsClient";

export async function subscribeEmail(email: string) {
  return cmsFetch("/api/subscribers", {
    method: "POST",
    body: JSON.stringify({ data: { email } })
  });
}
