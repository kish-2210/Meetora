// "use client"
// import { StreamVideo, StreamVideoClient} from "@stream-io/video-react-sdk";
// import { ReactNode, useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { tokenProvider } from "@/actions/stream.actions";
// import Loader from "@/components/Loader";



// const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// const StreamVideoProvider = ({children}: {children : ReactNode}) =>{
 
//   const [videoClient, setvideoClient] = useState<StreamVideoClient>()
//   const {user , isLoaded } = useUser();

//   useEffect(() => {
//     if(!user || !isLoaded) return;
//     if(!API_KEY) throw new Error("Stream API key is missing!!!")

//      const client = new StreamVideoClient({
//             apiKey: API_KEY,
//             user: {
//               id: user?.id,
//               name: user.firstName || user?.username || 'User',
//               image: user?.imageUrl,
//             },
//             tokenProvider,
//           });

//     setvideoClient(client);

//     return()=>{
//       client.disconnectUser();
//       setvideoClient(undefined)
//     };
//   }, [user,isLoaded])
  
//   if (!videoClient) return <Loader />
//   return <StreamVideo client =  {videoClient} >
//       {children}
//     </StreamVideo>
  
// }

// export default StreamVideoProvider;


"use client";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { tokenProvider as serverTokenProvider } from "@/actions/stream.actions"; // Import the server action with an alias
import Loader from "@/components/Loader";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setvideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!user || !isLoaded) return;
    if (!API_KEY) throw new Error("Stream API key is missing!!!");

    // Create a client-side wrapper function that calls the server action.
    const createStreamClient = async () => {
      try {
        const client = new StreamVideoClient({
          apiKey: API_KEY,
          user: {
            id: user?.id,
            name: user.firstName || user?.username || "User",
            image: user?.imageUrl,
          },
          // Pass a valid client-side function that calls the server action
          tokenProvider: () => serverTokenProvider(),
        });
        setvideoClient(client);
      } catch (error) {
        console.error("Failed to create Stream client:", error);
      }
    };
    
    // Call the async function to create the client
    createStreamClient();

    // The cleanup function remains the same
    return () => {
      if (videoClient) {
        videoClient.disconnectUser();
        setvideoClient(undefined);
      }
    };
  }, [user, isLoaded]); // The dependency array is correct

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;