import {StyleSheet, View} from 'react-native';
import React from 'react';
import CommonIssueDropDown from './CommonIssueDropDown';
import {issueObjectType} from '../types';

type IssuesContainerProps = {
  issues: issueObjectType[];
};

const IssuesContainer = ({issues}: IssuesContainerProps) => {
  return (
    <View>
      {issues.map((category: issueObjectType) => {
        return (
          <CommonIssueDropDown
            issueName={category.title}
            issueList={category.issues}
          />
        );
      })}
    </View>
  );
};

export default IssuesContainer;

const styles = StyleSheet.create({});
