import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button } from '@nextui-org/react';
import React from 'react'

const SignIn = async() => {
    const {isAuthenticated,getUser}=await getKindeServerSession();
    const user = await getUser();
    if(await isAuthenticated()) return <div>{user?.given_name} <LogoutLink>Logout</LogoutLink></div>;

    return (<div className='flex gap-3'>
        <Button color='primary'>
            <LoginLink>
                Sign In
            </LoginLink>
        </Button>
        <Button>
            <RegisterLink>
                Sign Up
            </RegisterLink>
        </Button>
    </div>
    );
}

export default SignIn