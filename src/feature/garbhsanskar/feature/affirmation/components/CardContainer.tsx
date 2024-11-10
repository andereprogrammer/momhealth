import React, { ForwardedRef, forwardRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { CardContainerProps, CardProps, MusicList } from '../interfaces';
import NextButton from './NextButton';
import WeekDetails from './WeekDetails';
import { AffirmationCard1 } from '../../../../../assets';
import { fonts, Pallete } from '../../../../../theme/enum';
import Shimmer from '../../../../../components/SkeletonComponent/Shimmer';

const { width, height } = Dimensions.get('window');

const Card = ({ item }: CardProps) => {
    return (
        <ImageBackground
            resizeMode='stretch'
            imageStyle={styles.cardBackgroundImageStyle}
            source={{ uri: item?.background_image_link }}
            style={styles.cardBackgroundStyle}
        >
            <Text style={styles.affirmationTextContent}>{item.affirmation}</Text>
        </ImageBackground>
    );
}

const CardContainer = forwardRef<Swiper<any>, CardContainerProps>(({
    currentWeekData,
    week,
    length,
    setCardIndex,
    cardIndex,
    loading,
}, swipeRef) => {
    const onSwipeRight = () => {
        if (!loading) {
            (swipeRef as unknown as Swiper<string>).swipeRight()
            setCardIndex(cardIndex + 1 === length ? length : (cardIndex + 1) % length)
        }
    };
    const swipeLeft = () => {
        if (!loading) {
            (swipeRef as unknown as Swiper<string>).swipeLeft()
            setCardIndex(cardIndex - 1 === 0 ? length : cardIndex - 1)
        }
    };
    return (
        <>
            <WeekDetails week={week} onPrevious={swipeLeft} loading={loading} />
            {!loading && currentWeekData?.length > 0 ?
                <View style={[styles.container, { marginTop: 16 + (15 * currentWeekData?.length - 1) }]}>
                    <Swiper
                        ref={swiper => { swipeRef = (swiper as ForwardedRef<Swiper<string>>) }}
                        containerStyle={styles.swiperContainer}
                        cards={currentWeekData}
                        renderCard={(item, index) => <Card item={item} />}
                        disableBottomSwipe={true}
                        disableTopSwipe={true}
                        disableLeftSwipe={true}
                        infinite={true}
                        onSwipedRight={() => { setCardIndex(cardIndex + 1 === length ? length : (cardIndex + 1) % length) }}
                        cardIndex={0}
                        backgroundColor={'transparent'}
                        stackSize={currentWeekData?.length}
                        cardVerticalMargin={0}
                        cardHorizontalMargin={0}
                        overlayOpacityHorizontalThreshold={0}
                        stackSeparation={-15}
                        stackScale={0}
                    >
                    </Swiper>
                </View> : <Shimmer width={width - 32} height={height * 0.5} />
            }
            <View style={styles.descriptionContainer}>
                <View style={styles.columnContainer}>
                    {loading && length === null ?
                        <Shimmer width={100} height={20} customStyle={{ borderRadius: 0 }} /> :
                        <Text style={styles.swipeText}>Swipe right for next</Text>
                    }
                    {loading && length === null ?
                        <Shimmer width={100} height={20} customStyle={{ borderRadius: 0 }} /> :
                        <Text style={styles.affirmationText}>Affirmation {cardIndex} of {length}</Text>
                    }
                </View>
                <TouchableOpacity onPress={onSwipeRight} style={styles.nextContainer}>
                    {loading && length === null ? <Shimmer width={64} height={64} customStyle={{ borderRadius: 32 }} /> : <NextButton />}
                </TouchableOpacity>
            </View>
        </>
    );
})

const styles = StyleSheet.create({
    container: {
        width: width - 32,
        height: height * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swiperContainer: {
        width: '100%',
        height: '100%'
    },
    cardBackgroundImageStyle: {
        borderRadius: 12,
        width: width - 32,
        height: height * 0.5
    },
    cardBackgroundStyle: {
        backgroundColor: 'transparent',
        borderTopStartRadius: 20,
        width: width - 32,
        justifyContent: "center",
        height: height * 0.5,
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    descriptionContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 64
    },
    columnContainer: {
        justifyContent: 'space-between'
    },
    swipeText: {
        textAlign: 'center',
        fontFamily: fonts.SecondaryDMSansBold,
        fontSize: 12,
        color: Pallete.whiteBackground,
    },
    affirmationText: {
        textAlign: 'center',
        fontFamily: fonts.SecondaryDMSansBold,
        fontSize: 16,
        color: '#ffde91'
    },
    nextContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 64,
        width: 64,
        borderRadius: 32,
        borderWidth: 3,
        borderColor: '#812EA1',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Pallete.whiteBackground,
    },
    affirmationTextContent: { 
        textAlign: 'center', 
        maxWidth: '90%', 
        fontFamily: fonts.PrimaryJakartaExtraBold, 
        fontSize: 28, 
        color: Pallete.whiteBackground, 
    }
});

export default CardContainer;