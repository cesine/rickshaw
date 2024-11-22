import { expect } from 'chai';
import { Rickshaw } from 'rickshaw';;

describe('Rickshaw.Class', () => {
	it('should load Rickshaw.Class as an object', () => {
		expect(typeof Rickshaw.Class).to.equal('object');
	});

	it('should handle class instantiation and inheritance', () => {
		Rickshaw.namespace('Rickshaw.Sample.Class');

		Rickshaw.Sample.Class = Rickshaw.Class.create({
			name: 'sample',
			concat: function(suffix) {
				return [this.name, suffix].join(' ');
			}
		});

		const sample = new Rickshaw.Sample.Class();
		expect(sample.concat('polka')).to.equal('sample polka');

		Rickshaw.namespace('Rickshaw.Sample.Class.Prefix');

		Rickshaw.Sample.Subclass = Rickshaw.Class.create(Rickshaw.Sample.Class, {
			name: 'sampler'
		});

		const sampler = new Rickshaw.Sample.Subclass();
		expect(sampler.concat('polka')).to.equal('sampler polka');
	});

	it('should handle array inheritance', () => {
		Rickshaw.namespace('Rickshaw.Sample.Array');

		Rickshaw.Sample.Array = Rickshaw.Class.create(Array, {
			second: function() {
				return this[1];
			}
		});

		const array = new Rickshaw.Sample.Array();
		array.push('red');
		array.push('blue');

		expect(array.second()).to.equal('blue');
	});
});
