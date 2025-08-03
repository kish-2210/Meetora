"use server";
import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";
import { CornerDownLeft } from "lucide-react";

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async()=>{
   console.log(API_KEY)
    console.log("kishan");
    const user = await currentUser()
    if(!user) throw new Error("User is not logged in");
    if(!API_KEY || ! API_SECRET) throw new Error("API keys are missing");
    
    const client  = new StreamClient(API_KEY,API_SECRET);
    const userId: string = user.id;

    const vailidity = 60 * 60;
    const token = client.generateUserToken(
        { 
          user_id: userId, 
          validity_in_seconds: vailidity 
        }
      );

      return token as string;
}

