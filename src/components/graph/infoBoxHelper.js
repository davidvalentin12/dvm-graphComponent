export class InfoBoxHelper {
    constructor(container, data, color) {
        if (!this.validateContainer(container) && !this.validateData(data)) {
            throw new Error('Invalid Params for infobox creation');
        }
        this.container = container;
        this.data = data;
        this.color = color;

        return this;
    }
    /**
     * Init()
     * 
     * Adds color class.
     * Searches for each element that will show data, and updates its innerHTML.
     */
    init() {
        //Add style class to info box
        this.container.getElementById('info-box').classList.add(this.color);

        //Add data content
        this.container.getElementById('i1t').innerHTML = this.data[1].title;
        this.container.getElementById('i1p').innerHTML = this.data[1].percentage;
        this.container.getElementById('i1v').innerHTML = this.data[1].value;

        this.container.getElementById('i2t').innerHTML = this.data[2].title;
        this.container.getElementById('i2p').innerHTML = this.data[2].percentage;
        this.container.getElementById('i2v').innerHTML = this.data[2].value;
    }
    /**
     * Validates the data object
     * 
     * @param {Object} data 
     */
    validateData(data){
        if(data[1].percentage == undefined || data[2].percentage == undefined ){
            throw new InfoBoxDataError('Percentage missing in data');
        }

        if(data[1].value == undefined || data[2].value == undefined){
            throw new InfoBoxDataError('Value missing in data');
        }
        
        if(data[1].title == undefined || data[2].title == undefined){
            throw new InfoBoxDataError('Title missing in data');
        }

        return true;
    }
    /**
     * Validates that the container shadow root has all necesary subelements with right id's
     * 
     * @param {ShadowRoot} container 
     */
    validateContainer(container) {
        try {
            container.getElementById('i1t').innerHTML;
            container.getElementById('i1p').innerHTML;
            container.getElementById('i1v').innerHTML;
            container.getElementById('i2t').innerHTML;
            container.getElementById('i2p').innerHTML;
            container.getElementById('i2v').innerHTML;
            container.getElementById('info-box').innerHTML;
        } catch (err) {
            throw new Error("You have to define elements with this ids: i1t, i1p, i1v, i2t, i2p, i2v inside your infoBox section");
        }
    }
}

/**
 * Helper class to give more descriptive error when data is missing
 */
class InfoBoxDataError extends Error{
    constructor(msg){
        var jsonExample = {
            1: {
                title: "Tablet",
                percentage: "80%",
                value: "480.000.000"
            },
            2: {
                title: "Smartphone",
                percentage: "20%",
                value: "120.000.000"
            }
        };
        super(msg+" Example Json: \n" + JSON.stringify(jsonExample));

    }
}
