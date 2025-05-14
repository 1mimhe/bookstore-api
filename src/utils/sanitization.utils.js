function makeUnique(property) {
  if (property) {
    const id = Date.now().toString(36).slice(2);
    return `${property}-${id}`;
  }
}

module.exports = {
  makeUnique
};