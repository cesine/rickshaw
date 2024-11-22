import jsdom from 'jsdom';
import { expect } from 'chai';
import jQuery from 'jquery';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph.RangeSlider', () => {
  beforeEach((done) => {
    jsdom.env({
      html: `
        <html>
          <head></head>
          <body>
            <div id='chart_0'></div>
            <div id='chart_1'></div>
            <div id='chart_2'>
              <div id='slider'></div>
            </div>
          </body>
        </html>
      `,
      done: (errors, window) => {
        global.document = window.document;
        global.window = window;
        global.jQuery = jQuery;
        new Rickshaw.Compat.ClassList();
        done();
      }
    });
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.jQuery;
  });

  function createGraphs() {
    const graphs = [];
    const seriesData = [[], [], []];
    const random = new Rickshaw.Fixtures.RandomData(150);

    for (let i = 0; i < 150; i++) {
      random.addData(seriesData);
    }

    const colors = ["#c05020", "#30c020", "#6060c0"];
    const names = ['New York', 'London', 'Tokyo'];

    for (let i = 0; i < names.length; i++) {
      const graph = new Rickshaw.Graph({
        element: document.getElementById(`chart_${i}`),
        width: 800 * i,
        height: 100,
        renderer: 'line',
        series: [{
          color: colors[i],
          data: seriesData[i],
          name: names[i]
        }]
      });

      graph.render();
      graphs.push(graph);
    }

    return graphs;
  }

  it('should support single graph', () => {
    const graphs = createGraphs();
    const slider = new Rickshaw.Graph.RangeSlider({
      element: document.getElementById("slider"),
      graph: createGraphs()[0]
    });

    expect(slider.graph).to.exist;
    expect(jQuery(slider.element)[0].style.width).to.equal('');
    slider.graph.configure({});
    expect(slider.element[0].style.width).to.equal('400px');
  });

  it('should support multiple graphs', () => {
    const slider = new Rickshaw.Graph.RangeSlider({
      element: document.getElementById("slider"),
      graphs: createGraphs()
    });

    expect(slider.graphs).to.exist;
    expect(slider.graph).to.equal(slider.graphs[0]);

    expect(slider.element.style.width).to.equal('');
    slider.graphs[0].configure({});
    expect(slider.element.style.width).to.equal('400px');
    slider.graphs[2].configure({});
    expect(slider.element.style.width).to.equal('1600px');
  });
});

