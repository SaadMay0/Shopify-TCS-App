import { useState, useCallback } from "react";
import {
  TextField,
  IndexTable,
  TextStyle,
  Card,
  Select,
  useIndexResourceState,
  ChoiceList,
  Popover,
  Button,
  ButtonGroup,
  Icon,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

import Lightbox from "./Lightbox";
// import { BannerComponent } from "./banner";
import { ToastComponent } from "./Tost";

import "../assets/orderTable.css";
import { useAuthenticatedFetch } from "../hooks";
import { useEffect } from "react";

export function OrderTable({
  filterOrders,
  setBannerTitle,
  setBannerStatus,
  bannerToggleActive,
  setBannerDescription,
}) {
  const [active, setActive] = useState(false);
  const [isSelectedRowPlacedOnTCS, setIsSelectedRowPlacedOnTCS] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopUp, setShowPopUp] = useState();
  const [sortValue, setSortValue] = useState("shopifyOrderNbr");
  const [orders, setOrders] = useState([]);
  const [preferences, setpreferences] = useState();
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);
    const [toastActive, setToastActive] = useState(false);
    const [toastContent, setToastContent] = useState("");
    const [isToastError, setIsToastError] = useState(false);

    //Callback
    const toggleToasrActive = useCallback(
      () => setToastActive((active) => !active),
      []
    );
  // const [bannerActive, setBannerActive] = useState(true);
  // const [bannerTitle, setBannerTitle] = useState(false);
  // const [bannerStatus, setBannerStatus] = useState(false);
  // const bannerToggleActive = useCallback(
  //   () => setBannerActive((active) => !active),
  //   []
  // );

  // const [selectedResourcesState,setSelectedResourcesState] = useState("selectedResources");
  const [choice, setChoice] = useState([
    {
      label: "Name",
      value: "shopifyOrderNbr",
      disabled: true,
    },

    {
      label: "Cost Center Code",
      value: "costCenterCode",
    },
    {
      label: "consignee Name",
      value: "consigneeName",
    },
    {
      label: "consignee Address",
      value: "consigneeAddress",
    },
    {
      label: "consignee MobNo",
      value: "consigneeMobNo",
    },
    {
      label: "consignee Email",
      value: "consigneeEmail",
    },
    {
      label: "Origin City Name",
      value: "originCityName",
    },
    {
      label: "Destination City Name",
      value: "destinationCityName",
    },
    {
      label: "Weight",
      value: "weight",
    },
    {
      label: "Pieces",
      value: "pieces",
    },
    {
      label: "Cod Amount",
      value: "codAmount",
    },
    {
      label: "Customer Reference No",
      value: "customerReferenceNo",
    },
    {
      label: "Services",
      value: "services",
    },
    {
      label: "Product Details",
      value: "productDetails",
    },
    {
      label: "Fragile",
      value: "fragile",
    },
    {
      label: "Remarks",
      value: "remarks",
    },
    {
      label: "Insurance Value",
      value: "insuranceValue",
    },
    {
      label: "Is Shiping By CN",
      value: "isShipingByCN",
    },
    {
      label: "Shiping By CN Fields",
      value: "shipingByCNFields",
    },
    {
      label: "Is Order Reverse",
      value: "isOrderReverse",
    },
    {
      label: "Is Order Cancel",
      value: "isOrderCancel",
    },
    {
      label: "Is Order Placed",
      value: "isOrderPlaced",
      disabled: true,
    },
    {
      label: "Generated CN",
      value: "generatedCN",
      disabled: true,
    },
    // {
    //   label: "Actions",
    //   value: "Actions",
    //   disabled: true,
    // },
  ]);
  const [choiceList, setChoiceList] = useState([
    "shopifyOrderNbr",
    "destinationCityName",
    "isOrderPlaced",
    "generatedCN",
  ]);
  const [tableHeaderTitles, setTableHeaderTitles] = useState([
    { key: "shopifyOrderNbr", title: "Name" },
    { key: "destinationCityName", title: "Destination City Name" },
    { key: "isOrderPlaced", title: "Order Placed" },
    { key: "generatedCN", title: "Consignment No" },
  ]);
  const [popoverActive, setPopoverActive] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetch = useAuthenticatedFetch();

  const handleSortChange = useCallback((value) => setSortValue(value), []);

  const handleColumnsChange = useCallback(async (cols) => {
    setIsLoading(true);
    const orderedColumns = cols.sort((first, second) => {
      const firstIndex = choice.findIndex((e) => e.value === first);
      const secondIndex = choice.findIndex((e) => e.value === second);

      return firstIndex - secondIndex;
    });

    const orderedTableHeaderTitles = orderedColumns.map((key) => {
      const item = choice.find((c) => c.value === key);
      return {
        key: item.value,
        title: item.label,
      };
    });

    setTableHeaderTitles(orderedTableHeaderTitles);
    setIsLoading(false);
    setChoiceList(cols);
  }, []);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Columns
    </Button>
  );

  console.log(
    selectedResources,
    isSelectedRowPlacedOnTCS,
    // selectedResourcesState,
    "objection"
  );

  console.log(filterOrders.content, "Tab Selected");
  async function getAllData() {
    try {
      await fetch(`/api/dashboard/filtringOrder?filter=${filterOrders.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "all search");
          // setIsLoading(true);

          if (data.Responce.data || data.Responce.preferences) {
            setOrders(data.Responce.data);
            setpreferences(data.Responce.preferences);
          } else {
            setToastContent(data.Responce.Responce);
            setIsToastError(true);
            toggleToasrActive();
          }
          setIsLoading(false);
          return data;
        });
    } catch (error) {
      console.log(`${error}`);
    }

    // const {
    //   data,
    //   refetch: refetchOrders,
    //   isLoading: isLoadingCount,
    //   isRefetching: isRefetchingCount,
    // } = useAppQuery({
    //   url: `/api/dashboard/filtringOrder?filter=${filterOrders.id}`,
    //   reactQueryOptions: {
    //     onSuccess: (orders) => {
    //       setOrders(orders.Responce.data);
    //       setpreferences(orders.Responce.preferences);
    //       setIsLoading(false);
    //     },
    //   },
    // });
  }

  async function trackSingleOrder(customerReferenceNo) {
    console.log(
      customerReferenceNo,
      "customerReferenceNo  customerReferenceNo"
    );
    let obj1 = {
      referenceNo: customerReferenceNo,
    };

    try {
      await fetch(`/api/tcs/cod/abc/trackSingleOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify(obj1),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      getAllData();
      setToastContent("Order track");
      setIsToastError(false);
      toggleToasrActive();
    } catch (error) {
      console.log(`${error}`);
      setToastContent("Server Error");
      setIsToastError(true);
      toggleToasrActive();
    }
  }

  async function orderReverse(costCenterCode, generatedCN, consigneeMobNo) {
    let obj1 = {
      costCenterCode,
      consignmentNo: generatedCN,
      consigneeMobNo,
    };

    try {
      await fetch(`/api/tcs/cod/reversSingleOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify(obj1),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      getAllData();
      setToastContent("Order Reverse");
      setIsToastError(false);
      toggleToasrActive();
      
    } catch (error) {
      console.log(`${error}`);
          setToastContent("Server Error");
          setIsToastError(true);
          toggleToasrActive();
    }
  }

  async function cancelSingleOrder(CN, shopifyOrderNbr) {
    let obj1 = {
      consignmentNumber: CN,
    };

    try {
      await fetch(`/api/tcs/cod/cancelSingleOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify(obj1),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      // setBannerTitle("Order Cancel"),
      //   setBannerStatus("success"),
      //   setBannerDescription(
      //     `${shopifyOrderNbr} Order Number of Consignment Number is ${CN} Cancel Success Full `
      //   );
      // bannerToggleActive();

      
      getAllData();
      setToastContent("Order Cancel")
      setIsToastError(false)
      toggleToasrActive()
    } catch (error) {
           setToastContent("Server Error");
           setIsToastError(true);
           toggleToasrActive();
      console.log(`${error}`);
    }
  }

  async function placeMultipleOrder(selectedResources) {
    let obj1 = {
      selectedResources,
    };

    try {
      await fetch(`/api/tcs/cod/placeMultipleOrders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify(obj1),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      selectedResources.length = 0;
      getAllData();

      setToastContent("All Selected Order Place");
      setIsToastError(false);
      toggleToasrActive();
      // setSelectedResourcesState([]);
    } catch (error) {
      console.log(`${error}`);

      setToastContent("Server Error");
      setIsToastError(false);
      toggleToasrActive();
    }
  }

  async function trackMultipleOrder(selectedResources) {
    let obj1 = {
      selectedResources,
    };

    try {
      await fetch(`/api/tcs/cod/trackMultipleOrders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify(obj1),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(" trackMultipleOrder", data);
          return data;
        });
      selectedResources.length = 0;
      getAllData();
      setToastContent(" All Selected Order Tracked");
      setIsToastError(false);
      toggleToasrActive();
    } catch (error) {
      console.log(`${error}`);
      setToastContent("Server Error");
      setIsToastError(true);
      toggleToasrActive();
    }
  }

  async function cancelMultipleOrder(selectedResources) {
    let obj1 = {
      selectedResources,
    };

    try {
      await fetch(`/api/tcs/cod/cancelMultipleOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify(obj1),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(" cancelMultipleOrder", data);
          return data;
        });
      selectedResources.length = 0;
      getAllData();

      setToastContent(" All Selected Order Cancel");
      setIsToastError(false);
      toggleToasrActive();
    } catch (error) {
      console.log(`${error}`);

      setToastContent("Server Error");
      setIsToastError(true);
      toggleToasrActive();
    }
  }

  async function orderMultipleRevers(selectedResources) {
    let obj1 = {
      selectedResources,
    };

    try {
      await fetch(`/api/tcs/cod/reversMultipleOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify(obj1),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("selectedResources orderReverseMore", data);
          return data;
        });
      selectedResources.length = 0;
      getAllData();
        setToastContent(" All Selected Order Revers");
        setIsToastError(false);
        toggleToasrActive();
    } catch (error) {
      console.log(`${error}`);
        setToastContent(" Server Error");
        setIsToastError(true);
        toggleToasrActive();
    }
  }

  async function search(searchQuery) {
    try {
      await fetch(
        `/api/dashboard/searchOrders?tab=${filterOrders.id}&query=${searchQuery}&baseOn=${sortValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "all search");
          setIsLoading(true);
          setOrders(data.Responce.data);
          setIsLoading(false);
          return data;
        });
    } catch (error) {
      console.log(`${error}`);
    }
  }

  const handleSearchQuery = useCallback((newValue) => {
    console.log(newValue, "newValue *******newValue");
    setIsLoading(true);
    search(newValue);
    setSearchQuery(newValue);
  }, []);

  const resourceName = {
    singular: "order",
    plural: "orders",
  };
  const promotedBulkActions =
    filterOrders.id == "open"
      ? [
          {
            content: "Place Selected Orders To TCS  ",
            onAction: () => {
              setIsLoading(true);
              placeMultipleOrder(selectedResources);
              console.log("orderReverseMore orders");
            },
          },
        ]
      : [
          {
            content: "Cancel Selected Order ",
            onAction: () => {
              setIsLoading(true);
              cancelMultipleOrder(selectedResources);
              console.log("cancelMultipleOrder ");
            },
          },
          {
            content: "Reverse Selected Order   ",
            onAction: () => {
              setIsLoading(true);
              orderMultipleRevers(selectedResources);
              console.log("orderMultipleRevers ");
            },
          },
          {
            content: "Track Selected Order   ",
            onAction: () => {
              setIsLoading(true);
              trackMultipleOrder(selectedResources);
              console.log("trackMultipleOrder ");
            },
          },
        ];
  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete Orders",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  const sortOptions = [
    { value: "shopifyOrderNbr", label: "Name" },
    { value: "destinationCityName", label: "Destination City Name" },
    { value: "isOrderPlaced", label: "Order Placed" },
    { value: "generatedCN", label: "Consignment No" },
  ];

  const handle = useCallback(() => {
    console.log("modal activator/close button click callback", active);
    setActive(!active);
    setIsLoading(true);
    // getAllData();
  }, [active]);

  const renderLightbox = (
    <Lightbox
      handleLightboxToggle={handle}
      active={active}
      orderId={showPopUp}
      preferences={preferences}
      orders={orders}
      getAllData={getAllData}
      setIsLoading = {setIsLoading}
    />
  );

  let renderToast = (
    <ToastComponent
      toggleActive={toggleToasrActive}
      active={toastActive}
      content={toastContent}
      error={isToastError}
    />
  );

  // const renderBanner = (
  //   <BannerComponent
  //     active={bannerActive}
  //     title={bannerTitle}
  //     status={bannerStatus}
  //     toggleActive={bannerToggleActive}
  //   />
  // );
  useEffect(() => {
    setIsLoading(true);
    getAllData();
    if (filterOrders.id == "") {
      setChoice([
        {
          label: "Name",
          value: "shopifyOrderNbr",
          disabled: true,
        },
        {
          label: "Origin City Name",
          value: "originCityName",
        },
        {
          label: "Destination City Name",
          value: "destinationCityName",
        },
        {
          label: "Weight",
          value: "weight",
        },
        {
          label: "Pieces",
          value: "pieces",
        },
        {
          label: "Services",
          value: "services",
        },
        {
          label: "Product Details",
          value: "productDetails",
        },
        {
          label: "Fragile",
          value: "fragile",
        },
        {
          label: "Remarks",
          value: "remarks",
        },
        {
          label: "Is Order Cancel",
          value: "isOrderCancel",
        },
        {
          label: "Is Order Placed",
          value: "isOrderPlaced",
        },
        {
          label: "Generated CN",
          value: "generatedCN",
          disabled: true,
        },
      ]);
    } else if (filterOrders.id == "open") {
      setChoice([
        {
          label: "Name",
          value: "shopifyOrderNbr",
          disabled: true,
        },
        {
          label: "Destination City Name",
          value: "destinationCityName",
        },
        {
          label: "Weight",
          value: "weight",
        },
        {
          label: "Pieces",
          value: "pieces",
        },
        {
          label: "Product Details",
          value: "productDetails",
        },
        {
          label: "Remarks",
          value: "remarks",
        },
        {
          label: "Is Order Placed",
          value: "isOrderPlaced",
        },
        {
          label: "Generated CN",
          value: "generatedCN",
          disabled: true,
        },
      ]);
    } else {
      setChoice([
        {
          label: "Name",
          value: "shopifyOrderNbr",
          disabled: true,
        },

        {
          label: "Cost Center Code",
          value: "costCenterCode",
        },
        {
          label: "consignee Name",
          value: "consigneeName",
        },
        {
          label: "consignee Address",
          value: "consigneeAddress",
        },
        {
          label: "consignee MobNo",
          value: "consigneeMobNo",
        },
        {
          label: "consignee Email",
          value: "consigneeEmail",
        },
        {
          label: "Origin City Name",
          value: "originCityName",
        },
        {
          label: "Destination City Name",
          value: "destinationCityName",
        },
        {
          label: "Weight",
          value: "weight",
        },
        {
          label: "Pieces",
          value: "pieces",
        },
        {
          label: "Cod Amount",
          value: "codAmount",
        },
        {
          label: "Customer Reference No",
          value: "customerReferenceNo",
        },
        {
          label: "Services",
          value: "services",
        },
        {
          label: "Product Details",
          value: "productDetails",
        },
        {
          label: "Fragile",
          value: "fragile",
        },
        {
          label: "Remarks",
          value: "remarks",
        },
        {
          label: "Insurance Value",
          value: "insuranceValue",
        },
        {
          label: "Is Shiping By CN",
          value: "isShipingByCN",
        },
        {
          label: "Shiping By CN Fields",
          value: "shipingByCNFields",
        },
        {
          label: "Is Order Reverse",
          value: "isOrderReverse",
        },
        {
          label: "Is Order Cancel",
          value: "isOrderCancel",
        },
        {
          label: "Is Order Placed",
          value: "isOrderPlaced",
        },
        {
          label: "Generated CN",
          value: "generatedCN",
          disabled: true,
        },
      ]);
    }
  }, []);

  const rowMarkup = orders.map((ele, index) => {
    return (
      <>
        {/* <div
          className={`${
            ele.generatedCN ? (ele.isOrderPlaced ? "green" : "red") : "yellow"
          }`}
          // style={{ backgroundColor: `${ele.generatedCN ? "red" : "yellow"}` }}
        > */}
        <IndexTable.Row
          // style={{ backgroundColor: `${ele.generatedCN ? "red" : "yellow"}` }}
          id={ele.id}
          key={ele.id}
          onClick={(e) => {
            console.log(ele, "onSelect");
          }}
          selected={selectedResources.includes(ele.id)}
          position={index}
        >
          {tableHeaderTitles.map((col) => {
            return (
              <IndexTable.Cell>
                <TextStyle variation="strong">
                  {ele[col.key] ? `${ele[col.key]}` : "-"}
                </TextStyle>
              </IndexTable.Cell>
            );
          })}
          {ele.isOrderCancel ? <IndexTable.Cell>Its Order Is Cancel</IndexTable.Cell> :
            <IndexTable.Cell>
              {ele.generatedCN ? (
                <ButtonGroup>
                  <Button
                    primary
                    onClick={(e) => {
                      e.stopPropagation(e);
                      setIsLoading(true);
                      trackSingleOrder(ele.customerReferenceNo);
                    }}
                  >
                    Track order
                  </Button>
                  <Button
                    primary
                    onClick={(e) => {
                      e.stopPropagation(e);
                      setIsLoading(true);
                      orderReverse(
                        ele.costCenterCode,
                        ele.generatedCN,
                        ele.consigneeMobNo
                      );
                    }}
                  >
                    Reverse order
                  </Button>
                  <Button
                    primary
                    onClick={(e) => {
                      e.stopPropagation(e);
                      setIsLoading(true);
                      cancelSingleOrder(ele.generatedCN, ele.shopifyOrderNbr);
                    }}
                  >
                    Cancel order
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup>
                  <Button
                    primary
                    onClick={(e) => {
                      e.stopPropagation(e);
                      setIsLoading(true);
                      setShowPopUp(`${ele.id}`);
                      handle();
                    }}
                  >
                    Place Order
                  </Button>
                </ButtonGroup>
              )}
            </IndexTable.Cell>}
        </IndexTable.Row>
        {/* </div> */}
      </>
    );
  });
  return (
    <>
      <Card>
        <div style={{ padding: "16px", display: "flex" }}>
          <div style={{ flex: 1 }}>
            <TextField
              value={searchQuery}
              onChange={handleSearchQuery}
              prefix={<Icon source={SearchMinor} color="base" />}
              placeholder="Search"
            />
          </div>
          {/* <div style={{ paddingLeft: "0.25rem" }}>
            <Select
              labelInline
              label="Search by"
              options={sortOptions}
              value={sortValue}
              onChange={handleSortChange}
            />
          </div> */}
          {/* <div style={{ paddingLeft: "0.25rem" }}>
            <Button disclosure>More actions</Button>
          </div> */}
          <div style={{ paddingLeft: "0.25rem" }}>
            <Popover
              active={popoverActive}
              activator={activator}
              onClose={togglePopoverActive}
            >
              <ChoiceList
                allowMultiple
                title="Columns"
                choices={choice}
                selected={choiceList}
                onChange={handleColumnsChange}
              />
            </Popover>
          </div>
        </div>
        <IndexTable
          resourceName={resourceName}
          itemCount={orders.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={
            handleSelectionChange
            // (() => {
            // setSelectedResourcesState(selectedResources),
            //   handleSelectionChange();
            // })
          }
          hasMoreItems
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
          lastColumnSticky
          loading={isLoading}
          headings={tableHeaderTitles}
          selectable={filterOrders.content == "All" ? false : true}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
      {renderLightbox}
      {toastActive? renderToast:null}
      {/* 
      <Pagination
        hasPrevious
        onPrevious={() => {
          console.log("Previous");
        }}
        hasNext
        onNext={() => {
          console.log("Next");
        }}
      /> */}
    </>
  );
}
