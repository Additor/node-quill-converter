const puppeteer = require('puppeteer');

exports.convertDeltaToHtml = async (delta) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `);
  await page.addScriptTag({
    path: './node_modules/@additor/quill/dist/quill.js',
  });
  await page.addScriptTag({
    content: `
      var quillEditor = new window.Quill('#root', {});
      quillEditor.setContents(${JSON.stringify(delta)});
    `
  });
  const html = await page.evaluate(() => {
    return document.getElementsByClassName('ql-editor')[0].innerHTML;
  });
  await browser.close();
  return html;
};
