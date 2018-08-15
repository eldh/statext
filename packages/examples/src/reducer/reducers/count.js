export default (count = 0, { type }) => {
  switch (type) {
    case 'CLICK':
      return count + 1
    default:
      return count
  }
}
