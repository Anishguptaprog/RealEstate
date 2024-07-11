"use client"
import React, { useState } from 'react'
import Stepper from './Stepper';
import { PropertyType, PropertyStatus, Prisma } from '@prisma/client';
import Basic from './basic';
import { cn } from '@nextui-org/react';
import Location from './Location';

const steps = [
    {label:"Basic"},
    {label:"Location"},
    {label:"Features"},
    {label:"Pictures"},
    {label:"Contact"},
];

interface Props {
  // className?:string;
  types: PropertyType[];
  statuses: PropertyStatus[];
  // property?: Prisma.PropertyGetPayload<{
  //   include: {
  //     location: true;
  //     contact: true;
  //     feature: true;
  //     images: true;
  //   };
  // }>;
  // isEdit?: boolean;
}

const AddPropertyForm = (props:Props) => {

  const [step,setStep] = useState(0);
  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep}/>
      <form className='mt-3'>
        <Basic 
        className={cn({'hidden':step!=0})}
        types={props.types} statuses={props.statuses} next={()=> setStep((prev)=>prev+1) }/>  
        <Location next = {()=>setStep(prev=>prev+1)} prev={()=>setStep(prev=>prev-1)} className={cn({'hidden':step!=1})}/>
      </form>  
    </div>
  )
}

export default AddPropertyForm