import { z } from "zod"

export const checkoutItemSchema = z.object({
  id: z.string().uuid(),
  qty: z.number().int().min(1),
})

export const checkoutBodySchema = z.object({
  customer_name: z.string().min(2, "Nombre requerido"),
  customer_phone: z.string().min(9, "Teléfono válido requerido"),
  customer_address: z.string().min(5, "Dirección requerida"),
  ruc: z
    .string()
    .regex(/^\d+$/, "El RUC solo puede contener números")
    .length(11, "El RUC debe tener 11 dígitos")
    .optional()
    .nullable(),
  company_name: z.string().optional().nullable(),
  total_amount: z.number().positive(),
  items: z.array(checkoutItemSchema).min(1, "Debe haber al menos un producto"),
})

export type CheckoutBody = z.infer<typeof checkoutBodySchema>
