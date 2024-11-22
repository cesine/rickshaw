import jsdom from 'jsdom';
import { expect } from 'chai';
import sinon from 'sinon';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.HoverDetail', () => {
  beforeEach((done) => {
    jsdom.env({
      html: '<!DOCTYPE html><div id="graph" data-testid="rickshaw-graph"></div>',
      done: (errors, window) => {
        global.document = window.document;
        global.window = window;
        done();
      }
    });
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
  });

  it.only('should show hover detail', () => {
    const element = document.querySelector('[data-testid="rickshaw-graph"]');
    const graph = new Rickshaw.Graph({
      element: element,
      width: 900,
      height: 600,
      series: [{
        data: [{ x: 4, y: 32 }],
        color: '#000'
      }]
    });
    graph.render();

    const renderSpy = sinon.spy(Rickshaw.Graph.HoverDetail.prototype, 'render');

    const hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: graph,
      xFormatter: x => x,
      yFormatter: y => y
    });

    const MouseEvent = window.MouseEvent;
    const event = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 100,
      clientY: 100,
      pageX: 100,
      pageY: 100,
      screenX: 100,
      screenY: 100
    });

    graph.element.addEventListener('mousemove', (e) => {
      console.log('Mousemove event received', e);
    });

    console.log('Element bounds:', graph.element.getBoundingClientRect());

    graph.element.dispatchEvent(event);

    expect(renderSpy.called).to.be.true;
    expect(element.querySelector('.detail')).to.not.be.null;

    renderSpy.restore();
  });

  it('should format x and y values', () => {
    const element = document.querySelector('[data-testid="rickshaw-graph"]');
    const graph = new Rickshaw.Graph({
      element: element,
      width: 900,
      height: 600,
      series: [{
        data: [{ x: 4, y: 32 }],
        color: '#000'
      }]
    });
    graph.render();

    const xFormatter = sinon.spy(x => `X:${x}`);
    const yFormatter = sinon.spy(y => `Y:${y}`);

    const hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: graph,
      xFormatter: xFormatter,
      yFormatter: yFormatter
    });

    const MouseEvent = window.MouseEvent;
    const event = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 100,
      clientY: 100,
      pageX: 100,
      pageY: 100,
      screenX: 100,
      screenY: 100
    });

    graph.element.addEventListener('mousemove', (e) => {
      console.log('Mousemove event received', e);
    });

    console.log('Element bounds:', graph.element.getBoundingClientRect());

    graph.element.dispatchEvent(event);

    expect(xFormatter.called).to.be.true;
    expect(yFormatter.called).to.be.true;
    expect(element.querySelector('.x_label').textContent).to.contain('X:4');
    expect(element.querySelector('.item .value').textContent).to.contain('Y:32');
  });

  it('should render multiple series', () => {
    const element = document.querySelector('[data-testid="rickshaw-graph"]');
    const graph = new Rickshaw.Graph({
      element: element,
      width: 900,
      height: 600,
      series: [
        { data: [{ x: 4, y: 32 }], name: 'series1', color: '#000' },
        { data: [{ x: 4, y: 64 }], name: 'series2', color: '#fff' }
      ]
    });
    graph.render();

    const renderSpy = sinon.spy(Rickshaw.Graph.HoverDetail.prototype, 'render');

    const hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: graph
    });

    const event = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 100,
      clientY: 100,
      pageX: 100,
      pageY: 100,
      screenX: 100,
      screenY: 100
    });

    graph.element.addEventListener('mousemove', (e) => {
      console.log('Mousemove event received', e);
    });

    console.log('Element bounds:', graph.element.getBoundingClientRect());

    graph.element.dispatchEvent(event);

    expect(renderSpy.called).to.be.true;
    expect(element.querySelectorAll('.item').length).to.equal(2);

    renderSpy.restore();
  });

  it('should hide on mouseout', () => {
    const element = document.querySelector('[data-testid="rickshaw-graph"]');
    const graph = new Rickshaw.Graph({
      element: element,
      width: 900,
      height: 600,
      series: [{
        data: [{ x: 4, y: 32 }],
        color: '#000'
      }]
    });
    graph.render();

    const hideSpy = sinon.spy(Rickshaw.Graph.HoverDetail.prototype, 'hide');

    const hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: graph
    });

    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 100,
      clientY: 100,
      pageX: 100,
      pageY: 100,
      screenX: 100,
      screenY: 100
    });

    graph.element.addEventListener('mouseout', (e) => {
      console.log('Mouseout event received', e);
    });

    console.log('Element bounds:', graph.element.getBoundingClientRect());

    graph.element.dispatchEvent(event);

    expect(hideSpy.called).to.be.true;
    expect(element.querySelector('.detail').style.display).to.equal('none');

    hideSpy.restore();
  });
});
