import { Ticker } from "react-ts-tradingview-widgets";
import { useThemeContext } from "../../context/ThemeContext";


const TradingWidget = () => {
    const {theme} = useThemeContext()
    const symb = [
        {
          "proName": "BINANCE:BTCUSDT",
          "title": "BTC/USDT"
        },
        {
          "proName": "BINANCE:ETHUSDT",
          "title": "ETH/USDT"
        },
        {
          "proName": "BINANCE:BCHUSDT",
          "title": "BCH/USDT"
        },
        {
          "proName": "BINANCE:TRXUSDT",
          "title": "TRX/USDT"
        },
        {
          "proName": "BINANCE:SOLUSDT",
          "title": "SOL/USDT"
        }
      ]


    return(
        <>
            <Ticker colorTheme={theme} symbols={symb}></Ticker>
        </>
    )
}

export default TradingWidget;