"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { subscribeEmail } from "@/lib/api/subscription";
import type { Locale } from "@/store/slices/languageSlice";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required")
});

export default function SubscriptionForm({ locale }: { locale: Locale }) {
  const { t } = useTranslation("common");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      helpers.setStatus(undefined);
      try {
        await subscribeEmail(values.email);
        helpers.setStatus({ type: "success" });
        helpers.resetForm();
      } catch {
        helpers.setStatus({ type: "error" });
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder={t("footer.emailPlaceholder")}
        className="flex-1 px-3 py-2 text-sm border rounded bg-surface border-brown-700"
      />
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="px-4 py-2 text-sm font-semibold rounded bg-brown-600 hover:bg-brown-500 disabled:opacity-60"
      >
        {t("footer.subscribe")}
      </button>
      {formik.errors.email && (
        <div className="text-xs text-red-400">{formik.errors.email}</div>
      )}
      {formik.status?.type === "success" && (
        <div className="text-xs text-green-400">
          {t("footer.success")}
        </div>
      )}
      {formik.status?.type === "error" && (
        <div className="text-xs text-red-400">
          {t("footer.error")}
        </div>
      )}
    </form>
  );
}
