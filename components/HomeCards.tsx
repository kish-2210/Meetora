"use client"
import Image from "next/image";
import { ReactNode } from "react";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface HomeCardProps {
   img : string,
   title: string,
   description: string,
  
   dialogTitle: string;
   className?: string;
   children?: ReactNode,
   handleClick: ()=> void;
   buttonText?: string;
   image?: string;
   buttonIcon?: string;
}

const HomeCards = ({img,title,description, dialogTitle , className,
    children,handleClick,buttonText,image,buttonIcon}: HomeCardProps) => {
    return (

        <Dialog>
        <DialogTrigger asChild>
        <div className= {`bg-card px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer text-button-1`}>
            <div className="flex-center bg-button-1 size-12 rounded-[10px]">
                <Image src={img} alt="add-meeting" width={27} height={27} />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{description}</p>
            </div>
        </div>
        </DialogTrigger>
         <DialogContent className="flex w-full max-w-[520px] flex-col gap-6  bg-card border-none px-6 py-9 text-white">
    <div className="flex flex-col gap-6">
        {image && (
           <div className="flex justify-center">
            <Image src={image} alt="image" width={72} height={72}/>
           </div> 
        )}
        <DialogTitle className={cn('text-3xl text-button-1 font-bold leading-[42px]',className)} >{dialogTitle}</DialogTitle>
         <DialogDescription> </DialogDescription>
        {children}
        <Button className="bg-button-1 text-button-2 font-bold focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer hover:bg-[]" 
        onClick = {handleClick}>
            {buttonText && buttonIcon && (
                <Image src={buttonIcon} alt="button-icon" width={13} height={13}/>
            )} &nbsp;
            {buttonText || 'Schedule Meeting'}

        </Button>
    </div>
  </DialogContent>

        
        </Dialog>
    )
}

export default HomeCards