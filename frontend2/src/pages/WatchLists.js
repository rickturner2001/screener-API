import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxsios";
import {Table} from "../components/Table";
import {PlusIcon} from "@heroicons/react/solid";

export const WatchLists = () =>{


    let [watchlists, setWatchlists] = useState([])
    const [tickersInfo, setTickersInfo] = useState()
    let {authTokens, logoutUser, user} = useContext(AuthContext)
    const [isStack, setIsStack] = useState(true)
    const [isNewWatchlist, setINewWatchlist] = useState(false)
    const [watchlistTitle, setWatchlistTitle] = useState("")

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

            {/*LEFT SIDE*/}
            <div className='flex flex-col items-center justify-center ml-14'>
                <div className={`transition -all self-baseline ` +  (!isStack ? ` ` : "stack ")}>
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
                                            <button className="btn btn-error" onClick={() =>{
                                                api.delete("api/remove-watchlist/", {
                                                    watchlist_id: watchlists.id
                                                })
                                            }}>Delete</button>
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
                                        <button className='btn btn-primary' onClick={() =>{
                                            setINewWatchlist(!isNewWatchlist)
                                        }}>New Watchlist</button>
                                    </div>
                                </div>
                            </div>
                        )


                        })}
                </div>
                {isNewWatchlist ?
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body flex flex-row justify-center content-center">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Collection Title</span>
                                </label>
                                <div className='flex gap-4'>
                                    <input type="text" placeholder="Cool Stocks" className="input input-bordered"
                                           onChange={(e) => setWatchlistTitle(e.target.value)}/>
                                    <div className="form-control flex justify-center">
                                        <button className="btn btn-primary" onClick={() =>{
                                            api.post("/api/add_watchlists/", {
                                                user: user.user_id,
                                                name: watchlistTitle,
                                                tickers: JSON.stringify([]),
                                            })

                                            getWatchlists()
                                        }
                                        }>
                                            <PlusIcon className='w-5 h-5'/>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                : <></>}
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
