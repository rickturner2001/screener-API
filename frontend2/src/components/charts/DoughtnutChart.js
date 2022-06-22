import {Doughnut} from "react-chartjs-2";
import React from "react";

const DoughnutChart = ({data}) =>{
    return (
        <div>
            <Doughnut
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Changes in the SP500"
                        },
                    }
                }}
            />
        </div>
    );
};


export default DoughnutChart