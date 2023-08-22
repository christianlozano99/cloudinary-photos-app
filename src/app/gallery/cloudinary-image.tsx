"use client"

import { Star } from "@/components/icons/star"
import { FullStar } from "@/components/icons/fullstar"
import { CldImage } from "next-cloudinary"
import { setAsFavrioteAction } from "./actions";
import { useTransition } from "react";
import { SearchResult } from "./page";

export function CloudinaryImage(props: any & { imageData: SearchResult; path: string }) {
    const [transition, startTransition] = useTransition();

    const { imageData } = props;

    const isFavorite = imageData.tags.includes("favorite");

    return (
        <div className="relative">
            <CldImage {...props}
                src={imageData.public_id} />
            {isFavorite ? (
                <FullStar
                    onClick={() => {
                        startTransition(() => {
                            setAsFavrioteAction(imageData.public_id, false, props.path);
                        });
                    }}
                    className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer" />
            ) : (
                <Star
                    onClick={() => {
                        startTransition(() => {
                            setAsFavrioteAction(imageData.public_id, true, props.path);
                        });
                    }}
                    className="absolute top-2 right-2 hover:text-red-500 cursor-pointer" />
            )}


        </div>
    );
}