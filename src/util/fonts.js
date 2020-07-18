/* eslint-disable import/prefer-default-export */

export const waitForFonts = async () => {
  if ('fonts' in document) {
    const { fonts } = document;
    await fonts.ready;
  }
};
