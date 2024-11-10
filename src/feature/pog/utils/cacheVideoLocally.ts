import convertToProxyURL from 'react-native-video-cache';
export const cacheVideo = async url => {
  if (url) {
    return convertToProxyURL(url);
  }
  // try {
  //   const cacheDir = `${RNFS.CachesDirectoryPath}/videos`;
  //   const fileName = url.split('/').pop();
  //   const filePath = `${cacheDir}/${fileName}`;

  //   const fileExists = await RNFS.exists(filePath);
  //   if (fileExists) {
  //     return filePath;
  //   }

  //   await RNFS.mkdir(cacheDir);

  //   const downloadResult = await RNFS.downloadFile({
  //     fromUrl: url,
  //     toFile: filePath,
  //   }).promise;

  //   if (downloadResult.statusCode === 200) {
  //     return filePath;
  //   } else {
  //     throw new Error('Failed to download video');
  //   }
  // } catch (error) {
  //   console.error('Error caching video:', error);
  //   return null;
  // }
};
