import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
    standalone: true,
    imports: [],
    template: `
        <div>
            Hi Admin,

            <div style="margin-top: 50px">
                <canvas
                    id="MyChart"
                    width="500"
                    height="350"
                >
                    {{ chart }}
                </canvas>
            </div>
        </div>
    `,
})
export class AppDashboardComponent implements OnInit {
    chart: any = [];

    ngOnInit() {
        this.chart = new Chart('MyChart', {
            type: 'line', //this denotes tha type of chart

            data: {// values on X-Axis
                labels: [
                    '2022-05-10',
                    '2022-05-11',
                    '2022-05-12',
                    '2022-05-13',
                    '2022-05-14',
                    '2022-05-15',
                    '2022-05-16',
                    '2022-05-17',
                ],
                datasets: [
                    {
                        label: 'Sales',
                        data: [
                            '467',
                            '576',
                            '572',
                            '79',
                            '92',
                            '574',
                            '573',
                            '576'
                        ],
                        backgroundColor: 'blue'
                    },
                    {
                        label: 'Profit',
                        data: [
                            '542',
                            '542',
                            '536',
                            '327',
                            '17',
                            '0.00',
                            '538',
                            '541'
                        ],
                        backgroundColor: 'limegreen'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }

        });
    }
}
