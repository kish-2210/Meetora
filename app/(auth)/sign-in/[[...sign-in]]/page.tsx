import { SignIn } from '@clerk/nextjs'

const signInPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
        <SignIn/>
    </main>
  )
}

export default signInPage
