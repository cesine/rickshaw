import jsdom from 'jsdom';
import { expect } from 'chai';
import d3 from 'd3';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.Axis.Y', () => {
  beforeEach((done) => {
    jsdom.env({
      html: `
        <html>
          <head>
            <style>#y_axis {width: 40px;}</style>
          </head>
          <body>
            <div id='y_axis'></div>
            <div id='chart'></div>
          </body>
        </html>
      `,
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

  it('should render y-axis correctly', () => {
    const chartElement = document.getElementById('chart');
    const yAxisElement = document.getElementById('y_axis');

    const graph = new Rickshaw.Graph({
      width: 900,
      height: 600,
      element: chartElement,
      series: [{ data: [{ x: 4, y: 32 }, { x: 16, y: 100 }] }]
    });

    const yAxis = new Rickshaw.Graph.Axis.Y({
      element: yAxisElement,
      graph: graph,
      orientation: 'left'
    });

    yAxis.render();

    const ticks = d3.select(chartElement).selectAll('.y_grid .tick');
    expect(ticks[0].length).to.equal(11, "we have some ticks");
    expect(ticks[0][0].getAttribute('data-y-value')).to.equal('0');

    expect(yAxis.width).to.equal(40, "width is set from axis element");
    expect(yAxis.height).to.equal(600, "height is set from chart element");

    yAxis.setSize({
      width: 20
    });

    expect(yAxis.width).to.equal(20, "setSize causes changes");
    expect(yAxis.height).to.equal(600, "setSize doesn't change values which are not passed");
  });
});
