/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { subscribeEmail } from "@/lib/api/subscription";
import { toast } from "react-toastify";

import type { Locale } from "@/store/slices/languageSlice";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required")
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SubscriptionForm({ locale }: { locale: Locale }) {
  const { t } = useTranslation("common");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      helpers.setStatus(undefined);

      try {
        await subscribeEmail(values.email);

        toast.success(t("footer.success"));
        helpers.resetForm();
      } catch (error: any) {
        if (error?.message === "EMAIL_EXISTS") {
          toast.info(t("footer.alreadySubscribed"));
        } else {
          toast.error(t("footer.error"));
        }
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full space-y-2">
      {/* Email + Subscribe in one pill */}
      <div className="flex flex-col overflow-hidden bg-white border-2 border-white rounded-md shadow-sm sm:flex-row">
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder={t("footer.emailPlaceholder")}
          className="flex-1 px-3 py-2 text-sm text-gray-900 border-none outline-none"
        />

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-4 py-2 text-xs font-semibold text-white bg-background-brown hover:bg-brown-700 disabled:opacity-60 whitespace-nowrap"
        >
          {t("footer.subscribe")}
        </button>
      </div>

      {formik.errors.email && formik.touched.email && (
        <div className="text-xs text-red-400">{formik.errors.email}</div>
      )}
    </form>
  );
}
