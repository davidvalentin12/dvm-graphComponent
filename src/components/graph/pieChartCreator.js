var d3 = require("d3");
import {
    getColor
} from '../../shared/colorService.js';
import {
    LineChartCreator
} from './lineChartCreator';

export class PieChartCreator {
    constructor(element, data, color) {
        if (!this.validateParams(element, data, color)) {
            throw new Error('Invalid Params for PieChart Creation');
        }

        this.width = 300;
        this.height = 260;
        this.radius = this.width / 3 - 10;
        this.wrapperElement = d3.select(element);
        this.data = data;
        this.color = color;

        return this;
    }
    /**
     *  Create()
     *  Creates the canvas, adds transformed g element.
     *  Adds titles and pie arcs
     *  
     */
    create() {
        this.scaleColor = d3.scaleOrdinal().range(getColor(this.color));
        this.canvas = this.mainCanvas();
        this.transformGroup = this.transformGroup();
        this.addTitles(this.data.title, this.data.subtitle);
        this.addPieArcs(this.data.percentages);
        this.addSideStrokes();

        return this;
    }

    /**
     *  Adds the line chart to the existing pie chart
     */
    addLineChart() {
        if (this.canvas) {
            new LineChartCreator(this.canvas, this.data.data, this.color).create();
        } else {
            throw Error('You need to create() the pie chart first, in order to add the line chart');
        }
        return this;
    }

    /**
     *  Creates the main canvas for the pie chart
     * 
     */
    mainCanvas() {
        return this.wrapperElement.append("svg")
            .attr("viewBox", "0 0 " + this.width + " " + this.height + "");
    }
    /**
     * Creates main transform group translated so its positioned in the middle of the canvas
     */
    transformGroup() {
        return this.canvas.append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
    }
    /**
     * Adds two text elements to the transform group.
     * Centers them in the middle of the graph.
     * 
     * @param {String} title        Main centered text of the pie chart
     * @param {String} subtitle     Secondary centered text of the pie chart
     */
    addTitles(title, subtitle) {
        //TITLE
        if (title !== undefined) {
            this.transformGroup.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "20px")
                .attr('y', -20)
                .attr("fill", getColor('gray')[0])
                .text(title.toUpperCase());
        }

        //SUBTITLE
        if (subtitle !== undefined) {
            this.transformGroup.append("text")
                .attr("text-anchor", "middle")
                .attr('y', 10)
                .attr("font-size", "25px")
                .attr("fill", getColor('gray')[1])
                .text(subtitle);
        }
    }
    /**
     * 
     * Creates arcs on a d3 pie element. 
     * Adds the arcs to the transform group with a specific color.
     * 
     * @param {Array<Number>} percentages Array of number values
     */
    addPieArcs(percentages) {
        //Arcs
        var arc = d3.arc()
            .innerRadius(this.width / 3)
            .outerRadius(this.radius);

        //Pie 
        var pie = d3.pie()
            .value((d)=> {
                return d;
            }).sort(null);

        //Arcs population
        var arcs = this.transformGroup.selectAll(".arc")
            .data(pie(percentages))
            .enter()
            .append("g")
            .attr("class", "arc");

        //Arc append
        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d) => {
                return this.scaleColor(d.data);
            });
    }
    /**
     * Add little strokes to the sides of the pie chart
     */
    addSideStrokes() {
        var strokes = [{
                x1: -this.width / 2 + 63,
                x2: -this.width / 2 + 67,
                y1: 0,
                y2: 0
            },
            {
                x1: this.width / 2 - 63,
                x2: this.width / 2 - 67,
                y1: 0,
                y2: 0
            },
            {
                x1: 0,
                x2: 0,
                y1: -this.height / 2 + 47,
                y2: -this.height / 2 + 43,
            },
            {
                x1: 0,
                x2: 0,
                y1: this.height / 2 - 47,
                y2: this.height / 2 - 43,
            }
        ];
        if (this.transformGroup !== undefined) {
            strokes.forEach((stroke) => {
                this.transformGroup.append("line")
                    .attr("x1", stroke.x1)
                    .attr("y1", stroke.y1)
                    .attr("x2", stroke.x2)
                    .attr("y2", stroke.y2)
                    .attr("stroke-width", 2)
                    .attr("stroke", getColor('gray')[0]);
            });
        }
    }

    /**
     * 
     * Validates the params, so the chart creator has everything he needs to complete his task
     * 
     * @param {Element} element     Main element where the chart will be drawn inside
     * @param {Object} data         Data object that will be used to create the chart
     * @param {String} color        Specific color of the chart (Orange, blue or green)
     * 
     * @returns {Bool}  True if all params are as they should. Else an error will be thrown
     */
    validateParams(element, data, color) {
        if (element !== undefined && this.validateData(data) && this.validateColor(color)) {
            return true;
        }
    }
    /**
     * Validates the structure and content of the data object
     * 
     * @param {Object} data  Data object to validate
     * 
     * @returns {Bool}  True if no error occures before.
     */
    validateData(data) {
        if (data.percentages == undefined) {
            throw new Error('Percentages missing in data');
        }

        if (data.title == undefined) {
            throw new Error('Title missing in data');
        }

        if (data.subtitle == undefined) {
            throw new Error('Subtitle missing in data');
        }

        if (data.data == undefined) {
            throw new Error('Data missing in data');
        }

        return true;
    }


    /**
     * Validates if the string is a valid color
     * 
     * @param {String} color  Color
     * 
     * @returns {Bool}  True if the color is valid
     */
    validateColor(color) {
        if (!['orange', 'blue', 'green'].includes(color)) {
            throw new Error('Invalid color');
        }
        return true;

    }
}