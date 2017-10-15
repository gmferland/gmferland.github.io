var width = 960;
var height = 500;
var visitedColor = 'rgb(69,173,168)';
var defaultColor = '#d7d8da';
var statesVisited = [
  'Maine',
  'New Hampshire',
  'Massachusetts',
  'Connecticut',
  'New York',
  'New Jersey',
  'Delaware',
  'Maryland',
  'Virginia',
  'Tennessee',
  'North Carolina',
  'Georgia',
  'Kentucky',
  'Ohio',
  'Indiana',
  'Illinois',
  'Wisconsin',
  'Minnesota',
  'South Dakota',
  'Wyoming',
  'Montana',
  'Idaho',
  'Nevada',
  'California',
  'Arizona',
  'Utah',
  'Colorado',
  'Nebraska',
  'Iowa',
];

var projection = d3.geo.albersUsa()
  .translate([width / 2, height / 2])
  .scale([1000]);

var path = d3.geo.path().projection(projection);

var svg = d3.select('body')
  .append('svg')
  .attr('viewBox', `0 0 ${width} ${height}`)
  .attr('width', '100%')
  .attr('height', 'auto');

d3.json('https://unpkg.com/us-atlas@1/us/10m.json', function(error, us) {
  if (error) throw error;

  // Add my data to GeoJson data
  var data = us.objects.states.features.map(function(geo) {
    if (geo.properties.name !== 'Alaska' || geo.properties.name !== 'Hawaii') {
      return Object.assign({ 'visited': statesVisited.indexOf(geo.properties.name) > -1 }, geo);
    }
  });

  svg.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', path)
    .style('stroke', '#fff')
    .style('stroke-width', '1')
    .style('fill', function(d) {
      return d.visited ? visitedColor : defaultColor;
    })
    .on('hover', function(state) {
      state.style('opacity', '0.7');
    });
});
