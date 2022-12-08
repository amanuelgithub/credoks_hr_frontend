import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 10,
};

function DeleteModal({
  id,
  name,
  openModal,
  handleCloseModal,
  handleDelete,
}: {
  id: string;
  name: string;
  openModal: boolean;
  handleCloseModal: () => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="relative bg-white p-3 pt-8">
            <div className="flex flex-col justify-center items-center text-center">
              <p className="font-bold py-2">You are about to delete {name}</p>
              <p className="text-sm">Are you sure?</p>
            </div>

            <div className="absolute -top-10 left-[42%] bg-slate-200 rounded-full p-4 shadow-inner">
              <DeleteOutlineIcon sx={{ fontSize: "36px", color: "red" }} />
            </div>
          </div>

          <div className="p-2 pt-5 flex justify-between items-end gap-24 bg-gray-300">
            <Button
              variant="contained"
              size="small"
              fullWidth
              color="error"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              fullWidth
              color="success"
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
