// interactions.js - Filter button creation, tooltip, and interaction logic

/**
 * Populate filter buttons and set up click handlers
 * @param {Array} data - Complete TV dataset
 */
const populateFilters = (data) => {
    console.log("Creating filter buttons...");

    // ========== CREATE FILTER BUTTONS ==========
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)  // Set initial active state
        .text(d => d.label)  // Button text from filters_screen array
        
        // ========== ADD CLICK EVENT LISTENER ==========
        .on("click", (event, clickedFilter) => {
            console.log("Clicked filter:", clickedFilter.id);

            // ========== CHECK IF ALREADY ACTIVE ==========
            if (!clickedFilter.isActive) {
                
                // ========== UPDATE ACTIVE STATES ==========
                // Only one filter can be active at a time
                filters_screen.forEach(filter => {
                    filter.isActive = filter.id === clickedFilter.id ? true : false;
                });

                console.log("Updated filter states:", filters_screen);

                // ========== UPDATE CSS CLASSES ON BUTTONS ==========
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === clickedFilter.id ? true : false);

                // ========== CALL UPDATE FUNCTION ==========
                updateHistogram(clickedFilter.id, data);
            }
        });

    console.log("✓ Filter buttons created successfully");
};

/**
 * Update histogram based on selected filter
 * @param {String} filterId - ID of the selected filter ("all", "LED", "LCD", "OLED")
 * @param {Array} data - Complete TV dataset
 */
const updateHistogram = (filterId, data) => {
    console.log("Filtering data by:", filterId);

    // ========== FILTER DATA ==========
    const updatedData = filterId === "all"
        ? data  // Show all data
        : data.filter(tv => tv.screenTech === filterId);  // Filter by screen tech

    console.log("Filtered data count:", updatedData.length);

    // ========== UPDATE HISTOGRAM ==========
    updateHistogramBars(updatedData);
};

// ========== TOOLTIP FUNCTIONS ==========

/**
 * Create tooltip element for scatterplot
 * @param {Array} data - Complete TV dataset (not currently used but included for consistency)
 */
const createTooltip = (data) => {
    console.log("Creating tooltip...");

    // ========== APPEND TOOLTIP GROUP TO SCATTERPLOT ==========
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);  // Initially hidden

    // ========== APPEND TOOLTIP BACKGROUND RECTANGLE ==========
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)  // Rounded corners
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);  // Semi-transparent

    // ========== APPEND TOOLTIP TEXT ==========
    tooltip
        .append("text")
        .text("NA")  // Placeholder text
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);

    console.log("✓ Tooltip created successfully");
};

/**
 * Add mouse event listeners to scatterplot circles
 */
const handleMouseEvents = () => {
    console.log("Setting up mouse event handlers...");

    // Select the tooltip group
    const tooltip = innerChartS.select(".tooltip");
    const tooltipText = tooltip.select("text");

    // ========== SELECT ALL CIRCLES IN SCATTERPLOT ==========
    innerChartS.selectAll("circle")
        
        // ========== MOUSEENTER EVENT ==========
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // Update tooltip text with screen size
            tooltipText.text(d.screenSize);

            // Get circle position
            const circleX = xScaleS(d.star);
            const circleY = yScaleS(d.screenSize);

            // Position tooltip above the circle
            // Offset: center horizontally, position above circle
            const tooltipX = circleX - tooltipWidth / 2;
            const tooltipY = circleY - tooltipHeight - 8;  // 8px gap above circle

            // Move tooltip to position and make visible
            tooltip
                .attr("transform", `translate(${tooltipX}, ${tooltipY})`)
                .style("opacity", 1);  // Make visible
        })
        
        // ========== MOUSELEAVE EVENT ==========
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // Hide tooltip
            tooltip.style("opacity", 0);
        });

    console.log("✓ Mouse event handlers attached successfully");
};

console.log("✓ Interaction functions loaded successfully");