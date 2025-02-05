import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { Avatars, ID, Query } from 'appwrite';
import { URL } from "node:url";

export async function createUserAccount(user: INewUser): Promise<any> {
  try {
    const userId = ID.unique();
    console.log("Generated userId:", userId);

    const newAccount = await account.create(
      userId,
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user account:", error);
    return error;
  }
}


export async function signInAccount(user: { email: string; password: string }): Promise<any> {
  try {
    console.log("Signing in with:", user.email, user.password);
    const session = await account.createSession(user.email, user.password);
    console.log("Session created:", session);
    return session;
  } catch (error) {
    console.error("Error signing in account:", error);
    throw error; // Ensure the error is rethrown
  }
}



export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: string; // Changed from URL to string
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}



export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId, // Corrected the property name
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
