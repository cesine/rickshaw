import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.Renderer.Scatterplot', () => {
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

  it('should add the series className to all scatterplot points', () => {
    const el = document.createElement("div");
    const graph = new Rickshaw.Graph({
      element: el,
      stroke: true,
      width: 10,
      height: 10,
      renderer: 'scatterplot',
      series: [{
        className: 'fnord',
        data: [
          { x: 0, y: 40 },
          { x: 1, y: 49 },
          { x: 2, y: 38 },
          { x: 3, y: 30 }
        ],
        opacity: 0.8
      }, {
        className: 'fnord',
        data: [{ x: 4, y: 32 }]
      }]
    });

    graph.render();

    const path = graph.vis.selectAll('circle.fnord');
    expect(path.size()).to.equal(5);
  });

  it('should set series opacity correctly', () => {
    const el = document.createElement("div");
    const graph = new Rickshaw.Graph({
      element: el,
      stroke: true,
      width: 10,
      height: 10,
      renderer: 'scatterplot',
      series: [{
        className: 'fnord',
        data: [
          { x: 0, y: 40 },
          { x: 1, y: 49 },
          { x: 2, y: 38 },
          { x: 3, y: 30 }
        ],
        opacity: 0.8
      }, {
        className: 'fnord',
        data: [{ x: 4, y: 32 }]
      },
      {
        className: 'fnord',
        opacity: 0,
        data: [{ x: 5, y: 32 }]
      }]
    });

    graph.render();

    const path = graph.vis.selectAll('circle.fnord');
    expect(path[0][1].getAttribute('opacity')).to.equal(0.8, 'custom opacity');
    expect(path[0][4].getAttribute('opacity')).to.equal(1, 'default opacity should be 1');
    expect(path[0][5].getAttribute('opacity')).to.equal(0, '0 opacity should be 0');
  });
});
