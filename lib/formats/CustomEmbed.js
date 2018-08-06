
module.exports = function (Quill) {
  const Embed = Quill.import('blots/embed');
  const Link = Quill.import('formats/link');
  const EmbedFormatAttributesList = [
    'height',
    'width',
  ];

  class CustomEmbed extends Embed {
    constructor(domNode) {
      super(domNode);
      // domNode.firstChild.setAttribute('id', _.uniqueId('embed_'));
      domNode.setAttribute('id', _.uniqueId('embed_'));
    }

    static create(value) {
      const node = super.create(value);
      node.setAttribute('src', this.sanitize(value));
      node.setAttribute('frameborder', '0');
      node.setAttribute('onmousewheel', true);
      node.setAttribute('allowfullscreen', true);
      node.setAttribute('draggable', true);

      return node;
    }

    static formats(domNode) {
      return EmbedFormatAttributesList.reduce(function (formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }

    static sanitize(url) {
      return Link.sanitize(url);
    }

    static value(domNode) {
      // return domNode.firstChild.getAttribute('src');
      return domNode.getAttribute('src');
    }

    format(name, value) {
      if (EmbedFormatAttributesList.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        super.format(name, value);
      }
    }
  }

  CustomEmbed.blotName = 'embed';
  CustomEmbed.className = 'ql-embed';
  CustomEmbed.tagName = 'IFRAME';

  return CustomEmbed;
};
