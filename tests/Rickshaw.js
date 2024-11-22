import { expect } from 'chai';
import { Rickshaw } from 'rickshaw';;
import pkg from '../package.json';

describe('Rickshaw', () => {
  it('should have correct version', () => {
    expect(Rickshaw.version).to.equal(pkg.version, 'Rickshaw.version is defined');
  });
});
