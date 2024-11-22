import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.Annotate', () => {
  beforeEach((done) => {
    jsdom.env({
      html: '<html><head></head><body></body></html>',
      done: (errors, window) => {
        global.document = window.document;
        global.window = window;
        global.Node = {};
        new Rickshaw.Compat.ClassList();
        done();
      }
    });
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.Node;
  });

  it('should initialize correctly', () => {
    const element = document.createElement('div');
    const annotateElement = document.createElement('div');

    const graph = new Rickshaw.Graph({
      width: 900,
      element: element,
      series: [{
        data: [{ x: 4, y: 32 }, { x: 16, y: 100 }]
      }]
    });

    const annotate = new Rickshaw.Graph.Annotate({
      graph: graph,
      element: annotateElement
    });

    expect(annotate.elements.timeline).to.equal(annotateElement);
    const timeline = d3.select(element).selectAll('.rickshaw_annotation_timeline');
    expect(annotate.element).to.equal(timeline[0][0]);
  });

  it('should add annotations correctly', () => {
    const element = document.createElement('div');
    const annotateElement = document.createElement('div');

    const graph = new Rickshaw.Graph({
      element: element,
      series: []
    });

    const annotate = new Rickshaw.Graph.Annotate({
      graph: graph,
      element: annotateElement
    });

    const time = Date.now();
    annotate.add(time, 'foo', time + 10 * 1000);

    expect(annotate.data[time]).to.deep.equal({
      boxes: [{
        content: 'foo',
        end: time + 10 * 1000
      }]
    });
  });

  it('should update annotations correctly', () => {
    const element = document.createElement('div');
    const annotateElement = document.createElement('div');

    const graph = new Rickshaw.Graph({
      element: element,
      series: []
    });

    const annotate = new Rickshaw.Graph.Annotate({
      graph: graph,
      element: annotateElement
    });

    const time = 3000;
    annotate.add(time, 'foo', time + 10 * 1000);
    annotate.update();

    const clickEvent = document.createEvent('Event');
    clickEvent.initEvent('click', true, true);
    const addedElement = d3.select(annotateElement).selectAll('.annotation')[0][0];
    addedElement.dispatchEvent(clickEvent);

    expect(addedElement.classList.contains('active')).to.be.true;

    annotate.graph.onUpdate();
    annotate.update();

    expect(addedElement.style._values).to.deep.equal({
      display: 'block'
    });

    expect(annotate.data[time].element.classList).to.deep.equal({
      '0': 'annotation',
      '1': 'active'
    });
  });
});
