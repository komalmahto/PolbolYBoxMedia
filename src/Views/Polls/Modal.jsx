import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { Link } from "react-router-dom"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
}

function ModalComp(props) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div>
      <i
        style={{ color: "#84855d", fontSize: "20px" }}
        onClick={handleOpen}
        className="fas fa-share-alt"
      ></i>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.question}
          </Typography>
          <Typography
            style={{ cursor: "pointer" }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Share this Result
          </Typography>
          <Link to={props.link}>{props.link}</Link>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalComp
