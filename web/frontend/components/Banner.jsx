import { Banner, Frame, Card } from "@shopify/polaris";
// import { Section } from "@shopify/polaris/build/ts/latest/src/components/ActionList/components";
// import React from "react";
import { useCallback, useState } from "react";
export function BannerComponent({ active, title, status, toggleActive, Description }) {
  // const [active, setActive] = useState(false);
  // const toggleActive = useCallback(() => setActive((active) => !active), []);
  // const toastMarkup = active ? (
  //   <Banner
  //     title="Your shipping label is ready to print."
  //     status="success"
  //     action={{ content: "Print label" }}
  //     onDismiss={()=>{}}
  //   />
  // ) : null;

  console.log(active, "****Banner****");
  return active ? (
    <Banner
      title={title}
      status={status}
      action={{ content: "Print label" }}
      onDismiss={() => {
        toggleActive();
      }}
    >
      {Description}
    </Banner>
  ) : null;
}
