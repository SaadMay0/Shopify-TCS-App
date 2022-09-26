import { Shopify } from "@shopify/shopify-api";
import Sequelize from "sequelize";
  
import db from "../../../db/models/postgres/index.js";
import { placeOrder, cityList } from "../helper_functions/tcs/cod.js";
import { getAllOrders, getOrder } from "../../../shopify/rest_api/order.js";
import { orderObj } from "../helper_functions/shopify/helper.js";
import "colors";
const Op = Sequelize.Op;

export const getOrders = async (req, res) => {
  console.log("GET All  orders From Shopify ".bgRed);
  const session = await Shopify.Utils.loadCurrentSession(req, res, false);

  // console.log(session, session.shop);
  let preferences = await db.Preferences.findOne({
    where: { storeId: session.id },
  });
 
  let shopifyOrderObjects = [];
  let placedOrders = [];
  let shopifyOrders = await getAllOrders(session);
  let data = await Promise.all(
    shopifyOrders.map(async (ele) => {
      let dbOrders = await db.ShipmentOrder.findOne({
        where: { shopifyOrderId: `${ele.order_number}`, storeId: session.id },
      });
      if (dbOrders) {
        delete dbOrders._previousDataValues;
        placedOrders.push(dbOrders);
      } else {
        // console.log(ele.order_number, ele.id, "order_number".bgYellow);
        const [row, created] = await db.ShipmentOrder.findOrCreate({
          where: {
            shopifyOrderNbr: String(ele.order_number),
            storeId: session.id,
          },
          defaults: {
            shopifyOrderNbr: `${ele.order_number}`,
            shopifyOrderId: `${ele.id}`,
            storeId: session.id,
          },
        });
        shopifyOrderObjects.push(row);
      }
    })
  );
  let allOrders = [...placedOrders, ...shopifyOrderObjects];
  console.log(
    "placedOrders === >".bgMagenta,
    placedOrders.length,
    "shopifyOrderObjects === > ",
    shopifyOrderObjects.length
  );
  res.status(200).send({ Responce: { data: allOrders, preferences } });
};

export const shiping = async (req, res) => {
  console.log("shiping".bgRed);
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    let preferencesObj = {
      userName: preferences.userName,
      password: preferences.password,
      costCenterCode: preferences.costCenterCode,
      consigneeName: preferences.consigneeName,
      consigneeAddress: preferences.consigneeAddress,
      consigneeMobNo: preferences.consigneeMobNo,
      consigneeEmail: preferences.consigneeEmail,
      originCityName: preferences.originCity,
      insuranceValue: preferences.insurance,
      services: preferences.service,
    };

    let orders = await getAllOrders(session);
    let data = await Promise.all(
      orders.map(async (ele) => {
        let result = await orderObj(session,ele);

        let body = {
          ...result,
          ...preferencesObj,
          destinationCityName: "Lahore",
          codAmount: "1",
          customerReferenceNo: "STring",
        };

        let data = await placeOrder(preferences.apiKey, body);
        let order = String(ele.order_number);
        if (data.data.returnStatus.status == "SUCCESS") {
          let cn = String(
            data.data.bookingReply.result.split(":").pop().trim()
          );
          const [row, created] = await db.ShipmentOrder.findOrCreate({
            where: { shopifyOrderId: order, storeId: session.id },
            defaults: {
              ...body,
              shopifyOrderId: order,
              isOrderReverse: false,
              isShipingByCN: false,
              shipingByCNFields: { ssee: "jgbukb" },
              isOrderPlaced: true,
              generatedCN: cn,
            },
          });
          console.log(`OrderNbr ${order} Placed to TCS `.green);
          return { row, created };
        } else {
          const [row, created] = await db.ShipmentOrder.findOrCreate({
            where: { shopifyOrderId: order, storeId: session.id },
            defaults: {
              ...body,
              shopifyOrderId: order,
              isOrderReverse: false,
              isShipingByCN: false,
              shipingByCNFields: { ssee: "jgbukb" },
              generatedCN: "Undefine",
              isOrderPlaced: false,
            },
          });
          console.log(`OrderNbr ${order} Fail to Placed TCS `.green);
          return { row, created };
        }
      })
    );

    res.status(200).send({
      Responce: {
        result: "ooookay",
        data,
      },
    });
  } catch (err) {
    console.log("Error", err.name, err);
  }
};

export const searchOrders = async (req, res) => {
  console.log("GET All  searchOrders From Shopify ".bgRed);
  const { tab, query, baseOn } = req.query;
  const session = await Shopify.Utils.loadCurrentSession(req, res, false);
  const preferences = await db.Preferences.findOne({
    where: { storeId: session.id },
  });
  let Responce = [];
  if (tab == "isOrderPlaced" || tab == "isOrderCancel") {
    let dbOrders =
      tab == "isOrderCancel"
        ? await db.ShipmentOrder.findAll({
            where: {
              [`${baseOn}`]: {
                [Op.like]: `${query}%`,
              },
              isOrderCancel: true,
              isOrderPlaced: true,
              storeId: session.id,
            },
          })
        : await db.ShipmentOrder.findAll({
            where: {
              [`${baseOn}`]: {
                [Op.like]: `${query}%`,
              },
              isOrderPlaced: true,
              isOrderCancel: false,
              storeId: session.id,
            },
          });
    Responce.push(...dbOrders);
  } else {
    if (tab == "open") {
      const dbData = await db.ShipmentOrder.findAll({
        where: {
          [`${baseOn}`]: {
            [Op.like]: `${query}%`,
          },
          isOrderCancel: false,
          isOrderPlaced: false,
          storeId: session.id,
        },
      });

      let allData = [];
      await Promise.all(
        dbData.map(async (ele) => {
          let order = await getOrder(session, ele.shopifyOrderId);
          let result = await orderObj(session,order);
          let data = {
            ...result,
            id: ele.id,
          };
          allData.push(data);
        })
      );

      Responce.push(...allData);
    } else {
      const dbData = await db.ShipmentOrder.findAll({
        where: {
          [`${baseOn}`]: {
            [Op.like]: `${query}%`,
          },
          storeId: session.id,
        },
      });

      let placOrder = [];
      let shopifyOrder = [];
      await Promise.all(
        dbData.map(async (ele) => {
          if (ele.isOrderPlaced) {
            placOrder.push(ele);
          } else {
            let order = await getOrder(session, ele.shopifyOrderId);
            let result = await orderObj(session,order);
            let data = {
              ...result,
              id: ele.id,
            };
            shopifyOrder.push(data);
          }
        })
      );
      let allData = [...placOrder, ...shopifyOrder];

      Responce.push(...allData);
    }
  }
  console.log(`${Responce.length} Order Found`);
  res.status(200).send({
    Responce: {
      status: true,
      data: Responce,
      preferences,
    },
  });
};

export const filteredBaseOrders = async (req, res) => {
  console.log("filteredBaseOrders".bgYellow);
  try {
    const filter = req.query.filter;
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });
    if (!preferences) {
      return res.status(200).send({
        Responce: {
          status: true,
          data: null,
          preferences,
          Responce: "Invalid Credentials",
        },
      });
    } 
    let responce = []
let shopifyOrders = await getAllOrders(session);
let StoreOnDB = await Promise.all(
  shopifyOrders.map(async (ele) => {

      const [row, created] = await db.ShipmentOrder.findOrCreate({
        where: {
          shopifyOrderNbr: String(ele.order_number),
          storeId: session.id,
        },
        defaults: {
          shopifyOrderNbr: `${ele.order_number}`,
          shopifyOrderId: `${ele.id}`,
          storeId: session.id,
        },
      });
     
  })
);
    if (filter == "open") {
      // let openOrders = [];
      let dbOrders = await db.ShipmentOrder.findAll({
        where: {
          isOrderPlaced: false,
          isOrderCancel: false,
          storeId: session.id,
        },
      });
      let data = await Promise.all(
        dbOrders.map(async (ele) => {
          let singleOrder = await getOrder(session, ele.shopifyOrderId);
          let result = await orderObj(session,singleOrder);
          let data = {
            ...result,
            id: ele.id,
          };
          console.log(result, "result From  filteredBaseOrders".bgGreen, data);
          responce.push(data);
        })
        
        );
        // data.push(...openOrders);
      }
      console.log( "openOrders".bgGreen,responce);

    if (filter == "isOrderPlaced" || filter == "isOrderCancel") {
      console.log("isOrderPlaced".bgRed);
      let allData =
        [`${filter}`] == "isOrderPlaced"
          ? await db.ShipmentOrder.findAll({
              where: {
                [`${filter}`]: true,
                isOrderCancel: false,
                storeId: session.id,
              },
            })
          : await db.ShipmentOrder.findAll({
              where: {
                [`${filter}`]: true,
                isOrderPlaced: true,
                storeId: session.id,
              },
            });
      responce.push(...allData);
    }
    
    if (filter == "") {
      let open = []
           let openOrder = await db.ShipmentOrder.findAll({
             where: {
               isOrderPlaced: false,
               isOrderCancel: false,
               storeId: session.id,
             },
           });
        let placeOrder = await db.ShipmentOrder.findAll({
          where: {
            isOrderPlaced: true,
            // isOrderCancel: true,
            storeId: session.id,
          },
        });
           let data = await Promise.all(
             openOrder.map(async (ele) => {
               let singleOrder = await getOrder(session, ele.shopifyOrderId);
               let result = await orderObj(session,singleOrder);
               let data = {
                 ...result,
                 id: ele.id,
               };
               console.log(
                 result,
                 "result From  filteredBaseOrders".bgGreen,
                 data
               );
               open.push(data);
             })
           );
      
      responce.push(...placeOrder,...open)
      // console.log(placeOrder, "Direct Wala ".bgRed, open);
      // return res.redirect(`/api/dashboard/getorders`);
    }

    console.log(
      `GET All  orders From ${filter?filter:"All"} is ${responce.length} `.bgRed,
      responce
    );

    res.status(200).send({
      Responce: {
        status: true,
        data: responce,
        preferences,
      },
    });
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};

export const getAllCities = async (req, res) => {
  console.log("getAllCities".bgRed);
  const session = await Shopify.Utils.loadCurrentSession(req, res, false);

  let preferences = await db.Preferences.findOne({
    where: { storeId: session.id },
  });
  let arr = [];
  let data = await cityList(preferences.apiKey);
  // console.log(data, "Their is the ele".yellow);
  await Promise.all(
    data.data.allCities.map(async (ele) => {
      const [row, created] = await db.Cities.findOrCreate({
        where: { cityName: ele.cityName, storeId: session.id },
        defaults: {
          cityName: ele.cityName,
          cityCode: ele.cityCode,
          area: ele.area,
          storeId: session.id,
        },
      });
      if (!created) {
        row.cityName = ele.cityName;
        row.cityCod = ele.cityCode; 
        row.area = ele.area;
      }
      arr.push(row);
    })
  );
  // console.log("===>", arr);
  res.status(200).send({
    Responce: {
      data: arr,
    },
  });
};
 