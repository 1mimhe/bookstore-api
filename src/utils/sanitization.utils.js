function toSlug(data) {
  return data.trim()
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s-]/gu, '')
            .replace(/[\s_]+/g, '-')
            .replace(/^-+|-+$/g, '');
}

function makeUnique(property) {
  if (property) {
    const id = Date.now().toString(36).slice(2);
    return `${property}-${id}`;
  }
}

module.exports = {
  toSlug,
  makeUnique
};