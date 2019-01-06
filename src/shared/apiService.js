export class ApiService {
    constructor() {
        return this;
    }

    /**
     * Helper functions that simulates an api call.
     * 
     * @param {integer} id           Id of the data we want to receive from the backend
     * 
     * @returns {json} Returns a data object with graph and infobox information
     ``` 
    {
            graph: {
                percentages: [85, 15],
                title: "Visits",
                subtitle: "600.000.000",
                data: [
                [0, 5],
                [1, 5],
                ...
                ]
            },
            infoBox: {
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
            }
     ```
     */
    getData(id) {
        return data[id];
    }
}

const data = {
    1: {
        graph: {
            percentages: [10, 20],
            title: "Revenue",
            subtitle: "200.000€",
            data: [
                [0, 5],
                [1, 5],
                [2, 5],
                [3, 5],
                [4, 5],
                [5, 5.3],
                [6, 5.5],
                [7, 6],
                [8, 6],
                [9, 6.5],
                [10, 6.2],
                [11, 6.5],
                [12, 6.8],
                [13, 6.5],
                [14, 6.5],
                [15, 6.7],
                [16, 6.9],
                [17, 7],
                [18, 7.2],
                [19, 7],
                [20, 7]
            ]
        },
        infoBox: {
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
        }
    },
    2: {
        graph: {
            percentages: [20, 10],
            title: "Impresions",
            subtitle: "50.000.000",
            data: [
                [0, 7],
                [1, 7],
                [2, 7],
                [3, 6.8],
                [4, 6.5],
                [5, 6.6],
                [6, 6.5],
                [7, 6],
                [8, 6.3],
                [9, 6.5],
                [10, 6],
                [11, 6],
                [12, 5.8],
                [13, 5.6],
                [14, 5.9],
                [15, 5.6],
                [16, 5.3],
                [17, 5],
                [18, 5],
                [19, 5.4],
                [20, 5]
            ]
        },
        infoBox: {
            1: {
                title: "Tablet",
                percentage: "40%",
                value: "20.000.000"
            },
            2: {
                title: "Smartphone",
                percentage: "60%",
                value: "30.000.000"
            }
        }
    },
    3: {
        graph: {
            percentages: [15, 85],
            title: "Visits",
            subtitle: "600.000.000",
            data: [
                [0, 5],
                [1, 5],
                [2, 5],
                [3, 5],
                [4, 5],
                [5, 5.3],
                [6, 5.5],
                [7, 6],
                [8, 6],
                [9, 6.5],
                [10, 6.2],
                [11, 6.5],
                [12, 6.8],
                [13, 6.5],
                [14, 6.5],
                [15, 6.7],
                [16, 6.9],
                [17, 7],
                [18, 7.2],
                [19, 7],
                [20, 7]
            ]
        },
        infoBox: {
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
        }
    }
};