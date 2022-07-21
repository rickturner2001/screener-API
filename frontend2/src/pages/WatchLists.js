import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxsios";
import {CheckCircleIcon, SearchIcon, TrashIcon} from "@heroicons/react/outline";
import {Button} from "react-daisyui";
import {DocumentAddIcon, PlusCircleIcon, PlusIcon} from "@heroicons/react/solid";



export const WatchLists = () => {


    let [watchlists, setWatchlists] = useState([])
    const [tickersInfo, setTickersInfo] = useState()
    let {authTokens, logoutUser, user} = useContext(AuthContext)
    const [selectedRows, setSelectedRows] = useState([])
    const [lengthStocks, setLengthStocks] = useState(0)
    const [selectedStocks, setSelectedStocks] = useState([])
    const [watchlistToEdit, setWatchlistsToEdit] = useState([])
    const [currentSearch, setCurrentSearch] = useState("")
    const [newWatchlistName, setNewWatchlistName] = useState("")
    const[isAddingWatchlist, setIsAddingWatchlist] = useState(false)



    const api = useAxios()

    useEffect(() => {
        getWatchlists()
        getTickersInfo()

    }, [])


    let getWatchlists = async () => {
        let response = await api.get('/api/watchlists/')

        if (response.status === 200) {
            setWatchlists(response.data)
        }

    }

    const getTickersInfo = async () => {
        const response = await api.get("/api/tickers-info/")

        if (response.status === 200) {
            setTickersInfo(response.data)
        }
    }

    const selectedTickersMenu = (isEmpty) =>{
        return(
            <div className= {'flex h-[65%]'}>
            <div tabIndex="0"
                 className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box h-max">
                <div className="collapse-title text-xl font-medium text-center gap-2 flex justify-center">
                    Selected
                    {selectedStocks.length && isEmpty ? <div className="badge badge-secondary">+{selectedStocks.length}</div>: <></>}

                </div>

                <div className="collapse-content">
                    <ul className="menu bg-base-100 w-56">
                        {selectedStocks.map((ticker) =>{
                            return(
                                <li><a>{ticker}</a></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            </div>
        )
    }

    const [updateMenu, setUpdateMenu] = useState(selectedTickersMenu(false))


    const setTableRows = (tableRowData) => {
        tableRowData = tableRowData.filter((item) => item)

        return (
            tableRowData.map((data, index) => {
                const ticker = data[0]
                return (
                    <tr className={'hover z-10'} key={index}>
                        <td>
                            <label key={index * -1}>
                                <input type="checkbox" className="checkbox" defaultChecked={selectedStocks.includes(ticker)}
                                       onClick={
                                           (e) => {
                                               if (e.target.checked) {
                                                   let updated = selectedStocks
                                                   updated.push(ticker)
                                                   setSelectedStocks(updated)

                                               } else {
                                                   const index = selectedStocks.indexOf(ticker)
                                                   let temp = selectedStocks
                                                   temp.splice(index, 1)
                                                   setSelectedStocks(temp)
                                               }

                                               setUpdateMenu(
                                                   selectedTickersMenu(true)

                                               )
                                           }
                                       }/>
                            </label>
                        </td>
                        {data.map((rowData, n) => {
                            return (

                                <td className='' key={n}>
                                    <p className={'text-center'}>{rowData}</p>
                                </td>
                            );

                        })}

                    </tr>
                )

            })
        )
    }

    const TickersTable = ({tickersInfo}) => {
        const paginationvalue = 10

        let tableRows = Object.keys(tickersInfo).map((ticker, i) => {
            return [
                ticker,
                tickersInfo[ticker].security,
                tickersInfo[ticker].sector,
                tickersInfo[ticker].sub_industry,

            ];
        })


        if(!currentSearch){
            tableRows = setTableRows(tableRows)
        }else{
            tableRows = setTableRows(Object.keys(tickersInfo).map((ticker, i) => {

                if(ticker.startsWith(currentSearch.toUpperCase())){

                    return [
                    ticker,
                    tickersInfo[ticker].security,
                    tickersInfo[ticker].sector,
                    tickersInfo[ticker].sub_industry,

                ];
            }}))

        }


        const tableHeads = ["", "Symbol", "Security", "Sector", "Sub-Industry"]
        const [currentBatch, setCurrentBatch] = useState(1)
        let [currentTableRows, setCurrentTableRows] = useState(tableRows.slice(
            (currentBatch) * paginationvalue - paginationvalue, (currentBatch) * paginationvalue))

        const nextPage = () => {
            setCurrentBatch(currentBatch + 1)

            setCurrentTableRows(tableRows.slice(
                (currentBatch  + 1)* paginationvalue - paginationvalue, (currentBatch + 1) * paginationvalue))
        }

        const previousPage = () => {
            setCurrentBatch(currentBatch - 1)
            setCurrentTableRows(tableRows.slice(
                (currentBatch - 1)* paginationvalue - paginationvalue, (currentBatch - 1)* paginationvalue))
        }
        return (
            <div className='flex flex-col gap-6 justify-center items-center w-[70rem]'>
                <div className="overflow-x-auto shadow-2xl">
                    <table className="table table-zebra  w-[70rem]">
                        <thead>
                        <tr className='text-center'>
                            {tableHeads.map((head, index) => <th key={index}>{head}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {currentTableRows.map((tableRow) => tableRow)}
                        </tbody>
                    </table>
                </div>


                {paginationvalue ? <div className="btn-group">
                    <button className="btn" disabled={currentBatch <= 1} onClick={previousPage}>«</button>
                    <button className="btn no-animation">Page {currentBatch}</button>
                    <button className="btn" onClick={nextPage}>»</button>
                </div> : <></>}


            </div>

        );

    }

    const getNameByID = (watchlists, id) => {
        const watchlist_id = watchlists.map((watchlist) => {
            if (watchlist.id === id) {
                return watchlist.name
            }

        })
        return watchlist_id.filter((e) => e ?? e)
    }

    const getTickersByID = (watchlists, id) => {
        const watchlist_id = watchlists.map((watchlist) => {
            if (watchlist.id === id) {
                return watchlist.tickers
            }
        })
        return watchlist_id.filter((e) => e ?? e)
    }

    return (

        <div className="drawer drawer-end overflow-y-hidden">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex justify-center overflow-y-hidden">
                <div className='flex justify-around items-center w-[100%]'>

                    <div className='flex flex-col gap-24 '>
                        <div className="card w-96 bg-neutral text-neutral-content">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Watchlist Menu</h2>
                                <p className={'mb-3'}>Click the checkboxes in the table for each stock you wish to
                                    add to your watchlists</p>
                                <div className="card-actions justify-end flex-nowrap gap-4">
                                    <label htmlFor="my-drawer-4"
                                           className="drawer-button btn btn-secondary">Inspect</label>
                                    <button  className="btn btn-accent" onClick={() => setIsAddingWatchlist(true)}>
                                        <p>New Watchlist</p>
                                        <PlusCircleIcon className={' ml-3 w-5 h-5'}/>
                                        </button>
                                </div>

                            </div>
                        </div>
                        {isAddingWatchlist ? <div>

                            <div className="card w-96 bg-base-300 shadow-xl animation-enter-from-right">
                                <div className="card-body">
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">New watchlist title</span>
                                        </label>
                                        <div className={'flex'}>
                                            <input type="text" placeholder="Type here"
                                                   className="input input-bordered w-full max-w-xs"/>
                                            <button className={'btn btn-primary'}><PlusIcon className={'w-5 h-5'}/></button>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>  : <></>}
                        <ul className="menu bg-base-100 w-full bg-neutral text-accent-content text-center">
                            {watchlists.map((watchlist, index) => {
                                return (
                                    <li className={'bg-neutral flex justify-around'} key={index}>
                                            <div className={'flex justify-around active:bg-secondary'}>

                                               <p className={'w-1/2'}>{watchlist.name}</p>
                                                <TrashIcon className={'w-6 h-6 stroke-error'}/>
                                            </div>
                                    </li>

                                )
                            })}
                            <button className='btn btn-primary' onClick={async () => {
                                watchlistToEdit.map((async watchlist => {
                                    // const currentTickers = JSON.parse(getTickersByID(watchlists, watchlist)[0])
                                    const currentTickers = JSON.parse(getTickersByID(watchlists, watchlist)[0])
                                    const newTickers = [...selectedStocks, ...currentTickers]
                                    const response = await api.put(`api/update-watchlist/${watchlist}/`, {
                                        user: user.user_id,
                                        name: getNameByID(watchlists, watchlist)[0],
                                        tickers: JSON.stringify(newTickers)
                                    })

                                    window.location.href = `/watchlist/${watchlist}`
                                }))
                                setSelectedStocks([])
                                setLengthStocks(0)
                                setWatchlistsToEdit([])
                            }
                            }>Confirm
                            </button>
                        </ul>
                    </div>

                    <div className='flex gap-8'>
                        <div className='flex flex-col gap-4'>
                            <div className="form-control justify-end">
                                <div className="input-group justify-end">
                                    <input type="text" placeholder="Search…" className="input input-bordered input-primary"
                                            onChange={((event) =>{
                                                setCurrentSearch(event.target.value);

                                            })}/>

                                    <button className="btn btn-square btn-primary">
                                       <SearchIcon className='w-6 h-6'/>
                                    </button>
                                </div>
                            </div>

                            {tickersInfo ?
                                <TickersTable tickersInfo={tickersInfo}/> : <></>}
                        </div>
                        </div>


                    {updateMenu}
                    {/*{tickersInfo ? <FilterTableMenu tickersInfo={tickersInfo}/> :*/}
                        <></>
                </div>


            </div>
            {/*Regular view*/}
            {/*{watchlists ? <div className="drawer-side">*/}
            {/*    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>*/}


            {/*</div> : <></>}*/}
        </div>

    );
};
