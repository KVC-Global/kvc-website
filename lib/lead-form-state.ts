export type LeadFormField = "name" | "email" | "phone" | "service" | "message" | "consent"

export type LeadFormState = {
  status: "idle" | "success" | "error"
  fieldErrors?: Partial<Record<LeadFormField, string>>
  formError?: string
}

export const initialLeadFormState: LeadFormState = {status: "idle"}
