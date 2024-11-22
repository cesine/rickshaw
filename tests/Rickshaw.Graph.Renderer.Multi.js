import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.Renderer.Multi', () => {
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

  it('should determine domain from subrenderers', () => {
    const el = document.createElement("div");

    // Create test renderer
    Rickshaw.namespace('Rickshaw.Graph.Renderer.DomainSubrenderer');
    Rickshaw.Graph.Renderer.DomainSubrenderer = Rickshaw.Class.create(Rickshaw.Graph.Renderer, {
      name: 'domain',
      domain: function(data) {
        return {x: [-10, 20], y: [-15, 30]};
      }
    });

    // Test single renderer
    const graph1 = new Rickshaw.Graph({
      element: el,
      width: 960,
      height: 500,
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      renderer: 'domain',
      series: [{
        color: 'steelblue',
        data: [
          { x: 0, y: 40 },
          { x: 1, y: 49 }
        ]
      }]
    });

    expect(graph1.renderer.domain()).to.deep.equal({
      x: [-10, 20],
      y: [-15, 30]
    });

    // Test multi renderer
    const graph2 = new Rickshaw.Graph({
      element: el,
      width: 960,
      height: 500,
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      renderer: 'multi',
      series: [{
        renderer: 'domain',
        data: [
          { x: 0, y: 40 },
          { x: 1, y: 49 }
        ]
      }]
    });

    expect(graph2.renderer.domain()).to.deep.equal({
      x: [-10, 20],
      y: [-15, 30]
    });
  });
});

