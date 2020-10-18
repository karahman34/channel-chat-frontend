export function showValidationErrors(fields, errors) {
  Object.keys(fields).map(field => {
    if (errors[field]) fields[field] = errors[field];
  });
}

export function hideValidationErrors(fields) {
  Object.keys(fields).map(field => {
    fields[field] = null;
  });
}
