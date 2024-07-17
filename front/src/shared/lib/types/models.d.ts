enum EnumPostStatus {
  PENDING = "PENDING",
  PUBLISHED = "PUBLISHED",
  CANCELED = "CANCELED",
  DELETED = "DELETED"
}

interface ICategory {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  icon: string
  subcategories: ISubcategory[]
}

interface IComment {
  id: string
  createdAt: string
  updatedAt: string
  content: string
  postId: string
  creatorId: string
  creator: IUser
}

interface ISubcategory {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  slug: string
  categoryId: string
  category: ICategory
}

interface IPost {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  content: string
  status: EnumPostStatus
  creatorId: string
  creator: IUser
  subcategoryId: string
  subcategory: ISubcategory
  comments: IComment[]
}

interface IPostResponse {
  posts: IPost[]
  length: number
}

interface INews {
  id: string
  createdAt: string
  updatedAt: string
  content: string
  creatorId: string
  creator: IUser
}

interface IVote {
  id: string
  createdAt: string
  updatedAt: string
  optionId: string
  option: IOption
  userId: string
  user: IUser
}

interface IOption {
  id: string
  createdAt: string
  text: string
  pollId: string
  poll: IPoll
  votes: IVote[]
}

interface IPoll {
  id: string
  createdAt: string
  updatedAt: string
  question: string
  options: IOption[]
  creatorId: string
  creator: IUser
}

interface IMessage {
  id: string
  createdAt: string
  updatedAt: string
  content: string
  creatorId: string
  creator: IUser
  conversationId: string
  conversation: IConversation
}

interface IConversation {
  id: string
  createdAt: string
  updatedAt: string

  creatorId: string
  recipientId: string
  creator: IUser
  recipient: IUser

  lastMessageId?: string
  lastMessage?: IMessage
  messages: IMessage[]
}

interface TypeCreateCategory {
  name: string
  icon: string
}

interface TypeUpdateProfile {
  image: string
  login: string
}

interface TypeCreateSubcategory {
  name: string
  categoryId: string
}

interface TypeCreatePost {
  title: string
  content: string
  subcategoryId: string
}

interface TypeSendComment {
  content: string
  postId: string
  creatorId: string
}

interface TypeSendMessage {
  content: string
  conversationId: string
  creatorId: string
}

interface TypeCreateConversation {
  id: string
  content: string
}

interface TypeCreatePoll {
  question: string
  options: { text: string }[]
}

interface TypeAddNews {
  content: string
}

interface TypeVoteInPoll {
  optionId: string
}
