import useAxios from "../utils/useAxsios";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {useEffect, useState} from "react";
import {SectorsSpreadChart} from "../components/charts/SectorsSpreadChart";
import {Table} from "../components/Table";
import {WatchlistNews} from "./watchlist_components/WatchlistNews";
import {ChevronDoubleRightIcon} from "@heroicons/react/outline";
import {SearchIcon} from "@heroicons/react/solid";
import BarChart from "../components/charts/BarChart";

export const WatchlistView = ({...other}) => {
    const watchlistId = other.match.params.id
    const {authTokens, logoutUser, user} = useContext(AuthContext)
    const api = useAxios()
    const [watchlistData, setWatchlistData] = useState()
    const [tickersData, setTickersData] = useState()
    const [news, setNewsData] = useState()
    const [analysisData, setAnalysisData] = useState()
    const [additionalAnalysis, setAdditionalAnalysis] = useState()


    const getWatchlistData = async () => {
        const response = await api.get(`/api/get-watchlist/${watchlistId}`)
        if (response.status === 200) {
            setWatchlistData(response.data)
        }
    }

    const getTickersData = async () => {
        const response = await api.get(`/api/tickers-info/`)
        if (response.status === 200) {
            setTickersData(response.data)
        }
    }

    const getNewsData = async () => {
        const response = await api.get(`/api/get-news/32/`)
        if (response.status === 200) {
            setNewsData(response.data)
        }
    }
    const getWatchlistAnalysis = async () => {
        const response = await api.get(`/api/get-watchlist-analytics/${watchlistId}/`)
        if (response.status === 200) {
            setAnalysisData(response.data.data)
        }
    }


    useEffect(() => {
        getWatchlistData()
        getTickersData()
        getWatchlistAnalysis()


    }, [])

    return (
        watchlistData && tickersData ?
            <div className='flex flex-row-reverse justify-around items-center gap-16 px-20 py-20 '>


                {/*Watchlist actions (TOOLBOX)*/}
                <div className='flex gap-24 justify-center items-center'>
                    <div className='flex flex-col gap-10'>
                        <div
                            className="col-span-3 row-span-2 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-auto xl:place-self-stretch">
                            <div className="bg-base-100 text-base-content rounded-box shadow-xl bg-neutral">
                                <div className="dropdown dropdown-end w-full">
                                    <div tabIndex="0">
                                        <ul className="menu overflow-visible p-3">
                                            <li className="menu-title"><span>Menu Title</span></li>
                                            <li>
                                                <button>
                                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                                         fill="none" viewBox="0 0 24 24"
                                                         className=" mr-2 inline-block h-5 w-5 stroke-current">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                                                    </svg>
                                                    Menu Item 1
                                                </button>
                                            </li>
                                            <li>
                                                <button>
                                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                                         fill="none" viewBox="0 0 24 24"
                                                         className="mr-2 inline-block h-5 w-5 stroke-current">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                                    </svg>
                                                    Menu Item 2
                                                </button>
                                            </li>
                                            <li>
                                                <button>
                                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                                         fill="none" viewBox="0 0 24 24"
                                                         className="mr-2 inline-block h-5 w-5 stroke-current">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                                    </svg>
                                                    Menu Item 3
                                                    <div className="badge badge-success">new</div></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div tabIndex="0" className="dropdown-content py-2">
                                        <div
                                            className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {watchlistData && analysisData ?
                            <div className='flex flex-col bg-base-300 px-6 py-6 rounded-box w-[100%] h-full'>
                                <h1 className='text-3xl font-bold text-white mb-12'>Portfolio Weights</h1>
                                <div className="stats stats-vertical shadow bg-base-100 w-[100%]">
                                    {analysisData['optimal_weights'].map((weight, index) => {
                                        return (

                                            weight.toFixed(4) > 0 ? <div className="stat" key={index}>
                                                <div
                                                    className="stat-title">{JSON.parse(watchlistData.tickers)[index]}</div>
                                                <div className="stat-value">{weight.toFixed(3)}</div>
                                            </div> : <></>
                                        )
                                    })}
                                </div>
                            </div> :
                            <div className='flex flex-col bg-base-300 px-6 py-6 rounded-box w-80 h-full'>
                                <h1 className='text-3xl font-bold text-white mb-12'>Portfolio Weights</h1>
                                <div className="stats stats-vertical shadow bg-base-100 w-[100%]">
                                    <div className="stat">
                                        <div className="flex justify-center">
                                            <div
                                                className="stat-title animate-pulse bg-base-200 py-3 rounded-box mb-3 w-1/2"></div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div
                                                className="stat-title animate-pulse bg-base-200 py-3 rounded-box w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>

                    <div className='flex flex-col'>
                        <h1 className="text-5xl font-bold mb-10 text-center">{watchlistData.name}</h1>
                        <Table paginationvalue={10}
                               tableData={[["Symbol", "Security", "Sector", "Industry"],
                                   JSON.parse(watchlistData.tickers).map((ticker) => {
                                       return [
                                           ticker,
                                           tickersData[ticker].security,
                                           tickersData[ticker].sector,
                                           tickersData[ticker].sub_industry,
                                       ]
                                   })]}/>
                    </div>

                    {analysisData ?


                        <div className='flex flex-col items-center gap-12 justify-center'>

                            <div className="stats bg-primary text-primary-content h-max overflow-visible w-[100%]">

                                <div className="stat">
                                    <div className="stat-title">Alpha (SP500)</div>
                                    <div className="stat-value">{analysisData.alpha.toFixed(3)}</div>
                                    <div className="stat-actions">
                                        <button
                                            className={`btn btn-sm btn-${analysisData.alpha < 0 ? 'error' : 'success'} `}>Full
                                            value
                                        </button>
                                    </div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Beta (SP500)</div>
                                    <div className="stat-value">{analysisData.beta.toFixed(3)}</div>
                                    <div className="stat-actions">
                                        <button
                                            className={`btn btn-sm btn-${analysisData.beta < 0 ? 'warning' : 'success'} `}>Full
                                            value
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className='flex flex-col gap-3 bg-base-300 px-6 py-4 rounded-box w-[100%]'>
                                <h1 className={'text-3xl font-bold text-white'}>Compare to</h1>
                                <div className="form-control">
                                    <div className="input-group">
                                        <input type="text" placeholder="Search…"
                                               className="input input-bordered"/>
                                        <button className="btn btn-square btn-secondary">
                                            <SearchIcon className='w-6 h-6'/>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>


                        :
                        <div className="stats bg-primary text-primary-content h-max overflow-visible w-[100%] w-80">

                            <div className="stat">
                                <div className="animate-pulse stat-title bg-base-200 px-10 py-3 rounded-box"></div>
                                <div
                                    className="animate-pulse stat-title  mt-4 px-4 py-6 bg-base-200 rounded-full"></div>
                                <div className="stat-actions flex justify-center">
                                    <button
                                        className={`animate-pulse btn btn-sm btn stat-title bg-base-200 px-8`}>
                                    </button>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="animate-pulse stat-title bg-base-200 px-10 py-3 rounded-box"></div>
                                <div
                                    className="animate-pulse stat-title  mt-4 px-4 py-6 bg-base-200 rounded-full"></div>
                                <div className="stat-actions flex justify-center">
                                    <button
                                        className={`animate-pulse btn btn-sm btn stat-title bg-base-200 px-8`}>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
            :

            <></>
    );
}