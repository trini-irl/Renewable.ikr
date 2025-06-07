import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { EnergyData } from '../types/energy';

interface EnergyChartProps {
  data: EnergyData[];
  width?: number;
  height?: number;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ 
  data, 
  width = 800, 
  height = 400 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.country))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total) || 0])
      .range([innerHeight, 0]);

    const colorScale = {
      solar: '#f97316',
      wind: '#06b6d4', 
      hydro: '#10b981'
    };

    // Stack data
    const stack = d3.stack<EnergyData>()
      .keys(['hydro', 'wind', 'solar'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(data);

    // Create bars with animation
    const groups = g.selectAll('.energy-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'energy-group')
      .attr('transform', d => `translate(${xScale(d.country)}, 0)`);

    // Add stacked bars
    stackedData.forEach((layer, i) => {
      const energyType = layer.key as keyof typeof colorScale;
      
      groups.selectAll(`.bar-${energyType}`)
        .data(layer)
        .enter()
        .append('rect')
        .attr('class', `bar-${energyType}`)
        .attr('x', 0)
        .attr('y', innerHeight)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('fill', colorScale[energyType])
        .attr('opacity', 0.8)
        .on('mouseover', function(event, d) {
          d3.select(this).attr('opacity', 1);
        })
        .on('mouseout', function(event, d) {
          d3.select(this).attr('opacity', 0.8);
        })
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .ease(d3.easeBackOut)
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]));
    });

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("fill", "#94a3b8")
      .style("font-size", "12px")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "#94a3b8")
      .style("font-size", "12px");

    // Y Axis Label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (innerHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "#94a3b8")
      .style("font-size", "14px")
      .text("Capacity (GW)");

    // Legend
    const legend = g.append("g")
      .attr("transform", `translate(${innerWidth - 120}, 20)`);

    const legendData = [
      { key: 'solar', label: 'Solar', color: colorScale.solar },
      { key: 'wind', label: 'Wind', color: colorScale.wind },
      { key: 'hydro', label: 'Hydro', color: colorScale.hydro }
    ];

    const legendItems = legend.selectAll('.legend-item')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`);

    legendItems.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', d => d.color)
      .attr('opacity', 0.8);

    legendItems.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .style('fill', '#94a3b8')
      .style('font-size', '12px')
      .text(d => d.label);

  }, [data, width, height]);

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-bold text-white mb-4">Renewable Energy Capacity by Country</h3>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  );
};

export default EnergyChart;