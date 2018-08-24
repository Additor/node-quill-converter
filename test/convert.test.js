
import { mockOps } from './mock';
import { convertDeltaToHtml } from '../lib';
import assert from 'assert';

describe('convertDeltaToHtml', function() {
  it('convert codeblock', function() {
    const html = convertDeltaToHtml(mockOps.codeBlock);
    console.log(html);
  });

  it('convert table', function() {
    const html = convertDeltaToHtml(mockOps.table);
    console.log(html);
  });
});
