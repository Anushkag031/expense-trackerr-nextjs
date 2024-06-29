"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

//server action

interface TransactionData {
  //Transaction data interface
  text: string;
  amount: number;
}
interface TransactionResult {
  //Transaction result interface
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  //addTransaction function
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  console.log(textValue, amountValue);

  if (!textValue || textValue === "" || !amountValue) {
    return { error: "Please enter text and amount" };
  }

  const text: string = textValue?.toString(); //text value should be string
  const amount: number = parseFloat(amountValue.toString()); //amount value should be number

  //chcek the logged in user and get the user id
  const { userId } = auth();
  // console.log(userId);

  //check if the user is logged in
  if (!userId) {
    return { error: "You must be logged in to add transactions" };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath("/");
    
    return { data: transactionData };
  } catch (error) {
    return { error: "An error occurred while adding transaction" };
  }
}

export default addTransaction;
