import { makeStyles } from "@material-ui/core/styles"

export default makeStyles({
  media: {
    display: "flex",
    height: "220px",
    width: "100%",
    objectFit: "cover",
  },

  card: {
    display: "flex",
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: "row",
    top: "30px",
    minWidth: "43vw",
    borderRadius: 10,
    borderRight: 10,
    justifyContent: "space-between",
  },
  activeCard: {
    borderBottom: "10px solid red",
    color: "SlateBlue",
    backgroundColor: "Gray",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
  },
  details: {
    display: "flex",
    maxHeight: "40vh",
    maxWidth: "40vw",
    flexDirection: "column",
    marginLeft: "15px",
    marginTop: "2px",
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "space-between",
  },
  cardActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
})
