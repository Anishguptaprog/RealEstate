"use client"
import React, { useState } from 'react'
import Stepper from './Stepper';
import { PropertyType, PropertyStatus, Prisma, PropertyImage } from '@prisma/client';
import Basic from './basic';
import { cn } from '@nextui-org/react';
import Location from './Location';
import Features from './Features';
import Picture from './Picture';
import Contact from './Contact';
import { z } from 'zod';
import { AddPropertyFormSchema } from '@/lib/zodSchema';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadImages } from '@/lib/upload';
import { editProperty, saveProperty } from '@/lib/actions/property';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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
  property?: Prisma.PropertyGetPayload<{
    include: {
      location: true;
      contact: true;
      feature: true;
      image: true;
    };
  }>;
  isEdit?: boolean;
}
export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyForm = ({isEdit=false, ...props}:Props) => {
 const router = useRouter();
  const methods = useForm<AddPropertyInputType>({
    resolver:zodResolver(AddPropertyFormSchema),
    defaultValues:{
      contact: props.property?.contact ?? undefined,
      location: props.property?.location ?? undefined,
      propertyFeature: props.property?.feature ?? undefined,
      description: props.property?.description ?? undefined,
      name: props.property?.name ?? undefined,
      price: props.property?.price ?? undefined,
      statusId: props.property?.statusId ?? undefined,
      typeId: props.property?.typeId ?? undefined,
       
    }
  })
  const [images,setImages] = useState<File[]>([])
  const [savedImagesUrl,setSavedImagesUrl] = useState<PropertyImage[]>(props.property?.image ?? []);
  const [step,setStep] = useState(0);
  const {user} = useKindeBrowserClient();
  const onSubmit: SubmitHandler<AddPropertyInputType> = async(data)=>{
    console.log({data});
    const imageUrls = await uploadImages(images);

    try{
      if(isEdit && props.property){
        const deletedImageId = props.property?.image.filter(item=>!savedImagesUrl.includes(item)).map(item=>item.id)
        await editProperty(props.property?.id,data,imageUrls,deletedImageId)
        toast.success("Property Updated!");
      }
      else{
        await saveProperty(data,imageUrls,user?.id!);
      toast.success("Property Added!");
      redirect("/user/properties");
      }
      
    } catch (error){
      console.log({error});
    } finally{
      router.push("/user/properties");
    }
  };
  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep}/>
      <FormProvider {...methods}>

      
      <form className='mt-3' onSubmit={methods.handleSubmit(onSubmit,(errors)=>console.log(errors))}>
        <Basic 
        className={cn({'hidden':step!=0})}
        isEdit={isEdit}
        types={props.types} statuses={props.statuses} next={()=> setStep((prev)=>prev+1) }/>  
        <Location next = {()=>setStep(prev=>prev+1)} prev={()=>setStep(prev=>prev-1)} className={cn({'hidden':step!=1})}/>
        <Features
          next={()=>setStep((prev)=>prev+1)}
          prev={()=>setStep((prev)=>prev-1)}
          className={cn({'hidden':step!=2})}
        />
        <Picture
          next={()=>setStep((prev)=>prev+1)}
          prev={()=>setStep((prev)=>prev-1)}
          className={cn({'hidden':step!=3})}
          images={images}
          setImages={setImages}
          {...(props.property!! && {savedImagesUrl:savedImagesUrl,setSavedImageUrl:setSavedImagesUrl})}
        />
        <Contact
          prev={()=>setStep((prev)=>prev-1)}
          className={cn({'hidden':step!=4})}
        />
      </form>
      </FormProvider>  
    </div>
  )
}

export default AddPropertyForm