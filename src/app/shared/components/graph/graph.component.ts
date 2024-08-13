import { Component, OnInit } from '@angular/core';
import cytoscape from 'cytoscape';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initializeCytoscape();
  }
  initializeCytoscape(): void {
    const cy = cytoscape({
      container: document.getElementById('cy'), // Container element
      
      elements: {
        nodes: [
          { data: { id: 'OPCUA', label: 'OPCUA' } },
          { data: { id: 'MT-Connect', label: 'MT-Connect' } },
          { data: { id: 'Bridge', label: 'NexaSense Bridge' } },
          { data: { id: 'MQTT-broker', label: 'MQTT Broker' } }
        ],
        edges: [
          { data: { id: 'edge1', source: 'OPCUA', target: 'Bridge' } },
          { data: { id: 'edge2', source: 'MT-Connect', target: 'Bridge' } },
          { data: { id: 'edge3', source: 'Bridge', target: 'MQTT-broker' } }
        ]
      },
      
      style: [ 
        {
          selector: 'node',
          style: {
            'background-color': '#2ECC71',
            'label': 'data(label)',
            'text-valign': 'center',
            'color': '#fff',
            'text-outline-width': 0,
            'text-outline-color': '#0074D9',
            'width': '60px',
            'height': '60px',
            'font-size': '12px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 4,
            'line-color': '#999',
            'target-arrow-color': '#999',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
  
      layout: { 
        name: 'preset', // Use preset layout to manually position nodes
      }
    });
  
    // Manually set the position of each node
    cy.$('#MQTT-Broker').position({ x: 200, y: 100 }); // Top center
    cy.$('#Bridge').position({ x: 200, y: 40 }); // Top center
    cy.$('#OPCUA').position({ x: 50, y: 400}); // Bottom left
    cy.$('#MT-Connect').position({ x: 350, y: 400 }); // Bottom right
  
    // Trigger a repositioning of the elements
    cy.fit();
  }
  
  
  
}
