import { cn } from '@nextui-org/react';
import React from 'react'

interface Props{
    items:{
        label:string
    }[];
    activeItem:number;
    setActiveItem:(index:number)=>void;
    className?:string;

}

const Stepper = (props:Props) => {
  return (
    <div className={cn("flex items-center justify-around",props.className)}>
        {
            props.items.map((item,index)=>(
             <>
                <div className={cn("rounded-full w-6 h-6 flex justify-center items-center transition",{"bg-primary-400 text-white":index==props.activeItem,"bg-gray-400 text-white":index>props.activeItem,"bg-primary-700 text-white":index<props.activeItem,"cursor-pointer":index<=props.activeItem})}
                
                onClick={()=>props.setActiveItem(index)}
                >{index+1}</div>
                <p>{item.label}</p>
             </>   
            ))
        }
    </div>
  )
}

export default Stepper