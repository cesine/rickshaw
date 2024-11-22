import { expect } from 'chai';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Series.FixedDuration', () => {
  it('should add items with a fixed duration', () => {
    const series = new Rickshaw.Series.FixedDuration(
      [{ name: 'foo', data: [] }],
      'spectrum14',
      { timeInterval: 30, maxDataPoints: 4 }
    );

    series.addData({ foo: 42 });
    series.addData({ foo: 43 });
    series.addData({ foo: 44 });
    series.addData({ foo: 45 });
    series.addData({ foo: 46 });

    expect(series[0].data.length).to.equal(4);
    expect(series[0].data[0].y).to.equal(43);
    expect(series[0].data[3].y).to.equal(46);
  });

  it('should drop data points beyond maxDataPoints', () => {
    const series = new Rickshaw.Series.FixedDuration(
      [{ name: 'foo', data: [] }],
      'spectrum14',
      { timeInterval: 30, maxDataPoints: 3 }
    );

    series.addData({ foo: 42 });
    series.addData({ foo: 43 });
    series.addData({ foo: 44 });
    series.addData({ foo: 45 });

    expect(series[0].data.length).to.equal(3);
    expect(series[0].data[0].y).to.equal(43);
    expect(series[0].data[2].y).to.equal(45);
  });
});
