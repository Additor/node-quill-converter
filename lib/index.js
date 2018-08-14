const fs = require('fs');
const path = require('path');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let quillFilePath = require.resolve('@additor/quill');
let quillMinFilePath = quillFilePath.replace('@additor/quill.js', '@additor/quill.min.js');

let quillLibrary = fs.readFileSync(quillMinFilePath);
let mutationObserverPolyfill = fs.readFileSync(path.join(__dirname, 'polyfill.js'));

const JSDOM_TEMPLATE = `
  <div id="editor">hello</div>
  <script>${mutationObserverPolyfill}</script>
  <script>${quillLibrary}</script>
  <script>
    document.getSelection = function() {
      return {
        getRangeAt: function() { }
      };
    };
    document.execCommand = function (command, showUI, value) {
      try {
          return document.execCommand(command, showUI, value);
      } catch(e) {}
      return false;
    };
  </script>
`;
const JSDOM_OPTIONS = { runScripts: 'dangerously' };

const DOM = new JSDOM(JSDOM_TEMPLATE, JSDOM_OPTIONS);
const WINDOW = DOM.window;

const getCustomEmbed = require('./formats/CustomEmbed');
const getCustomImage = require('./formats/CustomImage');
const formats = require('./formats/constants').formats;

const QUILL = new DOM.window.Quill('#editor');

exports.convertTextToDelta = (text) => {
  QUILL.setText(text);

  let delta = QUILL.getContents();
  return delta;
};

exports.convertHtmlToDelta = (html) => {
  let delta = QUILL.clipboard.convert(html);

  return delta;
};

exports.convertDeltaToHtml = (delta) => {
  const Quill = DOM.window.Quill;
  Quill.debug(false);

  const CustomEmbed = getCustomEmbed(Quill);
  const CustomImage = getCustomImage(Quill);

  Quill.register('formats/embed', CustomEmbed);
  Quill.register('formats/image', CustomImage);

  const quillEditor = new Quill('#editor', {
    formats,
  });
  quillEditor.setContents(delta);

  return quillEditor.root.innerHTML;
};
