import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  py: 2,
  px: 3,
};

function DeleteModal({
  id,
  message,
  openModal,
  handleCloseModal,
  handleDelete,
}: {
  id: string;
  message: string;
  openModal: boolean;
  handleCloseModal: () => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center items-center font-bold">
            <p>{message}</p>
          </div>
          <div className="py-5 flex justify-evenly items-end">
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              color="success"
              variant="contained"
              size="small"
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default DeleteModal;
