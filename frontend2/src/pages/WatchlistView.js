import useAxios from "../utils/useAxsios";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {useEffect, useState} from "react";
import {SectorsSpreadChart} from "../components/charts/SectorsSpreadChart";
import {Table} from "../components/Table";

export const WatchlistView = ({...other}) => {
    const watchlistId = other.match.params.id
    const {authTokens, logoutUser, user} = useContext(AuthContext)
    const api = useAxios()
    const [watchlistData, setWatchlistData] = useState()
    const [tickersData, setTickersData] = useState()


    const getWatchlistData = async () =>{
        const response = await api.get(`/api/get-watchlist/${watchlistId}`)
        if(response.status === 200){
            setWatchlistData(response.data)
        }
    }

    const getTickersData = async () =>{
        const response = await api.get(`/api/tickers-info/`)
        if(response.status === 200){
            setTickersData(response.data)
        }
    }

    useEffect( () =>{
        getWatchlistData()
        getTickersData()

    },[])


    return (


        watchlistData && tickersData ?
            <div className='flex flex-row-reverse justify-around items-center mt-24'>
                <div className='w-[40%]'>
                    <SectorsSpreadChart
                        sectorsData={JSON.parse(watchlistData.tickers).map(ticker => tickersData[ticker].sector)}/>
                </div>
                <div>
                    <h1 className="text-5xl font-bold mb-10">{watchlistData.name}</h1>
                    <Table paginationvalue={10} tableData={[["Symbol", "Security", "SEC Filings", "Sector", "Industry"],
                        JSON.parse(watchlistData.tickers).map((ticker) => {
                            return [
                                ticker,
                                tickersData[ticker].security,
                                tickersData[ticker].sec_filings,
                                tickersData[ticker].sector,
                                tickersData[ticker].sub_industry,
                            ]
                        })]}/>
                </div>
            </div>
            : <></>
    );

}