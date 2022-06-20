import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxsios";
import {data} from "autoprefixer";
import {Table} from "../components/Table";

export const WatchLists = () =>{

    let [watchlists, setWatchlists] = useState([])
    const [tickersInfo, setTickersInfo] = useState()
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [isStack, setIsStack] = useState(true)

    let api = useAxios()

    useEffect(()=> {
        getWatchlists()
        getTickersInfo()

    }, [])


    let getWatchlists = async() =>{
        let response = await api.get('/api/watchlists/')

        if(response.status === 200){
            response.data.unshift({id: false, name: "Your Watchlists", tickers: null})
            console.log(response.data)
            setWatchlists(response.data)
        }

    }

    const getTickersInfo = async () =>{
        const response = await api.get("/api/tickers-info/")

        if(response.status === 200){
            setTickersInfo(response.data)
        }
    }


    return (
        <div className='flex mt-32'>

            <div className={`transition -all self-baseline ` +  (!isStack ? `ml-14 mt-14` : "stack ml-14 mt-14")}>
                {watchlists.map((watchlist, index) => {

                    let isOdd = true
                    if (index % 2 === 0){
                        isOdd = false
                    }
                    if (watchlist.id){
                        return(
                            <div key={index} className={`flex card w-96 shadow-xl mb-6 bg-neutral justify-center text-center gap-3`}>
                                <div className="card-body flex justify-center items-center gap-3">
                                    <h2 className="card-title text-2xl font-bold">{watchlist.name}</h2>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">
                                            Open
                                        </button>
                                        <button className="btn btn-error">Delete</button>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                    return(

                        <div key={index} className={`flex card w-96 shadow-xl mb-6 bg-neutral justify-center text-center gap-3`}>
                            <div className="card-body flex justify-center items-center gap-3">
                                <h2 className="card-title text-2xl font-bold">{watchlist.name}</h2>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-accent" onClick={() =>{
                                        setIsStack(!isStack)
                                    }}>{isStack ? "Expand" : "Shrink"}
                                        {isStack ? <div className="badge badge-ghost">{watchlists.length}</div> : <></>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )


                    })}
            </div>
            {tickersInfo ? <Table tableData={[ ["", "Symbol", "Security","SEC Filings", "Sector", "Sub-Industry", "Headquarters Location"],
                Object.keys(tickersInfo).map((ticker, i) =>{
                    return [
                        i,
                        ticker,
                        tickersInfo[ticker].security,
                        tickersInfo[ticker].sec_filings,
                        tickersInfo[ticker].sector,
                        tickersInfo[ticker].sub_industry,
                        tickersInfo[ticker].headquarter,
                    ]
                })]} paginationvalue={10} />: <></>}
        </div>
    )
}
