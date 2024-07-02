"use server"

import { revalidatePath } from "next/cache"

export async function revalidateComments() {
  revalidatePath("/(forum)/forum/(list)/[id]")
}

export async function revalidateCoversations() {
  revalidatePath("/(conversations)/conversations/[id]")
}
