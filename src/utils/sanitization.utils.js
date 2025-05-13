function makeUnique(property) {
  if (property) {
    return `${property}-${Date.now()}`;
  }
}

module.exports = {
  makeUnique
};