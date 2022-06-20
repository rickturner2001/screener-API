import {useEffect, useState} from "react";
import {Chart} from "chart.js/auto";
import {Bar} from "react-chartjs-2"

export const Table = ({tableData, classesOnValues, paginationvalue}) =>{


    let [tableHeads, tableRows] = tableData

    const [currentBatch, setCurrentBatch] = useState(1)
    let [currentTableRows, setCurrentTableRows] = useState(tableRows.slice(
        currentBatch * paginationvalue - paginationvalue, currentBatch * paginationvalue))

    console.log(`(${currentBatch * paginationvalue - paginationvalue}, ${currentBatch * paginationvalue})`)
    const nextPage = () =>{
        setCurrentBatch(currentBatch + 1)
        setCurrentTableRows(tableRows.slice(
            currentBatch * paginationvalue - paginationvalue, currentBatch * paginationvalue))
    }

    const previousPage = () =>{
        setCurrentBatch(currentBatch - 1)
        setCurrentTableRows(tableRows.slice(
            currentBatch * paginationvalue - paginationvalue, currentBatch * paginationvalue))
    }



    return(
        <div className='flex flex-col gap-6 justify-center items-center w-[100%]'>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                <tr className='text-center'>
                    {tableHeads.map((head, index) => <th key={index}>{head}</th>)}
                </tr>
                </thead>
                <tbody>

                {currentTableRows.map((rowData, index) => {
                    return <tr key={index + 600}>
                                {rowData.map(((tableData, index) => {
                                    return <td className='' key={index}>
                                        <p  key={index * -1} className={`text-center ${classesOnValues?.constraint(tableData)}`}>{tableData}</p>
                                    </td>
                                }))}
                           </tr>
                })}
                </tbody>
            </table>
        </div>

        {paginationvalue ? <div className="btn-group">
            <button className="btn" disabled={currentBatch <=1} onClick={previousPage}>«</button>
            <button className="btn">Page {currentBatch}</button>
            <button className="btn"  onClick={nextPage}>»</button>
        </div> : <></>}

        </div>

    )
}