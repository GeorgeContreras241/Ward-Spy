"use client"
import { TableLIveGame } from "@/components/liveGame/TableLIveGame";
import { useState } from "react";

const page = () => {
const [data, setData] = useState(null)
  const getData = async () => {
    try {
      const response  = await fetch("/api/liveGame")
      const data = await response.json()
      setData(data.match)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(data)

  return (
    <>
    <button onClick={getData} className="p-2 bg-blue-500 cursor-pointer">Get Data</button>
      <TableLIveGame  data={data}/>
    </>
  );
};

export default page;