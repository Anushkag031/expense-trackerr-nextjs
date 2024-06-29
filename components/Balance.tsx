import getUserBalance from "@/app/actions/getUserBalance";
import { addCommas } from "@/lib/utils";

const Balance = async() => {

    const {balance} = await getUserBalance();
    return (
        <>
        <br />
        <h4>Your Balance</h4>
        <h3>Rs. {addCommas(balance ?? 0)}</h3>
        </>
     );
}
 
export default Balance;