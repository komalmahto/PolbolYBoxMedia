import React from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
function LinecharModal() {
  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
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
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
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
        ></Box>
      </Modal>
    </div>
  )
}

export default LinecharModal
