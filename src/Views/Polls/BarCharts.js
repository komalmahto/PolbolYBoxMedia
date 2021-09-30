import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FiCheck } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";
import "./graph.css";

function BarCharts(props) {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    nofilters: {},
    gender: {},
    age: {},
    region: {},
  });

  const graphOption = {
    options: {
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ["#333"],
          },
        },
      },
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    },
  };

  const handleClick = (e) => {
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

    const arrayone = Object.keys(data.data.payload.global.chartData);
    const arr = arrayone.map(
      (key) => data.data.payload.global.chartData[key].votes
    );
    arr.reverse();
    const obj = { ...filters[elem1], [elem2]: arr };
    if (filters[elem1][elem2] !== undefined) {
      const a = { ...filters[elem1] };
      delete a[elem2];
      setFilters({ ...filters, [elem1]: a });
    } else {
      setFilters({ ...filters, [elem1]: obj });
    }
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
    const arrayone = Object.keys(data.data.payload.global.chartData);
    const arr = arrayone.map(
      (key) => data.data.payload.global.chartData[key].votes
    );
    arr.reverse();
    const obj = { overall: arr };

    setFilters({ ...filters, nofilters: obj });
  };
  useEffect(() => {
    setData(props.data);
  }, []);

  useEffect(() => {
    if (data) {
      settingOverall();
    }
  }, [data]);

  return (
    <div className="container">
      {data ? (
        <h4 className="heading">{data.data.payload.poll.question}</h4>
      ) : (
        ""
      )}
      <DropdownButton id="dropdown-basic-button" title="Filter Results">
        <DropdownButton id="dropdown-basic-button" title="No Filter">
          <Dropdown.Item className="overall" onClick={handleClick}>
            Overall <FiCheck id={"check,Overall"} />
          </Dropdown.Item>
        </DropdownButton>
        <Dropdown.Divider />
        <DropdownButton id="dropdown-button" title="Gender">
          {data
            ? Object.keys(data.data.payload.gender).map((value, key) => (
                <Dropdown.Item
                  key={key}
                  id={"gender," + value + ":" + key}
                  className={value}
                  onClick={handleClick}
                >
                  {value} <FiCheck id={"check," + value} className={"check"} />
                </Dropdown.Item>
              ))
            : ""}
        </DropdownButton>
        <Dropdown.Divider />
        <DropdownButton id="dropdown-button" title="Age Group">
          {data
            ? Object.keys(data.data.payload.age).map((value, key) => (
                <Dropdown.Item
                  key={key}
                  id={"age," + value + ":" + key}
                  className={value}
                  onClick={handleClick}
                >
                  {value} <FiCheck id={"check," + value} className={"check"} />
                </Dropdown.Item>
              ))
            : ""}
        </DropdownButton>
        <Dropdown.Divider />
        <DropdownButton id="dropdown-button" title="Region">
          {data
            ? Object.keys(data.data.payload.region).map((value, key) => (
                <Dropdown.Item
                  key={key}
                  id={"region," + value + ":" + key}
                  className={value}
                  onClick={handleClick}
                >
                  {value} <FiCheck id={"check," + value} className={"check"} />
                </Dropdown.Item>
              ))
            : ""}
        </DropdownButton>
      </DropdownButton>

      <div className="fills">
        {Object.keys(filters).map((value, key) => {
          return Object.keys(filters[value]).map((val, idx) => {
            return (
              <span key={idx} className={val} onClick={handleDelete}>
                {val} <FiXCircle />
              </span>
            );
          });
        })}
      </div>

      <div className="sub">
        {Object.keys(filters).map((value, key) =>
          Object.keys(filters[value]).length > 0 ? (
            <>
              <h5>{value}</h5>
              <div key={key} className="box">
                {Object.keys(filters[value]).map((val, idx) => (
                  <div key={idx}>
                    <Chart
                      key={idx}
                      options={{
                        ...graphOption.options,
                      }}
                      series={[{ name: "Actual", data: filters[value][val] }]}
                      type="bar"
                      width="550"
                    />
                  </div>
                ))}
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

export default BarCharts;
