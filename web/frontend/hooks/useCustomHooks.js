import { useAppQuery } from "./index.js";
export default function fetchData(url, body, state,isload) {
  const {
    data,
    refetch: refetchOrders,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
      url: `${url}`,
      fetchInit:{...body},
    reactQueryOptions: {
      onSuccess: (orders) => {
        console.log(orders, "oooooooooooooooooo");
        state(orders.data);
        isload(false);
      },
    },
  });
}
