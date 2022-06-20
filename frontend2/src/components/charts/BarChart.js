import {Bar} from "react-chartjs-2";
import React from "react";

//data: { labels: (string | undefined)[]; datasets: { label: string; data: (number | undefined)[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number; }[]; }
const BarChart = ({data}) =>{
    return (
        <div>
            <Bar
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


export default BarChart