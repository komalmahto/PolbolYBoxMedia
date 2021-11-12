import React, { useState, useEffect } from "react"
import Chart from "react-apexcharts"
import Dropdown from "react-bootstrap/Dropdown"
import { FiCheck } from "react-icons/fi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./graph.css"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Modal from "@mui/material/Modal"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Accordion from "@mui/material/Accordion"
import { Line } from "@ant-design/charts"
import DropdownCascade from "react-dropdown-cascade"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box"
import { Typography, Grid } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import ShowChartIcon from "@mui/icons-material/ShowChart"
import Button from "@mui/material/Button"
import ModalComp from "./Modal"

function BarCharts(props) {
  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
  const [style, setStyle] = useState(" ")
  const [id, setId] = useState(0)
  const [click, setClicked] = useState(false)
  const [hover, setHover] = useState("")
  const [tick, setTicked] = useState(true)
  const [gotchart, setGotchart] = useState(null)
  const [gotChart2, setGotchart2] = useState(null)
  const handleOpen = (type) => {
    console.log(type === "one")
    if (type === "one") {
      setOpen1(true)
    } else {
      setOpen1(false)
    }
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  let lineChart = []
  let lineChartGender = []

  const [labels, setLabels] = useState(null)
  const [daata, setDaata] = useState(null)
  useEffect(() => {
    setDaata(props.data)
  }, [props])
  useEffect(() => {
    if (daata) {
      setLabels(data.data.payload.poll.options.map((val, idx) => val.name))
      console.log(labels)
      settingOverall()
    }
  }, [daata])

  const [datas, setDatas] = useState([])
  useEffect(() => {
    if (labels) {
      asyncFetch1()
      asyncFetch2()
    }
  }, [labels])

  const asyncFetch1 = async () => {
    console.log(props)
    //setDatas(props?.data?.data?.payload?.age)

    Object.keys(props?.data?.data.payload.age).forEach((i, idx) => {
      console.log(i)
      if (labels !== null) {
        for (let j = 0; j < 10; j++) {
          lineChart.push({
            name: labels[j],
            frequency: props?.data.data.payload.age[i].chartData[j].perc,
            ageGap: i,
          })
          console.log(lineChart)
        }
      }
    })
    setGotchart(lineChart)
  }

  const asyncFetch2 = () => {
    Object.keys(props?.data?.data?.payload?.gender).forEach((i, idx) => {
      console.log(i)

      if (labels !== null) {
        for (let j = 0; j < 10; j++) {
          lineChartGender.push({
            name: labels[j],
            frequency: props?.data?.data?.payload?.gender[i].chartData[j].perc,
            gender: i,
          })
        }
      }
    })

    setGotchart2(lineChartGender)
    console.log(gotchart)
    console.log(gotChart2)
  }
  console.log(lineChart)
  var config1, config2
  if (gotchart !== null && lineChartGender !== null) {
    config2 = {
      data: gotChart2,
      yField: "frequency",
      xField: "gender",
      seriesField: "name",
      xAxis: {
        title: {
          text: "Gender",
          style: { fontSize: 20 },
        },
      },
      yAxis: {
        title: {
          text: "Vote Percentage",
          style: { fontSize: 20 },
        },
        label: {
          formatter: function formatter(v) {
            return "".concat(v, " %")
          },
        },
      },

      legend: { position: "top" },
      smooth: true,
      animation: {
        appear: {
          animation: "path-in",
          duration: 2000,
        },
      },
    }
    config1 = {
      data: gotchart !== null ? gotchart : " ",
      yField: "frequency",
      xField: "ageGap",
      seriesField: "name",
      xAxis: {
        title: {
          text: "Age Groups",
          style: { fontSize: 20 },
        },
      },
      yAxis: {
        title: {
          text: "Vote Percentage",
          style: { fontSize: 20 },
        },
        label: {
          formatter: function formatter(v) {
            return "".concat(v, " %")
          },
        },
      },

      legend: { position: "top" },
      smooth: true,
      animation: {
        appear: {
          animation: "path-in",
          duration: 10000,
        },
      },
    }
  }

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

  const handleClick = (e) => {
    e.stopPropagation()
    if (e.target.classList.contains("overall")) {
      setTicked(!tick)
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            width: "80%",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "5%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            bgcolor: "background.paper",

            boxShadow: 24,
            p: 4,
          }}
        >
          {open1 === true && gotchart !== null && lineChartGender !== null ? (
            <div>
              <Line {...config1} />
            </div>
          ) : (
            <div>
              <Line {...config2} />
            </div>
          )}
        </Box>
      </Modal>

      <ToastContainer />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {data && (
          <>
            <h4 className="heading">{data.data.payload.poll.question} </h4>
            <ModalComp
              question={data.data.payload.poll.question}
              link={window.location.href}
            />
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          margin: "0",
        }}
      >
        <div className="filter__bar" style={{ height: "100vh" }}>
          <div
            style={{
              display: "flex",

              flexDirection: "column",
            }}
          >
            <Typography style={{ paddingLeft: "9%" }} className="filterHeading">
              <input
                type="checkbox"
                className="overall"
                checked={tick}
                onClick={handleClick}
              />{" "}
              Overall
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="filterHeading">Gender</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{ bgcolor: "background.paper" }}>
                  {data
                    ? Object.keys(data.data.payload.gender).map(
                        (value, key) => {
                          const labelId = `checkbox-list-label-${value}`
                          return (
                            <ListItem disablePadding>
                              <ListItemButton>
                                <div
                                  style={{ marginRight: "1%", fontSize: "2px" }}
                                >
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
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="filterHeading">Age Groups</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{ bgcolor: "background.paper" }}>
                  {data
                    ? Object.keys(data.data.payload.age).map((value, key) => (
                        <ListItem disablePadding>
                          <ListItemButton>
                            <div style={{ marginRight: "1%", fontSize: "2px" }}>
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
                      ))
                    : ""}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="filterHeading">Option Trends</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{ bgcolor: "background.paper" }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleOpen("one")
                      }}
                    >
                      Age
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleOpen("two")
                      }}
                    >
                      Gender
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="filterHeading">Region</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {data
                    ? Object.keys(data.data.payload.region).map(
                        (value, key) => (
                          <ListItem disablePadding>
                            <ListItemButton>
                              <div style={{ marginRight: "2px" }}>
                                <input
                                  type="checkbox"
                                  key={key}
                                  id={"region," + value + ":" + key}
                                  className={value}
                                  onClick={handleClick}
                                />
                              </div>
                              {value}
                            </ListItemButton>
                          </ListItem>
                        )
                      )
                    : ""}
                </List>
              </AccordionDetails>
            </Accordion>
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
                        textTransform: "capitalize",
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
                  className="icon-bottom"
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
            <MenuIcon
              onClick={showMenu}
              fontSize="large"
              className="icon-bottom"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BarCharts
