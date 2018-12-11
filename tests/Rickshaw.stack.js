var Rickshaw = require('../rickshaw');

exports.basic = function(test) {
	test.equal(typeof Rickshaw.stack, 'function', 'Rickshaw.Stack is a function');
	test.done();
};

exports.stackSingleSeries = function(test) {
	var seriesData = [
		[
			{ x: 0, y: 40 },
			{ x: 1, y: 49 },
			{ x: 2, y: 38 },
			{ x: 3, y: 30 }
		]
	];

	test.deepEqual(
		Rickshaw.stack(seriesData),
		[[
			{ x: 0, y: 40, y0: 0 },
			{ x: 1, y: 49, y0: 0 },
			{ x: 2, y: 38, y0: 0 },
			{ x: 3, y: 30, y0: 0 }
		]]
	);

	test.done();
};

exports.stackMultipleSeries = function(test) {
	var seriesData = [
		[
			{ x: 1493058899, y: 94.93862930438978, y0: 0 },
			{ x: 1493058949, y: 91.37496118989016, y0: 0 },
			{ x: 1493058999, y: 97.85300579454922, y0: 0 },
			{ x: 1493059049, y: 96.23747351513803, y0: 0 },
			{ x: 1493059099, y: 95.96013978306019, y0: 0 },
			{ x: 1493059149, y: 100.96455525456315, y0: 0 },
			{ x: 1493059199, y: 88.91043811185205, y0: 0 },
			{ x: 1493059249, y: 97.68793629479448, y0: 0 },
			{ x: 1493059299, y: 93.94253631399756, y0: 0 },
			{ x: 1493059349, y: 87.47609309708507, y0: 0 },
			{ x: 1493059399, y: 85.1064735021485, y0: 0 },
			{ x: 1493059449, y: 93.0539210052647, y0: 0 }
		],
		[
			{ x: 1493058899, y: 86.93633668705193, y0: 0 },
			{ x: 1493058949, y: 91.7686750422268, y0: 0 },
			{ x: 1493058999, y: 97.26340655498142, y0: 0 },
			{ x: 1493059049, y: 102.27219211250221, y0: 0 },
			{ x: 1493059099, y: 104.44142516982879, y0: 0 },
			{ x: 1493059149, y: 92.5945565142257, y0: 0 },
			{ x: 1493059199, y: 90.4486635266624, y0: 0 },
			{ x: 1493059249, y: 95.75346271462037, y0: 0 },
			{ x: 1493059299, y: 92.7616289084634, y0: 0 },
			{ x: 1493059349, y: 93.6986275034983, y0: 0 },
			{ x: 1493059399, y: 89.30874988368794, y0: 0 },
			{ x: 1493059449, y: 95.29747209162574, y0: 0 }
		]
	];

	test.deepEqual(
		Rickshaw.stack(seriesData),		
		[
			[
				{ x: 1493058899, y0: 0, y: 94.93862930438978 },
				{ x: 1493058949, y0: 0, y: 91.37496118989016 },
				{ x: 1493058999, y0: 0, y: 97.85300579454922 },
				{ x: 1493059049, y0: 0, y: 96.23747351513803 },
				{ x: 1493059099, y0: 0, y: 95.96013978306019 },
				{ x: 1493059149, y0: 0, y: 100.96455525456315 },
				{ x: 1493059199, y0: 0, y: 88.91043811185205 },
				{ x: 1493059249, y0: 0, y: 97.68793629479448 },
				{ x: 1493059299, y0: 0, y: 93.94253631399756 },
				{ x: 1493059349, y0: 0, y: 87.47609309708507 },
				{ x: 1493059399, y0: 0, y: 85.1064735021485 },
				{ x: 1493059449, y0: 0, y: 93.0539210052647 }
			],
			[
				{ x: 1493058899, y0: 94.93862930438978, y: 86.93633668705193 },
				{ x: 1493058949, y0: 91.37496118989016, y: 91.7686750422268 },
				{ x: 1493058999, y0: 97.85300579454922, y: 97.26340655498142 },
				{ x: 1493059049, y0: 96.23747351513803, y: 102.2721921125022 },
				{ x: 1493059099, y0: 95.96013978306019, y: 104.44142516982879 },
				{ x: 1493059149, y0: 100.96455525456315, y: 92.5945565142257 },
				{ x: 1493059199, y0: 88.91043811185205, y: 90.44866352666241 },
				{ x: 1493059249, y0: 97.68793629479448, y: 95.75346271462037 },
				{ x: 1493059299, y0: 93.94253631399756, y: 92.76162890846341 },
				{ x: 1493059349, y0: 87.47609309708507, y: 93.69862750349832 },
				{ x: 1493059399, y0: 85.1064735021485, y: 89.30874988368794 },
				{ x: 1493059449, y0: 93.0539210052647, y: 95.29747209162574 }
			]
		]
	);

	test.done();
};
