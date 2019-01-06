import {
    InfoBoxHelper
} from '../../../src/components/graph/infoBoxHelper.js';

const {
    JSDOM
} = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const {
    window
} = jsdom;


describe('Info box helper', () => {
    var container, data, color;
    var infoBoxHelper;


    beforeEach(() => {
        var ids = ['i1t', 'i1p', 'i1v', 'i2t', 'i2p', 'i2v', 'info-box'];
        container = window.document.createElement('div');

        container.attachShadow({
            mode: 'open'
        });

        ids.forEach((id) => {
            var l = window.document.createElement('label');
            l.setAttribute("id", id);
            container.shadowRoot.appendChild(l);
        });

        data = {
            1: {
                title: "Tablet",
                percentage: "60%",
                value: "120.000€"
            },
            2: {
                title: "Smartphone",
                percentage: "40%",
                value: "80.000€"
            }
        };
        color = 'orange';
        infoBoxHelper = new InfoBoxHelper(container.shadowRoot, data, color);
    });


    it('should have its basic properties defined', () => {
        expect(infoBoxHelper.container).toBeDefined();
        expect(infoBoxHelper.data).toEqual(data);
        expect(infoBoxHelper.color).toEqual(color);
    });

    describe('validateData()', () => {
        it('should throw percentage missing error', () => {
            var invalidData = Object.assign(data);
            invalidData[1].percentage = undefined;

            var exception;
            try {
                infoBoxHelper.validateData(invalidData);
            } catch (e) {
                exception = e.message;
            }

            expect(exception).toContain('Percentage missing in data');
        });
        it('should throw value missing error', () => {
            var invalidData = Object.assign(data);
            invalidData[1].value = undefined;

            var exception;
            try {
                infoBoxHelper.validateData(invalidData);
            } catch (e) {
                exception = e.message;
            }

            expect(exception).toContain('Value missing in data');
        });
        it('should throw title missing error', () => {
            var invalidData = Object.assign(data);
            invalidData[1].title = undefined;

            var exception;
            try {
                infoBoxHelper.validateData(invalidData);
            } catch (e) {
                exception = e.message;
            }

            expect(exception).toContain('Title missing in data');
        });
    });

    describe('init()', ()=>{
        it('should set innerHTML of all subelements', ()=>{
            infoBoxHelper.init();
            expect(infoBoxHelper.container.getElementById('i1t').innerHTML).toEqual(data[1].title);
            expect(infoBoxHelper.container.getElementById('i1p').innerHTML).toEqual(data[1].percentage);
            expect(infoBoxHelper.container.getElementById('i1v').innerHTML).toEqual(data[1].value);
            expect(infoBoxHelper.container.getElementById('i2t').innerHTML).toEqual(data[2].title);
            expect(infoBoxHelper.container.getElementById('i2p').innerHTML).toEqual(data[2].percentage);
            expect(infoBoxHelper.container.getElementById('i2v').innerHTML).toEqual(data[2].value);
        });
    });
});