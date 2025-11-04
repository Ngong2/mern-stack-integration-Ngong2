export const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return '';
  }
};
