


const promiseResolveLater = () => {
  return new Promise(resolve => {
    setTimeout(() => {resolve('From resolve-later promise')}, 500);
  });
}

const promiseRejectLater = () => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {reject('From reject-later promise')}, 500);
  });
}


module.exports = {
  promiseResolveLater,
  promiseRejectLater,
};