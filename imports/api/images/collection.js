import {
    FilesCollection
} from "meteor/ostrio:files"
export const Images = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: false,
    storagePath:"/home/asgaraliyev/Pictures/show-website-images",
    onBeforeUpload(file) {
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true
        }
        return 'Please upload image, with size equal or less than 10MB';
    }
})