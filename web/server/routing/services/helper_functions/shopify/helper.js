import db from "../../../../db/models/postgres/index.js";
import stringSimilarity from "string-similarity";
import { getProduct } from "../../../../shopify/rest_api/product.js"; 
import { cityList } from "../tcs/cod.js";


export const isFragileProduct = async (session,order) => {
  try {
    const fragileProducts = await db.FragileProducts.findOne({
      where: { storeId: session.id },
    });

    console.log("isFragileProduct".yellow);
    let data = await Promise.all(
      order.line_items.map(async (element, index) => {
        let orderVariantsId = element.variant_id;

        let result;
        return await Promise.all(
          fragileProducts.fragileProducts.map(async (ele) => {
            return await Promise.all(
              ele.variants.map(async (e) => {

                let id = e.id.split("/").pop();
                console.log("result ==== >".yellow, id);

                if (id == orderVariantsId) {
                  result = "Yes";
                  return result;
                } else {
                  result = "No";

                  return result;
                }
              })
            );
          })
        );
      })
    );

    let result = String(data).includes("Yes");
    return result ? "Yes" : "No";
  } catch (err) {
    console.log(` Catch Error of isFragile = ${err.name}`);
  }
};

export const orderObj = async (session,order) => {
  console.log("orderObj".bgRed);
  let weight = 0;
  let quentity = 0
    let productDetails = "";
    await Promise.all(
      order.line_items.map(async (e) => {
        productDetails += `${e.name} with quantity ${e.quantity} , `;
        quentity = quentity + Number(e.quantity);

        let product = await getProduct(session, e.product_id);
        // console.log(product, "Order  product ");
        product.variants.filter((variant) => {
          if (variant.id == e.variant_id) {
            weight = weight+ Number(variant.weight);
          }
          ;
        });


      })
    );
  
  let totaleQuentity = quentity ==0?1:quentity
   let totaleWeight =  weight==0?1:weight
    let bestMatch = await BestMatchOfCity(order.shipping_address.city); // Use Later

    delete order.session;
    let obj = {
      shopifyOrderId: String(order.id),

      destinationCityName: bestMatch.bestMatch.target || "Lahore",
      // destinationCityName: "Lahore",
      weight: Number(totaleWeight) || 1,
      pieces: Number(totaleQuentity) || 1,
      customerReferenceNo:order.order_number,
      productDetails: productDetails,
      remarks: order.order_number,
      shopifyOrderNbr: order.order_number,
    };
    return obj;
};

export const BestMatchOfCity = async (cityName,apiKey) => {
  console.log("BestMatchOfCity is working".yellow);
  let cities = await db.Cities.findAll({});

  if (!cities) {
    let data = await cityList("62fbc159-7912-4473-a2f7-b0601232cfaa");
    // console.log(data, "Their is the ele".yellow);
    await Promise.all(
      data.data.allCities.map(async (ele) => {
        const [row, created] = await db.Cities.findOrCreate({
          where: { cityName: ele.cityName },
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
      })  
    );
  }

  
  let arr = [];
  await Promise.all(
    cities.map((ele) => {
      arr.push(ele.cityName);
    })
  );
  // console.log("cityList".yellow, "arr ===>",arr);
  let similarity = stringSimilarity.findBestMatch(cityName.toUpperCase(), arr);

  return similarity;
};
