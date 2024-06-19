import { ObjectId } from "mongodb";

type Form = {
  _id: ObjectId;
  elements: FormElement[];
};
type NewForm = Omit<Form, "_id">;

type FormElement = {
  label: string;
  type: "text" | "number";
};

type FormResponse = Record<string, any>;

function validateResponse(form: Form, response: FormResponse) {
  const errors: string[] = [];

  const fields = new Set(form.elements.map((e) => e.label));
  for (const [key, value] of Object.entries(response)) {
    const element = form.elements.find((e) => e.label === key);
    if (!element) {
      errors.push(`${key} is not a valid field`);
      continue;
    }
    fields.delete(key);
    if (element.type === "text") {
      if (typeof value !== "string") {
        errors.push(`${key} must be a string`);
      }
    } else if (element.type === "number") {
      if (typeof value !== "number") {
        errors.push(`${key} must be a number`);
      }
    }
  }

  for (const field of fields) {
    errors.push(`${field} is missing`);
  }
  return errors;
}

export { Form, FormElement, NewForm, FormResponse, validateResponse };
