export const waitForFonts = async () => {
  if ("fonts" in document) {
    const fonts = document.fonts;
    console.log(fonts);
    await fonts.ready;
    console.log("fonts loaded", fonts);
  }
}