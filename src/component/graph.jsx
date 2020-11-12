import React, { useEffect, useState } from "react";
import "../App.css";
import ReactApexChart from "react-apexcharts";
import axios from "axios"
import { RestaurantMenu } from "@material-ui/icons";



const Graph = () => {

  const [cases, setCases] = useState("")
  const [deaths, setDeaths] = useState("")
  const [recovered, setRecovered] = useState("")
  const [date, setDate] = useState("")
  useEffect(() =>{
    const fetchData = async () => {
      try{
        const newData = await axios.get(
          `https://disease.sh/v3/covid-19/historical/all?lastdays=30" -H  "accept: application/json`
        );
        //console.log(newData.data.cases)
        setCases(newData.data.cases);
        setDeaths(newData.data.deaths);
        setRecovered(newData.data.recovered)
        setDate(newData.data.cases)
          chart.updateSeries([{
              name: 'Cases',
              data: newData.data.cases
          }])
      }catch(e){
        console.log(e);
      }
    }
    fetchData();
  },[])

      const series = [
          {
            name: "Cases",
            data: [cases]
          },
          {
            name: "Deaths",
            data: [{deaths}]
          },
          {
            name:"Recovered",
            data:[{recovered}]
          }
      ]
    const allDates = Object.keys(date)
    console.log(allDates)
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [allDates],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
     <br />
      <h2>COVID-19 Global Graphs</h2>
      <br />
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
      <br />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
  
}

export default Graph;