from yfinance import download
from pandas import DataFrame

from base.api.market_data.api_requests import get_entries_from_indicators
from base.api.market_data.classes.Backtester import Backtester
from base.api.market_data.classes.dataframe import EnhancedDataframe


def download_data(tickers, period: str = "1y", interval: str = "1d", keep_one="") -> DataFrame:
    tickers_data = download(
        tickers=tickers, period=period,
        interval=interval, group_by='ticker', auto_adjust=False,
        prepost=False, threads=True, proxy=None)

    tickers_data = tickers_data.T
    return tickers_data


def watchlist_analysis(tickers: list, take_profit=None):
    data = download_data(tickers)
    data_collection = {}

    # Run strategies on watchlist
    run_strategies_on_watchlist(tickers, data_collection, data, take_profit)

    return data_collection


def run_strategies_on_watchlist(tickers, data_collection, data, take_profit):
    for n, ticker in enumerate(tickers):
        data_collection[ticker] = {}
        df = data.loc[ticker].T
        df = EnhancedDataframe.populate_dataframe(df, ticker)
        entries = get_entries_from_indicators(df)

        # Backtesting
        backtester = Backtester(entries=list(entries.index), benchmark=df, include_sell="Cum_change",
                                take_profit=take_profit)
        backtester.evaluate_strategy()
        results = backtester.results
        data_collection[ticker]['entries'] = list(entries.index)
        data_collection[ticker]['returns'] = list(results['returns'])
        data_collection[ticker]['max'] = results['max']
        data_collection[ticker]['min'] = results['min']
        data_collection[ticker]['mean'] = results['mean']
        data_collection[ticker]['std'] = results['std']
        data_collection[ticker]['total'] = results['total']
        data_collection[ticker]['mean_holding_time'] = results['mean_holding_time']
        data_collection[ticker]['mean_holding_time'] = results['mean_holding_time']



