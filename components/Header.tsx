import { checkUser } from "@/lib/checkUser";
import { SignInButton, SignedIn,SignedOut,UserButton } from "@clerk/nextjs";

const Header = async() => {

    const user=await checkUser();
    console.log(user); // user object is logged in the console
    return ( 
    <nav className="navbar">
        <div className="navbar-container">
            <h2>Expense Tracker</h2>
            <div>
                <SignedOut> {/* If user is not signed in*/}
                    <SignInButton/>
                </SignedOut>
                <SignedIn> {/*// If user is signed in*/}
                    <UserButton/>
                </SignedIn>
            </div>
        </div>
    </nav>);
}
 
export default Header;