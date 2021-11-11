import React, { useState, useEffect } from "react"
import PieCharts from "./PieCharts"
import BarCharts from "./BarCharts"

function Graphs({ match }) {
  const { pollId } = match.params
  const [data, setData] = useState(null)
  const handleFetch = () => {
    fetch(`https://backend.polbol.in/backend/poll/results/guest?id=${pollId}`)
      .then((res) => res.json())
      .then((data) => setData({ data }))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    handleFetch()
  }, [match])
  console.log(data)
  return (
    <div>
      {data ? (
        data.data.payload.poll.type === "pie" ? (
          <PieCharts data={data} />
        ) : (
          <BarCharts data={data} />
        )
      ) : (
        ""
      )}
    </div>
  )
}

export default Graphs
