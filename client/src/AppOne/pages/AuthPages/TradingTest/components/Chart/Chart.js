import React, {useEffect, useState} from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5stock from '@amcharts/amcharts5/stock';
import {countFunc} from '../../../../../utils/chartRateUpdate';

const Chart = ({rate, initialData}) => {
    const [realRate, setRealRate] = useState(0)


    // const getRate = async () => {
    //     const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT`)
    //     const datas = await res.json()
    //     setRealRate(Number(datas.lastPrice))
    // }
    // useEffect(() => {
    //     getRate()
    //     setInterval(() => {
    //         getRate()
    //     }, 1000)
    // }, [])

    const createChart = async (val) => {
        let root = am5.Root.new("chartdiv");
        root.setThemes([am5themes_Animated.new(root)]);

        let stockChart = root.container.children.push(
          am5stock.StockChart.new(root, {})
        );

        root.numberFormatter.set("numberFormat", "#,###.00");
        let mainPanel = stockChart.panels.push(
          am5stock.StockPanel.new(root, {
              wheelY: "zoomX",
              panX: true,
              panY: true
          })
        );

        let valueAxis = mainPanel.yAxes.push(
          am5xy.ValueAxis.new(root, {
              renderer: am5xy.AxisRendererY.new(root, {
                  pan: "zoom"
              }),
              extraMin: 0.1, // adds some space for for main series
              tooltip: am5.Tooltip.new(root, {}),
              numberFormat: "#,###.00",
              extraTooltipPrecision: 2
          })
        );

        let dateAxis = mainPanel.xAxes.push(
          am5xy.GaplessDateAxis.new(root, {
              baseInterval: {
                  timeUnit: "minute",
                  count: 1
              },
              renderer: am5xy.AxisRendererX.new(root, {}),
              tooltip: am5.Tooltip.new(root, {})
          })
        );

        // add range which will show current value
        let currentValueDataItem = valueAxis.createAxisRange(valueAxis.makeDataItem({ value: 0 }));
        let currentLabel = currentValueDataItem.get("label");
        if (currentLabel) {
            currentLabel.setAll({
                fill: am5.color(0xffffff),
                background: am5.Rectangle.new(root, { fill: am5.color(0x000000) })
            })
        }

        let currentGrid = currentValueDataItem.get("grid");
        if (currentGrid) {
            currentGrid.setAll({ strokeOpacity: 0.5, strokeDasharray: [2, 5] });
        }

        // Add series
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let valueSeries = mainPanel.series.push(
          am5xy.CandlestickSeries.new(root, {
              name: "sfsdf",
              clustered: false,
              valueXField: "Date",
              valueYField: "Close",
              highValueYField: "High",
              lowValueYField: "Low",
              openValueYField: "Open",
              calculateAggregates: false,
              xAxis: dateAxis,
              yAxis: valueAxis,

          })
        );
        // Set main value series
        stockChart.set("stockSeries", valueSeries);


        let valueLegend = mainPanel.plotContainer.children.push(
          am5stock.StockLegend.new(root, {
              stockChart: stockChart
          })
        );

        // Set main series
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
        valueLegend.data.setAll([valueSeries]);


        mainPanel.set(
          "cursor",
          am5xy.XYCursor.new(root, {
              yAxis: valueAxis,
              xAxis: dateAxis,
              snapToSeries: [valueSeries],
              snapToSeriesBy: "y!"
          })
        );

        let scrollbar = mainPanel.set(
          "scrollbarX",
          am5xy.XYChartScrollbar.new(root, {
              orientation: "horizontal",
              height: 50
          })
        );
        stockChart.toolsContainer.children.push(scrollbar);

        let sbDateAxis = scrollbar.chart.xAxes.push(
          am5xy.GaplessDateAxis.new(root, {
              baseInterval: {
                  timeUnit: "minute",
                  count: 1
              },
              renderer: am5xy.AxisRendererX.new(root, {})
          })
        );

        let sbValueAxis = scrollbar.chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
              renderer: am5xy.AxisRendererY.new(root, {})
          })
        );

        let sbSeries = scrollbar.chart.series.push(
          am5xy.LineSeries.new(root, {
              valueYField: "Close",
              valueXField: "Date",
              xAxis: sbDateAxis,
              yAxis: sbValueAxis
          })
        );

        sbSeries.fills.template.setAll({
            visible: true,
            fillOpacity: 0.3
        });

        // Data generator
        let firstDate = new Date();
        let lastDate;
        let value = rate;

        function generateChartData() {
            let chartData = [];

            initialData.forEach((item, index) => {
                let newDate = new Date(firstDate);
                newDate.setMinutes(newDate.getMinutes() - index);


                let open = Number(item[1]);
                let low = Number(item[3]);
                let high = Number(item[2]);
                let close = Number(item[4])
                console.log('chartData', item);

                chartData.unshift({
                    Date: newDate.getTime(),
                    Close: close,
                    Open: open,
                    Low: low,
                    High: high
                });
                lastDate = newDate;
            })

            // for (let i = 0; i < 100; i++) {
            //     let newDate = new Date(firstDate);
            //     newDate.setMinutes(newDate.getMinutes() - i);
            //
            //     value += Math.round((Math.random() < 0.49 ? 1 : -1) * Math.random() * 10);
            //
            //     let open = value + Math.round(Math.random() * 16 - 8);
            //     let low = Math.min(value, open) - Math.round(Math.random() * 5);
            //     let high = Math.max(value, open) + Math.round(Math.random() * 5);
            //
            //     chartData.unshift({
            //         Date: newDate.getTime(),
            //         Close: value,
            //         Open: open,
            //         Low: low,
            //         High: high
            //     });
            //
            //     lastDate = newDate;
            //     console.log('chart data', chartData);
            // }
            return chartData;
        }
        let data = generateChartData();

        valueSeries.data.setAll(data);
        sbSeries.data.setAll(data);

        // update data
        let previousDate;
        let fnVal

        setInterval(async function() {
            let valueSeries = stockChart.get("stockSeries");
            let date = Date.now();
            let lastDataObject = valueSeries.data.getIndex(valueSeries.data.length - 1);
            let real
            const getRate = async () => {
                const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT`)
                real = await res.json()
                return Number(real.lastPrice)
            }

            let dataFromServer = true

            if (lastDataObject) {
                let previousDate = lastDataObject.Date;
                let previousValue = lastDataObject.Close;

                value = am5.math.round(
                  dataFromServer ? countFunc(60000, 1, previousValue, await getRate(), 100000) : await getRate());

                let high = lastDataObject.High;
                let low = lastDataObject.Low;
                let open = lastDataObject.Open;

                if (am5.time.checkChange(date, previousDate, "minute")) {
                    open = value;
                    high = value;
                    low = value;

                    let dObj1 = {
                        Date: date,
                        Close: value,
                        Open: value,
                        Low: value,
                        High: value
                    };

                    valueSeries.data.push(dObj1);
                    sbSeries.data.push(dObj1);
                    previousDate = date;
                    valueSeries.data.shift()
                } else {
                    if (value > high) {
                        high = value;
                    }

                    if (value < low) {
                        low = value;
                    }

                    let dObj2 = {
                        Date: date,
                        Close: value,
                        Open: open,
                        Low: low,
                        High: high
                    };

                    valueSeries.data.setIndex(valueSeries.data.length - 1, dObj2);
                    sbSeries.data.setIndex(sbSeries.data.length - 1, dObj2);
                }
                // update current value
                if (currentLabel) {
                    currentValueDataItem.animate({ key: "value", to: value, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
                    currentLabel.set("text", stockChart.getNumberFormatter().format(value));
                    let bg = currentLabel.get("background");
                    if (bg) {
                        if(value < open){
                            bg.set("fill", root.interfaceColors.get("negative"));
                        }
                        else{
                            bg.set("fill", root.interfaceColors.get("positive"));
                        }
                    }
                }
            }
        }, 1000);


    }

    useEffect(async () => {
        await createChart(rate)
    }, [])


    return (
        <div id="chartdiv" style={{width: '100%', height: '500px'}}/>
    )
}

export default Chart