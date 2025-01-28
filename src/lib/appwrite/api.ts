import { INewUser } from "@/types";
<<<<<<< HEAD
import { account, avatars } from "./config";
=======
import { account, appwriteConfig, avatars, databases } from "./config";
>>>>>>> 0ad215226a14fe037cffe99db5e60208d8d9a24b
import {ID} from 'appwrite';

export async function createUserAccount(user: INewUser){

    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

<<<<<<< HEAD
     if(!newAccount) throw Error;
     
     const avatarUrl = avatars.getInitials(user.name);

    //  const newUser = awit saveUserToDB()

     return newAccount;
=======
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveuserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: newAccount.username,
            imageUrl: avatarUrl,
        })
        return newUser;
>>>>>>> 0ad215226a14fe037cffe99db5e60208d8d9a24b
    } catch (error) {
        console.log(error);
        return error;
    }

<<<<<<< HEAD
}

export async function saveUserToDB(user:{
=======
}export async function saveuserToDB(user:{
>>>>>>> 0ad215226a14fe037cffe99db5e60208d8d9a24b
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
<<<<<<< HEAD
})
=======
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser;
    } catch (error) {
        console.log(error)
    }
    
}

export async function signInAccount(user:{email: string; password: string}) {
    try {
        const sesssion = await account.createSession(user.email, user.password)
        return sesssion;
    } catch (error) {
        console.log(error);
    }
    
}
>>>>>>> 0ad215226a14fe037cffe99db5e60208d8d9a24b
