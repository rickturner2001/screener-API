import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxsios";
import {MinusIcon, PlusIcon, TrashIcon} from "@heroicons/react/solid";
import {FilterTableMenu} from "./watchlist_components/FilterTableMenu";



export const WatchLists = () => {


    let [watchlists, setWatchlists] = useState([])
    const [tickersInfo, setTickersInfo] = useState()
    let {authTokens, logoutUser, user} = useContext(AuthContext)
    const [selectedRows, setSelectedRows] = useState([])
    const [lengthStocks, setLengthStocks] = useState(0)
    const [selectedStocks, setSelectedStocks] = useState([])
    const [watchlistToEdit, setWatchlistsToEdit] = useState([])



    const api = useAxios()

    useEffect(() => {
        getWatchlists()
        getTickersInfo()

    }, [])


    let getWatchlists = async () => {
        let response = await api.get('/api/watchlists/')

        if (response.status === 200) {
            response.data.unshift({id: false, name: "Your Watchlists", tickers: null})
            setWatchlists(response.data)
        }

    }

    const getTickersInfo = async () => {
        const response = await api.get("/api/tickers-info/")

        if (response.status === 200) {
            setTickersInfo(response.data)
        }
    }


    const addTickerToWatchlists = () => {
        return (
            <ul className="menu bg-base-100 w-56 rounded-box">
                {watchlists.map((watchlist, index) => {
                    return (
                        <li key={index}><a>{watchlist.name}</a></li>
                    )
                })}

            </ul>
        )
    }

    const TableRows = ({className, tableRowData, selectedRows, setSelectedRows}) =>{


        const AddBtn = ({ticker}) =>{
            return (
                <td>
                    <button className="btn btn-outline btn-accent btn-sm btn-circle z-20" onClick={
                        (e) => {
                             e.target.classList.toggle("btn-outline")
                        }
                    }>
                            <PlusIcon className='w-3 h-3 z-10 absolute'/>
                    </button>
                </td>

            );
        }


        return (
                tableRowData.map((data, index) =>{
                    const ticker = data[0]
                return (
                    <tr className={'hover z-10'} key={index}>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" onClick={
                                    (e) =>{

                                        if(e.target.checked){
                                            let updated = selectedStocks
                                            updated.push(ticker)
                                            setSelectedStocks(updated)
                                        }else{
                                            const index = selectedStocks.indexOf(ticker)
                                            let temp = selectedStocks
                                            temp.splice(index, 1)
                                            setSelectedStocks(temp)
                                        }



                                    }
                                }/>
                            </label>
                        </th>
                        {data.map((rowData, n) =>{
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


        const tableRows = Object.keys(tickersInfo).map((ticker, i) => {
            return [
                ticker,
                tickersInfo[ticker].security,
                tickersInfo[ticker].sec_filings,
                tickersInfo[ticker].sector,
                tickersInfo[ticker].sub_industry,

            ];
        })

        const tableHeads = ["","Symbol", "Security", "SEC Filings", "Sector", "Sub-Industry"]


        const [currentBatch, setCurrentBatch] = useState(1)
        let [currentTableRows, setCurrentTableRows] = useState(tableRows.slice(
            currentBatch * paginationvalue - paginationvalue, currentBatch * paginationvalue))

        const nextPage = () => {
            setCurrentBatch(currentBatch + 1)
            setCurrentTableRows(tableRows.slice(
                currentBatch * paginationvalue - paginationvalue, currentBatch * paginationvalue))
        }

        const previousPage = () => {
            setCurrentBatch(currentBatch - 1)
            setCurrentTableRows(tableRows.slice(
                currentBatch * paginationvalue - paginationvalue, currentBatch * paginationvalue))
        }
        return (
            <div className='flex flex-col gap-6 justify-center items-center max-w-[50rem]'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra  max-w-[50rem]">
                        <thead>
                        <tr className='text-center'>
                            {tableHeads.map((head, index) => <th key={index}>{head}</th>)}
                        </tr>
                        </thead>
                        <tbody>

                       <TableRows tableRowData={currentTableRows}
                                  selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>

                        </tbody>
                    </table>
                </div>



                {paginationvalue ? <div className="btn-group">
                    <button className="btn" disabled={currentBatch <= 1} onClick={previousPage}>«</button>
                    <button className="btn">Page {currentBatch}</button>
                    <button className="btn" onClick={nextPage}>»</button>
                </div> : <></>}



            </div>

        );

    }

    const getNameByID = (watchlists, id) =>{
        const watchlist_id = watchlists.map((watchlist) =>{
            if (watchlist.id === id){
                return watchlist.name
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
                                <p className={'mb-3'}>Click on the green icon in the table for each stock you wish to add to your watchlists</p>
                                <div className="card-actions justify-end flex-nowrap gap-4">
                                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-secondary">Inspect</label>
                                     <label htmlFor="my-drawer-4" className="drawer-button btn btn-accent">Add Stocks</label>
                                    </div>

                            </div>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
                            <div className="card-body">
                                <div className="form-control justify-center items-center gap-4">
                                    <h2 className="card-title">New Watchlist</h2>
                                    <input type="text" placeholder="Cool Stocks" className="input input-bordered"/>

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Create Watchlist</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-8'>
                        {tickersInfo ?
                            <TickersTable tickersInfo={tickersInfo}/> : <></>}
                    </div>

                    {tickersInfo  ? <FilterTableMenu tickersInfo={tickersInfo}/>:
                        <></>}
                </div>


            </div>
            {/*Regular view*/}
            {watchlists ?<div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    {watchlists.map((watchlist, index) =>{
                        return (
                            <li className={'rounded-none'} key={index}><a className={'rounded-none'} onClick={(e) =>{
                                e.target.classList.toggle("active")
                                if(e.target.classList.contains("active")){
                                    let updated = watchlistToEdit
                                    updated.push(watchlist.id)
                                    setWatchlistsToEdit(updated)
                                }else{
                                    const index = watchlistToEdit.indexOf(watchlist.id)
                                    let temp = watchlistToEdit
                                    temp.splice(index, 1)
                                    setWatchlistsToEdit(temp)
                                }
                            }}>{watchlist.name}</a></li>
                        )
                    })}
                    <button className='btn btn-secondary mt-6' onClick={async () =>{
                        watchlistToEdit.map((async watchlist => {
                            console.log(watchlist)
                            console.log(getNameByID(watchlists, watchlist))
                            const response = await api.put(`api/update-watchlist/${watchlist}/`, {
                                user: user.user_id,
                                name: getNameByID(watchlists,watchlist)[0],
                                tickers : JSON.stringify(selectedStocks)
                            })

                            window.location.href = `/watchlist/${watchlist}`
                        }))
                        setSelectedStocks([])
                        setLengthStocks(0)
                        setWatchlistsToEdit([])
                    }
                    }>Confirm</button>
                </ul>

            </div> : <></>}
        </div>

    );
};
