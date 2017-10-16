var width = 960;
var height = 600;
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

var path = d3.geoPath();

var svg = d3.select('body')
  .select('svg')
  .attr('viewBox', `0 0 ${width} ${height}`)
  .style('width', '100%')
  .style('height', 'auto');

d3.json('https://d3js.org/us-10m.v1.json', function(error, us) {
  if (error) throw error;

  svg.append('g')
    .attr('class', 'states')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append('path')
    .attr('d', path)
    .style('stroke', '#fff')
    .style('stroke-width', '1');

  svg.select('.states')
    .selectAll('path')
    .style('fill', function(d) {
      return d.id === '01' ? 'red' : 'green';
    });
});
