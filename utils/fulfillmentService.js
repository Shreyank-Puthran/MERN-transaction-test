import axios from "axios";

export const callFulfillmentAPI = async (clientId, orderId) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: clientId,
        title: orderId
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.id;

  } catch (error) {
    throw new Error("Fulfillment API failed");
  }
};