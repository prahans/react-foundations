import { useQuery } from "@tanstack/react-query";
import { getAvailableCabins } from "../../services/apiBookings";

export function useAvailableCabins(startDate, endDate) {
  const {
    data: availableCabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["availableCabins", startDate, endDate],
    queryFn: () => getAvailableCabins(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  return { availableCabins, isLoading, error };
}
