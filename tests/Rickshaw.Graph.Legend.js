import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.Legend', () => {
  let graph;
  let legendEl;

  beforeEach((done) => {
    jsdom.env({
      html: '<html><head></head><body></body></html>',
      done: (errors, window) => {
        global.document = window.document;
        global.window = window;
        new Rickshaw.Compat.ClassList();

        const el = document.createElement("div");
        graph = new Rickshaw.Graph({
          element: el,
          width: 960,
          height: 500,
          renderer: 'stack',
          series: [
            {
              name: 'foo',
              color: 'green',
              stroke: 'red',
              data: [{ x: 4, y: 32 }]
            },
            {
              name: 'bar',
              data: [{ x: 4, y: 32 }]
            }
          ]
        });
        legendEl = document.createElement("div");
        done();
      }
    });
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
  });

  it('should render legend correctly', () => {
    const legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: legendEl
    });

    const items = legendEl.getElementsByTagName('li');
    expect(items.length).to.equal(2, "legend count");
    expect(items[1].getElementsByClassName('label')[0].innerHTML).to.equal("foo");
    expect(items[0].getElementsByClassName('label')[0].innerHTML).to.equal("bar");
  });

  it('should have default className', () => {
    const legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: legendEl
    });

    expect(legendEl.className).to.equal("rickshaw_legend");
  });

  it('should allow overriding className', () => {
    const MyLegend = Rickshaw.Class.create(Rickshaw.Graph.Legend, {
      className: 'fnord'
    });
    const legend = new MyLegend({
      graph: graph,
      element: legendEl
    });

    expect(legendEl.className).to.equal("fnord");
  });

  it('should have default colorKey', () => {
    const legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: legendEl
    });

    expect(legend.colorKey).to.equal("color");
    expect(legendEl.getElementsByClassName('swatch')[1].style.backgroundColor).to.equal("green");
  });

  it('should allow overriding colorKey', () => {
    const legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: legendEl,
      colorKey: 'stroke'
    });

    expect(legend.colorKey).to.equal("stroke");
    expect(legendEl.getElementsByClassName('swatch')[1].style.backgroundColor).to.equal("red");
  });

  it('should put series classes on legend elements', () => {
    graph.series[0].className = 'fnord-series-0';
    graph.series[1].className = 'fnord-series-1';

    const legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: legendEl
    });

    expect(d3.select(legendEl).selectAll('.line').size()).to.equal(2);
    expect(d3.select(legendEl).selectAll('.fnord-series-0').size()).to.equal(1);
    expect(d3.select(legendEl).selectAll('.fnord-series-1').size()).to.equal(1);
  });
});