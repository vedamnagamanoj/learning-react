import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  return { bookings, error, isPending };
}
