import {
    PieChartCreator
} from '../../../src/components/graph/pieChartCreator.js';

const {
    JSDOM
} = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const {
    window
} = jsdom;


describe('Pie Chart Creator', () => {
    var element, data, color;
    var pieChartCreator;


    beforeEach(() => {
        //Valid Params
        element = window.document.createElement('dummyElement');
        data = {
            percentages: [10, 20],
            title: 'Revenue',
            subtitle: '200.000€',
            data:[]
        };
        color = 'orange';
        pieChartCreator = new PieChartCreator(element, data, color);
    });


    it('should have its basic properties defined', () => {

        expect(pieChartCreator.width).toEqual(300);
        expect(pieChartCreator.height).toEqual(260);
        expect(pieChartCreator.radius).toEqual(90);
        expect(pieChartCreator.wrapperElement).toBeDefined();
        expect(pieChartCreator.data).toEqual(data);
        expect(pieChartCreator.color).toBeDefined();
    });

    describe('validateParams()', () => {
        it('should throw missing percentages error', () => {
            var exception;
            try {
                pieChartCreator.validateData({});
            } catch (e) {
                exception = e.message;
            }

            expect(exception).toEqual('Percentages missing in data');

        });

        it('should throw missing title error', () => {
            var exception;
            try {
                pieChartCreator.validateData({
                    percentages: {}
                });
            } catch (e) {
                exception = e.message;
            }

            expect(exception).toEqual('Title missing in data');

        });

        it('should throw missing subtitle error', () => {
            var exception;
            try {
                pieChartCreator.validateData({
                    percentages: 'defined',
                    title: 'defined'
                });
            } catch (e) {
                exception = e.message;
            }

            expect(exception).toEqual('Subtitle missing in data');
        });

        it('should throw missing data error', () => {
            var exception;
            try {
                pieChartCreator.validateData({
                    percentages: 'defined',
                    title: 'defined',
                    subtitle: 'defined'
                });
            } catch (e) {
                exception = e.message;
            }

            expect(exception).toEqual('Data missing in data');
        });

        it('should throw invalid color error', () => {
            var exception;
            try {
                pieChartCreator.validateColor('not-valid-color');
            } catch (e) {
                exception = e.message;
            }

            expect(exception).toEqual('Invalid color');
        });
    });

    describe('create()', () => {

        it('should call a sequence of functions', () => {

            spyOn(PieChartCreator.prototype, 'mainCanvas');
            spyOn(PieChartCreator.prototype, 'transformGroup');
            spyOn(PieChartCreator.prototype, 'addTitles');
            spyOn(PieChartCreator.prototype, 'addPieArcs');

            pieChartCreator.create();

            expect(PieChartCreator.prototype.mainCanvas).toHaveBeenCalled();
            expect(PieChartCreator.prototype.transformGroup).toHaveBeenCalled();
            expect(PieChartCreator.prototype.addTitles).toHaveBeenCalled();
            expect(PieChartCreator.prototype.addPieArcs).toHaveBeenCalled();
        });
    });

});