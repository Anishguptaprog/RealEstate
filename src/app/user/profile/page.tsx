import PageTitle from '@/app/components/pageTitle';
import { getUserById } from '@/lib/actions/user';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Avatar, Button, Card } from '@nextui-org/react';
import React, { ReactNode } from 'react'
import SectionTitle from './_components/sectionTitle';
import UploadAvatar from './_components/UploadAvatar';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const ProfilePage = async () => {
    const {getUser} = await getKindeServerSession();
    const user = await getUser();
    const dbUser = await getUserById(user?user.id:"");

    const userSubcription = await prisma.subscriptions.findFirst({
        where: { userId: dbUser?.id },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
      });
  return (
    <div>
        <PageTitle title="My profile" linkCaption='Back to home' href='/'/>
        <Card className='m-4 p-4'>
            <SectionTitle title='Basic Info'/>
            <div className='flex'>
            <div className='flex flex-col items-center'>
                <Avatar className='w-20 h-20'
                src={dbUser?.avatarUrl ?? "/profile.png"}/>
                <UploadAvatar userId={dbUser?.id!}/>
            </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Att title="Name" value={`${dbUser?.firstName} ${dbUser?.lastName}`}/>
                <Att title="Email" value={dbUser?.email}/>
                <Att title="Registered on" value={dbUser?.createdAt.toLocaleDateString()}/>
                <Att title="Properties Registered" value={1}/>
            </div>
        </Card>
        <Card className="m-4 p-4  flex flex-col gap-5">
        <SectionTitle title="Subscription Details" />
        {userSubcription ? (
          <div>
            <Att title="Plan" value={userSubcription.plan.name} />
            <Att title="Price" value={userSubcription.plan.price} />
            <Att
              title="Purchased On"
              value={userSubcription.createdAt.toLocaleDateString()}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-center">No Subscription Found!</p>
          </div>
        )}
        <Link href={"/user/subscription"}>
          <Button color="secondary">Purchase Your Subscription</Button>
        </Link>
      </Card>    
    </div>
  )
}
export default ProfilePage

const Att = ({title,value}:{title:string;value:ReactNode})=>
{    return (<div className='flex flex-col text-sm'>
        <span className='text-slate-800 font-semibold'>
            {title}
        </span>
        <span className='text-slate-600'>
            {value}
        </span>
    </div>)}
