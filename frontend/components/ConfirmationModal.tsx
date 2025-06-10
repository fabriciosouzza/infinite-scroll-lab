import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Order, OrderResponse, ReviewState } from "@/model/order";
import handleReviewBulkUpdate from "@/services/bulkUpdate";
import { IconButton, Stack } from "@mui/material";
import { ClearOutlined } from "@mui/icons-material";
import NestedList from "./NestedList";

interface ModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  handleMutate: () => Promise<OrderResponse[] | undefined>;
  selectedOrders: Order[];
  reviewState: ReviewState;
}

export default function ConfirmationModal({
  isModalOpen,
  handleClose,
  reviewState,
  selectedOrders,
  handleMutate,
}: ModalProps) {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm the orders that will be changed
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearOutlined />
            </IconButton>
          </Stack>
          <Box
            sx={{
              width: "100%",
              height: "400px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {selectedOrders.map((selected, i) => (
              <NestedList key={i} order={selected} />
            ))}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              gap: "16px",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: "8px", paddingX: 1 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ borderRadius: "8px", paddingX: 1 }}
              onClick={async () => {
                await handleReviewBulkUpdate(selectedOrders, reviewState);
                handleMutate();
                handleClose();
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
