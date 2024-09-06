const removeDuplicates = (array) => {
  return [
    ...new Map(array.map((item) => [item._id.toString(), item])).values(),
  ];
};

module.exports = { removeDuplicates };
