

function conditionalCallback(messageString) {
  const messageArray = messageString.split(' ');
  if(messageArray.length > 1) {
    return messageArray;
  }
  return messageString;
}

module.exports = { conditionalCallback }