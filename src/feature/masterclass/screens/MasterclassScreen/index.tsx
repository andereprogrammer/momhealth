import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    FlatList, 
    ScrollView, 
    TouchableOpacity, 
    ImageBackground, 
    TextStyle
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
    NavigationProp, 
    useIsFocused, 
    useNavigation, 
    useRoute 
} from '@react-navigation/native';
import { BackBtn, MasterclassScreenBackground } from '../../../../assets';
import ImageWithView from '../../../../components/ImageWithView';
import { Pallete, fonts } from '../../../../theme/enum';
import { getAllMasterclassDetails } from '../../../../api/homeapis';
import { NavEventProps } from '../../../../components/MasterclassBanner';
import PreviousMasterclass, { PreviousSessionItem } from './PreviousMasterclass';
import MasterclassDetails from './MasterclassDetails';
import Shimmer from '../../../../components/SkeletonComponent/Shimmer';

interface HeaderProps {
    secondaryTint? : string;
    extraTextStyles? : TextStyle;
}

const { width, height } = Dimensions.get('window');

const handleScroll = (event:any,setMergeHeader:any) => {
    if(event.nativeEvent.contentOffset.y === 0) setMergeHeader(true)
        else setMergeHeader(false)
  }

const Header = ({secondaryTint,extraTextStyles}: HeaderProps) => {
    const navigation =  useNavigation<NavigationProp<any,any>>()
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
            <Text style={[styles.headingText,extraTextStyles]}>
                Pregnancy Masterclass Series
            </Text>
        </View>
    );
}

const PreviousMasterclassContainer = ({previousData}:{previousData:Array<PreviousSessionItem>}) => {
    if(previousData.length > 0)
    return (
        <View style={styles.footerContainer}>
            <Text style={styles.footerHeading}>Previous Masterclass</Text>
            <FlatList
                initialNumToRender={2}
                style={{backgroundColor:Pallete.whiteBackground}}
                nestedScrollEnabled
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                data={previousData}
                keyExtractor={(item,index) => index}
                renderItem={({item})=><PreviousMasterclass item={item}/>} 
                getItemLayout={(data, index) => ({
                    length: height * 0.3,
                    offset: height * 0.3 * index,
                    index,
                  })}/>
        </View>
    );
    return null;
}

const Description = () => {
    return (
        <Shimmer variant='box' height={16} width={width-48}/>
    );
}

const MasterclassScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<any, any>>();
    const route = useRoute();
    const focused = useIsFocused(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mergeHeader, setMergeHeader] = useState(true);
    const [previousData, setPreviousData] = useState([]);

    useEffect(() => {
        if (navigation.isFocused()) {
            setLoading(true);
            setError(false);
            getAllMasterclassDetails().then((res) => {
                console.log('Resp', res)
                setPreviousData(res.data);
                setLoading(false);
                setError(false);
            }).catch((err) => {
                setLoading(false);
                setError(true);
            })
        }
    }, [focused])

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <LinearGradient 
                colors={[Pallete.PastelPink, Pallete.BilobaViolet]} 
                style={[styles.insetsContainer, styles.loaderGradient, {top: insets.top}]}>
                    <Header />
                </LinearGradient>

                <ScrollView 
                scrollEventThrottle={16} 
                onScroll={(event) => handleScroll(event, setMergeHeader)} 
                nestedScrollEnabled bounces={false}>
                <Shimmer variant='box' width={width} height={250}/>
                <ImageBackground
                    resizeMode='stretch'
                    style={styles.imageBackground}
                    source={MasterclassScreenBackground}>
                    <FlatList
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                        nestedScrollEnabled data={[0,0]}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={Description} />
                </ImageBackground>
                <View style={styles.separator} />

               <Shimmer 
               variant='box' 
               width={width-48} 
               height={20} 
               customStyle={styles.customShimmerStyle}/>

               <View style={styles.separator} />
                <Shimmer 
                variant='box' 
                width={width-48} 
                height={80} 
                customStyle={styles.customShimmerStyle}/>

                <View style={styles.separator} />
                <Shimmer 
                variant='box' 
                width={width-48} 
                height={80} 
                customStyle={styles.customShimmerStyle}/>

                <View style={styles.separator} />
                <Shimmer 
                variant='box' 
                width={width-48} 
                height={80} 
                customStyle={styles.customShimmerStyle}/>
            </ScrollView>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {!mergeHeader ? 
            <View style={styles.headerContainerStyle}>
                <View style={{paddingTop: insets.top, width}}>
                <Header 
                secondaryTint={Pallete.darkBlack} 
                extraTextStyles={styles.extraHeaderStyles} />
                </View>
            </View>: null}
            <ScrollView 
            scrollEventThrottle={16} 
            onScroll={(event) => handleScroll(event, setMergeHeader)} 
            nestedScrollEnabled bounces={false}>
                <MasterclassDetails 
                mergeHeader={mergeHeader} 
                hostCredentials={route?.params?.hostCredentials} 
                bannerImageUrl={route?.params?.bannerImageUrl as string} 
                hostImageUrl={route?.params?.hostImageUrl as string} 
                loading={loading || error} 
                top={insets.top} 
                staticBanner={route?.params?.staticBanner as boolean}
                {...route?.params?.eventDetails as NavEventProps}/>
                {!(loading || error) ? 
                <>
                <View style={styles.separator} />
                    <PreviousMasterclassContainer previousData={previousData}/>
                </> : null}
            </ScrollView>
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
        color: Pallete.whiteBackground,
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
        paddingHorizontal: 20, 
        paddingBottom: 14.4 
    },
    separator: { height: 12 },
    footerContainer: { 
        paddingHorizontal: 20, 
        paddingBottom: 24, 
        backgroundColor:Pallete.whiteBackground 
    },
    footerHeading: { 
        marginBottom: 16, 
        fontFamily: fonts.SecondaryDMSansBold, 
        fontSize: 25, color: Pallete.black 
    },
    previousMasterclassContainer: { 
        width: '100%', 
        flexDirection: 'row' 
    },
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
        height:72 
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
    customShimmerStyle: {marginLeft: 24},
    headerContainerStyle: { 
        zIndex: 300, 
        position:'absolute', 
        backgroundColor: Pallete.whiteBackground 
    },
    extraHeaderStyles: { color: Pallete.darkBlack },
    loaderGradient: { 
        flex: 1, 
        paddingVertical: 12, 
        width: '100%' 
    }
})
export default MasterclassScreen;