export default function creatFormData(values) {
  const form = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    form.append(key, value);
  });
  return form;
}
