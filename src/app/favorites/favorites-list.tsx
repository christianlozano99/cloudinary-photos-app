"use client"

import { useEffect, useState } from "react";
import { CloudinaryImage } from "../gallery/cloudinary-image";
import { SearchResult } from "../gallery/page";
import { ImageGrid } from "@/components/image-grid";
import { Result } from "postcss";

export default function FavoritesList({ initialResources }: { initialResources: SearchResult[] }) {

    const [resources, setResources] = useState(initialResources);

    useEffect(() => {
        setResources(initialResources);
    }, [initialResources]);

    return (

        <ImageGrid
            images={resources}
            getImage={(imageData: SearchResult) => {
                return (<CloudinaryImage
                    key={imageData.public_id}
                    imageData={imageData}
                    width="400"
                    height="300"
                    alt="an image of something"
                    onUnstar={(unstaredResource) => {
                        setResources(currentResources => {
                            return currentResources.filter(resource => {
                                return resource.public_id !== unstaredResource.public_id;
                            })
                        })
                    }}
                />);
            }}
        />

    );
}