import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useState } from "react";
import { Order } from "@/model/order";
import { Box, Divider, ListItem, Stack, Typography } from "@mui/material";
import getEquivalentReviewStatus from "@/utils/getEquivalentReviewStatus";

interface NestedListProps {
  order: Order;
}

export default function NestedList({ order }: NestedListProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
      aria-labelledby="nested-list-subheader"
    >
      <Box
        onClick={handleClick}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{`ID: ${order.id}`}</Typography>
          <Typography>{`Name: ${order.customer_name}`}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{`Email: ${order.customer_email}`}</Typography>
          <Typography>{`Review state: ${getEquivalentReviewStatus(
            order.reviewState
          )}`}</Typography>
        </Box>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider variant="fullWidth" />
        <List component="div" disablePadding>
          {order.products?.map((product) => {
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pl: 4,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>{`ID: ${product.id}`}</Typography>
                    <Typography>{`Name: ${product.name}`}</Typography>
                    <Typography>{`Description: ${product.description}`}</Typography>
                  </Box>
                </Box>
                <Divider variant="middle" />
              </>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
}
