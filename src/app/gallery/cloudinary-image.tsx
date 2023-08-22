"use client"

import { Star } from "@/components/icons/star"
import { FullStar } from "@/components/icons/fullstar"
import { CldImage, CldImageProps } from "next-cloudinary"
import { setAsFavrioteAction } from "./actions";
import { useState, useTransition } from "react";
import { SearchResult } from "./page";

export function CloudinaryImage(props:
    {
        imageData: SearchResult;
        onUnstar?: (unstaredResource: SearchResult) => void;
    } & Omit<CldImageProps, "src">
) {
    const [transition, startTransition] = useTransition();

    const { imageData, onUnstar } = props;

    const [isFavorite, setIsFavrioted] = useState(imageData.tags.includes("favorite"));

    return (
        <div className="relative">
            <CldImage {...props}
                src={imageData.public_id} />
            {isFavorite ? (
                <FullStar
                    onClick={() => {
                        onUnstar?.(imageData);
                        setIsFavrioted(false);
                        startTransition(() => {
                            setAsFavrioteAction(imageData.public_id, false);
                        });
                    }}
                    className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer" />
            ) : (
                <Star
                    onClick={() => {
                        setIsFavrioted(true);
                        startTransition(() => {
                            setAsFavrioteAction(imageData.public_id, true);
                        });
                    }}
                    className="absolute top-2 right-2 hover:text-red-500 cursor-pointer" />
            )}


        </div>
    );
}