import React, { ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider' 
import { SignIn } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

const layout = async ({children}:{children: ReactNode}) => {

   const user = await currentUser()

  return (
    <main>
       
<StreamVideoProvider>
{children}
</StreamVideoProvider>
        
        
    </main>

  )
}

export default layout
