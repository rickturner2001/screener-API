import {Line} from "react-chartjs-2";
import React from "react";

const BarChart = ({data, text}) =>{
    console.log(data)
    return (
        <div>
            <Line
                data={data}
                options={{
                    scales: {
                       x: {
                           ticks: {
                               callback: function(val, index){
                                   return index % 10 === 0 ? this.getLabelForValue(val): ""
                               }
                           }
                       }
                    },

                    elements:{
                        point: {
                            radius: 0.1
                        }
                    },

                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: text
                        },
                    }
                }}
            />
        </div>
    );
};


export default BarChart