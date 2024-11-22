import { expect } from 'chai';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Fixtures.Number', () => {
  it('should format numbers with standard SI prefixes', () => {
    const formatKMBT = Rickshaw.Fixtures.Number.formatKMBT;

    expect(formatKMBT(0)).to.equal('0');
    expect(formatKMBT(123)).to.equal('123');
    expect(formatKMBT(1234)).to.equal('1.23K');
    expect(formatKMBT(12345)).to.equal('12.3K');
    expect(formatKMBT(123456)).to.equal('123K');
    expect(formatKMBT(1234567)).to.equal('1.23M');
    expect(formatKMBT(12345678)).to.equal('12.3M');
    expect(formatKMBT(123456789)).to.equal('123M');
    expect(formatKMBT(1234567890)).to.equal('1.23B');
    expect(formatKMBT(12345678901)).to.equal('12.3B');
    expect(formatKMBT(123456789012)).to.equal('123B');
    expect(formatKMBT(1234567890123)).to.equal('1.23T');
    expect(formatKMBT(12345678901234)).to.equal('12.3T');
    expect(formatKMBT(123456789012345)).to.equal('123T');
  });

  it('should format numbers with binary SI prefixes', () => {
    const formatBase1024KMGTP = Rickshaw.Fixtures.Number.formatBase1024KMGTP;

    expect(formatBase1024KMGTP(0)).to.equal('0');
    expect(formatBase1024KMGTP(123)).to.equal('123');
    expect(formatBase1024KMGTP(1234)).to.equal('1.21K');
    expect(formatBase1024KMGTP(12345)).to.equal('12.1K');
    expect(formatBase1024KMGTP(123456)).to.equal('121K');
    expect(formatBase1024KMGTP(1234567)).to.equal('1.18M');
    expect(formatBase1024KMGTP(12345678)).to.equal('11.8M');
    expect(formatBase1024KMGTP(123456789)).to.equal('118M');
    expect(formatBase1024KMGTP(1234567890)).to.equal('1.15G');
    expect(formatBase1024KMGTP(12345678901)).to.equal('11.5G');
    expect(formatBase1024KMGTP(123456789012)).to.equal('115G');
    expect(formatBase1024KMGTP(1234567890123)).to.equal('1.12T');
    expect(formatBase1024KMGTP(12345678901234)).to.equal('11.2T');
    expect(formatBase1024KMGTP(123456789012345)).to.equal('112T');
    expect(formatBase1024KMGTP(1234567890123456)).to.equal('1.10P');
  });
});
