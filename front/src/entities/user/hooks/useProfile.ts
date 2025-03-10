import { useQuery } from "@tanstack/react-query"
import { userService } from "../api/user.service"

export const useProfile = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
    retry: false
  })

  return { profile: data, isLoading, isSuccess }
}
