import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
const RenderDropDownModal = ({
  visibility,
  setSessionType,
  handleVisibility,
}: {
  visibility: boolean;
  setSessionType: (param: string) => {};
  handleVisibility: (param: boolean) => void;
}) => {
  const handleSessionPress = (type: string) => {
    setSessionType(type);
    setShowModal(!showModal);
  };
  useEffect(() => {}, [showModal]);
  const [showModal, setShowModal] = useState(visibility);

  const {height, width} = useWindowDimensions();
  const handleShow = e => {
    e.preventDefault();
    setShowModal(!visibility);
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
              onPress={() => handleSessionPress('Past')}
              style={styles.pastSession}>
              <Text style={{textAlign: 'left'}}>Past activities</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSessionPress('Current')}
              style={styles.upcomingBtn}>
              <Text style={{textAlign: 'left'}}>Current activities</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

export default RenderDropDownModal;

const styles = StyleSheet.create({
  pastSession: {
    padding: 5,
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  upcomingBtn: {
    borderColor: 'black',
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  modalView: {
    width: horizontalScale(150),
    height: verticalScale(80),
    borderRadius: horizontalScale(20),
    position: 'absolute',
    top: verticalScale(50),
    left: horizontalScale(20),
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 20,
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(10),
    shadowColor: '#d3d3d3',
    elevation: 12,
    shadowOpacity: 1,
    shadowRadius: 6,
    gap: 20,
  },
});
