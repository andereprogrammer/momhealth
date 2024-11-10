import React from 'react';
import { Image, View, ImageStyle, StyleSheet, ImageResizeMode } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ImageProps = {
    extraImageStyles: ImageStyle;
    banner: boolean;
    hostImageUrl: string;
    defaultSource?: number | undefined;
    resizeMode?: ImageResizeMode;
}

export const ImageContainer = ({ extraImageStyles, banner, hostImageUrl, defaultSource, resizeMode }: ImageProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.imageContainer,{paddingTop:!banner ? insets.top: undefined}]}>
            <Image defaultSource={defaultSource} source={{uri: hostImageUrl}} style={[styles.imageStyle, extraImageStyles, { top: banner ? styles.imageStyle.top : insets.top + (banner ? 36 : 0) }]} resizeMode={resizeMode ?? 'stretch'} />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: { width: '45%', borderTopRightRadius: 8, borderBottomRightRadius: 8 },
    imageStyle: { height: '108%', width: '100%', position: 'absolute', top: '-8%' },
});

export default ImageContainer;