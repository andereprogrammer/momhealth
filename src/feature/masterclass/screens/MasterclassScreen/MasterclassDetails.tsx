import React, { useState } from 'react';
import {
    FlatList,
    ImageBackground,
    ImageStyle,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import EventDetails from '../../../../components/MasterclassBanner/EventDetails';
import ImageContainer from '../../../../components/MasterclassBanner/ImageContainer';
import { BackBtn, MasterclassScreenBackground, MasterclassStaticBanner } from '../../../../assets';
import ImageWithView from '../../../../components/ImageWithView';
import { fonts, Pallete } from '../../../../theme/enum';
import { NavEventProps } from '../../../../components/MasterclassBanner';
import Shimmer from '../../../../components/SkeletonComponent/Shimmer';

const { width } = Dimensions.get('window')

type EventProps = {
    loading: boolean;
    mergeHeader: boolean;
    top: number;
    eventDetails: NavEventProps;
    hostImageUrl: string;
    bannerImageUrl: string;
    hostCredentials: string[];
    staticBanner?: boolean;
}

const Header = ({ secondaryTint, extraTextStyles }: { secondaryTint?: any, extraTextStyles?: any }) => {
    const navigation = useNavigation<NavigationProp<any, any>>()
    const onBackPress = () => navigation.goBack()
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onBackPress}>
                <ImageWithView
                    isLocalImage
                    width={24}
                    height={24}
                    imageSource={BackBtn}
                    tintColor={secondaryTint ?? Pallete.whiteBackground}
                />
            </TouchableOpacity>
            <Text style={[styles.headingText, extraTextStyles]}>
                Pregnancy Masterclass Series
            </Text>
        </View>
    );
}

const Description = ({ item }: { item: string }) => {
    return (
        <View style={styles.descriptionContainer}>
            <View style={styles.credentialContainer} />
            <Text style={styles.credentialText}>{item}</Text>
        </View>
    );
}

const MasterclassDetails = ({
    loading,
    mergeHeader,
    top,
    hostImageUrl,
    bannerImageUrl,
    hostCredentials,
    staticBanner,
    ...eventDetails
}: EventProps) => {
    const [loaded, setLoaded] = useState(false);
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.body}>
            {bannerImageUrl?.length && <View style={[styles.bannerContainer, styles.bannerExtraStyles]}>
                <ImageBackground
                    onLoad={() => setLoaded(true)}
                    source={{ uri: bannerImageUrl }}
                    style={styles.imageBackgroundStyle}>
                    {!loaded ? <Shimmer width={'100%'} height={200} /> : null}
                    {mergeHeader ? <View style={[styles.insetsContainer, { top }]}>
                        <Header />
                    </View> : null}
                    {loaded && hostImageUrl ?
                        <>
                            <EventDetails banner={false} {...eventDetails} />
                            <ImageContainer
                                defaultSource={undefined}
                                hostImageUrl={hostImageUrl}
                                extraImageStyles={styles.bannerImageExtraStyles as ImageStyle}
                                banner={false} />
                        </> : null}
                </ImageBackground>
            </View>}
            {typeof bannerImageUrl !== 'string' || bannerImageUrl?.length === 0 ?
                <View style={{ paddingTop: insets.top }}>
                    <LinearGradient useAngle angle={45} style={styles.headerGradient} colors={['#FFD6DD', '#C5ABF0']}>
                        <Header />
                    </LinearGradient>
                    <ImageBackground
                        source={MasterclassStaticBanner}
                        style={styles.staticBackground} />
                </View>: null}
            {!loading && hostCredentials?.length ? <View style={styles.backgroundContainer}>
                <ImageBackground
                    resizeMode='stretch'
                    style={[styles.imageBackground, { paddingBottom: 7.2 * hostCredentials.length + 12 }]}
                    source={MasterclassScreenBackground}>
                    <FlatList
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                        nestedScrollEnabled data={hostCredentials}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={Description} />
                </ImageBackground>
            </View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        alignItems: 'center',
    },
    headingText: {
        marginLeft: 16,
        color: Pallete.darkBlack,
        fontFamily: fonts.PrimaryJakartaMedium,
        fontSize: 16,
    },
    body: {
        flex: 1,
        backgroundColor: Pallete.whiteBackground,
    },
    imageContainer: {
        width: '40%',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    container: {
        flex: 1,
        backgroundColor: Pallete.whiteBackground
    },
    scrollContainer: {
        height: '90%',
        backgroundColor: Pallete.whiteBackground
    },
    backgroundContainer: { flex: 1 },
    bannerExtraStyles: {
        width,
        minHeight: width / 2
    },
    bannerImageExtraStyles: {
        top: 0,
        height: '100%'
    },
    imageBackground: {
        width,
        paddingVertical: 16,
        paddingHorizontal: 20
    },
    separator: { height: 12 },
    footerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: Pallete.whiteBackground
    },
    footerHeading: {
        marginBottom: 16,
        fontFamily: fonts.SecondaryDMSansBold,
        fontSize: 25,
        color: Pallete.black
    },
    previousMasterclassContainer: { width: '100%', flexDirection: 'row' },
    hostDetailsContainer: {
        maxWidth: '60%',
        width: '60%',
        paddingTop: 12,
        paddingLeft: 12,
        paddingBottom: 4
    },
    primaryText: {
        fontFamily: fonts.SecondaryDMSansMedium,
        fontSize: 14,
        color: Pallete.whiteBackground,
        marginBottom: 4
    },
    dateText: {
        fontFamily: fonts.SecondaryDMSansRegular,
        fontSize: 10,
        color: Pallete.whiteBackground
    },
    detailsContainer: {
        marginTop: 12,
        marginBottom: 28,
        height: 72
    },
    hostName: {
        fontFamily: fonts.SecondaryDMSansMedium,
        fontSize: 16,
        color: Pallete.whiteBackground,
        marginBottom: 4
    },
    hostDesignation: {
        fontFamily: fonts.SecondaryDMSansRegular,
        fontSize: 12,
        color: Pallete.whiteBackground
    },
    playContainer: {
        width: 20,
        height: 20,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Pallete.whiteBackground,
        position: 'absolute',
        bottom: 4,
        left: 4
    },
    durationContainer: {
        position: 'absolute',
        right: 4,
        bottom: 4,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.30)'
    },
    durationText: {
        fontFamily: fonts.PrimaryJakartaBold,
        color: Pallete.whiteBackground,
        fontSize: 14
    },
    bannerContainer: {
        width: width - 32,
        minHeight: (width - 32) / 2,
        borderRadius: 8
    },
    imageBackgroundStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    insetsContainer: {
        position: 'absolute',
        zIndex: 200
    },
    credentialContainer: {
        width: 4.8,
        height: 4.8,
        borderRadius: 9.6,
        backgroundColor: Pallete.PinkHopbrush,
        marginRight: 8
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    credentialText: {
        fontFamily: fonts.PrimaryJakartaBold,
        fontSize: 14,
        color: Pallete.PinkHopbrush,
        marginBottom: 2.5
    },
    headerGradient: { paddingVertical: 12 },
    staticBackground: { width, aspectRatio: 2 }
})
export default MasterclassDetails;