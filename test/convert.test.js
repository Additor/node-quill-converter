
import { mockOps } from './mock';
import { convertDeltaToHtml } from '../lib';
import assert from 'assert';

describe('convertDeltaToHtml', () => {
  it('convert code block', (done) => {
    (async () => {
      const html = await convertDeltaToHtml(mockOps.codeBlock);
      console.log(html);
      if (html.indexOf('ql-code-block-container') > -1) {
        assert.ok(true);
        done();
      }
    })();
  });

  it('convert table', (done) => {
    (async () => {
      const html = await convertDeltaToHtml(mockOps.table);
      console.log(html);
      if (html.indexOf('table-wrapper') > -1) {
        assert.ok(true);
        done();
      }
    })();
  });
});
