
import { mockOps } from './mock';
import { convertDeltaToHtml } from '../lib';
import assert from 'assert';

describe('convertDeltaToHtml', () => {
  it('convert code block', (done) => {
    convertDeltaToHtml(mockOps.codeBlock)
      .then((html) => {
        console.log(html);
        if (html.indexOf('ql-code-block-container') > -1) {
          assert.ok(true);
          done();
        }
      });
  });

  it('convert table', (done) => {
    convertDeltaToHtml(mockOps.table)
      .then((html) => {
        console.log(html);
        if (html.indexOf('table-wrapper') > -1) {
          assert.ok(true);
          done();
        }
      });
  });
});
