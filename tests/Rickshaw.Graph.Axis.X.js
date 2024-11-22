import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.Axis.X', () => {

  beforeEach((done) => {
    jsdom.env({
      html: '<!DOCTYPE html>',
      done: (errors, window) => {
        global.document = window.document;
        global.window = window;
        done();
      }
    });
  });

  it('should render x-axis with correct ticks', () => {
    const element = window.document.createElement('div');

    const graph = new Rickshaw.Graph({
      width: 900,
      element: element,
      series: [{ data: [{ x: 4, y: 32 }, { x: 16, y: 100 }] }]
    });

    const xAxis = new Rickshaw.Graph.Axis.X({
      graph: graph
    });

    xAxis.render();

    const ticks = d3.select(element).selectAll('.x_grid_d3 .tick');

    expect(ticks[0].length).to.equal(13);
    expect(ticks[0][0].getAttribute('data-x-value')).to.equal('4');
  });
});

