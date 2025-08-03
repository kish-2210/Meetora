"use client"
import React, { use } from 'react'
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall , StreamTheme } from '@stream-io/video-react-sdk';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

const meeting = ({params} :{params: Promise<{id : string}>}) => {
  const { user , isLoaded} = useUser(); //third-party hook - client side
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const {id} = use(params)
  const { call , isCallLoading } = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ?(
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
            ):(
              <MeetingRoom/>
            )}
        </StreamTheme>
      </StreamCall>

    </main>
  )
}

export default meeting
