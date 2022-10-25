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

function DeleteCompanyDialog({
  id,
  openModal,
  handleCloseModal,
  handleDeleteCompany,
}: {
  id: string;
  openModal: boolean;
  handleCloseModal: () => void;
  handleDeleteCompany: (id: string) => void;
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
            <p>Are you sure you want to delte this?</p>
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
              onClick={() => handleDeleteCompany(id)}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default DeleteCompanyDialog;
