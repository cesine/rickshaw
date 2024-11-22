import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.RangeSlider.Preview', () => {
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

  it('should initialize correctly', () => {
    const el = document.createElement("div");

    const graph = new Rickshaw.Graph({
      element: el,
      width: 960,
      height: 500,
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

    graph.renderer.dotSize = 6;
    graph.render();

    const previewElement = document.createElement("div");

    const preview = new Rickshaw.Graph.RangeSlider.Preview({
      element: previewElement,
      graph: graph
    });

    expect(graph.renderer.name).to.equal(preview.previews[0].renderer.name);
  });
});


