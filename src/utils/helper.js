export const getFileNameFromPath = (path) => {
    const arr = path.split("/");
    const filenameWithExtension = arr[arr.length - 1];

    const filename = filenameWithExtension.split(".")[0];

    return filename;
};

export const formatVND = (amount) => {
    // remove char isn't digits
    const cleanedAmount = amount.toString().replace(/[^\d]/g, "");
    if (!cleanedAmount) return "";

    return cleanedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};
