import {
  Button,
  Modal,
  Card,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import {  useAuthenticatedFetch } from "../hooks";
import { ToastComponent } from "./Tost";
export default function Lightbox({
  active,
  handleLightboxToggle,
  orderId,
  preferences,
  orders,
  getAllData,
  setIsLoading,
}) {
   const fetch = useAuthenticatedFetch();
  const [costCenterCode, setCostCenterCode] = useState();
  const [consigneeName, setConsigneeName] = useState();
  const [consigneeAddress, setConsigneeAddress] = useState();
  const [consigneeMobNo, setConsigneeMobNo] = useState();
  const [consigneeEmail, setConsigneeEmail] = useState();
  const [originCity, setOriginCity] = useState("");
  const [destinationCityName, setDestinationCityName] = useState("");
  const [weight, setWeight] = useState("");
  const [pieces, setPieces] = useState("");
  const [codAmount, setCodAmount] = useState("");
  const [customerReferenceNo, setCustomerReferenceNo] = useState("");
  const [service, setService] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [fragile, setFragile] = useState("");
  const [remarks, setRemarks] = useState("");
  const [insurance, setInsurance] = useState("");

      const [toastActive, setToastActive] = useState(false);
      const [toastContent, setToastContent] = useState("");
      const [isToastError, setIsToastError] = useState(false);

      //Callback
      const toggleToasrActive = useCallback(
        () => setToastActive((active) => !active),
        []
      );
  
  const handleCostCenterCode = useCallback(
    (value) => setCostCenterCode(value),
    []
  );
  const handleConsigneeName = useCallback(
    (value) => setConsigneeName(value),
    []
  );
  const handleConsigneeAddress = useCallback(
    (value) => setConsigneeAddress(value),
    []
  );
  const handleConsigneeMobNo = useCallback(
    (value) => setConsigneeMobNo(value),
    []
  );
  const handleConsigneeEmail = useCallback(
    (value) => setConsigneeEmail(value),
    []
  );
  const handleOriginCity = useCallback(
    (value) => setOriginCity(value),
    []
  );
  const handleDestinationCityName = useCallback(
    (value) => setDestinationCityName(value),
    []
  );
  const handleWeight = useCallback(
    (value) => setWeight(value),
    []
  );
  const handlePieces = useCallback(
    (value) => setPieces(value),
    []
  );
  const handleCodAmount = useCallback(
    (value) => setCodAmount(value),
    []
  );
  const handleCustomerReferenceNo = useCallback(
    (value) => setCustomerReferenceNo(value),
    []
  );
  const handleService = useCallback(
    (value) => setService(value),
    []
  );
  const handleProductDetails = useCallback(
    (value) => setProductDetails(value),
    []
  );
  const handleFragile = useCallback(
    (value) => setFragile(value),
    []
  );
  const handleRemarks = useCallback(
    (value) => setRemarks(value),
    []
  );
  const handleInsurance = useCallback(
    (value) => setInsurance(value),
    []
  );
 const handleClose = useCallback(() => {
   handleLightboxToggle();
   //  setProps();
   setIsLoading(false);
 });
 


 async function setProps() {

   let order = await orders.filter((ele) => ele.id == orderId);
   
   console.log(order,"???????/");

    setCostCenterCode(preferences.costCenterCode);
    setConsigneeName(preferences.consigneeName);
    setConsigneeAddress(preferences.consigneeAddress);
    setConsigneeMobNo(preferences.consigneeMobNo);
    setConsigneeEmail(preferences.consigneeEmail);
    setOriginCity(preferences.originCity);
    setService(preferences.service);
    setFragile(preferences.fragile);
    setInsurance(preferences.insurance);
    setDestinationCityName(order[0].originCityName)
    setWeight(order[0].weight)
    setPieces(order[0].pieces)
    setProductDetails(order[0].productDetails)
    setRemarks(order[0].remarks)
    // setCodAmount(order.)
    // setCustomerReferenceNo(order.)
  }

   async function placeSingleOrder(orderNbr) {
     let obj1 = {
       orderId: orderNbr,
       costCenterCode,
       consigneeName,
       consigneeAddress,
       consigneeMobNo,
       consigneeEmail,
       originCity,
       destinationCityName,
       weight,
       pieces,
       codAmount,
       customerReferenceNo,
       service,
       productDetails,
       fragile,
       remarks,
       insurance,
     };

     try {
       await fetch(`/api/tcs/cod/placeOrder`, {
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
       setToastContent(" Order Place");
       setIsToastError(false);
       toggleToasrActive();
     } catch (error) {
       console.log(`${error}`);
        setToastContent("Server Error");
        setIsToastError(true);
        toggleToasrActive();
     }
   }
  
  
  active?setProps():null;
  
    let renderToast = (
      <ToastComponent
        toggleActive={toggleToasrActive}
        active={toastActive}
        content={toastContent}
        error={isToastError}
      />
    );
  return (
    <>
      <Modal
        instant
        open={active}
        onClose={handleClose}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: "Confrom Place Order",
          onAction: () => {
            placeSingleOrder(orderId), handleClose();
          },
        }}
        secondaryActions={[
          {
            content: "Learn more",
            onAction: handleClose,
          },
        ]}
      >
        {/* <Button onClick={setProps}> Show Default Values</Button> */}
        <Modal.Section>
          <Card sectioned>
            <FormLayout>
              {/* <TextField
                type=""
                label="Cost Center Code"
                value={costCenterCode}
                onChange={handleCostCenterCode}
                placeholder=""
                autoComplete="on"
              /> */}
              {/* <TextField
                type=""
                label="Consignee Name"
                value={consigneeName}
                onChange={handleConsigneeName}
                placeholder=""
                autoComplete="on"
              />
              <TextField
                type=""
                label="Consignee Address"
                value={consigneeAddress}
                onChange={handleConsigneeAddress}
                placeholder=""
                autoComplete="on"
              />
              <TextField
                type=""
                label="consignee Number"
                value={consigneeMobNo}
                onChange={handleConsigneeMobNo}
                placeholder=""
                autoComplete="on"
              />
              <TextField
                type=""
                label="consignee Email"
                value={consigneeEmail}
                onChange={handleConsigneeEmail}
                placeholder=""
                autoComplete="on"
              /> */}
              <TextField
                type=""
                label="OriginCity"
                value={originCity}
                onChange={handleOriginCity}
                placeholder=""
                autoComplete="on"
              />
              <TextField
                type="text"
                label="Destination City Name"
                value={destinationCityName}
                onChange={handleDestinationCityName}
                placeholder=""
                autoComplete="on"
              />
              <TextField
                type="Weight"
                label="Weight"
                value={weight}
                onChange={handleWeight}
                placeholder=""
                autoComplete=""
              />
              <TextField
                type="Number"
                label="pieces"
                value={pieces}
                onChange={handlePieces}
                placeholder=""
                autoComplete="on"
              />
              <TextField
                type=""
                label="Cod Amount"
                value={codAmount}
                onChange={handleCodAmount}
                placeholder=""
                autoCompleconsigneeAddresste=""
              />
              {/* <TextField
                type=""
                label="Customer Reference Nbr"
                value={customerReferenceNo}
                onChange={handleCustomerReferenceNo}
                placeholder=""
                autoComplete="on"
              /> */}
              <TextField
                type=""
                label="service"
                value={service}
                onChange={handleService}
                placeholder=""
                autoComplete="on"
              />
              <TextField
                type=""
                label="Product Details"
                value={productDetails}
                onChange={handleProductDetails}
                placeholder=""
                autoComplete="on"
              />
              {/* <TextField
                type=""
                label="Fragile"
                value={fragile}
                onChange={handleFragile}
                placeholder=""
                autoComplete="on"
              /> */}

              <TextField
                type=""
                label="Remarks"
                value={remarks}
                onChange={handleRemarks}
                placeholder=""
                autoComplete="on"
              />

              {/* <TextField
                type=""
                label="Insurance"
                value={insurance}
                onChange={handleInsurance}
                placeholder=""
                autoComplete="on"
              /> */}
            </FormLayout>
          </Card>
          {toastActive ? renderToast : null}
        </Modal.Section>
      </Modal>
    </>
  );
}
