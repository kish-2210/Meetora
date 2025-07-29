"use client"
import Image from "next/image";

interface HomeCardProps {
   img : string,
   title: string,
   description: string,
   handleClick : ()=> void
}

const HomeCard = ({img,title,description,handleClick}: HomeCardProps) => {
    return (
        <div className= {`bg-card px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer text-button-1`} onClick={handleClick}>
            <div className="flex-center bg-button-1 size-12 rounded-[10px]">
                <Image src={img} alt="add-meeting" width={27} height={27} />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{description}</p>
            </div>
        </div>
    )
}

export default HomeCard
