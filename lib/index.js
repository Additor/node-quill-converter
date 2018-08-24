const fs = require('fs');
const path = require('path');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let quillFilePath = require.resolve('@additor/quill');
let quillMinFilePath = quillFilePath.replace('quill.js', 'quill.min.js');

let quillLibrary = fs.readFileSync(quillMinFilePath);
// let quillLibrary = fs.readFileSync(quillFilePath);
let mutationObserverPolyfill = fs.readFileSync(path.join(__dirname, 'polyfill.js'));

const JSDOM_TEMPLATE = `
  <div id="editor"><p><br></p></div>
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

const JSDOM_OPTIONS = {
  runScripts: 'dangerously',
  includeNodeLocations: true,
  pretendToBeVisual: true,
};

const DOM = new JSDOM(JSDOM_TEMPLATE, JSDOM_OPTIONS);
const formats = require('./formats/constants').formats;
const quillEditor = new DOM.window.Quill('#editor', {
  formats,
  modules: {
    toolbar: false,
    history: {
      userOnly: true,
    },
    table: true,
  },
});

exports.convertTextToDelta = (text) => {
  quillEditor.setText(text);
  return quillEditor.getContents();
};

exports.convertHtmlToDelta = (html) => {
  return quillEditor.clipboard.convert(html);
};

exports.convertDeltaToHtml = (delta) => {
  quillEditor.setContents(delta);
  // const html = quillEditor.getSemanticHTML();
  // return html;
  return quillEditor.root.innerHTML;
};
