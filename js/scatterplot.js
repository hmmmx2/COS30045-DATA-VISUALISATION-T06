// scatterplot.js - Scatterplot visualization for TV Energy Consumption

/**
 * Draw scatterplot showing Energy Consumption by Star Rating
 * Color-coded by screen technology, with tooltips for screen size
 * @param {Array} data - Complete TV dataset
 */
const drawScatterplot = (data) => {
    console.log("Drawing scatterplot...");

    // ========== SET UP CHART AREA ==========
    // Select the scatterplot div and create responsive SVG
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)  // Responsive SVG
        .attr("preserveAspectRatio", "xMidYMid meet");

    // Create inner chart group with margins
    // IMPORTANT: Assign to existing innerChartS variable (not const innerChartS)
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // ========== SET UP X AND Y SCALES ==========
    // Calculate data extents
    const xExtent = d3.extent(data, d => d.star);
    const yExtent = d3.extent(data, d => d.screenSize);

    console.log("Star rating extent:", xExtent);
    console.log("Screen size extent:", yExtent);

    // Configure x scale (Star Rating) with 0.5 padding on both sides
    xScaleS
        .domain([xExtent[0] - 0.5, xExtent[1] + 0.5])
        .range([0, innerWidth]);

    // Configure y scale (Screen Size) with nice rounding
    yScaleS
        .domain([yExtent[0], yExtent[1]])
        .range([innerHeight, 0])
        .nice();  // Round to nice values

    // ========== SET UP COLOR SCALE ==========
    // Get unique screen technologies from data
    const uniqueTechs = [...new Set(data.map(d => d.screenTech))];
    console.log("Screen technologies:", uniqueTechs);

    // Configure color scale with predefined color scheme
    colorScale
        .domain(uniqueTechs)  // ["LED", "LCD", "OLED"]
        .range(d3.schemeCategory10);  // Use D3's built-in color scheme

    // ========== DRAW CIRCLES ==========
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.screenSize))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);  // Semi-transparent to see overlapping points

    console.log("✓ Circles drawn:", data.length);

    // ========== ADD BOTTOM AXIS (Star Rating) ==========
    const bottomAxis = d3.axisBottom(xScaleS);
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add x-axis label
    svg.append("text")
        .text("Star Rating")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    // ========== ADD LEFT AXIS (Screen Size) ==========
    const leftAxis = d3.axisLeft(yScaleS);
    innerChartS.append("g")
        .call(leftAxis);

    // Add y-axis label
    svg.append("text")
        .text("Screen size (inches)")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");

    // ========== ADD LEGEND ==========
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width - 140}, ${margin.top})`);

    uniqueTechs.forEach((tech, i) => {
        const g = legend.append('g')
            .attr('transform', `translate(0, ${i * 22})`);

        // Colored rectangle
        g.append('rect')
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', colorScale(tech));

        // Technology label
        g.append('text')
            .attr('x', 18)
            .attr('y', 10)
            .text(tech)
            .attr('class', 'axis-label');
    });

    console.log("✓ Scatterplot completed successfully");
};

console.log("✓ Scatterplot functions loaded successfully");