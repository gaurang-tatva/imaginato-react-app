import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Box,
  TablePagination,
  TextField,
  makeStyles,
  Typography,
  IconButton,
  Button
} from "@material-ui/core";
import Order from "../../Components/Orders/Order";
import ViewOrderDetailModal from "../../Components/Orders/ViewOrderDetailModal";
import ManageOrderModal from "../../Components/Orders/ManageOrderModal";
import { PER_PAGE_RECORD } from "./../../Helpers/Constants";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: theme.palette.action.selected,
    paddingBottom: theme.spacing(1)
  },
  searchContainer: {
    paddingBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  searchInput: {
    width: "75%"
  },
  sortIcon: {
    margin: `0 ${theme.spacing(2)}px`
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  progressBarContainer: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  orderListContainer: {
    padding: theme.spacing(2)
  },
  noResultFoundContainer: {
    textAlign: "center",
    padding: theme.spacing(2)
  }
}));

/**
 * Orders Listing component
 */
export default function Orders() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("ASC");
  const [rowsPerPage, setRowsPerPage] = useState(PER_PAGE_RECORD);
  const [viewOrderModalData, setViewOrderModalData] = useState({
    open: false,
    orderData: null
  });

  const [manageOrderModalData, setManageOrderModalData] = useState({
    open: false,
    isEdit: false,
    orderData: null
  });

  // GET DATA FROM REDUX
  const orderList = useSelector(state => state.Order.orderList);

  // REST THE MODAL DATA
  const closeOrderDetailModal = useCallback(() => {
    setViewOrderModalData({
      open: false,
      orderData: null
    });
  }, []);

  // OPEN THE VIEW MODAL
  const handleViewMore = useCallback(orderData => {
    setViewOrderModalData({
      open: true,
      orderData
    });
  }, []);

  // PAGINATION OBJ
  let filteredOrderList = [...orderList];

  // SEARCH DATA
  if (search) {
    filteredOrderList = filteredOrderList.filter(order => {
      const { name } = order;
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredOrderList = filteredOrderList.splice(page * rowsPerPage, rowsPerPage);

  // SET SEARCH
  const handleSearch = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  // SORTING
  if (sort === "ASC") {
    filteredOrderList = filteredOrderList.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else {
    filteredOrderList = filteredOrderList.sort((a, b) =>
      b.name.localeCompare(a.name.first)
    );
  }

  // PAGINATION
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // Add / Edit Order Modal
  const closeOrderModal = useCallback(() => {
    setManageOrderModalData({
      open: false,
      isEdit: false,
      orderData: null
    });
  }, []);

  const openOrderModal = useCallback(() => {
    setManageOrderModalData({
      open: true,
      isEdit: false,
      orderData: null
    });
  }, []);

  const editOrderModal = useCallback(order => {
    setManageOrderModalData({
      open: true,
      isEdit: true,
      orderData: order
    });
  }, []);
  
  return (
    <Box className={classes.root}>
      <Box className={classes.orderListContainer}>
        <Box className={classes.searchContainer}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onKeyUp={handleSearch}
            className={classes.searchInput}
          />
          <Box className={classes.sortIcon}>
            <IconButton
              onClick={() => {
                setSort(sort === "ASC" ? "DESC" : "ASC");
              }}
              color={sort === "ASC" ? "primary" : "inherit"}
            >
              <SortByAlphaIcon />
            </IconButton>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              className={classes.editButton}
              onClick={openOrderModal}
            >
              Add
            </Button>
          </Box>
        </Box>
        {filteredOrderList && filteredOrderList.length ? (
          <React.Fragment>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {filteredOrderList.map((item, index) => (
                <Grid item xl={3} lg={4} sm={6} xs={12} key={index}>
                  <Order
                    orderData={item}
                    handleViewMore={handleViewMore}
                    editOrderModal={editOrderModal}
                  />
                </Grid>
              ))}
            </Grid>
            {!search && (
              <TablePagination
                rowsPerPageOptions={[12, 24, 36]}
                component="div"
                count={orderList.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </React.Fragment>
        ) : (
          <Box className={classes.noResultFoundContainer}>
            <Typography variant="body1"> No data found </Typography>
          </Box>
        )}
        <ViewOrderDetailModal
          viewOrderModalData={viewOrderModalData}
          closeOrderDetailModal={closeOrderDetailModal}
        />
        <ManageOrderModal
          manageOrderModalData={manageOrderModalData}
          closeManageOrderModal={closeOrderModal}
          orderList={filteredOrderList}
        />
      </Box>
    </Box>
  );
}
