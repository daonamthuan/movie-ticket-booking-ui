export const getFileNameFromPath = (path) => {
    const arr = path.split("/");
    const filenameWithExtension = arr[arr.length - 1];

    const filename = filenameWithExtension.split(".")[0];

    return filename;
};
