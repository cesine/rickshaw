import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.Renderer', () => {
  beforeEach((done) => {
    jsdom.env({
      html: '<html><head></head><body></body></html>',
      done: (errors, window) => {
        global.document = window.document;
        global.window = window;
        new Rickshaw.Compat.ClassList();
        done();
      }
    });
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
  });

  it('should calculate correct domain', () => {
    const el = document.createElement("div");

    const graph = new Rickshaw.Graph({
      element: el,
      width: 960,
      height: 500,
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      renderer: 'scatterplot',
      series: [{
        color: 'steelblue',
        data: [
          { x: 0, y: 40 },
          { x: 1, y: 49 },
          { x: 2, y: 38 },
          { x: 3, y: 30 },
          { x: 4, y: 32 }
        ]
      }]
    });

    const domain = graph.renderer.domain();
    expect(domain).to.deep.equal({ x: [0, 4], y: [0, 49] });
  });

  it('should handle padding in domain calculation', () => {
    const el = document.createElement("div");

    const graph = new Rickshaw.Graph({
      element: el,
      width: 960,
      height: 500,
      padding: { top: 0.1, right: 0.1, bottom: 0.1, left: 0.1 },
      renderer: 'scatterplot',
      series: [{
        color: 'steelblue',
        data: [
          { x: 0, y: 40 },
          { x: 1, y: 49 },
          { x: 2, y: 38 },
          { x: 3, y: 30 },
          { x: 4, y: 32 }
        ]
      }]
    });

    const domain = graph.renderer.domain();
    expect(domain).to.deep.equal({ x: [-0.4, 4.44], y: [0, 53.9] });
  });

  // Add remaining tests...
});

