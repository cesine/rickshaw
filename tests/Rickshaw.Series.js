import { expect } from 'chai';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Series', () => {
	it('should instantiate with an empty array', () => {
		const series = new Rickshaw.Series([]);
		expect(Array.isArray(series)).to.be.true;
		expect(series.length).to.equal(0);
	});

	it('should instantiate with data', () => {
		const series = new Rickshaw.Series([
			{ name: 'foo', data: [{ x: 0, y: 40 }], color: 'red' },
			{ name: 'bar', data: [{ x: 0, y: 28 }], color: 'blue' }
		]);

		expect(series.length).to.equal(2);
		expect(series[0].name).to.equal('foo');
		expect(series[0].data[0].y).to.equal(40);
		expect(series[1].data[0].y).to.equal(28);
	});

	it('should add items', () => {
		const series = new Rickshaw.Series([
			{ name: 'foo', data: [{ x: 0, y: 40 }], color: 'red' }
		]);

		series.addItem({ name: 'bar', data: [{ x: 0, y: 28 }], color: 'blue' });

		expect(series.length).to.equal(2);
		expect(series[1].name).to.equal('bar');
	});

	it('should throw error when adding item without name', () => {
		const series = new Rickshaw.Series([]);
		expect(() => {
			series.addItem({ data: [{ x: 0, y: 28 }] });
		}).to.throw('addItem() needs a name');
	});
});
