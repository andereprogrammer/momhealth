import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { verticalScale } from '../../../../../helpers/layoutHelper';
import { fonts, Pallete } from '../../../../../theme/enum';
import { WeekProps } from '../interfaces';
import Shimmer from '../../../../../components/SkeletonComponent/Shimmer';

const WeekDetails = ({ week, onPrevious, loading }: WeekProps) => {
    if(!loading && week) 
    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.weekText}>Week {week}</Text>
            </View>
            <TouchableOpacity onPress={onPrevious} style={styles.detailsContainer}>
                <Text style={styles.weekText}>Previous</Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <Shimmer customStyle={styles.shimmerContainer} width={70} height={38}/>
            <Shimmer customStyle={styles.shimmerContainer} width={70} height={38}/>
        </View>
    );
}

const styles = StyleSheet.create({
    shimmerContainer: {
        marginTop: verticalScale(24),
        width: 70,
        borderRadius: 8,
        backgroundColor:'grey'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailsContainer: {
        marginTop: verticalScale(24),
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7802B4',
        width: 70,
        borderRadius: 8
    },
    weekText: {
        fontFamily: fonts.SecondaryDMSansBold,
        fontSize: 14,
        color: Pallete.whiteBackground,
    }
});

export default WeekDetails;