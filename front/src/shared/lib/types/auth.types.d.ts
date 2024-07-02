interface IAuthEmailLoginForm {
  credential: string
  code: string
}

interface IAuthPhoneConfirmationForm {
  credential: string
}

interface IAuthEmailConfirmationForm {
  credential: string
  password?: string
}

interface IProfileConfirmation {
  credential: string
}

interface IAuthRegisterForm {
  email: string
  login: string
  phone: string
  password: string
}

interface IAuthTokenResponse {
  accessToken: string
  user: IUser
}

interface IAuthMessageResponse {
  message: string
}

interface IAuthCodeResponse {
  code: string
  expiration: Date
}

type TAuthResponse = IAuthTokenResponse | IAuthCodeResponse

enum EnumUserRoles {
  USER = "USER",
  ADMIN = "ADMIN"
}

interface IUser {
  id: string
  createdAt: string
  loggedAt: string

  login: string
  email: string
  phone: string
  image: string
  role: EnumUserRoles

  news: INews[]
  polls: IPoll[]
  posts: IPost[]
  votes: IVote[]

  isConfirmed: boolean
  code?: string
  codeExpiration?: string
}
