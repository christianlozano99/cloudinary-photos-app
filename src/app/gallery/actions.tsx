"use server"
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

export async function setAsFavrioteAction(publicId: String, isFavorite: boolean, path: string) {

    if (isFavorite) {
        // @ts-ignore
        await cloudinary.v2.uploader.add_tag("favorite", [publicId]);

    } else {
        // @ts-ignore
        await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    revalidatePath(path);
}