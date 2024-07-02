enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

type UserRoleType = keyof typeof UserRole
