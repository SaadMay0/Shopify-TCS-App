import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  TextContainer,
  TextStyle,
  Heading,
  Spinner,
} from "@shopify/polaris";

import { useCallback, useEffect, useState } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { ToastComponent } from "./Tost";

export function PreferenceSection() {
  const fetch = useAuthenticatedFetch();
  // States
  const [isLoading, setIsLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [insurance, setInsurance] = useState("");
  const [service, setService] = useState("");
  const [costCenterCityName, setCostCenterCityName] = useState("");
  const [costCenterCode, setCostCenterCode] = useState("");
  const [costCenterName, setCostCenterName] = useState("");
  const [fragile, setFragile] = useState("");
  const [locationId, setLocationId] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [consigneeName, setConsigneeName] = useState("");
  const [consigneeAddress, setConsigneeAddress] = useState("");
  const [consigneeMobNo, setConsigneeMobNo] = useState("");
  const [consigneeEmail, setConsigneeEmail] = useState("");
  const [consigneeLandLine, setConsigneeLandLine] = useState("");
  const [active, setActive] = useState(false);
  const [content, setContent] = useState("");
  const [isError, setIsError] = useState(false);

  //Callback
  const toastToggleActive = useCallback(
    () => setActive((active) => !active),
    []
  );
  const handleUserName = useCallback((value) => setUserName(value), []);
  const handlePassword = useCallback((value) => setPassword(value), []);
  const handleAccounNo = useCallback((value) => setAccountNo(value), []);
  const handleApiKey = useCallback((value) => setApiKey(value), []);
  const handleInsurance = useCallback((value) => setInsurance(value), []);
  const handleService = useCallback((value) => setService(value), []);
  const handleCostCenterCityName = useCallback(
    (value) => setCostCenterCityName(value),
    []
  );
  const handleCostCenterCode = useCallback(
    (value) => setCostCenterCode(value),
    []
  );
  const handleCostCenterName = useCallback(
    (value) => setCostCenterName(value),
    []
  );
  const handleFragile = useCallback((value) => setFragile(value), []);
  const handleLocationId = useCallback((value) => setLocationId(value), []);
  const handleOriginCity = useCallback((value) => setOriginCity(value), []);
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
  const handleConsigneeLandLine = useCallback(
    (value) => setConsigneeLandLine(value),
    []
  );

  // Function
  let ren = (
    <ToastComponent
      toggleActive={toastToggleActive}
      active={active}
      content={content}
      error={isError}
    />
  );
  // const {
  //   data,
  //   refetch: refetchOrders,
  //   isLoading: isLoadingCount,
  //   isRefetching: isRefetchingCount,
  // } = useAppQuery({
  //   url: "/api/preferences/getPreference",
  //   reactQueryOptions: {
  //     onSuccess: (orders) => {
  //       console.log(orders.Responce, "oooooooooooooooooo");
  //           //  console.log(orders.Responce, "======>");
  //           if (orders.Responce.data) {
  //              setUserName(orders.Responce.data.userName);
  //              setPassword(orders.Responce.data.password);
  //              setAccountNo(orders.Responce.data.accountNo);
  //              setApiKey(orders.Responce.data.apiKey);
  //              setInsurance(orders.Responce.data.insurance);
  //              setService(orders.Responce.data.service);
  //              setCostCenterCityName(orders.Responce.data.costCenterCityName);
  //              setCostCenterCode(orders.Responce.data.costCenterCode);
  //              setCostCenterName(orders.Responce.data.costCenterName);
  //              setFragile(orders.Responce.data.fragile);
  //              setLocationId(orders.Responce.data.locationId);
  //              setOriginCity(orders.Responce.data.originCity);
  //              setConsigneeName(orders.Responce.data.consigneeName);
  //              setConsigneeAddress(orders.Responce.data.consigneeAddress);
  //              setConsigneeMobNo(orders.Responce.data.consigneeMobNo);
  //              setConsigneeEmail(orders.Responce.data.consigneeEmail);
  //              setConsigneeLandLine(orders.Responce.data.consigneeLandLine);
  //           }
  //            console.log("set all values in DB *******************");
  //            setIsLoading(false);
  //       // setPreference(orders);
  //       setIsLoading(false);
  //     },
  //   },
  // });

  console.log(
    userName,
    password,
    accountNo,
    apiKey,
    insurance,
    service,
    costCenterCityName,
    costCenterCode,
    costCenterName,
    fragile,
    locationId,
    originCity,
    consigneeName,
    consigneeAddress,
    consigneeMobNo,
    consigneeEmail,
    consigneeLandLine,
    "-------------",
    isLoading,
  );

  useEffect(() => {
    getPreference();
  }, []);

  async function getPreference() {
    try {
      await fetch("/api/preferences/getPreference", {
        method: "get",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // setIsLoading(true);
          console.log(data.Responce, "======>");
       if (data.Responce.data) {
         setUserName(data.Responce.data.userName);
         setPassword(data.Responce.data.password);
         setAccountNo(data.Responce.data.accountNo);
         setApiKey(data.Responce.data.apiKey);
         setInsurance(data.Responce.data.insurance);
         setService(data.Responce.data.service);
         setCostCenterCityName(data.Responce.data.costCenterCityName);
         setCostCenterCode(data.Responce.data.costCenterCode);
         setCostCenterName(data.Responce.data.costCenterName);
         setFragile(data.Responce.data.fragile);
         setLocationId(data.Responce.data.locationId);
         setOriginCity(data.Responce.data.originCity);
         setConsigneeName(data.Responce.data.consigneeName);
         setConsigneeAddress(data.Responce.data.consigneeAddress);
         setConsigneeMobNo(data.Responce.data.consigneeMobNo);
         setConsigneeEmail(data.Responce.data.consigneeEmail);
         setConsigneeLandLine(data.Responce.data.consigneeLandLine);
          setContent("Get All Preference");
          setIsError(false);
          toastToggleActive();
       }else {
         setContent("Set Preference");
         setIsError(false);
         toastToggleActive();
         // setActive(true);
        }
        console.log("set all values in DB *******************");
          setIsLoading(false);
          return data;
        });
    } catch (error) {
      console.log(`${error}`);
    }
  }

  async function postPreference() {
    let obj1 = {
      userName,
      password,
      accountNo,
      apiKey,
      insurance,
      service,
      costCenterCityName,
      costCenterCode,
      costCenterName,
      fragile,
      locationId,
      originCity,
      consigneeName,
      consigneeAddress,
      consigneeMobNo,
      consigneeEmail,
      consigneeLandLine,
    };

    console.log(obj1, ren, "Preferences");
    try {
      await fetch("/api/preferences/postPreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify(obj1),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setContent("All Preference Updated");
          setIsError(false);
          toastToggleActive();

          return data;
        });
    } catch (error) {
      console.log(`${error}`);
      setContent("Server Error");
      setIsError(true);
      toastToggleActive();
      // setActive(true);
    }
  }
  return (
    <Page
      title="Preferences"
      primaryAction={{
        content: "Save Preferences",
        onAction: () => {
          setIsLoading(true);
          postPreference();
        },
      }}
    >
      <Layout fullWidth>
        <Layout.Section oneThird>
          <div style={{ marginTop: "var(--p-space-5)" }}>
            <TextContainer>
              <Heading id="storeDetails">Store details</Heading>
              <p>
                <TextStyle variation="subdued">
                  Shopify consigneeAddressand your customers will use this
                  information to contact you.
                </TextStyle>
              </p>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            {isLoading ? (
              <div style={{ padding: "10% 50%" }}>
                <Spinner accessibilityLabel="Spinner example" size="large" />
              </div>
            ) : (
              <FormLayout>
                <TextField
                  type="text"
                  label="User Name"
                  value={userName}
                  onChange={handleUserName}
                  placeholder=""
                  autoComplete="on"
                />
                <TextField
                  type="text"
                  label="Password"
                  value={password}
                  onChange={handlePassword}
                  placeholder=""
                  autoComplete="onemail"
                />
                <TextField
                  type=""
                  label="Account Number"
                  value={accountNo}
                  onChange={handleAccounNo}
                  placeholder=""
                  autoComplete="on"
                />
                <TextField
                  type=""
                  label="API Key"
                  value={apiKey}
                  onChange={handleApiKey}
                  placeholder=""
                  autoCompleconsigneeAddresste=""
                />
                <TextField
                  type=""
                  label="Insurance"
                  value={insurance}
                  onChange={handleInsurance}
                  placeholder=""
                  autoComplete="on"
                />
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
                  label="Cost Center City Name"
                  value={costCenterCityName}
                  onChange={handleCostCenterCityName}
                  placeholder=""
                  autoComplete="on"
                />
                <TextField
                  type=""
                  label="Cost Center Code"
                  value={costCenterCode}
                  onChange={handleCostCenterCode}
                  placeholder=""
                  autoComplete="on"
                />
                <TextField
                  type=""
                  label="Cost Center Name"
                  value={costCenterName}
                  onChange={handleCostCenterName}
                  placeholder=""
                  autoComplete="on"
                />
                <TextField
                  type=""
                  label="Fragile"
                  value={fragile}
                  onChange={handleFragile}
                  placeholder=""
                  autoComplete="on"
                />
                <TextField
                  type=""
                  label="LocationId"
                  value={locationId}
                  onChange={handleLocationId}
                  placeholder=""
                  autoComplete="on"
                />
                <TextField
                  type=""
                  label="OriginCity"
                  value={originCity}
                  onChange={handleOriginCity}
                  placeholder=""
                  autoComplete="on"
                />
                <TextField
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
                />
                <TextField
                  type=""
                  label="consignee Land Line"
                  value={consigneeLandLine}
                  onChange={handleConsigneeLandLine}
                  placeholder=""
                  autoComplete="on"
                />
              </FormLayout>
            )}
          </Card>
          {active ? ren : null}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
