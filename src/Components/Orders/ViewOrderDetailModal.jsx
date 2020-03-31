import React from "react";
import DialogTitle from "./../Dialog/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  media: {
    height: 100,
    width: 100,
    borderRadius: theme.spacing(2),
    margin: "0 auto"
  }
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

/**
 * View order details Modal
 */

export default function ViewOrderDetailModal({
  viewOrderModalData,
  closeOrderDetailModal
}) {
  const classes = useStyles();
  let orderData = viewOrderModalData.orderData;

  return (
    <Dialog
      onClose={closeOrderDetailModal}
      aria-labelledby="customized-dialog-title"
      open={viewOrderModalData.open}
    >
      <DialogTitle id="customized-dialog-title" onClose={closeOrderDetailModal}>
        View Details
      </DialogTitle>
      {orderData && (
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>Order Item</TableCell>
                  <TableCell align="left">
                    {orderData.name && orderData.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell align="left">
                    $ {orderData.price && orderData.price}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell align="left">
                    {orderData.location && orderData.location}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Note</TableCell>
                  <TableCell align="left">
                    {orderData.note ? orderData.note : "---"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      )}
    </Dialog>
  );
}
