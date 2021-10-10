import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Dropdown from "react-bootstrap/Dropdown";
import { FiCheck } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./graph.css";

function PieCharts(props) {
 
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    nofilters: {},
    gender: {},
    age: {},
    region: {},
  });
const  legends= {
  position: "bottom",
  horizontalAlign: 'left', 
  width:700,
  offsetX: 0,
  offsetY: 5,
  markers: { radius: 0 },
  itemMargin: {
    horizontal: 0,
    vertical: 10,
},
};
const legends1={
  show:false,
}
  const [labels, setLabels] = useState(null);
 
  const graphOption = {
    options: {
      labels,
      plotOptions: {
        pie: {
          offsetX: 0,
          dataLabels: {
            offset: -10,
          },
        },
      },
    },
  };
 

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("overall")) {
      if (filters.nofilters.overall !== undefined) {
        const obj = {};
        setFilters({ ...filters, nofilters: obj });
      } else {
        settingOverall();
      }
      return;
    }
    const id = e.target.id;

    const elems = id.split(":");
    const elem = elems[0].split(",");
    const elem1 = elem[0];
    const elem2 = elem[1];

    const arr = Object.values(data.data.payload[elem1][elem2]);
    const obj = { ...filters[elem1], [elem2]: arr };
    if (filters[elem1][elem2] !== undefined) {
      const a = { ...filters[elem1] };
      delete a[elem2];
      setFilters({ ...filters, [elem1]: a });
    } else {
      setFilters({ ...filters, [elem1]: obj });
    }
    // setShow(!show)
  };

  const handleDelete = (e) => {
    if (e.target.classList.contains("overall")) {
      if (filters.nofilters.overall !== undefined) {
        const obj = {};
        setFilters({ ...filters, nofilters: obj });
      } else {
        settingOverall();
      }
      return;
    }
    const val = e.target.className;
    for (let key in filters) {
      if (filters[key][val] !== undefined) {
        const obj = { ...filters[key] };
        delete obj[val];
        setFilters({ ...filters, [key]: obj });
      }
    }
  };

  const settingOverall = () => {
    const arr = Object.values(data.data.payload.global);
    const obj = { overall: arr };

    setFilters({ ...filters, nofilters: obj });
  };

  const handleEnter = (e) => {
    e.target.click();
  };

  const notify=()=>{
    navigator.clipboard.writeText(window.location.href)
    toast("Copied to clipboard");
  }
  
  useEffect(() => {
    setData(props.data);
  }, []);

  console.log(props);
  useEffect(() => {
    if (data) {
      setLabels(data.data.payload.poll.options.map((val, idx) => val.name));
      settingOverall();
    }
  }, [data]);

  console.log(props.data);
  return (
    <div className="container">
      <ToastContainer/>
      {data ? (
        <h4 className="heading">{data.data.payload.poll.question} <span onClick={notify}>Share result <i style={{color:"#84855d"}} className="fas fa-share-alt"></i></span></h4>
      ) : (
        ""
      )}
     
      <div className="dropdowns">
        {/* <Dropdown className="d-inline mx-2" autoClose="outside">
          <Dropdown.Toggle
            id="dropdown-autoclose-outside"
            onMouseEnter={handleEnter}
            style={{backgroundColor: "#84855D"}}
          >
            No Filter
          </Dropdown.Toggle>
          <Dropdown.Menu> */}
            <Dropdown.Item style={{ backgroundColor: "#84855D" }} className="overall" id="over" onClick={handleClick}>
              Overall
            </Dropdown.Item>
          {/* </Dropdown.Menu>
        </Dropdown> */}

        <Dropdown className="d-inline mx-2" autoClose="outside">
          <Dropdown.Toggle
            id="dropdown-autoclose-outside"
            onMouseEnter={handleEnter}
            style={{backgroundColor: "#84855D"}}
          >
            Gender
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {data
              ? Object.keys(data.data.payload.gender).map((value, key) => (
                  <Dropdown.Item
                    key={key}
                    id={"gender," + value + ":" + key}
                    className={value}
                    onClick={handleClick}
                  >
                    {value}{" "}
                    <FiCheck id={"check," + value} className={"check"} />
                  </Dropdown.Item>
                ))
              : ""}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="d-inline mx-2" autoClose="outside">
          <Dropdown.Toggle
            id="dropdown-autoclose-outside"
            onMouseEnter={handleEnter}
            style={{backgroundColor: "#84855D"}}
          >
             Age Groups
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {data
              ? Object.keys(data.data.payload.age).map((value, key) => (
                  <Dropdown.Item
                    key={key}
                    id={"age," + value + ":" + key}
                    className={value}
                    onClick={handleClick}
                  >
                    {value}{" "}
                    <FiCheck id={"check," + value} className={"check"} />
                  </Dropdown.Item>
                ))
              : ""}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="d-inline mx-2" autoClose="outside">
          <Dropdown.Toggle style={{backgroundColor: "#84855D"}}
            id="dropdown-autoclose-outside"
            onMouseEnter={handleEnter}
          >
            Region
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {data
              ? Object.keys(data.data.payload.region).map((value, key) => (
                  <Dropdown.Item
                    key={key}
                    id={"region," + value + ":" + key}
                    className={value}
                    onClick={handleClick}
                  >
                    {value}{" "}
                    <FiCheck id={"check," + value} className={"check"} />
                  </Dropdown.Item>
                ))
              : ""}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="fills">
        {Object.keys(filters).map((value, key) => {
          return Object.keys(filters[value]).map((val, idx) => {
            return (
              <span key={idx} className={val} id="selected" onClick={handleDelete}>
                {val} <FiXCircle />
              </span>
            );
          });
        })}
      </div>

      <div className="sub">
        {Object.keys(filters).map((value, key1) =>
          Object.keys(filters[value]).length > 0 ? (
            <>
              <h5>{value!=="nofilters"?value:""}</h5>
              <div key={key1} className="box">
                {Object.keys(filters[value]).map((val, idx) =>
                  labels != null ? (
                    <div>
                      {idx===Object.keys(filters[value]).length-1?( <Chart
                        key={idx}
                        className="chart"
                        options={{
                          ...graphOption.options,legend:legends,plotOptions:{...graphOption.plotOptions,pie:{...graphOption.options.plotOptions.pie,offsetX:-120}},
                          title: { text:val!=="overall"? val:"" ,
                            align:"left",
                          },
                        }}
                        series={filters[value][val]}
                        type="pie"
                        width="700px"
                      />):( <Chart
                        key={idx}
                        options={{
                          ...graphOption.options,legend:legends1,
                          title: { text: val,
                            align:"center", },
                        }}
                        series={filters[value][val]}
                        type="pie"
                        width="340"
                      />)}
                     
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}

export default PieCharts;
