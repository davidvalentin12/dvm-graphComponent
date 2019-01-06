var d3 = require("d3");
import {
    getColor
} from '../../shared/colorService.js';
export class LineChartCreator {
    constructor(canvas, data, color) {
        this.transformGroupPosition = {
            w: 60,
            h: 150
        };
        this.canvas = canvas;
        this.data = data;
        this.color = color;
        return this;
    }
    /**
     *  Create()
     *  Creates transform gorup 
     *  Calculates range of line chart
     *  Adds line to graph
     *  Adds area to graph
     *  Clips graph
     */
    create() {
        this.transformGroup = this.transformGroup();
        var range = this.getRange(this.data);
        this.addLine(range, this.data, this.color);
        this.addArea(range, this.data, this.color);
        this.clipLineChart();
    }

    /**
     * Creates main transform group translated so its positioned in the middle of the canvas
     */
    transformGroup() {
        return this.canvas.append("g")
            .attr("transform", "translate(" + this.transformGroupPosition.w + "," + this.transformGroupPosition.h + ")");
    }
    /**
     * Calculates 'x' and 'y' range for the line chart.
     * 
     * @param {Object} data  Data used to draw the chart
     * 
     * @return {Object} Returns object containing 'x' and 'y' values for the line chart range.
     */
    getRange(data) {
        var x = d3.scaleTime().range([0, this.transformGroupPosition.w * 3]);
        var y = d3.scaleLinear().range([this.transformGroupPosition.h / 2, 0]);
        // scale the range of the data
        x.domain(d3.extent(data, (d) => {
            return d[0];
        }));
        y.domain([0, d3.max(data, (d) => {
            return d[1];
        })]);
        return {
            x: x,
            y: y
        };
    }
    /**
     * Appends a line to the transform group
     * 
     * @param {Object} range  {x, y} range values for the line
     * @param {Array} data  data to draw the line 
     * @param {String} color  color to get the right color for the line
     */
    addLine(range, data, color) {
        // define the line
        var valueline = d3.line()
            .curve(d3.curveCardinal)
            .x((d) => {
                return range.x(d[0]);
            })
            .y((d) => {
                return range.y(d[1]);
            });
        // append line
        this.transformGroup.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", () => {
                return getColor(color)[1];
            })
            .attr("stroke-opacity", 0.5)
            .attr("clip-path", "url(#ellipse-clip)")
            .attr("fill", 'transparent')
            .attr("d", valueline);
    }
    /**
     * Appends an area to the transform group
     * 
     * @param {*} range   {x, y} range values for the area
     * @param {*} data   data to draw the area
     * @param {*} color   color to get the right color for the area
     */
    addArea(range, data, color) {
        // define the area
        var area = d3.area()
            .curve(d3.curveCardinal)
            .x((d) => {
                return range.x(d[0]);
            })
            .y0(70)
            .y1((d)=> {
                return range.y(d[1]);
            });
        // Append area
        this.transformGroup.append("path")
            .data([data])
            .attr("class", "area")
            .attr("fill", getColor(color)[1])
            .attr("clip-path", "url(#ellipse-clip)")
            .attr("fill-opacity", "0.1")
            .attr("d", area);
    }
    /**
     * Adds a clipPath to the transform group which other elements (line and are) will use as "clip-path" attribute
     */
    clipLineChart() {
        this.transformGroup.append("clipPath")
            .attr("id", "ellipse-clip")
            .append("ellipse")
            .attr("cx", this.transformGroupPosition.w + 30)
            .attr("cy", this.transformGroupPosition.h - 170)
            .attr("rx", 80)
            .attr("ry", 80);
    }
}