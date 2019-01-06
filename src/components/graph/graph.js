import {ApiService} from '../../shared/apiService.js';
import {PieChartCreator} from './pieChartCreator';
import {InfoBoxHelper} from './infoBoxHelper';
import componentTemplate from './graph.html';

let template = document.createElement('template');
template.innerHTML = componentTemplate;

export class DvmGraph extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    var data = new ApiService().getData(this.dataset.id);
    var color = this.dataset.color;
    new PieChartCreator(this.shadowRoot.getElementById('pie-chart'), data.graph, color).create().addLineChart();
    new InfoBoxHelper(this.shadowRoot, data.infoBox, color).init();
  }
}