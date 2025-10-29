// shared-constants.js - Global constants for T06 Interactive Histogram and Scatterplot

// ========== DIMENSIONS & MARGINS ==========
// Using Dufour & Meeks (2024) Inner Chart strategy
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;   // Total SVG width
const height = 400;  // Total SVG height
const innerWidth = width - margin.left - margin.right;   // 640px
const innerHeight = height - margin.top - margin.bottom; // 310px

// ========== SCATTERPLOT INNER CHART ==========
// Separate innerChart reference for scatterplot (to avoid conflicts with histogram)
let innerChartS;  // Will be assigned in scatterplot.js

// ========== TOOLTIP DIMENSIONS ==========
const tooltipWidth = 65;
const tooltipHeight = 32;

// ========== COLORS ==========
// Customize these to match your color scheme
const barColor = "#606464";              // Gray for histogram bars
const bodyBackgroundColor = "#fffaf0";   // Cream/beige for bar gaps (matches background)

// ========== HISTOGRAM SCALES ==========
// Global scales for histogram - will be configured in histogram.js
const xScale = d3.scaleLinear();  // Energy consumption scale (X-axis)
const yScale = d3.scaleLinear();  // Frequency scale (Y-axis)

// ========== SCATTERPLOT SCALES ==========
// Separate scales for scatterplot to avoid conflicts with histogram
const xScaleS = d3.scaleLinear();  // Star rating scale (X-axis)
const yScaleS = d3.scaleLinear();  // Screen size scale (Y-axis)
const colorScale = d3.scaleOrdinal();  // Color scale for screen technology

// ========== BIN GENERATOR ==========
// Global bin generator - reused when filtering data
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);  // Bin by energy consumption
    // Note: You can change this to d.screenSize to bin by screen size instead

// ========== FILTER CONFIGURATION ==========
// Filter options for screen technology
const filters_screen = [
    { id: "all",  label: "All",  isActive: true },   // Default: show all data
    { id: "LED",  label: "LED",  isActive: false },
    { id: "LCD",  label: "LCD",  isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Optional: Screen size filters (uncomment to use)
// const size_filters = [
//     { id: "all", label: "All Sizes", isActive: true },
//     { id: "24", label: "24\"", isActive: false },
//     { id: "32", label: "32\"", isActive: false },
//     { id: "55", label: "55\"", isActive: false },
//     { id: "65", label: "65\"", isActive: false },
//     { id: "98", label: "98\"", isActive: false }
// ];

console.log("✓ Shared constants loaded successfully");