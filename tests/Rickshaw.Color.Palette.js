import { expect } from 'chai';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Color.Palette', () => {
  it('should initialize with default values', () => {
    const palette = new Rickshaw.Color.Palette();

    expect(typeof palette.schemes).to.equal('object');
    expect(palette.scheme).to.deep.equal([
      '#cb513a',
      '#73c03a',
      '#65b9ac',
      '#4682b4',
      '#96557e',
      '#785f43',
      '#858772',
      '#b5b6a9'
    ]);
    expect(palette.runningIndex).to.equal(0);
    expect(palette.generatorIndex).to.equal(0);
    expect(palette.rotateCount).to.equal(8);
    expect(typeof palette.color).to.equal('function');
    expect(typeof palette.interpolateColor).to.equal('function');
  });

  it('should handle interpolatedStopCount correctly', () => {
    const palette = new Rickshaw.Color.Palette({
      interpolatedStopCount: 4
    });

    expect(typeof palette.schemes).to.equal('object');
    expect(palette.scheme).to.deep.equal([
      '#cb513a',
      '#c98339',
      '#c7b439',
      '#a5c439',
      '#73c03a',
      '#51c043',
      '#4fbd66',
      '#5abb8d',
      '#65b9ac',
      '#5db8b8',
      '#55a9b7',
      '#4c97b7',
      '#4682b4',
      '#4a51ac',
      '#724ea5',
      '#95519d',
      '#96557e',
      '#8f5066',
      '#874c4f',
      '#805547',
      '#785f43',
      '#7d6d4e',
      '#817959',
      '#848365',
      '#858772',
      '#91937f',
      '#9d9f8d',
      '#a9aa9b',
      '#b5b6a9'
    ]);
    expect(palette.runningIndex).to.equal(0);
    expect(palette.generatorIndex).to.equal(0);
    expect(palette.rotateCount).to.equal(29);
    expect(typeof palette.color).to.equal('function');
    expect(typeof palette.interpolateColor).to.equal('function');
  });

  it('should handle interpolateColor correctly', () => {
    const palette = new Rickshaw.Color.Palette();

    const color = palette.interpolateColor();
    expect(typeof palette.schemes).to.equal('object');
    expect(color).to.deep.equal(palette.scheme[palette.scheme.length - 1]);

    palette.generatorIndex = palette.rotateCount * 2 - 1;
    const color2 = palette.interpolateColor();
    expect(typeof palette.schemes).to.equal('object');
    expect(color2).to.deep.equal(palette.scheme[palette.scheme.length - 1]);

    palette.scheme = null;
    const color3 = palette.interpolateColor();
    expect(color3).to.equal(undefined, 'color is undefined if scheme is not an array');
  });
});
