import { useState, useCallback } from "react";
import { Card, Page, Tabs, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { OrderTable, BannerComponent } from "../components";
// import { BannerComponent } from "/banner";
import { useAuthenticatedFetch } from "../hooks";

export default function Dashboard() {
  const fetch = useAuthenticatedFetch();
  const [selected, setSelected] = useState(1);
  const [bannerActive, setBannerActive] = useState(false);
  const [bannerTitle, setBannerTitle] = useState("Orde Placed");
  const [bannerStatus, setBannerStatus] = useState("success");
  const [bannerDescription, setBannerDescription] = useState("success");
  const bannerToggleActive = useCallback(
    () => setBannerActive((active) => !active),
    []
  );

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "",
      content: "All",
      accessibilityLabel: "All Orders",
      panelID: "all-orders",
    },
    {
      id: "open",
      content: "Open Orders",
      panelID: "Order-Reverse",
    },
    {
      id: "isOrderPlaced",
      content: "Placed Orders",
      accessibilityLabel: "Order Placed",
      panelID: "orders-Placed",
    },
    {
      id: "isOrderCancel",
      content: "Order Cancel",
      panelID: "Order-Cancel",
    },
  ];

  async function getOrders(filteredId) {
    try {
      await fetch(`/api/orders?filter=${filteredId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    } catch (error) {
      console.log(`${error}`);
    }
  }

  async function ship() {
    try {
      await fetch(`/api/shiping`, {
        method: "get",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    } catch (error) {
      console.log(`${error}`);
    }
  }

  async function getCities(filteredId) {
    try {
      await fetch(`/api/getAllCities`, {
        method: "get",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "getCities");
          return data;
        });
    } catch (error) {
      console.log(`${error}`);
    }
  }
  const renderBanner = (
    <BannerComponent
      active={bannerActive}
      title={bannerTitle}
      status={bannerStatus}
      Description={bannerDescription}
      toggleActive={bannerToggleActive}
    />
  );

  return (
    <>
      <TitleBar
        title="Dashboard"
        secondaryActions={[
          {
            content: "Place All order To TCS",
            onAction: () => {
              console.log("Secondary action"), ship();
            },
          },
        ]}
      />
      <Page>
        {renderBanner}
        <br />
        <Layout>
          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <Card.Section>
                  <OrderTable
                    filterOrders={tabs[selected]}
                    setBannerTitle={setBannerTitle}
                    setBannerStatus={setBannerStatus}
                    bannerToggleActive={bannerToggleActive}
                    setBannerDescription={setBannerDescription}
                  />
                </Card.Section>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
