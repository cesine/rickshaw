import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.DragZoom', () => {
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

  it('should handle drag events correctly', () => {
    const element = document.createElement("div");

    const graph = new Rickshaw.Graph({
      element: element,
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

    const drag = new Rickshaw.Graph.DragZoom({
      graph: graph,
      opacity: 0.5,
      fill: 'steelblue',
      minimumTimeSelection: 15,
      callback: (args) => {
        console.log(args.range, args.endTime);
      }
    });

    expect(graph.renderer.name).to.equal(drag.graph.renderer.name);
    expect(drag.svgWidth).to.equal(960);

    let rect = d3.select(element).selectAll('rect')[0][0];
    expect(rect).to.be.undefined;

    const mousedownEvent = document.createEvent('MouseEvent');
    mousedownEvent.initMouseEvent('mousedown', true, true, window, 1, 800, 600, 290, 260, false, false, false, false, 0, null);
    expect(mousedownEvent.screenX).to.equal(800);
    drag.svg[0][0].dispatchEvent(mousedownEvent);

    rect = d3.select(element).selectAll('rect')[0][0];
    expect(rect).to.exist;
    expect(rect.style.opacity).to.equal(drag.opacity);

    const mouseupEvent = document.createEvent('MouseEvent');
    mouseupEvent.initMouseEvent('mouseup', true, true, window, 1, 900, 600, 290, 260, false, false, false, false, 0, null);
    document.dispatchEvent(mouseupEvent);

    rect = d3.select(element).selectAll('rect')[0][0];
    expect(rect).to.be.null;
  });

  it('should throw error when initialized without graph', () => {
    expect(() => {
      new Rickshaw.Graph.DragZoom();
    }).to.throw('Rickshaw.Graph.DragZoom needs a reference to a graph');
  });
});
