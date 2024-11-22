 % npm run coverage

> rickshaw@1.7.1 coverage
> istanbul cover nodeunit tests --reporter=lcov


Rickshaw
✔ load

Rickshaw.Class
✔ load
✔ instantiation
✔ array

Rickshaw.Color.Palette
✔ initialize
✔ interpolatedStopCount
✔ interpolateColor

Rickshaw.Fixtures.Number
✔ formatKMBT
✔ formatBase1024KMGTP

Rickshaw.Fixtures.Time
✔ monthBoundary
✔ monthMinus
✔ month
✔ decemberMonthWrap
✔ yearBoundary
✔ year

Rickshaw.Fixtures.Time.Local
✔ monthBoundary
✔ monthMinus
✔ month
✔ decemberMonthWrap
✔ yearBoundary
✔ year

Rickshaw.Graph
(node:63347) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
✔ svg
✔ validate
✔ should validate empty data when rendering multiple series
✔ scales
✔ inconsistent
✔ configure
✔ setSeries
✔ rendererAutodiscover

Rickshaw.Graph.Annotate
✔ initialize
✔ add
✔ update

Rickshaw.Graph.Axis.X
✔ axis

Rickshaw.Graph.Axis.Y
✔ axis

Rickshaw.Graph.DragZoom
✔ drag
✔ notDrag
✔ initialize

Rickshaw.Graph.HoverDetail
✔ initialize
✔ formatters
✔ render
✔ update
✔ listeners

Rickshaw.Graph.Legend
✔ rendersLegend
✔ hasDefaultClassName
✔ canOverrideClassName
✔ hasDefaultColorKey
✔ canOverrideColorKey
✔ should put series classes on legend elements

Rickshaw.Graph.RangeSlider
✔ basic
✔ basicJQueryElement
✔ shared

Rickshaw.Graph.RangeSlider.Preview
✔ basic

Rickshaw.Graph.Renderer
✔ domain
✔ respectStrokeFactory
✔ should allow arbitrary empty series when finding the domain of stacked data

Rickshaw.Graph.Renderer.Multi
✔ should determine domain from subrenderers

Rickshaw.Graph.Renderer.Scatterplot
✔ should add the series className to all scatterplot points
✔ should set series opacity correctly

Rickshaw.Series
✔ basic
✔ initialize
✔ addItem
✔ addData
✔ addDataWithXAxisValue
✔ itemByName
✔ dump
✔ zeroFill
✔ nullFill
✔ load

Rickshaw.Series.FixedDuration
✔ basic
✔ initialize
✔ addData

OK: 231 assertions (626ms)
=============================================================================
Writing coverage object [~/rickshaw/coverage/coverage.json]
Writing coverage reports at [~/rickshaw/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 61.65% ( 1246/2021 )
Branches     : 52.76% ( 526/997 )
Functions    : 53.05% ( 235/443 )
Lines        : 62.58% ( 1184/1892 )
================================================================================