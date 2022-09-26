import axios from "axios";
import rateLimit from "axios-rate-limit";
import "colors";

const http = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 1000,
  maxRPS: 1,
});

// GET  METHOD

////////////////////////////////////////////////////////////////////////////////////

export const countryList = async (apikey, obj) => {
  return await axios("https://api.tcscourier.com/sandbox/v1/cod/countries", {
    method: "GET",
    headers: { "X-IBM-Client-Id": `${apikey}` },
  })
    .then((resp) => {
      console.log( "Its Working From Functions countryList".bgGreen);
      return resp;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const stationList = async (apikey, obj) => {
  return await axios("https://api.tcscourier.com/sandbox/v1/cod/origins", {
    method: "GET",
    headers: { "X-IBM-Client-Id": `${apikey}` },
  })
    .then((resp) => {
      console.log( "Its Working From Functions stationList".bgGreen);
      return resp;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const cityList = async (apikey, obj) => {
  return await axios("https://api.tcscourier.com/sandbox/v1/cod/cities", {
    method: "GET",
    headers: { "X-IBM-Client-Id": `${apikey}` },
  })
    .then((resp) => {
      console.log(
        resp.data,
        "Its Working From Functions cityList".bgGreen
      );
      return resp;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const pickupStatus = async (apikey, obj) => {
  return await axios(
    "https://api.tcscourier.com/sandbox/v1/cod/pickup-status",
    {
      method: "GET",
      headers: { "X-IBM-Client-Id": `${apikey}` },
      params: { ...obj },
    }
  )
    .then((resp) => {
      console.log(
        // resp.data,
        "Its Working From Functions pickupStatus".bgGreen);
      return resp;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const paymentDetails = async (apikey, obj) => {
  return await axios(
    "https://api.tcscourier.com/sandbox/v1/cod/payment-details",
    {
      method: "GET",
      headers: { "X-IBM-Client-Id": `${apikey}` },
      params: { ...obj },
    }
  )
    .then((resp) => {
      console.log(
        // resp.data,
        "Its Working From Functions paymentDetails".bgGreen
      );
      return resp;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const paymentInvoiceDetails = async (apikey, obj) => {
  return await axios(
    "https://api.tcscourier.com/sandbox/v1/cod/payment-invoice",
    {
      method: "GET",
      headers: { "X-IBM-Client-Id": `${apikey}` },
      params: { ...obj },
    }
  )
    .then((resp) => {
      console.log(
        // resp.data,
        "Its Working From Functions paymentInvoiceDetails".bgGreen
      );
      return resp;
    })
    .catch(function (error) {
      console.log(error);
    });
};
////////////////////////////////////////////////////////////////////////////////
export const trackCODorder = async (apikey, obj) => {
  return await http("https://api.tcscourier.com/sandbox/v1/cod/track-order", {
    method: "GET",
    headers: { "X-IBM-Client-Id": `${apikey}` },
    params: { ...obj },
  })
    .then((resp) => {
      console.log(
        // resp.data,
        "Its Working From Functions trackCODorder".bgGreen
      );
      return resp;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// POST  METHOD

export const placeOrder = async (apikey, obj) => {
  // return await axios("https://api.tcscourier.com/sandbox/v1/cod/create-order", {
  //   method: "POST",
  //   // withCredentials: true,
  //   // timeout:1000,
  //   headers: { "X-IBM-Client-Id": `${apikey}` },
  //   data: { ...obj },
  // })
  //   .then((resp) => {
  //     console.log("Its Working From Functions placeOrder".bgGreen, { ...obj });
  //     return resp;
  //   })
  //   .catch(function (err) {
  //     console.log("errorrrr", err.name, err);
  //   });

  return await http("https://api.tcscourier.com/sandbox/v1/cod/create-order", {
    method: "POST",
    headers: { "X-IBM-Client-Id": `${apikey}` },
    data: { ...obj },
  })
    .then((resp) => {
      console.log("Its Working From Functions placeOrder".bgGreen,
        // { ...obj }
      );
      return resp;
    })
    .catch(function (err) {
      console.log("errorrrr", err.name);
    });
};

export const orderReverse = async (apikey, obj) => {
  return await http(
    "https://api.tcscourier.com/sandbox/v1/cod/reverse-logistics",
    {
      method: "POST",
      headers: { "X-IBM-Client-Id": `${apikey}` },
      data: { ...obj },
    }
  )
    .then((resp) => {
      console.log(
        // resp.data,
        "Its Working From Functions orderReverse".bgGreen);
      return resp;
    })
    .catch(function (err) {
      console.log("error".red, err.name, err);
    });
};

export const costCenterCod = async (apikey, obj) => {
  return await axios(
    "https://api.tcscourier.com/sandbox/v1/cod/createCostCenterCode",
    {
      method: "POST",
      headers: { "X-IBM-Client-Id": `${apikey}` },
      data: { ...obj },
    }
  )
    .then((resp) => {
      console.log("Its Working From Functions costCenterCod".bgGreen);
      return resp;
    })
    .catch(function (error) {
      console.log(`err${error}`);
    });
};

// To order a C.O.D shipment by CN and get reference number. Use this operation if TCS has shared list of consignment numbers with you in advance, otherwise use /create-order operation.

export const placeOrderByCN = async (apikey, obj) => {
  return await axios(
    "https://api.tcscourier.com/sandbox/v1/cod/create-order/cn",
    {
      method: "POST",
      headers: { "X-IBM-Client-Id": `${apikey}` },
      data: { ...obj },
    }
  )
    .then((resp) => {
      console.log("Its Working From Functions costCenterCod".bgGreen);
      return resp;
    })
    .catch(function (error) {
      console.log(`error${error}`);
    });
};

// PUT  METHOD

export const orderCancel = async (apikey, obj) => {
  return await http("https://api.tcscourier.com/sandbox/v1/cod/cancel-order", {
    method: "PUT",
    headers: { "X-IBM-Client-Id": `${apikey}` },
    data: { ...obj },
  })
    .then((resp) => {
      console.log( "Its Working From Functions cancelOrder".bgGreen);
      return resp;
    })
    .catch(function (error) {
      console.log("error", error.name);
    });
};
