"use server"
import cloudinary from "cloudinary";

export async function setAsFavrioteAction(publicId: String, isFavorite: boolean) {

    if (isFavorite) {
        // @ts-ignore
        await cloudinary.v2.uploader.add_tag("favorite", [publicId]);

    } else {
        // @ts-ignore
        await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
    }
}