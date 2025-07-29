"use server";
import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async()=>{
    const user = await currentUser()
    if(!user) throw new Error("User is not logged in");
    if(!API_KEY) throw new Error("No API key");
    if(!API_SECRET) throw new Error("No API secret");

    const client  = new StreamClient(API_KEY,API_SECRET)

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // Token expires in 1 hour
    const issuedAt = Math.floor(Date.now() / 1000) - 60; // Issued a minute ago for clock skew tolerance

    const token = client.createToken(user.id, expirationTime, issuedAt);
    return token;
}