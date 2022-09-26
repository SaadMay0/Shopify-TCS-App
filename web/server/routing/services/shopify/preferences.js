import { Shopify } from "@shopify/shopify-api";
import db from "../../../db/models/postgres/index.js";
import { getProduct } from "../../../shopify/rest_api/product.js";

export const postPreferences = async (req, res) => {
  const {
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
  } = req.body;

  const session = await Shopify.Utils.loadCurrentSession(req, res, false);

  console.log("postPreferences".yellow, session);

  const [row, created] = await db.Preferences.findOrCreate({
    where: { storeId: session.id },
    defaults: {
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
      storeId: session.id,
    },
  });
  if (!created) {
    row.userName = userName;
    row.password = password;
    row.accountNo = accountNo;
    row.apiKey = apiKey;
    row.insurance = insurance;
    row.consigneeName = consigneeName;
    row.consigneeAddress = consigneeAddress;
    row.consigneeMobNo = consigneeMobNo;
    row.consigneeEmail = consigneeEmail;
    row.costCenterCityName = costCenterCityName;
    row.service = service;
    row.costCenterCode = costCenterCode;
    row.costCenterName = costCenterName;
    row.fragile = fragile;
    row.locationId = locationId;
    row.originCity = originCity;
    row.consigneeLandLine = consigneeLandLine;
    await row.save();
  }
  res.status(200).send({
    Responce: {
      created,
      data: row,
    },
  });
};

export const getPreference = async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(req, res, false);
  let data = await db.Preferences.findOne({
    where: { storeId: session.id },
  });
  console.log(session,"getPreference".bgRed,data);

  res.status(200).send({
    Responce: {
      data,
    },
  });
};

export const postFragile = async (req, res) => {
try {
    const { fragileProducts } = req.body;

    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
// getProduct;
    let arr = [];
    console.log(
      "Selected Product length is ",
      fragileProducts.length,
      "fragileProducts".bgCyan
    );
    await Promise.all(
      fragileProducts.map(async (ele) => {
        let product = await getProduct(session, ele.id.split("/").pop());
        delete product.session;
        let obj = {
          img: product.image.src,
          productName: product.title,
          selectedVariants: `${ele.variants.length} of ${product.variants.length}`,
        };
        arr.push(obj);
      })
    );

    const [row, created] = await db.FragileProducts.findOrCreate({
      where: { storeId: session.id },
      defaults: {
        fragileProducts,
        shopifyProduct: arr,
        storeId: session.id,
      },
    });
    if (!created) {
      row.fragileProducts = fragileProducts;
      row.shopifyProduct = arr;

      await row.save();
    }
    res.status(200).send({
      Response: {
        data: row,
        created,
        arr,
      },
    });
} catch (err) {
  console.log("Error  postFragile ==> ", err);
}
};

export const getFragile = async (req, res) => {
  console.log("getfragile".cyan);
try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    const data = await db.FragileProducts.findOne({
      where: { storeId: session.id },
    });
    res.status(200).send({
      Response: {
        data,
      },
    });
} catch (err) {
  console.log("Error getFragile ==> ", err);
  
}
};
