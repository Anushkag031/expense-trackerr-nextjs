import getIncomeExpense from "@/app/actions/getIncomeExpense";

const IncomeExpense = async() => {

    const{income,expense}=await getIncomeExpense();
    return ( 
        <div className="inc-exp-container">
            <div>
                <h4>
                    Income 
                </h4>
                <p className="money plus">Rs.{income}</p>
            </div>
            <div>
                <h4>
                    Expense
                </h4>
                <p className="money minus">Rs. {expense}</p>
            </div>
        </div>
    );
}
 
export default IncomeExpense;