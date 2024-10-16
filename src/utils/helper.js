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

// Capital first letter of each word
export const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Capital first letter of each word
export const capitalizeFirstLetterEachWord = (text) => {
    return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

// Get video id from url
export const getVideoIdFromTrailerUrl = (trailerUrl) => {
    let videoId = trailerUrl.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }

    return videoId;
};
