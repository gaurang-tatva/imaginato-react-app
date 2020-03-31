import React from "react";
import {
  Button,
  Typography,
  IconButton,
  Card,
  Box,
  makeStyles
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import NoteIcon from "@material-ui/icons/Note";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  iconContainer: {
    padding: theme.spacing(1)
  },
  orderNameText: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  textContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 2)
  },
  priceIcon: {
    padding: theme.spacing(1, 0),
    "> svg": {
      fontSize: "18px"
    }
  },
  buttonContainer: {
    padding: theme.spacing(1),
    textAlign: "center"
  },
  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  editButton: {
    margin: theme.spacing(0, 1)
  }
}));

/**
 * Order component
 */

function Order({ orderData, handleViewMore, editOrderModal }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box>
        <Box className={classes.textContainer}>
          <Typography variant="body1" className={classes.orderNameText}>
            <strong>{orderData.name && orderData.name}</strong>
          </Typography>
          <div className={classes.priceContainer}>
            <IconButton color="primary" className={classes.priceIcon}>
              <AttachMoneyIcon />
            </IconButton>
            <Typography variant="body1" className={classes.ellipsis}>
              <strong>{orderData.price && orderData.price}</strong>
            </Typography>
          </div>
        </Box>
        <Box>
          <div className={classes.itemContainer}>
            <IconButton color="primary" className={classes.iconContainer}>
              <LocationOnIcon />
            </IconButton>
            <Typography variant="body1" className={classes.ellipsis}>
              {orderData.location && orderData.location}
            </Typography>
          </div>
          <div className={classes.itemContainer}>
            <IconButton color="primary" className={classes.iconContainer}>
              <NoteIcon />
            </IconButton>
            <Typography variant="body1" className={classes.ellipsis}>
              {orderData.note ? orderData.note : "---"}
            </Typography>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewMore(orderData)}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => editOrderModal(orderData)}
              className={classes.editButton}
            >
              Edit
            </Button>
          </div>
        </Box>
      </Box>
    </Card>
  );
}

Order.propTypes = {
  orderData: PropTypes.object,
  handleViewMore: PropTypes.func
};

export default Order;
