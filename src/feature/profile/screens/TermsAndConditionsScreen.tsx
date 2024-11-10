import {StyleSheet, View, Platform} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {fonts} from '../../../theme/enum';

type Props = {};

const TermsAndConditionsScreen = (props: Props) => {
  const termsAndConditions = `# Terms and Conditions

  Please read the below medical waiver and disclaimers carefully before using the Platform oraccessing any material, information or Platform Services through the Platform.
  
  ## Our Services
  
  Please note that the headings herein are included for convenience and identification only, and arenot intended to describe, interpret, define or limit the scope, extend or intend of these Terms.
  
  You acknowledge that the Platform allows you to avail services directly from the Company as well as from various consultants engaged by the Company. We offer services through an online mode through third party video conferencing platforms. The services available on the Platform are listed below:
  
  -   Procurement and / or generation, reproduction on the Platform, sharing with relevant Consultants (defined below) for you, if applicable, and communication to you of (i) your indicative usage and / or consumption data of Platform Services (defined below); and (ii) any documents or data generated from your purchase and / or usage and / or consumption of aforementioned services, separately as well as jointly with other services listed on the Platform, including transaction summaries, invoices, reports, scores, achievements, etc.(“Diverse Services”);
  
  Physiotherapy, Yoga, Garbh Sanskar, Counselling, Lactation Consultation and other allied services as deemed necessary by the Company shall be collectively referred to as “Platform Services” and shall be provided by the Company and/or third-party consultants with whom the Company has contractual arrangements (“Consultants”);
  
  In the interest of your physical and mental wellbeing, you understand and acknowledge that:
  
  -   Inherent risks: The Platform Services offered herein, by their very nature, include certain inherent risks that cannot be eliminated regardless of the care taken to avoid injuries and/or any kind of losses. You hereby assert that your participation is voluntary and that you knowingly assume all such risks and hence hereby release the Released Party (as defined below) of all liability arising out of such aforementioned risks;
  -   Illness/Injury: The Platform Services offered herein, by their very nature, include certain inherent risks that cannot be eliminated regardless of the care taken to avoid injuries and/or any kind of losses. You hereby assert that your participation is voluntary and that you knowingly assume all such risks and hence hereby release the Released Party (as defined below) of all liability arising out of such aforementioned risks;
  -   You will not participate in the Platform Services under the influence of heavy medication, drugs, alcohol or other mood-altering substances, or undertake the exercises/training offered through our Services while driving or operating any machinery.
  -   Consultation by physician/healthcare provider:
  -   You would consult your physician or health care provider before enrolling for the Platform Services offered by us/ booking our classes, in the event you are or expect/suspect to (a) be pregnant, or (b) wear a pacemaker, or (c) suffer from epilepsy or seizures, or (d) have a history of mental illness, or (e) have eating disorder, or (f) have diabetes, or (g) have any other physical/ psychological/ emotional/ medical condition, or (h) are taking any strong medication.
  -   You will obtain the approval of your health care provider/doctor before participating in the Platform Services, in the event you are over 65 years of age.
  -   Medical Aid:There is no obligation for any person to provide you with medical care while performing the activities offered under the Platform Services. You further understand and acknowledge that:
  -   there may be no aid stations available for the said activity; and
  -   if medical care is rendered to you, you consent to that care if you are unable to give your consent for any reason at the time the care is rendered.
  -   Disclaimer by Company:
  -   The Company makes no claims, representations or guarantees that the Platform Services offered would provide a therapeutic benefit to all its Users. We hereby disclaim any guarantees of exactness as to the duration, type, satisfaction from the Fitness Services provided by us.
  -   The Company is not a direct health care provider or a medical device provider and that our Platform Services are not a replacement for, or are a form of, clinical therapy, and that the Platform Services are not intended to treat or diagnose any medical conditions which a User may have.
  
  You, for yourself and for your heirs, next of kin, executors, administrators and assigns, fully release, waive and forever discharge any and all rights or claims of any nature whatsoever, including but not limited to any claims pertaining to a physical or mental injury or illness, or claims arising out of negligence of any Released Party (as defined below) or anyone else, that you may have now or in the future, against the Company, any of its affiliates, franchisees and their respective representatives, directors, officers, independent contractors, consultants, agents, employees or volunteer staff(“Released Party”), in relation to or in connection with or arising out of the availing of Platform Services by you. Without limiting the foregoing, you further release any recourses which you may, now or hereafter, have resulting from any decision of any Released Party.  
    
  You agree to indemnify (reimburse for any loss) and hold harmless each Released Party from any loss or liability (including any reasonable legal fees they may incur) defending any claim made by you or anyone making a claim on your behalf, even if the claim is alleged to or did result from the carelessness or negligence of any Released Party or anyone else.`;
  return (
    <View style={{flex: 1}}>
      {/* <WebView
        source={{uri: 'https://everheal.com/privacy'}}
        style={{flex: 1}}></WebView> */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          height: '100%',
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Markdown style={styles}>{termsAndConditions}</Markdown>
        <View style={{height: 100}}></View>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;

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
