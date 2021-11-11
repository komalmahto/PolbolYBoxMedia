import React, { useState, useEffect } from "react"
import Chart from "react-apexcharts"
import Dropdown from "react-bootstrap/Dropdown"
import { FiCheck } from "react-icons/fi"
import { FiXCircle } from "react-icons/fi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./graph.css"
import DropdownCascade from "react-dropdown-cascade"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box"
import { Typography, Grid } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import ShowChartIcon from "@mui/icons-material/ShowChart"
function BarCharts(props) {
  const [style, setStyle] = useState(" ")
  const [id, setId] = useState(0)
  const [click, setClicked] = useState(false)
  const [hover, setHover] = useState("")
  const showMenu = () => {
    setClicked(true)
    setStyle("dropdown-content")
    setId(1)
  }
  const closeMenu = () => {
    setClicked(false)
    setStyle("")
  }
  const [data, setData] = useState(null)
  const [dropdownValue, setDropdownValue] = useState("Select filter")
  const [it, setIt] = useState([])

  const [filters, setFilters] = useState({
    nofilters: {},
    gender: {},
    age: {},
    region: {},
  })

  const [filtersVotes, setFiltersVotes] = useState({
    nofilters: {},
    gender: {},
    age: {},
    region: {},
  })

  const graphOption = {
    options: {
      dataLabels: {
        formatter: function (val) {
          return val + " %"
        },
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "70%",
          dataLabels: {
            position: "center",
            style: {
              colors: ["#3433"],
            },
            enabled: true,
          },
        },
      },
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
        tools: {
          download: false,
        },
      },
      xaxis: {
        type: "Rating",
        categories: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    },
  }

  const items = [
    {
      value: "1",
      label: "Menu 1",
      children: [
        {
          value: "11",
          label: "Another Item",
        },
        {
          value: "12",
          label: "More Items",
          children: [
            {
              value: "121",
              label: "Sub Item A",
            },
            {
              value: "122",
              label: "Sub Item B",
              disabled: true,
            },
            {
              value: "123",
              label: "Sub Item C",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "Menu 2",
    },
    {
      value: "3",
      label: "Menu 3",
      children: [
        {
          value: "31",
          label: "Hello",
        },
        {
          value: "21",
          label: "World",
        },
      ],
    },
  ]
  let options
  useEffect(() => {
    // console.log(data.data.payload.ageAndGender,"data")
    setIt(
      data &&
        data.data &&
        Object.keys(data.data.payload.ageAndGender).map((m, i) => {
          return {
            value: m,
            label: m,
            children: Object.keys(data.data.payload.ageAndGender[m]).map(
              (p) => {
                return {
                  value: p,
                  label: p,
                }
              }
            ),
          }
        })
    )
    console.log(options)
  }, [data])
  const handleClick = (e) => {
    e.stopPropagation()
    if (e.target.classList.contains("overall")) {
      if (filters.nofilters.overall !== undefined) {
        const obj = {}
        const obj1 = {}
        setFilters({ ...filters, nofilters: obj })
        setFiltersVotes({ ...filtersVotes, nofilters: obj1 })
      } else {
        settingOverall()
      }
      return
    }
    const id = e.target.id

    const elems = id.split(":")
    const elem = elems[0].split(",")
    const elem1 = elem[0]
    const elem2 = elem[1]

    const arrayone = Object.keys(data.data.payload[elem1][elem2].chartData)

    const arr = arrayone.map(
      (key) => data.data.payload[elem1][elem2].chartData[key].perc
    )
    arr.reverse()
    const obj = { ...filters[elem1], [elem2]: arr }

    const arraytwo = Object.keys(data.data.payload[elem1][elem2].chartData)
    const arr1 = arraytwo.map(
      (key) => data.data.payload[elem1][elem2].chartData[key].votes
    )
    arr1.reverse()
    const obj1 = { ...filtersVotes[elem1], [elem2]: arr1 }

    if (filters[elem1][elem2] !== undefined) {
      const a = { ...filters[elem1] }
      delete a[elem2]
      const b = { ...filtersVotes[elem1] }
      delete b[elem2]
      setFilters({ ...filters, [elem1]: a })
      setFiltersVotes({ ...filtersVotes, [elem1]: b })
    } else {
      setFilters({ ...filters, [elem1]: obj })
      setFiltersVotes({ ...filtersVotes, [elem1]: obj1 })
    }
  }

  const handleDelete = (e) => {
    if (e.target.classList.contains("overall")) {
      if (filters.nofilters.overall !== undefined) {
        const obj = {}
        setFilters({ ...filters, nofilters: obj })
        const obj1 = {}
        setFiltersVotes({ ...filtersVotes, nofilters: obj1 })
      } else {
        settingOverall()
      }
      return
    }
    const val = e.target.className
    for (let key in filters) {
      if (filters[key][val] !== undefined) {
        const obj = { ...filters[key] }

        delete obj[val]

        setFilters({ ...filters, [key]: obj })
        const obj1 = { ...filtersVotes[key] }
        delete obj1[val]
        setFiltersVotes({ ...filtersVotes, [key]: obj1 })
      }
    }
  }

  const settingOverall = () => {
    const arrayone = Object.keys(data.data.payload.global.chartData)
    const arr = arrayone.map(
      (key) => data.data.payload.global.chartData[key].perc
    )
    arr.reverse()
    const obj = { overall: arr }
    const arraytwo = Object.keys(data.data.payload.global.chartData)
    const arr1 = arraytwo.map(
      (key) => data.data.payload.global.chartData[key].votes
    )
    arr1.reverse()
    const obj1 = { overall: arr1 }

    setFilters({ ...filters, nofilters: obj })
    setFiltersVotes({ ...filtersVotes, nofilters: obj1 })
  }

  const handleEnter = (e) => {
    e.target.click()
  }
  useEffect(() => {
    setData(props.data)
  }, [])

  useEffect(() => {
    if (data) {
      settingOverall()
    }
  }, [data])

  console.log(data ? data.data.payload : "")
  const notify = () => {
    navigator.clipboard.writeText(window.location.href)
    toast("Copied to clipboard")
  }

  return (
    <div>
      <ToastContainer />

      {data ? (
        <h4 className="heading">
          {data.data.payload.poll.question}
          <span onClick={notify}>
            Share result{" "}
            <i style={{ color: "#84855d" }} className="fas fa-share-alt"></i>
          </span>
        </h4>
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          margin: "0",
        }}
      >
        <div className="filter__bar">
          <div
            style={{
              display: "flex",
              margin: "0 10px",
              flexDirection: "column",
            }}
          >
            {" "}
            <Dropdown.Item className="overall" onClick={handleClick}>
              Overall
            </Dropdown.Item>
            <Typography
              center
              variant="h6"
              style={{ color: "#84855D", marginLeft: "6%" }}
            >
              Gender
            </Typography>
            <List sx={{ bgcolor: "background.paper" }}>
              {data
                ? Object.keys(data.data.payload.gender).map((value, key) => {
                    const labelId = `checkbox-list-label-${value}`
                    return (
                      <ListItem disablePadding>
                        <ListItemButton>
                          <div style={{ marginRight: "7%" }}>
                            <input
                              type="checkbox"
                              key={key}
                              id={"gender," + value + ":" + key}
                              className={value}
                              onClick={handleClick}
                            />
                          </div>
                          {value}{" "}
                          <FiCheck id={"check," + value} className={"check"} />
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                : ""}
            </List>
            <Typography
              center
              variant="h6"
              style={{ color: "#84855D", marginLeft: "6%" }}
            >
              Age Groups
            </Typography>
            <List sx={{ bgcolor: "background.paper" }}>
              {data
                ? Object.keys(data.data.payload.age).map((value, key) => (
                    <ListItem disablePadding>
                      <ListItemButton>
                        <div style={{ marginRight: "7%" }}>
                          <input
                            type="checkbox"
                            key={key}
                            id={"age," + value + ":" + key}
                            className={value}
                            onClick={handleClick}
                          />
                        </div>
                        {value}
                        <FiCheck id={"check," + value} className={"check"} />
                      </ListItemButton>
                    </ListItem>
                  ))
                : ""}
            </List>
            <Dropdown className="d-inline mx-2" autoClose="outside">
              <Dropdown.Toggle
                style={{ backgroundColor: "#84855D" }}
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
        </div>
        <div className="center_graph">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              {Object.keys(filters).map((value, key) =>
                Object.keys(filters[value]).length > 0 ? (
                  <>
                    <h5
                      style={{
                        margin: "10px auto",
                        textTransform: "uppercase",
                      }}
                    >
                      {value !== "nofilters" ? value : ""}
                    </h5>
                    <Grid
                      container
                      spacing={1}
                      style={{
                        margin: "0 auto",
                        textAlign: "center",
                        display: "flex",
                      }}
                    >
                      {Object.keys(filters[value]).map((val, idx) => (
                        <>
                          <Grid
                            style={{
                              textAlign: "center",

                              margin: "0 auto",
                            }}
                          >
                            <Grid
                              columns={{ xs: 12, sm: 6, md: 6 }}
                              item
                              rowSpacing={1}
                              style={{
                                textAlign: "center",
                                display: "flex",
                                margin: "0 auto",

                                displa: "flex",
                              }}
                            >
                              <Chart
                                key={idx}
                                options={{
                                  ...graphOption.options,
                                  title: {
                                    text: val !== "overall" ? val : "",
                                    align: "left",
                                  },
                                }}
                                series={[
                                  { name: "Actual", data: filters[value][val] },
                                ]}
                                type="bar"
                                width="500"
                              />
                              <div className="vote__border">
                                <div className="vote_head">
                                  <p className="bold">Votes</p>
                                </div>
                                <div className="votes">
                                  {filtersVotes[value][val].map((val, idx) => (
                                    <p key={idx} className="vote">
                                      {val}
                                    </p>
                                  ))}
                                  {value !== "nofilters" ? (
                                    <p className="total">
                                      Total votes :{" "}
                                      {data
                                        ? data.data.payload[value][val]
                                            .totalVotes
                                        : ""}
                                    </p>
                                  ) : (
                                    <p className="total">
                                      Total votes :
                                      {data
                                        ? data.data.payload.global.totalVotes
                                        : ""}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <></>
                )
              )}
              <></>
            </Grid>
          </Box>
        </div>
      </div>

      <div className="dropdown_mobile">
        <div class="dropBtn">
          {click === true ? (
            <>
              <div onClick={closeMenu}>
                <CloseIcon
                  onClick={closeMenu}
                  color="success"
                  fontSize="large"
                />
              </div>

              <div class={style} id={id}>
                {click === true && (
                  <>
                    <Dropdown.Item className="overall" onClick={handleClick}>
                      Overall
                    </Dropdown.Item>
                    <Typography
                      center
                      variant="h6"
                      style={{
                        color: "#84855D",
                      }}
                    >
                      Gender
                    </Typography>
                    <List sx={{ bgcolor: "background.paper" }}>
                      {data
                        ? Object.keys(data.data.payload.gender).map(
                            (value, key) => {
                              const labelId = `checkbox-list-label-${value}`
                              return (
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <div style={{ marginRight: "7%" }}>
                                      <input
                                        type="checkbox"
                                        key={key}
                                        id={"gender," + value + ":" + key}
                                        className={value}
                                        onClick={handleClick}
                                      />
                                    </div>
                                    {value}{" "}
                                    <FiCheck
                                      id={"check," + value}
                                      className={"check"}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              )
                            }
                          )
                        : ""}
                    </List>
                    <Typography
                      center
                      variant="h6"
                      style={{ color: "#84855D" }}
                    >
                      Age Groups
                    </Typography>
                    <List sx={{ bgcolor: "background.paper" }}>
                      {data
                        ? Object.keys(data.data.payload.age).map(
                            (value, key) => (
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <div style={{ marginRight: "7%" }}>
                                    <input
                                      type="checkbox"
                                      key={key}
                                      id={"age," + value + ":" + key}
                                      className={value}
                                      onClick={handleClick}
                                    />
                                  </div>
                                  {value}
                                  <FiCheck
                                    id={"check," + value}
                                    className={"check"}
                                  />
                                </ListItemButton>
                              </ListItem>
                            )
                          )
                        : ""}
                    </List>
                    <Dropdown className="d-inline mx-2" autoClose="outside">
                      <Dropdown.Menu>
                        {data
                          ? Object.keys(data.data.payload.region).map(
                              (value, key) => (
                                <Dropdown.Item
                                  key={key}
                                  id={"region," + value + ":" + key}
                                  className={value}
                                  onClick={handleClick}
                                >
                                  {value}{" "}
                                  <FiCheck
                                    id={"check," + value}
                                    className={"check"}
                                  />
                                </Dropdown.Item>
                              )
                            )
                          : ""}
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </>
          ) : (
            <MenuIcon onClick={showMenu} color="success" fontSize="large" />
          )}
        </div>
      </div>
    </div>
  )
}

export default BarCharts
