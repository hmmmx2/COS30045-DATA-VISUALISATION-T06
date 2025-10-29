// histogram.js - Histogram rendering and update functions

/**
 * Draw the initial histogram
 * @param {Array} data - Array of TV data objects
 */
const drawHistogram = (data) => {
    console.log("Drawing histogram with", data.length, "data points");

    // ========== STEP 1: SET UP CHART AREA ==========
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)  // Responsive SVG
        .attr("preserveAspectRatio", "xMidYMid meet");

    // Create inner chart group with margins (Dufour & Meeks strategy)
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // ========== STEP 2: GENERATE BINS ==========
    const bins = binGenerator(data);
    console.log("Generated", bins.length, "bins");
    console.log("Sample bin:", bins[0]);

    // ========== STEP 3: DEFINE SCALES ==========
    const minEng = bins[0].x0;                      // Lower bound of first bin
    const maxEng = bins[bins.length - 1].x1;        // Upper bound of last bin
    const binsMaxLength = d3.max(bins, d => d.length);  // Max frequency

    // Configure X scale (energy consumption)
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    // Configure Y scale (frequency)
    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])  // Inverted: SVG coordinates
        .nice();  // Round to nice numbers

    // ========== STEP 4: DRAW HISTOGRAM BARS ==========
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))                          // Bar left edge
        .attr("y", d => yScale(d.length))                      // Bar top edge
        .attr("width", d => xScale(d.x1) - xScale(d.x0))       // Bar width
        .attr("height", d => innerHeight - yScale(d.length))   // Bar height
        .attr("fill", barColor)                                // Gray fill
        .attr("stroke", bodyBackgroundColor)                   // Cream stroke
        .attr("stroke-width", 2);                              // Gap appearance

    // ========== STEP 5: ADD BOTTOM AXIS (X-AXIS) ==========
    const bottomAxis = d3.axisBottom(xScale);

    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)  // Move to bottom
        .call(bottomAxis);

    // Add X-axis label
    svg
        .append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    // ========== STEP 6: ADD LEFT AXIS (Y-AXIS) ==========
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .call(leftAxis);

    // Add Y-axis label
    svg
        .append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");

    console.log("✓ Histogram rendered successfully");
};

/**
 * Update histogram with filtered data
 * @param {Array} filteredData - Filtered array of TV data
 */
const updateHistogramBars = (filteredData) => {
    console.log("Updating histogram with", filteredData.length, "data points");

    // ========== REGENERATE BINS ==========
    const updatedBins = binGenerator(filteredData);

    // ========== UPDATE SCALES ==========
    const minEng = updatedBins[0].x0;
    const maxEng = updatedBins[updatedBins.length - 1].x1;
    const binsMaxLength = d3.max(updatedBins, d => d.length);

    xScale.domain([minEng, maxEng]);
    yScale.domain([0, binsMaxLength]).nice();

    // ========== UPDATE BARS WITH TRANSITION ==========
    d3.select("#histogram svg g")
        .selectAll("rect")
        .data(updatedBins)
        .join("rect")
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    // ========== UPDATE AXES ==========
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    d3.select("#histogram svg g")
        .selectAll("g")
        .filter(function() { 
            return this.getAttribute("transform") === `translate(0, ${innerHeight})`; 
        })
        .transition()
        .duration(500)
        .call(bottomAxis);

    d3.select("#histogram svg g")
        .selectAll("g")
        .filter(function() { 
            return !this.getAttribute("transform"); 
        })
        .transition()
        .duration(500)
        .call(leftAxis);

    console.log("✓ Histogram updated successfully");
};

console.log("✓ Histogram functions loaded successfully");