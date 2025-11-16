/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { subscribeEmail } from "@/lib/api/subscription";
import { toast } from "react-toastify";

import type { Locale } from "@/store/slices/languageSlice";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SubscriptionForm({ locale }: { locale: Locale }) {
  const { t } = useTranslation("common");
  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required(t("footer.require")),
  });
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
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
    },
  });

  useEffect(() => {
    if (formik.submitCount > 0 && formik.errors.email) {
      toast.error(formik.errors.email);
    }
  }, [formik.submitCount, formik.errors.email]);

  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-2'>
      <div className='flex flex-col overflow-hidden bg-white border-2 border-white rounded-md shadow-sm sm:flex-row rtl:sm:flex-row-reverse'>
        <input
          type='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder={t("footer.emailPlaceholder")}
          className='flex-1 px-3 py-2 text-sm text-gray-900 border-none outline-none rtl:text-right'
        />

        <button
          type='submit'
          disabled={formik.isSubmitting}
          className='px-2 py-1 text-xs rounded-lg font-semibold h-15 mt-2.5 md:mt-0 md:h-10 md:w-20 text-white bg-background-brown hover:bg-[#b5651d] disabled:opacity-60 whitespace-nowrap hover:cursor-pointer'
        >
          {t("footer.subscribe")}
        </button>
      </div>
    </form>
  );
}
