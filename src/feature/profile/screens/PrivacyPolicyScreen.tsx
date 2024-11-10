import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {Platform} from 'react-native';
import {fonts} from '../../../theme/enum';

type Props = {};

const PrivacyPolicyScreen = (props: Props) => {
  const privacyPolicy = `# Privacy Policy

  ## 1. Introduction
  
  Lodestone Healthcare Private Limited (hereinafter referred to as "Company" or "we" or "our" or "us") is involved in providing services relating to physiotherapy, nutrition, physical fitness (including physical activities, yoga and meditation and garbh sanskar) and mental wellness counselling, through its digital platform (Everheal) and digital medium (hereinafter referred to as "Platform"). In the course of providing such services, we may collect and/or otherwise gain access to certain personal information about our customers and users of the Platform (hereinafter collectively referred to as "Users" and individually as "User" or "you," "your" or "yourself").
  
  The Company is committed to protecting the privacy of its Users, in accordance with the provisions of applicable laws and regulations, including the Indian Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (hereinafter referred to as the "Data Privacy Rules"). The purpose of this Privacy Policy ("Policy") is to explain the manner in which the Company may collect and process such personal information. This Policy applies to personal information collected by the Company by any means, including personal information collected through the Platform.
  
  Unless otherwise provided under this Policy, your use of the Platform and/or services offered by the Company signifies your acceptance of the Terms of Use posted on our Platform and this Privacy Policy and your agreement to be legally bound by the same.
  
  Please note that the headings herein are included for convenience and identification only, and are not intended to describe, interpret, define, or limit the scope, extend, or intent of this Policy.
  
  ## 2. Information Collected
  
  - The Company collects personal information that is reasonably required for providing its services and carrying out its functions. In particular, the Company may collect the following types of personal information of the Users (including but not limited to):
      - Name
      - Address
      - Contact details, including email, telephone numbers, employer
      - Gender, date of birth
      - Expected due date, last menstrual period date
      - Emergency contact details
      - Storing cookies to record users' preferences and activity
  - In addition to the above, the Company may also collect such personal information which may constitute as Sensitive Personal Data or Information ("SPDI") under the applicable laws, such as:
      - Passwords for accounts created on websites and/or mobile applications maintained by the Company
  
  The Company does not collect any other categories of SPDI and asks that you do not share your SPDI with the Company and/or its employees or representatives. The Company may, however, collect your feedback in relation to its products and/or services availed by you and also request you to provide the reasons/circumstances due to which you availed of such products and/or services. In case you choose to divulge any SPDI, such as medical information, information relating to your mental health condition, etc., as a part of the feedback provided by you to the Company, you hereby agree to the use and processing of such information by the Company in accordance with the terms of this Privacy Policy.
  
  At any time while availing the services provided by the Company, you will have the option to withdraw your consent to the use/disclosure/retention of such SPDI, provided that the same is communicated to the Company in writing. In such an event, the Company will be entitled to immediately terminate the services offered and/or your access to the Platform.
  
  ## 3. Processing of Personal Information
  
  The Company will only use your personal information in a fair and reasonable manner and where it has a lawful reason to do so. The Company's use of your personal information depends on the purpose for which you access the Platform and/or the nature of the Company products and/or services availed by you. The Company may use or process personal information for the following purposes:
  
  - For providing services requested and to contact you in relation to the same and when otherwise necessary
  - For sending you further communication/recommendations relating to our products and/or services
  - Improving the Platform and its content to provide better features and services
  - For compliance with internal policies and procedures of the Company
  
  ## 4. Disclosure & Transfer
  
  The Company discloses your personal information only to such employees and representatives who it reasonably believes need that information to fulfill their duties and to provide the products and/or services sought. The Company will not disclose, transfer or share your personal information with any third parties, other than with:
  
  - Third parties to perform functions and provide services to the Company, including, without hosting and maintenance, database storage and management, payment transaction services, etc. We will share your personal information with these third parties, but only to the extent necessary to perform their functions and for providing their services.
  - Our affiliates to the extent required for our internal business and/or administrative purposes and/or general operations and for the provision of services
  - Government agencies in limited circumstances, including when complying with legal process, for verification of identity, or for preventing, detecting, investigating and for prosecution and punishment of incidents including cyber incidents, fraud or imminent harm, and ensuring the security of our network and services
  - To establish or respond to a legal claim against the Company
  - Courts, tribunals, and other authorities pursuant to orders issued by them or pursuant to mandate under law
  
  ## 5. Advertising
  
  We may provide our analysis and information relating to the use of the Platform made by you and other users (who may in turn use this information to provide advertisements tailored to your interests). Please note that advertisers that serve advertisements on the Platform may also use their own cookies and other technological tools which are subject to such advertiser's privacy policies, not this Policy.
  
  ## 6. Data Security
  
  The Company has implemented appropriate security practices and procedures designed to protect your personal information from accidental or unlawful destruction, loss, damage, alteration, unauthorized disclosure, unauthorized access, unauthorized use, etc. in accordance with applicable law. Please ensure that any personal information that you share with the Company is shared securely.
  
  ## 7. Access and Accuracy
  
  You have a right to review, update, and correct your personal information that the Company holds. Should you need to update or correct any Personal Information provided by you, please contact the Company's Grievance Officer whose details are provided below, and we will make reasonable efforts to incorporate the changes in your personal information that we hold, as soon as practicable.
  
  ## 8. Unsolicited Information
  
  The Company may receive personal information about Users or other persons that it has not actively sought to collect. If permitted or required by law, the Company may keep records of this information. If not, we will destroy or de-identify the information when practicable, lawful, and reasonable to do so.
  
  ## 9. Changes to the Privacy Policy
  
  The Company may amend or modify the terms of this Policy from time to time, without notice. You should, therefore, review the Privacy Policy, from time to time. Any changes will be effective immediately upon the posting of the revised Privacy Policy.
  
  ## 10. Grievances and Complaints
  
  In case of any grievances or complaints in relation to the processing of your personal information by the Company, the same may be addressed to the Company's Grievance Team at the following address: [info@everheal.com.](mailto:info@everheal.com)
  `;
  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          height: '100%',
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Markdown style={styles}>{privacyPolicy}</Markdown>
        <View style={{height: 100}}></View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  body: {
    fontFamily: fonts.SecondaryDMSansMedium,
  },

  // Headings
  heading1: {
    flexDirection: 'row',
    fontSize: 32,
    paddingVertical: 5,
  },
  heading2: {
    flexDirection: 'row',
    fontSize: 24,
    paddingVertical: 5,
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 18,
    paddingVertical: 5,
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 16,
    paddingVertical: 5,
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 13,
    paddingVertical: 5,
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 11,
    paddingVertical: 5,
  },

  // Horizontal Rule
  hr: {
    backgroundColor: '#000000',
    height: 1,
  },

  // Emphasis
  strong: {
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
  s: {
    textDecorationLine: 'line-through',
  },

  // Blockquotes
  blockquote: {
    backgroundColor: '#F5F5F5',
    borderColor: '#CCC',
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5,
  },

  // Lists
  bullet_list: {},
  ordered_list: {},
  list_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_content: {
    flex: 1,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_content: {
    flex: 1,
  },

  // Code
  code_inline: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  code_block: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  fence: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
  },

  // Links
  link: {
    textDecorationLine: 'underline',
  },
  blocklink: {
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },

  // Images
  image: {
    flex: 1,
  },

  // Text Output
  text: {},
  textgroup: {},
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  hardbreak: {
    width: '100%',
    height: 1,
  },
  softbreak: {},

  // Believe these are never used but retained for completeness
  pre: {},
  inline: {},
  span: {},
});
