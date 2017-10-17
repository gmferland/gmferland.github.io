var width = 960;
var height = 600;
var visitedColor = 'rgb(69,173,168)';
var defaultColor = '#d7d8da';
var states = {
  '01': 'Alabama',
  '02': 'Alaska',
  '04': 'Arizona',
  '05': 'Arkansas',
  '06': 'California',
  '08': 'Colorado',
  '09': 'Connecticut',
  10: 'Delaware',
  11: 'District of Columbia',
  12: 'Florida',
  13: 'Georgia',
  15: 'Hawaii',
  16: 'Idaho',
  17: 'Illinois',
  18: 'Indiana',
  19: 'Iowa',
  20: 'Kansas',
  21: 'Kentucky',
  22: 'Louisiana',
  23: 'Maine',
  24: 'Maryland',
  25: 'Massachusetts',
  26: 'Michigan',
  27: 'Minnesota',
  28: 'Mississippi',
  29: 'Missouri',
  30: 'Montana',
  31: 'Nebraska',
  32: 'Nevada',
  33: 'New Hampshire',
  34: 'New Jersey',
  35: 'New Mexico',
  36: 'New York',
  37: 'North Carolina',
  38: 'North Dakota',
  39: 'Ohio',
  40: 'Oklahoma',
  41: 'Oregon',
  42: 'Pennsylvania',
  44: 'Rhode Island',
  45: 'South Carolina',
  46: 'South Dakota',
  47: 'Tennessee',
  48: 'Texas',
  49: 'Utah',
  50: 'Vermont',
  51: 'Virginia',
  53: 'Washington',
  54: 'West Virginia',
  55: 'Wisconsin',
  56: 'Wyoming',
};

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
  'Pennsylvania',
];

var path = d3.geoPath();

var svg = d3.select('body')
  .select('svg')
  .attr('viewBox', `0 0 ${width} ${height}`)
  .style('width', '100%')
  .style('height', 'auto');

d3.json('https://d3js.org/us-10m.v1.json', function(error, us) {
  if (error) throw error;
  var data = topojson.feature(us, us.objects.states).features.map((feature, index) => {
    return Object.assign({ name: states[feature.id] }, feature);
  });

  var alaska = data.find(state => state.name === 'Alaska');
  var hawaii = data.find(state => state.name === 'Hawaii');
  data.splice(data.indexOf(alaska), 1);
  data.splice(data.indexOf(hawaii), 1);

  svg.append('g')
    .attr('class', 'states')
    .selectAll('path')
    .data(data)
    .enter().append('path')
    .attr('d', path)
    .style('stroke', '#fff')
    .style('stroke-width', '1')
    .style('fill', function(d) {
      return statesVisited.indexOf(d.name) < 0 ? defaultColor : visitedColor;
    });
});
