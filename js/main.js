const data = [
    {campus: "UT KNOXVILLE", enrollment: 29460, color: '#fd8105' },
    {campus: "UT CHATTANOOGA", enrollment:11590, color:'#ecaa1f'},
    {campus: "MARTIN", enrollment: 7280, color: '#0e223f'},
    {campus: "HEALTH SCIENCE CENTER", enrollment: 2815, color: '#036646'}
];
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 500 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
    .domain(data.map(d => d.campus))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.enrollment)])
    .range([height, 0]);

const color = d3.scaleOrdinal()
    .domain(data.map(d => d.campus))
    .range(data.map(d => d.color));

svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.campus))
    .attr("y", d => y(d.enrollment))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.enrollment))
    .attr("fill", d => color(d.campus));

svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(10).tickSize(-width));