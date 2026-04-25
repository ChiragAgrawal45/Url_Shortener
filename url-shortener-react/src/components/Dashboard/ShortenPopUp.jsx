import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import CreateNewShorten from "./CreateNewShorten";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
};

const ShortenPopUp = ({ open, setOpen, refetch }) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-short-url"
      aria-describedby="create-short-url-modal"
    >
      <Box sx={style}>
        <CreateNewShorten
          setOpen={setOpen}
          refetch={refetch || (() => {})}  // ✅ safe fallback
        />
      </Box>
    </Modal>
  );
};

export default ShortenPopUp;