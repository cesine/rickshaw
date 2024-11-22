import jsdom from 'jsdom';
import { expect } from 'chai';
import fs from 'fs';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Graph', () => {
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

  it('should render SVG correctly', () => {
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
          { x: 3, y: 30 }
        ],
        strokeWidth: 5,
        opacity: 0.8
      }, {
        color: 'blue',
        data: [ { x: 4, y: 32 } ]
      }]
    });

    graph.renderer.dotSize = 6;
    graph.render();

    const generatedSVG = el.innerHTML;
    const exampleSVG = fs.readFileSync(__dirname + '/data/simple.svg', 'utf8').trim();
    expect(generatedSVG).to.equal(exampleSVG);
  });

  it('should validate series data', () => {
    const el = document.createElement("div");

    expect(() => {
      new Rickshaw.Graph({
        element: el,
        width: 960,
        height: 500,
        series: [{
          data: [ { x: 0 } ]
        }]
      });
    }).to.throw();
  });

  // Add more tests converted from the original...
});

