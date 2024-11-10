import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PrerequisiteBox from '../../session/components/PrerequisiteBox';
import {stylesRequirements} from '../../session/components/SessionPrerequisitesComponent';

type Props = {
  requirements: any;
};

const RequirementsComponent = (props: Props) => {
  return (
    <View style={stylesRequirements.container}>
      <Text style={stylesRequirements.textHeading}>Requirements</Text>
      <View style={stylesRequirements.listContainer}>
        {props.requirements?.length > 0 ? (
          props.requirements.map((requisite, index) => {
            return <PrerequisiteBox key={index} requisite={requisite} />;
          })
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default RequirementsComponent;

const styles = StyleSheet.create({});
