'use server'
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function getIncomeExpense(): Promise<{
   income?: number;
    expense?: number;
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

        const amounts = transactions.map(transaction => transaction.amount);

        const income = amounts
            .filter((amount) => amount > 0)
            .reduce((sum, amount) => (sum += amount), 0);

        const expense = amounts
            .filter((amount) => amount < 0)
            .reduce((sum, amount) => (sum += amount), 0);

        return { income, expense:Math.abs(expense)}
    
  } catch (error) {
    return { error: "An error occurred while getting the balance" };
    
  }
  
}
export default getIncomeExpense;