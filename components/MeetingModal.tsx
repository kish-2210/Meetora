import { ReactNode } from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,

} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
isOpen: boolean;
onClose: ()=> void;
title: string;
className?: string;
children?: ReactNode,
handleClick?: ()=> void;
buttonText?: string;
image?: string;
buttonIcon?: string;
}

const MeetingModal = ({isOpen , onClose , title , className,
    children,handleClick,buttonText,image,buttonIcon} : MeetingModalProps
) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="flex w-full max-w-[520px] flex-col gap-6  bg-card border-none px-6 py-9 text-white">
    <div className="flex flex-col gap-6">
        {image && (
           <div className="flex justify-center">
            <Image src={image} alt="image" width={72} height={72}/>
           </div> 
        )}
        <h1 className={cn('text-3xl text-button-1 font-bold leading-[42px]',className)} >{title}</h1>
        {children}
        <Button className="bg-button-1 text-button-2 font-bold focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer hover:bg-[]" onClick={handleClick}>
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

export default MeetingModal
