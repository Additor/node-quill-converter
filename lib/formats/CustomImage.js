
module.exports = function (Quill) {
  const Image = Quill.import('formats/image');
  const ImageFormatAttributesList = [
    'alt',
    'height',
    'width',
    'style',
  ];

  class CustomImage extends Image {
    constructor(domNode) {
      super(domNode);
      domNode.setAttribute('id', _.uniqueId('img_'));
    }
    static formats(domNode) {
      return ImageFormatAttributesList.reduce(function(formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          let attr = domNode.getAttribute(attribute);
          if (attribute === 'style') attr = _.replace(attr, 'visibility: hidden;', '');
          formats[attribute] = attr;
        }
        return formats;
      }, {});
    }
    format(name, value) {
      if (ImageFormatAttributesList.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, _.replace(value, 'visibility: hidden;', '')); // visibility 가 hidden 일 경우 제거해줌
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        super.format(name, value);
      }
    }
  }
  CustomImage.className = 'ql-img';

  return CustomImage;
}
