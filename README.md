# David Valentin's Graph Component

### Installation

```
npm install
```

### Start Development Server

```
npm start
```

### Build Production Version

```
npm run build
```

### Folder structure:

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
├── spec
│   ├── components                      --> Copying the same folder struncure as the 'src' folder
│   │   └── graph                       --> Graph component tests
│   │       ├── infoBoxHelper.spec.js   --> infoBoxHelper class tests
│   │       └── pieChartCreator.spec.js --> pieChartCreator class tests
│   ├── run.js                          --> Entry point for jasmine tests suits
│   └── support
│       └── jasmine.json                --> Jasmine config support file
├── src                             --> Code goes in here
│   ├── components                      --> Folder for all the diferent components, in this case only one
│   │   ├── graph                       --> Graph Component Folder. All files regarding one component
│   │   │   ├── graph.css               --> Styles for the component
│   │   │   ├── graph.html              --> Templates for the component
│   │   │   ├── graph.js                --> Main Js File for the component
│   │   │   ├── infoBox.js              --> Helper "subcomponent" file for the component
│   │   │   └── infoPieChart.js         --> Helper "subcomponent" file for the component
│   │   └── index.js                    --> Groups all the component, so we only have to import this index.js for all the components
│   ├── index.html                      --> APLICATION ENTRY POINT
│   ├── index.js                        --> MAIN APPLICATION JS FILE
│   ├── shared                          --> For all that stuff that multiple parts of the app could need not just one component
│   │   └── apiService.js               --> Shared apiService
│   └── styles                          --> Global styles
│       └── index.scss                  --> MAIN STYLES FILE
└── webpack --> Webpack stuff
    ├── webpack.common.js               --> Main webpack file
    ├── webpack.config.dev.js           --> Webpack dev config
    └── webpack.config.prod.js          --> Webpack prod config
```
