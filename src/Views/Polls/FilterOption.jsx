import React, { useState } from "react"
import "./FilterOption.css"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import ShowChartIcon from "@mui/icons-material/ShowChart"
import arr from "./PieChart_Data"
function FilterOption() {
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
  return (
    <div className="dropdown">
      <div className="wrapper-label">
        <div className="label-button">
          <ShowChartIcon
            className="animate1"
            color="success"
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
              }}
            >
              {arr.map((item, idx) => {
                return (
                  <div style={{ display: "flex" }}>
                    <span
                      style={{ background: `${item.color}` }}
                      className="color_pie"
                    ></span>
                    <p className="pie_title">{item.title}</p>
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
              <CloseIcon onClick={closeMenu} color="success" />
            </div>

            <div class={style} id={id}>
              {click === true && (
                <>
                  <a href="#">link1</a>
                  <a href="#">link1</a>
                  <a href="#">link1</a>
                  <a href="#">link1</a>{" "}
                </>
              )}
            </div>
          </>
        ) : (
          <MenuIcon onClick={showMenu} color="success" />
        )}
      </div>
    </div>
  )
}

export default FilterOption
