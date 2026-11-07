export interface AuthorRef {
  _id: string
  name: string
  email: string
}

export interface Article {
  _id: string
  title: string
  content: string
  gameNames: string[]
  tags: string[]
  coverImageUrl?: string
  author: AuthorRef
  likes: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  text: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TagCount {
    tag: string
    count: number
}

export type StatusFilter = "all" | "active" | "inactive"