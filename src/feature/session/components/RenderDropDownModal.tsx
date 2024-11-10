import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
const RenderDropdownModal = ({
  visibility,
  setSessionType,
  handleVisibility,
}: {
  visibility: boolean;
  setSessionType: (param: string) => void;
  handleVisibility: (param: boolean) => void;
}) => {
  const handleSessionPress = (type: string) => {
    setSessionType(type);
  };
  useEffect(() => {}, [showModal, visibility]);
  const [showModal, setShowModal] = useState(visibility);

  const {height, width} = useWindowDimensions();
  const handleShow = e => {
    e.preventDefault();
    setShowModal(!showModal);
    handleVisibility(!visibility);
  };

  return (
    <>
      {showModal ? (
        <TouchableOpacity
          onPress={e => handleShow(e)}
          activeOpacity={1}
          style={{
            height: height,
            position: 'absolute',
            top: 0,
            zIndex: 1,
            width: width,
          }}>
          <View style={styles.modalView}>
            <TouchableOpacity
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
              onPress={() => handleSessionPress('Upcoming')}
              style={styles.upcomingBtn}>
              <Text>Upcoming sessions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
              onPress={() => handleSessionPress('Past')}
              style={styles.pastSession}>
              <Text>Past sessions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
              onPress={() => handleSessionPress('Unbooked')}
              style={styles.personal}>
              <Text>Schedule a session</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

export default RenderDropdownModal;

const styles = StyleSheet.create({
  pastSession: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  upcomingBtn: {
    borderColor: 'black',
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  personal: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  modalView: {
    width: horizontalScale(150),
    height: verticalScale(120),
    borderRadius: horizontalScale(20),
    position: 'absolute',
    top: Platform.OS === 'android' ? verticalScale(80) : verticalScale(150),
    left: horizontalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(10),
    shadowColor: '#d3d3d3',
    elevation: 12,
    shadowOpacity: 1,
    shadowRadius: 6,
    gap: 30,
  },
});
