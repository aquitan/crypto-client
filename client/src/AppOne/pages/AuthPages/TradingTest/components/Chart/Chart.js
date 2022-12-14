import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5stock from '@amcharts/amcharts5/stock';
import {countFunc} from '../../../../../utils/chartRateUpdate';
import {useValueContext} from '../../../../../context/ValueContext';
import ButtonCard from '../../../../../components/ButtonCard/ButtonCard';
import { Button, Zoom } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { putData } from '../../../../../services/StaffServices';
import { useThemeContext } from '../../../../../context/ThemeContext';
import { ZoomControl } from '@amcharts/amcharts5/.internal/charts/map/ZoomControl';
import { getSwitchQuery } from '../../../../../utils/getSwitchQuery';

const Chart = ({rate, tradingData, coinName, initialBtc, initialEth, initialBch, initialTrx, initialSol}) => {
    const [realRate, setRealRate] = useState(0)
    const {chartValue, toggleValue} = useValueContext()
    const [newCoin, setNewCoin] = useState('BTC') 
    const ref = useRef(null)
    const chartRef = useRef(null)
    const valuesSeriesRef = useRef(null)
    const sbSeriesRef = useRef(null)  
    const chartsDatas = useRef(null)  
    const chartToolbar = useRef(null)  
    const [initialData, setInitialChartData] = useState(initialBtc) 
    const location = useLocation()
    const {theme} = useThemeContext()
    const [created, setCreated] = useState(false)

    const createChart = async (initial) => {
        let root = am5.Root.new("chartdiv");
        root.setThemes([am5themes_Animated.new(root)]);
        root._logo?.dispose()

        let stockChart = root.container.children.push(
          am5stock.StockChart.new(root, {})
        );

        

        let toolbar = am5stock.StockToolbar.new(root, {
            container: document.getElementById("chartcontrols"),
            stockChart: stockChart,
            controls: [
              am5stock.DrawingControl.new(root, {
                stockChart: stockChart
              }),
              am5stock.ResetControl.new(root, {
                stockChart: stockChart
              })
            ],
          });

          chartToolbar.current = toolbar
          console.log('sfsdfsdfsdf', toolbar._settings.container)
          

        root.numberFormatter.set("numberFormat", "#,###.00");
        let mainPanel = stockChart.panels.push(
          am5stock.StockPanel.new(root, {
              wheelY: "zoomX",
              panX: true,
              panY: true,
          })
        );
        

        let valueAxis = mainPanel.yAxes.push(
          am5xy.ValueAxis.new(root, {
              renderer: am5xy.AxisRendererY.new(root, {
                  pan: "zoom"
              }),
              extraMin: 0.1, // adds some space for for main series
              tooltip: am5.Tooltip.new(root, {}),
              numberFormat: "#,###",
              extraTooltipPrecision: 2,
          })
        );

        let dateAxis = mainPanel.xAxes.push(
          am5xy.GaplessDateAxis.new(root, {
              baseInterval: {
                  timeUnit: "minute",
                  count: 1
              },
              renderer: am5xy.AxisRendererX.new(root, {}),
              tooltip: am5.Tooltip.new(root, {}),
              color: am5.color(0xffffff)
          })
        );

        // add range which will show current value
        let currentValueDataItem = valueAxis.createAxisRange(valueAxis.makeDataItem({ value: 0 }));
        let currentLabel = currentValueDataItem.get("label");
        if (currentLabel) {
            currentLabel.setAll({
                fill: am5.color(0xffffff),
                background: am5.Rectangle.new(root, { fill: theme === 'dark' ? am5.color(0xffffff) : am5.color(0x000000) })
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
              name: "Current movement",
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
              renderer: am5xy.AxisRendererY.new(root, {}),
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

            valuesSeriesRef.current = chartData
            initial.forEach((item, index) => {
                let newDate = new Date(firstDate);
                newDate.setMinutes(newDate.getMinutes() - index);


                let open = Number(item[1]);
                let low = Number(item[3]);
                let high = Number(item[2]);
                let close = Number(item[4])

                chartData.unshift({
                    Date: newDate.getTime(),
                    Close: close,
                    Open: open,
                    Low: low,
                    High: high
                });
                lastDate = newDate;

            })
            chartsDatas.current = chartData
            return chartData;
        }
        let data = generateChartData();
        sbSeriesRef.current = data

        valueSeries.data.setAll(data);
        sbSeries.data.setAll(data);

        // update data
        let previousDate;
        let fnVal

        let interval = setInterval(async function() {
            let valueSeries = stockChart.get("stockSeries");
            let date = Date.now();
            let lastDataObject = valueSeries.data.getIndex(valueSeries.data.length - 1);
            let real
            const getRate = async () => {
                const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${coinName}USDT`)
                real = await res.json()
                return Number(real.lastPrice)
            }

            // let dataFromServer = tradingData.timeRangeInMs

            if (lastDataObject) {
                let previousDate = lastDataObject.Date;
                let previousValue = lastDataObject.Close;

                value = tradingData ?
                  await countFunc(tradingData.timeRangeInMs, tradingData.valueInPercent, previousValue, await getRate(), tradingData.timeRangeInMs, tradingData.growthParams, 'bitcoin')
                  : await getRate()

                toggleValue(value.toFixed(5))
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
            ref.current = interval
            chartRef.current = root
        }, 1000);


    }
    
    function handler(e) {
        e.stopPropagation();
        e.preventDefault();
    }


    useLayoutEffect(() => {
        createChart(initialData)
        document.removeEventListener("click", handler, true)
        return () => {
            chartRef.current.dispose()
            clearInterval(ref.current)
            onSendDateOnReload()
        }
    }, [])

    const callFunc = async (val) => {
        chartToolbar.current._settings.container.innerHTML = ''
        await createChart(val)
        onSendDateOnReload()
    }

    useEffect(() => {
        console.log('coin-name', coinName);
        if (chartRef.current) {
            if (coinName === 'ETH') {
                chartsDatas.current = []
                setInitialChartData([])
                setInitialChartData(initialEth)
                valuesSeriesRef.current.chartData = []
                sbSeriesRef.current.data = []
                clearInterval(ref.current)
                chartRef.current.dispose()
                callFunc(initialEth)
            } else if (coinName === 'BTC') {
                chartsDatas.current = []
                setInitialChartData([])
                setInitialChartData(initialBtc)
                valuesSeriesRef.current.chartData = []
                sbSeriesRef.current.data = []
                clearInterval(ref.current)
                chartRef.current.dispose()
                callFunc(initialBtc)
            } else if (coinName === 'BCH') {
                chartsDatas.current = []
                setInitialChartData([])
                setInitialChartData(initialBch)
                valuesSeriesRef.current.chartData = []
                sbSeriesRef.current.data = []
                clearInterval(ref.current)
                chartRef.current.dispose()
                callFunc(initialBch)
            } else if (coinName === 'TRX') {
                chartsDatas.current = []
                setInitialChartData([])
                setInitialChartData(initialTrx)
                valuesSeriesRef.current.chartData = []
                sbSeriesRef.current.data = []
                clearInterval(ref.current)
                chartRef.current.dispose()
                callFunc(initialTrx)
            } else if (coinName === 'SOL') {
                chartsDatas.current = []
                setInitialChartData([])
                setInitialChartData(initialSol)
                valuesSeriesRef.current.chartData = []
                sbSeriesRef.current.data = []
                clearInterval(ref.current)
                chartRef.current.dispose()
                callFunc(initialSol)
            }
        }
        return () => {
            chartRef.current.dispose()
            clearInterval(ref.current)
        }
    }, [coinName])

    const clearData = () => {
        chartsDatas.current = []
        callFunc()
    }

    const onSendDateOnReload = async () => {
        const obj = {
            domainName: window.location.host,
            coinName: coinName,
            growthParams: tradingData?.growthParams ? tradingData?.growthParams : true,
            value: chartValue,
            timeToEnd: 150000,
            userId: ''
          }
        await putData(getSwitchQuery('/trading/add_user_data/'), obj)
    }

    // window.addEventListener('beforeunload', function (e) {
    //     console.log('mozilla')
    //     // Cancel the event
    //     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    //     // Chrome requires returnValue to be set
    //     e.returnValue = '';
    //     onSendDateOnReload()
    //   });

    return (
        <>
            <div className={theme} id="chartcontrols"></div>
            <div id="chartdiv" style={{width: '100%', height: '500px'}}/>
        </>
        
    )
}

export default Chart