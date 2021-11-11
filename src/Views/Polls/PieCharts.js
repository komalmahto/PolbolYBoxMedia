import React, { useState, useEffect } from "react"
import Chart from "react-apexcharts"
import Dropdown from "react-bootstrap/Dropdown"
import { FiCheck } from "react-icons/fi"
import { ToastContainer, toast } from "react-toastify"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import { Typography, Grid } from "@mui/material"
import arr from "./PieChart_Data"
import { Line } from "@ant-design/charts"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import ShowChartIcon from "@mui/icons-material/ShowChart"
import Modal from "@mui/material/Modal"
import "react-toastify/dist/ReactToastify.css"
import "./graph.css"
import "./PieChart.css"
import "./FilterOption.css"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

function PieCharts(props) {
  const [style, setStyle] = useState(" ")
  const [id, setId] = useState(0)
  const [tick, setTicked] = useState(true)
  const [click, setClicked] = useState(false)
  const [hover, setHover] = useState("")
  const [open1, setOpen1] = React.useState(false)
  const [open, setOpen] = React.useState(false)
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
  const showMenu = () => {
    setClicked(true)
    setStyle("dropdown-content")
    setId(1)
  }
  const closeMenu = () => {
    setClicked(false)
    setStyle("")
  }
  const handleClose = () => setOpen(false)
  const [checked, setChecked] = React.useState([0])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  const handleOnChange = () => {}
  const [data, setData] = useState(null)
  const [filters, setFilters] = useState({
    nofilters: {},
    gender: {},
    age: {},
    region: {},
  })
  const [ageGender, setageGender] = useState({
    "12 to 17": {},
    "18 to 24": {},
    "25 to 34": {},
    "35 to 44": {},
    "45 to 59": {},
    "60 and Above": {},
  })
  const legends = {
    position: "bottom",
    horizontalAlign: "left",
    width: 700,
    offsetX: 0,
    offsetY: 5,
    markers: { radius: 0 },
    itemMargin: {
      horizontal: 0,
      vertical: 10,
    },
  }
  const legends1 = {
    show: false,
  }

  const handleSelect = (e) => {
    const id = e.target.id
    console.log(id, "komal")
    const splitAgeGender = id.split(":")

    var ageGap = splitAgeGender[0]
    var ageGapGender = splitAgeGender[1]
    // console.log(data.data.payload.ageAndGender[ageGap][ageGapGender])
    // console.log(ageGap, ageGapGender)
    const arr = Object.values(
      data.data.payload.ageAndGender[ageGap][ageGapGender]
    )
    console.log(arr)
    const obj = { ...ageGender[ageGap], [ageGapGender]: arr }
    console.log(obj)
    setageGender({ ...ageGender, [ageGap]: obj })
    if (ageGender[ageGap][ageGapGender] !== undefined) {
      console.log("aya")
      const a = { ...ageGender[ageGap] }
      console.log(a)
      delete a[ageGapGender]
      setageGender({ ...ageGender, [ageGap]: a })
    } else {
      setageGender({ ...ageGender, [ageGap]: obj })
    }
    console.log(ageGender)
    //console.log(ageGender[ageGap][ageGapGender])
  }

  const handleClick = (e) => {
    setTicked(!tick)

    e.stopPropagation()
    console.log(e)
    if (e.target.classList.contains("overall")) {
      if (filters.nofilters.overall !== undefined) {
        const obj = {}
        setFilters({ ...filters, nofilters: obj })
      } else {
        settingOverall()
      }
      return
    }
    const id = e.target.id
    console.log(id)
    const elems = id.split(":")
    const elem = elems[0].split(",")
    const elem1 = elem[0]
    const elem2 = elem[1]
    console.log(elems, "komal", elem, elem1, elem2)
    const arr = Object.values(data.data.payload[elem1][elem2])
    console.log(arr, filters)
    const obj = { ...filters[elem1], [elem2]: arr }
    console.log(obj)
    console.log(filters[elem1])
    if (filters[elem1][elem2] !== undefined) {
      const a = { ...filters[elem1] }
      console.log(a)
      delete a[elem2]
      setFilters({ ...filters, [elem1]: a })
    } else {
      setFilters({ ...filters, [elem1]: obj })
    }
    console.log(filters[elem1])
    console.log(filters)
  }

  const settingOverall = () => {
    const arr = Object.values(props?.data.data.payload.global)
    const obj = { overall: arr }

    setFilters({ ...filters, nofilters: obj })
  }

  const handleEnter = (e) => {
    e.target.click()
  }

  const notify = () => {
    navigator.clipboard.writeText(window.location.href)
    toast("Copied to clipboard")
  }

  let lineChart = []
  let lineChartGender = []
  const [labels, setLabels] = useState(null)
  const [daata, setDaata] = useState(null)
  useEffect(() => {
    setDaata(props.data)
    setData(props.data)
  }, [props])
  useEffect(() => {
    if (daata) {
      setLabels(
        props?.data.data.payload.poll.options.map((val, idx) => val.name)
      )
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

    Object.keys(props?.data?.data.payload.age).forEach((i, idx) => {
      console.log(i)
      console.log(labels)
      for (let j = 0; j < 10; j++) {
        console.log(labels[j])
        console.log(props?.data.data.payload.age[i])
      }
      if (labels !== null && labels.length > 0) {
        for (let j = 0; j < 10; j++) {
          lineChart.push({
            name: labels[j],
            frequency: props?.data.data.payload.age[i][j],
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
      for (let j = 0; j < 10; j++) {
        console.log(labels[j])
        console.log(props?.data.data.payload.gender[i][j])
      }
      if (labels !== null) {
        for (let j = 0; j < 10; j++) {
          lineChartGender.push({
            name: labels[j],
            frequency: props?.data?.data?.payload?.gender[i][j],
            gender: i,
          })
        }
      }
    })

    setGotchart2(lineChartGender)
    console.log(lineChartGender)
    console.log(gotChart2)
  }

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
  const graphOption = {
    options: {
      labels,
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
              },
            },
          },
          offsetX: 0,
          dataLabels: {
            offset: -5,
          },
        },
      },
    },
  }
  return (
    <>
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
      <div className="container">
        <ToastContainer />
        {data && (
          <h4 className="heading">
            {data.data.payload.poll.question}{" "}
            <span onClick={notify}>
              <i style={{ color: "#84855d" }} className="fas fa-share-alt"></i>
            </span>
          </h4>
        )}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div className="filter__bar">
          <div
            style={{
              display: "flex",

              flexDirection: "column",
            }}
          >
            {" "}
            <Typography className="filterHeading">
              <input
                type="checkbox"
                checked={tick}
                className="overall"
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
                      ))
                    : ""}
                </List>
              </AccordionDetails>
            </Accordion>
            <Typography style={{ padding: "14px" }} className="filterHeading">
              Age & Gender
            </Typography>
            {data &&
              Object.keys(data.data.payload.ageAndGender).map((value, key) => {
                return (
                  <>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{value}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <div style={{ marginRight: "2px" }}>
                                <input
                                  type="checkbox"
                                  key={key}
                                  id={value + ":" + "male"}
                                  className={value}
                                  onClick={handleSelect}
                                />{" "}
                              </div>
                              male
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <div style={{ marginRight: "2px" }}>
                                <input
                                  type="checkbox"
                                  key={key}
                                  id={value + ":" + "female"}
                                  onClick={handleSelect}
                                />{" "}
                              </div>
                              female
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <div style={{ marginRight: "2px" }}>
                                <input
                                  type="checkbox"
                                  key={key}
                                  id={value + ":" + "other"}
                                  onClick={handleSelect}
                                />{" "}
                              </div>
                              other
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )
              })}
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

        <div
          className="center_graph_piechart"
          style={{
            textAlign: "center",
            display: "flex",
            // border: "2px solid red",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              {Object.keys(filters).map((value, key1) =>
                Object.keys(filters[value]).length > 0 ? (
                  <>
                    <h4
                      style={{ margin: "0 auto", textTransform: "uppercase" }}
                    >
                      {value !== "nofilters" ? value : ""}
                    </h4>

                    <Grid
                      container
                      spacing={0}
                      style={{
                        margin: "0 auto",
                        textAlign: "center",
                        display: "flex",
                        // border: "2px solid red",
                      }}
                    >
                      {Object.keys(filters[value]).map((val, idx) =>
                        labels != null ? (
                          <Grid
                            className="pieChartContainer"
                            columns={{ xs: 4, sm: 6, md: 4 }}
                            item
                            rowSpacing={0}
                          >
                            <Chart
                              key={idx}
                              options={{
                                ...graphOption.options,
                                legend: legends1,

                                title: { text: val, align: "center" },
                              }}
                              series={filters[value][val]}
                              type="donut"
                              className="piechart"
                              style={{ margin: "0 auto" }}
                            />
                          </Grid>
                        ) : (
                          <></>
                        )
                      )}
                    </Grid>
                  </>
                ) : (
                  <></>
                )
              )}
              <></>
            </Grid>

            <Grid>
              {Object.keys(ageGender).map((value, key1) =>
                Object.keys(ageGender[value]).length > 0 ? (
                  <>
                    <h4
                      style={{ margin: "0 auto", textTransform: "uppercase" }}
                    >
                      {value}
                    </h4>
                    <Grid
                      container
                      spacing={0}
                      style={{
                        margin: "0 auto",
                        textAlign: "center",
                        display: "flex",
                        // border: "2px solid red",
                      }}
                    >
                      {Object.keys(ageGender[value]).map((val, idx) =>
                        labels != null ? (
                          <Grid
                            className="pieChartContainer"
                            columns={{ xs: 4, sm: 6, md: 4 }}
                            item
                            rowSpacing={0}
                          >
                            {
                              <Chart
                                key={idx}
                                options={{
                                  ...graphOption.options,
                                  legend: legends1,
                                  title: { text: val, align: "center" },
                                }}
                                series={ageGender[value][val]}
                                type="pie"
                                className="piechart"
                                style={{ margin: "0 auto" }}
                              />
                            }
                          </Grid>
                        ) : null
                      )}
                    </Grid>
                  </>
                ) : null
              )}
            </Grid>
          </Box>
        </div>
        <div className="filter__bar2" style={{}}>
          {labels?.map((item, idx) => {
            return (
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    backgroundColor: `${arr[idx].color}`,
                  }}
                  className="color_pie"
                ></span>
                <p className="pie_title">{item}</p>
              </div>
            )
          })}
        </div>
      </div>
      {/* mobile-view  */}
      <div className="dropdown_mobile">
        <div className="wrapper-label">
          <div className="label-button">
            <ShowChartIcon
              fontSize="large"
              className="animate1 icon-bottom"
              onMouseEnter={() => setHover("animate2")}
              onMouseLeave={() => setHover("")}
            />
          </div>
          <div className={hover}>
            {hover !== "" ? (
              <div
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
                  zIndex: "500",
                }}
              >
                {labels?.map((item, idx) => {
                  return (
                    <div style={{ display: "flex" }}>
                      <span
                        className="color_pie"
                        style={{
                          backgroundColor: `${arr[idx].color}`,
                        }}
                      ></span>
                      <p className="pie_title">{item}</p>
                    </div>
                  )
                })}
              </div>
            ) : (
              " "
            )}
          </div>
        </div>

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
                      style={{ color: "#84855D" }}
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
                    <Typography
                      center
                      variant="h6"
                      style={{ color: "#84855D" }}
                    >
                      Age And Gender
                    </Typography>
                    {data &&
                      Object.keys(data.data.payload.ageAndGender).map(
                        (value, key) => {
                          return (
                            <>
                              <Accordion>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography>{value}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List>
                                    <ListItem disablePadding>
                                      <ListItemButton>
                                        <div style={{ marginRight: "2px" }}>
                                          <input
                                            type="checkbox"
                                            key={key}
                                            id={value + ":" + "male"}
                                            className={value}
                                            onClick={handleSelect}
                                          />{" "}
                                        </div>
                                        male
                                      </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <ListItemButton>
                                        <div style={{ marginRight: "2px" }}>
                                          <input
                                            type="checkbox"
                                            key={key}
                                            id={value + ":" + "female"}
                                            onClick={handleSelect}
                                          />{" "}
                                        </div>
                                        female
                                      </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                      <ListItemButton>
                                        <div style={{ marginRight: "2px" }}>
                                          <input
                                            type="checkbox"
                                            key={key}
                                            id={value + ":" + "other"}
                                            onClick={handleSelect}
                                          />{" "}
                                        </div>
                                        other
                                      </ListItemButton>
                                    </ListItem>
                                  </List>
                                </AccordionDetails>
                              </Accordion>
                            </>
                          )
                        }
                      )}
                    <Dropdown className="d-inline " autoClose="outside">
                      <Dropdown.Toggle
                        style={{ backgroundColor: "#84855D", width: "100%" }}
                        id="dropdown-autoclose-outside"
                        onMouseEnter={handleEnter}
                      >
                        Region
                      </Dropdown.Toggle>

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
              className="icon-bottom"
              fontSize="large"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default PieCharts
