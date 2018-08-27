const puppeteer = require('puppeteer');

exports.convertDeltaToHtml = async (delta, quillPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent('<div id="root"></div>');

  // add quill script
  await page.addScriptTag({
    path: quillPath,
  });

  // add quill.setContents() script
  await page.addScriptTag({
    content: `
      var quill = new window.Quill('#root', {});
      quill.setContents(${JSON.stringify(delta)});
    `
  });
  const html = await page.evaluate(() => {
    return document.getElementsByClassName('ql-editor')[0].innerHTML;
  });
  await browser.close();
  return html;
};
