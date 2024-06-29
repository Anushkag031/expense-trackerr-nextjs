'use server'
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function getUserBalance(): Promise<{
   balance?: number;
   error?:string;

}>{
  //get the logged in user id
  const { userId } = auth();
  // console.log(userId);

  //check if the user is logged in
  if (!userId) {
    return { error: "You must be logged in to get the balance" };
  }

  //get the user balance
  try {
    const transactions = await db.transaction.findMany({
        where: {
            userId,
        },
        });

        const balance = transactions.reduce((sum, transaction) => (sum += transaction.amount), 0);

        return { balance}
    
  } catch (error) {
    return { error: "An error occurred while getting the balance" };
    
  }
  
}
export default getUserBalance;