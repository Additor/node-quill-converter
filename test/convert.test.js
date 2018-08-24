
import { mockOps } from './mock';
import { convertDeltaToHtml } from '../lib';
import assert from 'assert';

describe('convertDeltaToHtml', function() {
  it('convert code block', function(done) {
    convertDeltaToHtml(mockOps.codeBlock)
      .then((html) => {
        console.log(html);
        if (html.indexOf('ql-code-block-container') > -1) {
          assert.ok(1);
          done();
        }
      });
  });

  it('convert table', function(done) {
    convertDeltaToHtml(mockOps.table)
      .then((html) => {
        console.log(html);
        if (html.indexOf('table-wrapper') > -1) {
          assert.ok(1);
          done();
        }
      });
  });
});
