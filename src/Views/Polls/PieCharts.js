import React, { useState, useEffect } from "react"
import Chart from "react-apexcharts"
import Dropdown from "react-bootstrap/Dropdown"
import { FiCheck } from "react-icons/fi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./graph.css"
import "./PieChart.css"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import { Pie } from "@ant-design/charts"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import FilterOption from "./FilterOption"
import { Typography, Grid } from "@mui/material"
import arr from "./PieChart_Data"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"

import "./FilterOption.css"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import ShowChartIcon from "@mui/icons-material/ShowChart"

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion from "@mui/material/Accordion"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

function PieCharts(props) {
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
  const [labels, setLabels] = useState(null)

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
  }
  // const [ageGap, setageGap] = useState(null)
  // const [ageGapGender, setageGapGender] = useState(null)
  const handleSelect = (e) => {
    const id = e.target.id
    console.log(id, "komal")
    const splitAgeGender = id.split(":")
    // setageGap(splitAgeGender[0])
    // setageGapGender(splitAgeGender[1])
    var ageGap = splitAgeGender[0]
    var ageGapGender = splitAgeGender[1]
    console.log(data.data.payload.ageAndGender[ageGap][ageGapGender])
    console.log(ageGap, ageGapGender)
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

  // const handleDelete = (e) => {
  //   if (e.target.classList.contains("overall")) {
  //     if (filters.nofilters.overall !== undefined) {
  //       const obj = {}
  //       setFilters({ ...filters, nofilters: obj })
  //     } else {
  //       settingOverall()
  //     }
  //     return
  //   }
  //   const val = e.target.className
  //   for (let key in filters) {
  //     if (filters[key][val] !== undefined) {
  //       const obj = { ...filters[key] }
  //       delete obj[val]
  //       setFilters({ ...filters, [key]: obj })
  //     }
  //   }
  // }

  const settingOverall = () => {
    const arr = Object.values(data.data.payload.global)
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

  useEffect(() => {
    setData(props.data)
  }, [])

  //console.log(props)
  useEffect(() => {
    if (data) {
      setLabels(data.data.payload.poll.options.map((val, idx) => val.name))
      console.log(labels)
      settingOverall()
    }
  }, [data])

  console.log(props.data)

  Object.keys(ageGender).map((value, key1) =>
    Object.keys(ageGender[value]).length > 0
      ? Object.keys(ageGender[value]).map((val, idx) =>
          labels != null ? console.log(ageGender[value][val]) : " "
        )
      : null
  )

  return (
    <>
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
              padding: "0 20px",
              flexDirection: "column",
            }}
          >
            {" "}
            <Dropdown.Item className="overall" onClick={handleClick}>
              Overall
            </Dropdown.Item>
            <Typography
              variant="h6"
              style={{ color: "#84855D", padding: "0 auto" }}
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
            <Typography variant="h6" style={{ color: "#84855D" }}>
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
            <Typography
              variant="h6"
              style={{ color: "#84855D", padding: "0 auto" }}
            >
              Age And Gender
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
        {/* <div className="sub">
          {Object.keys(filters).map((value, key1) =>
            Object.keys(filters[value]).length > 0 ? (
              <>
                <h5>{value !== "nofilters" ? value : ""}</h5>
                <div key={key1} className="box">
                  {Object.keys(filters[value]).map((val, idx) =>
                    labels != null ? (
                      <div>
                        {idx === Object.keys(filters[value]).length - 1 ? (
                          <Chart
                            key={idx}
                            className="chart"
                            options={{
                              ...graphOption.options,
                              legend: legends,
                              plotOptions: {
                                ...graphOption.plotOptions,
                                pie: {
                                  ...graphOption.options.plotOptions.pie,
                                  offsetX: -120,
                                },
                              },
                              title: {
                                text: val !== "overall" ? val : "",
                                align: "left",
                              },
                            }}
                            series={filters[value][val]}
                            type="pie"
                            width="700px"
                          />
                        ) : (
                          <Chart
                            key={idx}
                            options={{
                              ...graphOption.options,
                              legend: legends1,
                              title: { text: val, align: "center" },
                            }}
                            series={filters[value][val]}
                            type="pie"
                            width="340"
                          />
                        )}
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
        </div> */}
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
                              type="pie"
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
                  // style={{ background: `${item.color}` }}
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
                        // style={{ background: `${item.color}` }}
                        className="color_pie"
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
