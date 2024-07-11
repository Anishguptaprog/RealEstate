import React from 'react'
import AddPropertyForm from './_components/AddPropertyForm'
import prisma from '@/lib/prisma'

const AddPropertyPage = async () => {
  const [propertyTypes,propertyStatuse] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany()
  ])
  return (
    <AddPropertyForm types={propertyTypes} statuses={propertyStatuse}/>
  )
}

export default AddPropertyPage