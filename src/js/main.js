// BI Tool with AI - Main Script

// Este archivo es el punto de entrada para las visualizaciones con D3.js
// y la integración con AI.

console.log('BI Tool with AI - Proyecto inicializado');

// Datos de ejemplo para una visualización básica
const data = [
    { name: 'Categoría A', value: 30 },
    { name: 'Categoría B', value: 80 },
    { name: 'Categoría C', value: 45 },
    { name: 'Categoría D', value: 60 },
    { name: 'Categoría E', value: 20 }
];

// Configuración del SVG y márgenes
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('#visualization').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// Escalas
const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height, 0]);

// Barras
svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.name))
    .attr('width', x.bandwidth())
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))
    .attr('fill', '#007BFF');

// Eje X
svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Eje Y
svg.append('g')
    .call(d3.axisLeft(y));

// Etiquetas de los ejes
svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Valor');

svg.append('text')
    .attr('transform', `translate(${width/2}, ${height + margin.bottom - 10})`)
    .style('text-anchor', 'middle')
    .text('Categoría');
