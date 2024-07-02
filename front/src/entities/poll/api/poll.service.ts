import { axiosWithToken } from "@/shared/api"

export const pollService = {
  async create(data: TypeCreatePoll) {
    return axiosWithToken<IPoll>({
      url: "/polls",
      method: "POST",
      data
    })
  },
  async voteInPoll(data: TypeVoteInPoll) {
    return axiosWithToken<IVote>({
      url: "/polls/vote",
      method: "POST",
      data
    })
  }
}
