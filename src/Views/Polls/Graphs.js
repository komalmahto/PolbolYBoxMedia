import React, { useState, useEffect } from "react";
import PieCharts from "./PieCharts";
import BarCharts from "./BarCharts";
import NewPol from "./NewPol";


function Graphs({ match }) {
  
  const { pollId } = match.params;
  const [data, setData] = useState(null);
  const handleFetch = () => {
    fetch(`https://backend.polbol.in/backend/poll/results/guest?id=${pollId}`)
      .then((res) => res.json())
      .then((data) => setData({ data }))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleFetch();
  }, [match]);
  return (
    <div>
      {data ? (
         (
          <NewPol data={data} pollId={pollId} />
        ) 
      ):""}
    </div>
  );
}

export default Graphs;
