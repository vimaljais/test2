import React, { useEffect, useState } from "react";
import "../App.css";
import ReactApexChart from "react-apexcharts";
import axios from "axios"
import { RestaurantMenu } from "@material-ui/icons";



const Graph = () => {

  const [cases, setCases] = useState("")
  const [deaths, setDeaths] = useState("")
  const [recovered, setRecovered] = useState("")
  useEffect(() =>{
    const fetchData = async () => {
      try{
        const newData = await axios.get(
          `https://disease.sh/v3/covid-19/historical/all?lastdays=30" -H  "accept: application/json`
        );
        console.log(newData.data.cases)
        setCases(newData.data.cases);
        setDeaths(newData.data.deaths);
        setRecovered(newData.data.recovered)
      }catch(e){
        console.log(e);
      }
    }
    fetchData();
  },[])

  const series = [
      {
        name: "Cases",
        data: cases
      }, 
      {
        name: "Deaths",
        data: deaths
      }, 
      {
        name:"Recovered",
        data:recovered
      }
  ]

  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/22/20",
        "2/1/20",
        "2/15/20",
        "3/1/20",
        "3/15/20",
        "4/1/20",
        "4/15/20",
        "5/1/20",
        "5/7/20",
      ],
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