// load-data.js - Load and process TV data from CSV

console.log("Loading TV data from CSV...");

// Load the CSV file with row conversion function
d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,              // Convert to number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // Convert to number
    star: +d.star                            // Convert to number
})).then(data => {
    // Log the processed data to console for verification
    console.log("Data loaded successfully!");
    console.log("Total records:", data.length);
    console.log("Sample data (first 3 rows):", data.slice(0, 3));
    
    // Verify data structure
    console.log("Data columns:", Object.keys(data[0]));
    
    // Call functions after data is loaded
    console.log("Initializing histogram, scatterplot, filters, and tooltips...");
    
    // Draw visualizations
    drawHistogram(data);
    drawScatterplot(data);
    
    // Set up filters
    populateFilters(data);
    
    // Set up tooltips and interactions
    createTooltip(data);
    handleMouseEvents();
    
    console.log("✓ All visualizations initialized successfully");
    
}).catch(error => {
    // Handle any errors during data loading
    console.error("Error loading the CSV file:", error);
    
    // Display error message to user
    d3.select("#histogram")
        .append("div")
        .style("padding", "40px")
        .style("text-align", "center")
        .style("color", "#7D6744")
        .html(`
            <h3>Error Loading Data</h3>
            <p>Could not load the TV energy consumption data.</p>
            <p>Please check that the file <code>data/Ex6_TVdata.csv</code> exists.</p>
            <p style="font-size: 0.9em; color: #999;">Error: ${error.message}</p>
        `);
});

console.log("✓ Load-data script initialized");