import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DialogTitle from "./../Dialog/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    textAlign: "center"
  },
  errorColor: {
    color: theme.palette.error.main
  }
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

/**
 * Add/Edit order details Modal
 */

export default function ManageOrderModal({
  manageOrderModalData,
  closeManageOrderModal,
  orderList
}) {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const classes = useStyles();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (manageOrderModalData.isEdit) {
      setOrderData({
        ...manageOrderModalData.orderData
      });
    }
  }, [manageOrderModalData.orderData, manageOrderModalData.isEdit]);

  const addNewOrder = useCallback(
    orderData => {
      orderData.id = (Math.random() * 10000).toFixed(0);
      orderList.unshift(orderData);
      dispatch({ type: "ADD_ORDER", orderList });
      closeManageOrderModal();
    },
    [orderList, dispatch, closeManageOrderModal]
  );

  const editOrder = useCallback(
    orderData => {
      const orderItemIndex = orderList.findIndex(
        item => item.id === orderData.id
      );

      orderList[orderItemIndex] = orderData;
      dispatch({ type: "EDIT_ORDER", orderList });
      closeManageOrderModal();
    },
    [orderList, dispatch, closeManageOrderModal]
  );

  const validateOrder = useCallback(() => {
    if (
      orderData &&
      orderData.name &&
      orderData.name !== "" &&
      orderData.price &&
      parseFloat(orderData.price) > 0 &&
      orderData.location &&
      orderData.location !== ""
    ) {
      setIsError(false);
      if (manageOrderModalData.isEdit) {
        // Update order
        editOrder(orderData);
      } else {
        // Add order
        addNewOrder(orderData);
      }
    } else {
      setIsError(true);
    }
  }, [orderData, manageOrderModalData, addNewOrder, editOrder]);

  const handleChange = useCallback(
    (e, field) => {
      setOrderData({
        ...orderData,
        [field]: e.target && e.target.value
      });
    },
    [orderData]
  );

  return (
    <Dialog
      onClose={closeManageOrderModal}
      aria-labelledby="customized-dialog-title"
      open={manageOrderModalData.open}
    >
      <DialogTitle id="customized-dialog-title" onClose={closeManageOrderModal}>
        {manageOrderModalData.isEdit ? `Edit` : `Add`} Order
      </DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    label="*Item Name"
                    defaultValue={orderData ? orderData.name : ""}
                    variant="outlined"
                    onBlur={e => handleChange(e, "name")}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    label="*Price ($)"
                    defaultValue={orderData ? orderData.price : ""}
                    variant="outlined"
                    onBlur={e => handleChange(e, "price")}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    label="*Location"
                    defaultValue={orderData ? orderData.location : ""}
                    variant="outlined"
                    onBlur={e => handleChange(e, "location")}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    label="Note"
                    defaultValue={orderData ? orderData.note : ""}
                    variant="outlined"
                    onBlur={e => handleChange(e, "note")}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.buttonContainer}>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={validateOrder}
                    >
                      {manageOrderModalData.isEdit ? "Edit" : "Add"}
                    </Button>
                  </Box>
                  {isError && (
                    <Box>
                      <span className={classes.errorColor}>
                        Please enter required field valid value.
                      </span>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}
