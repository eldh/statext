export default (s = {}, { type, time }) => {
  switch (type) {
    case 'CLICK':
      return { lastClicked: time }
    default:
      return s
  }
}
