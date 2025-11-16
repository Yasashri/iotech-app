import { cmsFetch, CMSFetchError } from "@/lib/cmsClient";

export async function subscribeEmail(email: string) {
  try {
    return await cmsFetch("/api/subscribers", {
      method: "POST",
      body: JSON.stringify({ data: { email } })
    });
  } catch (error) {
    // Existing email → Strapi usually returns 400
    if (error instanceof CMSFetchError && error.status === 400) {
      const existsError = new Error("EMAIL_EXISTS");
      existsError.name = "EmailExistsError";
      throw existsError;
    }

    // Other errors
    throw error;
  }
}
