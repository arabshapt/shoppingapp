import * as yup from "yup";

export const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    amount: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(1)
      .required("required"),
    calories: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0)
      .required("required"),
    fat: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0)
      .required("required"),
    carbs: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0)
      .required("required"),
    protein: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0)
      .required("required"),
  });