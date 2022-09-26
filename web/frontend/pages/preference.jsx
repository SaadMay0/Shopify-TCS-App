import {
  Page,
  Layout,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {
  PreferenceSection,
  FragileProductSection,
  ToastComponent,
} from "../components";
import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../hooks";
export default function Preference() {
  const fetch = useAuthenticatedFetch();
    const [toastActive, setToastActive] = useState(false);
    const [toastContent, setToastContent] = useState("");
    const [isToastError, setIsToastError] = useState(false);

    //Callback
    const toggleToasrActive = useCallback(
      () => setToastActive((active) => !active),
      []
    );

    async function getCities() {
      try {
        await fetch(`/api/dashboard/getAllCities`, {
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
          setToastContent("Update Cities");
          setIsToastError(false);
          toggleToasrActive();
      } catch (error) {
        console.log(`${error}`);
        setToastContent("Server Error");
        setIsToastError(true);
        toggleToasrActive();
      }
    }
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
      <TitleBar
        title="Preferences"
        secondaryActions={[
          // {
          //   content: "Place All order To TCS",
          //   onAction: () => {
          //     console.log("Secondary action"), ship();
          //   },
          // },
          {
            content: "Get All cities",
            onAction: () => {
              console.log("All Cities"), getCities();
            },
          },
        ]}
      />
      <Page>
        <Layout>
          <Layout.Section>
            <PreferenceSection />
            <FragileProductSection />
          </Layout.Section>
        </Layout>
        {toastActive ? renderToast : null}
      </Page>
    </>
  );
}
