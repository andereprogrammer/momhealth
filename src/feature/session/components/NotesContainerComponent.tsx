import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';
import SessionNotesCard from '../../careteam/components/SessionNotesCard';

type Props = {
  notes: any;
};

const NotesContainerComponent = (props: Props) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.textHeading}>Session notes</Text>
      {props.notes !== null &&
        props.notes.length !== 0 &&
        props.notes
          .map(note => {
            return {
              id: note.id,
              title: note.title,
              description: note.description,
              date: note.created,
              created_by_user: note.created_by_user,
              session: note.session,
              has_read: note.has_read,
            };
          })
          .map(note => {
            return (
              <SessionNotesCard
                key={note.id}
                note={note}
                landedFrom="SessionScreen"
              />
            );
          })}
    </View>
  );

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       backgroundColor: theme.colors.inputBg,
  //       borderRadius: 15,
  //       marginHorizontal: horizontalScale(10),
  //       paddingVertical: verticalScale(10),
  //       marginVertical: verticalScale(10),
  //     }}>
  //     <View
  //       style={{
  //         width: '95%',
  //         paddingHorizontal: horizontalScale(20),
  //         paddingBottom: 5,
  //       }}>
  //       <Text
  //         style={{
  //           fontFamily: fonts.PrimaryJakartaBold,
  //           fontSize: 14,
  //         }}>
  //         Session notes
  //       </Text>
  //     </View>
  //     {props.notes !== undefined &&
  //       props.notes.map(notes => {
  //         return (
  //           <SessionNotesComponent
  //             title={notes.title}
  //             message={notes.description}
  //           />
  //         );
  //       })}
  //   </View>
  // );
};

export default NotesContainerComponent;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    paddingBottom: verticalScale(40),
  },
  textHeading: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
    fontSize: 14,
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(5),
  },
});
