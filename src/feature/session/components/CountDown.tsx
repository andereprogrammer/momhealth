import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {
  getDateTimeInfo,
  ReturnTypeDate,
  DateTimeInfo,
} from '../helpers/getDatetimeValues';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

interface CountdownProps {
  appointmentTime: string;
  returnType: ReturnTypeDate;
  status: string;
}

const Countdown: React.FC<CountdownProps> = ({
  appointmentTime,
  returnType,
  status,
}) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [countdownInfo, setCountdownInfo] = useState<
    DateTimeInfo | boolean | undefined
  >(undefined);

  useEffect(() => {
    console.log(status);
    let timer: NodeJS.Timeout;

    const updateRemainingTime = () => {
      const dateTimeInfo = getDateTimeInfo(appointmentTime, 'countdown');
      console.log(dateTimeInfo);
      setCountdownInfo(dateTimeInfo);

      if (typeof dateTimeInfo === 'string') {
        const countdownInSeconds = parseInt(dateTimeInfo);
        setRemainingTime(countdownInSeconds);
      } else {
        setRemainingTime(0);
      }
    };

    updateRemainingTime();

    if (remainingTime > 0) {
      timer = setInterval(updateRemainingTime, 1000);
    }
    console.log('info', countdownInfo);

    return () => {
      clearInterval(timer);
    };
  }, [appointmentTime, remainingTime]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  if (countdownInfo === false && status === 'ASSIGNED') {
    // Invalid countdown, handle accordingly
    return <Text>No valid countdown available</Text>;
  }

  if (typeof countdownInfo === 'object') {
    // Future time, different day
    const {date, time} = countdownInfo;
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: '#FFF2D1',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          width: '90%',
          flexDirection: 'row',
          borderRadius: horizontalScale(10),
          bottom: verticalScale(7),
          left: horizontalScale(17),
        }}>
        <Text style={{fontFamily: 'DMSans-Bold', fontSize: 12}}>
          Session will be on:
        </Text>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            fontSize: 12,
          }}>
          {date}, {time}
        </Text>
      </View>
    );
  } else if (countdownInfo === false) {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: '#FFF2D1',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          width: '90%',
          flexDirection: 'row',
          borderRadius: horizontalScale(10),
          bottom: 0,
        }}>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            fontSize: 12,
            color: '#000',
          }}>
          {/* Countdown: {formatTime(remainingTime)} */}
          No valid countdown available
        </Text>
      </View>
    );
  }
};

export default Countdown;
