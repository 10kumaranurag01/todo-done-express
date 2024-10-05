const validateData = (schema, data) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { valid: false, errors: parsed.error.errors };
  }
  return { valid: true, data: parsed.data };
};

module.exports = validateData;
