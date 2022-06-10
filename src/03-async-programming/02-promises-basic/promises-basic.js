// Function that creates and returns a promise.
// Can be used to conditionally return a resolves or rejected promise.
const promiseCreator = (resolveString, rejectString) => {     // get resolve and reject values
  let promise;
  if (rejectString) {
    promise = new Promise((resolve, reject) => {
      setTimeout(() => reject(rejectString + ' from rejected promise'), 500)
    });
  }
  else {
    promise = new Promise((resolve) => {
      setTimeout(() => resolve(resolveString + ' from resolved promise'), 500);
    })
  }
  return promise;
}

module.exports = {
  promiseCreator
}