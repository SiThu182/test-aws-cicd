export const corruptSaveFileCheck = (localFile, saveFile) => {
  let getStoreData = JSON.parse(localFile);
  console.log(getStoreData, "get storedata");

  const getStoreDataLength = getStoreData?.score?.split(",")?.length;
  const saveFileLength =
    saveFile !== null && saveFile !== undefined
      ? JSON.parse(saveFile)?.score?.split(",")?.length
      : null;

  if (
    getStoreDataLength == saveFileLength ||
    saveFile == null ||
    saveFile == undefined ||
    getStoreData == null
  ) {
    return true;
  } else {
    return false;
  }
};
