/* eslint-disable jsx-a11y/alt-text */
import { TrashIcon } from "@heroicons/react/16/solid";
import { Card, Image } from "@nextui-org/react";
import React from "react";

interface Props {
  src: string;
  index: number;
  onDelete: (index: number) => void;
}
const PictureCard = ( props : Props) => {
  return (
    <Card className="flex flex-col items-center">
      <Image src={props.src} className="w-36 h-36 object-contain" />
      <button className="mb-2" onClick={() => props.onDelete(props.index)}>
        <TrashIcon className="text-danger-400 w-4" />
      </button>
    </Card>
  );
};

export default PictureCard;