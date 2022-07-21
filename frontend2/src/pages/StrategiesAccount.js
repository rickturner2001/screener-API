import {ArrowRightIcon} from "@heroicons/react/solid";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxsios";
import {useContext, useEffect, useState} from "react"
import {
    ScaleIcon,
    InformationCircleIcon,
    LightningBoltIcon,
    CurrencyDollarIcon,
    CashIcon, CollectionIcon, GlobeIcon
} from "@heroicons/react/outline";

export const StrategiesAccount = () => {
    const {authTokens, logoutUser, user} = useContext(AuthContext)
    const api = useAxios()

    const [userStrategies, setUserStrategies] = useState([])
    const [selectedStrategy, setSelectedStrategy] = useState("")

    const getUserStrategies = async () => {
        const response = await api.get(`/api/get-strategies/`)
        if (response.status === 200) {
            setUserStrategies(response.data)
        }
    }

    useEffect(() => {
        getUserStrategies()
    }, [])


    const StrategiesTable = () => {
        return (
            <table className="table w-full text-center">
                <thead>
                <tr>
                    <th>Current Selection</th>
                    <th>Name</th>
                    <th>Efficiency</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {userStrategies.map((strategy, index) => {
                    return (
                        <tr key={index}
                            className={`cursor-pointer transition-colors duration-500 ease-out ${selectedStrategy === strategy.name ? "bg-primary" : "bg-base-100"}`}
                            onClick={() => setSelectedStrategy(strategy.name)}>
                            <th className={'bg-inherit border-none'}>
                                <label className={'flex justify-center items-center'}>
                                    <LightningBoltIcon
                                        className={`w-7 h-7 ${selectedStrategy === strategy.name ? "fill-amber-400" : ""}`}/>
                                </label>
                            </th>
                            <td className={'bg-inherit border-none'}>
                                <div className="font-bold">{strategy.name}</div>
                                <div
                                    className="text-sm opacity-50">{Object.keys(JSON.parse(strategy.strategy_data)).length > 1 ? "Relationships" : "Relationship"}: {Object.keys(JSON.parse(strategy.strategy_data)).length}</div>
                            </td>
                            <td className={'bg-inherit border-none'}>
                                <div className={'w-[100%] flex justify-center items-center'}>
                                    <span className="badge badge-ghost badge-md">{strategy.efficiency}%</span>
                                </div>
                            </td>
                            <th className={'bg-inherit border-none'}>
                                <button className="btn btn-secondary btn-xs">details</button>
                            </th>
                        </tr>

                    )
                })}

                </tbody>
            </table>

        )
    }

    return (
        <div className="hero min-h-screen bg-current">
            <div className={'flex flex-col gap-40'}>
                <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                    <div className={`w-[100%]  ${Object.keys(selectedStrategy).length ? "flex flex-col gap-10" : ""}`}>
                        {userStrategies ? <StrategiesTable/> : <></>}
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold text-accent-content">Strategy Selection</h1>
                        <p className="py-6 text-accent-content">Select one of your strategies and apply it against
                            a <strong className={'font-bold'}>benchmark</strong> of your choice</p>
                    </div>
                </div>
                <div className={'relative'}>
                    {selectedStrategy ?
                        <div className={"absolute translate-x-[0%] flex gap-12 justify-center items-center"}>
                            <div className={'flex justify-center gap-12'}>
                                <div className={'flex justify-around p-6 animation-first-appearance'}>
                                    <button className={'btn bg-purple-500 btn-lg hover:bg-purple-600 border-none'}>
                                        <div className={'flex gap-2 items-center'}>
                                            <span>Stock</span>
                                            <CashIcon className={'w-5 h-5'}/>
                                        </div>
                                    </button>
                                </div>
                                <div className={'flex justify-around p-6 animation-second-appearance'}>
                                    <button className={'btn bg-amber-500 hover:bg-amber-600 border-none btn-lg'}>
                                        <div className={'flex gap-2 items-center'}>
                                            <span>Watchlist</span>
                                            <CollectionIcon className={'w-5 h-5'}/>
                                        </div>
                                    </button>
                                </div>
                                <div className={'flex justify-around p-6 animation-third-appearance'}>
                                    <button className={'btn bg-pink-500 hover:bg-pink-600 border-none btn-lg'}>
                                        <div className={'flex gap-2 items-center'}>
                                            <span>Index</span>
                                            <GlobeIcon className={'w-5 h-5'}/>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className={'flex flex-col gap-4 text-accent-content justify-center items-center animation-slide-to-left'}>
                                <h1 className={'font-bold  text-4xl'}>Benchmark</h1>
                                <p className={'p-6 text-center'}>Select the type of benchmark to use for the trading simulation</p>
                            </div>
                        </div> : <></>}
                </div>
            </div>
        </div>
    )
}