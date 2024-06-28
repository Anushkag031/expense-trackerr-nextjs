import { currentUser } from "@clerk/nextjs/server";
import {db} from '@/lib/db';

//to get the current user and check if the user is already in the database
export const checkUser = async() => {
    const user = await currentUser();

    // check if user is signed in
    if(!user){
        return null;
    }
    // check if user already exists in the database
    const loggenInUser = await db.user.findUnique({
        where:{
            clerkUserId: user.id, 
        }
    })
    // check if user exists in the database
    if(loggenInUser){
        return loggenInUser;
    }
    //if not, create a new user
    const newUser = await db.user.create({
        data:{
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,    
            email: user.emailAddresses[0].emailAddress,
        }
    })
    return newUser;
}