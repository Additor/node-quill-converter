# node-quill-converter
> Convert Quill Delta to HTML

The purpose of this package is to assist in migrating to or from the [Quill editor](https://quilljs.com/).

## Installation
```
npm install @additor/node-quill-converter --save
```

## Getting Started
### Convert a Quill delta to an HTML string:
```js
const { convertDeltaToHtml } = require('node-quill-converter');

let html = convertDeltaToHtml(delta);

console.log(html) ; // '<p>hello, <strong>world</strong></p>'
```

## License
MIT License Copyright (c) 2018 Sungwoo Cho
