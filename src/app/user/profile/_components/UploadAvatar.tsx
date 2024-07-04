'use client'
import FileInput from '@/app/components/fileUpload';
import { PencilIcon } from '@heroicons/react/16/solid'
import { Image,Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';

import React, { useState } from 'react'

const UploadAvatar = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const[image,setImage]=useState<File>();
  return (
    <div>
        <button onClick={onOpen}>
            <PencilIcon className='w-6 text-slate-400 hover:text-primary transition-colors'/>
        </button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <FileInput onChange={e=>setImage((e as any).target.files[0])}/>
                    {image && <Image src={URL.createObjectURL(image)} alt={''}/>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancle
                </Button>
                <Button color="primary" onPress={onClose}>
                  Change Avatar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UploadAvatar