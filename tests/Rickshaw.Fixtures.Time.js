import { expect } from 'chai';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Fixtures.Time', () => {
  let time;

  beforeEach(() => {
    time = new Rickshaw.Fixtures.Time();
  });

  it('should handle month boundary', () => {
    const february = 1359676800;
    const ceil = time.ceil(february, time.unit('month'));
    expect(ceil).to.equal(february, 'february resolves to itself');
  });

  it('should handle month minus one second', () => {
    const february = 1359676800;
    const ceil = time.ceil(february - 1, time.unit('month'));
    expect(ceil).to.equal(february, 'just before february resolves up to february');
  });

  it('should handle month plus one second', () => {
    const february = 1359676800;
    const march = 1362096000;
    const ceil = time.ceil(february + 1, time.unit('month'));
    expect(ceil).to.equal(march, 'february plus a bit resolves to march');
  });

  it('should handle december month wrap', () => {
    const december2013 = 1385856000;
    const january2014 = 1388534400;
    const ceil = time.ceil(december2013 + 1, time.unit('month'));
    expect(ceil).to.equal(january2014, 'december wraps to next year');
  });

  it('should handle year boundary', () => {
    const year2013 = 1356998400;
    const ceil = time.ceil(year2013, time.unit('year'));
    expect(ceil).to.equal(year2013, 'midnight new year resolves to itself');
  });

  it('should handle year plus one second', () => {
    const year2013 = 1356998400;
    const year2014 = 1388534400;
    const ceil = time.ceil(year2013 + 1, time.unit('year'));
    expect(ceil).to.equal(year2014, 'midnight new year plus a bit resolves to next year');
  });
});

