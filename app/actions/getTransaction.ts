'use server'
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Transaction } from "@/types/Transaction";

async function getTransactions(): Promise<{
   transactions?: Transaction[];
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
        orderBy:{
            createdAt:"desc"
        }
        });

        return { transactions };



    
  } catch (error) {
    return { error: "An error occurred while getting the balance" };
    
  }
  
}
export default getTransactions;