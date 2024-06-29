'use server'
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function deleteTransaction(transactionId:string): Promise<{
   message?:string;
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
    await db.transaction.delete({
        where: {
            id:transactionId,
            userId
        },
        });
        revalidatePath('/');

        return { message: 'Transaction deleted successfully'}
    
  } catch (error) {
    return { error: "An error occurred while getting the balance" };
    
  }
  
}
export default deleteTransaction;