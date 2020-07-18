/* eslint-disable import/prefer-default-export */

export const wait = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});
