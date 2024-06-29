'use client'
import deleteTransaction from "@/app/actions/deleteTransaction";
import getTransactions from "@/app/actions/getTransaction";
import { addCommas } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";
import { link } from "fs";
import { toast } from "react-toastify";

const Transactionitem = ({transaction}:{transaction:Transaction}) => {

    const handleDeleteTransaction = async(id:string) => {
        const confirmed=window.confirm('Are you sure you want to delete this transaction from the list?');

        if(!confirmed){
            return;
        }

        const {message,error}=await deleteTransaction(id);
        if(error){
            return toast.error(error);
        }
        toast.success(transaction.text+' has been deleted successfully');
        //getTransactions();
    }

    return (  
        <li className={transaction.amount<0?'minus':'plus'}>
            {transaction.text} 
            <br></br>
            <span>
                {transaction.amount<0?'-':'+'}${addCommas(Math.abs(transaction.amount))}
                </span>
            <button 
            onClick={()=>handleDeleteTransaction(transaction.id)}
            className="delete-btn">x</button>
        </li>
    );
}
 
export default Transactionitem;