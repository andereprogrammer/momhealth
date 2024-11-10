import React, {createContext, useContext, useEffect, useState} from 'react';
import {Agent} from 'stanza';
import * as Keychain from 'react-native-keychain';
import {SessionObject} from '../constants/types';
import {NewMomDetails} from '../feature/onboarding/screens/types';
export const DataProviderContext = React.createContext();

export const DataProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };
  const [mobile, setMobileNumber] = useState('');
  const [firstname, setFirstName] = useState('Account');
  const [isLogged, setIsLogged] = useState(false);
  const [reload, setReload] = useState(false);
  const [id, setID] = useState('');
  const [lmp, setLMP] = useState('');
  const [edd, setEDD] = useState('');
  const [jidUser, setJID] = useState('');
  const [tokenForChat, setTokenChat] = useState('');
  const [active, setActive] = useState(false);
  const [syptomFinalList, setSyptomFinalList] = useState([]);
  const [clientxmpp, setClientXmpp] = useState();
  const [showBottomFilter, setShowBottomFilter] = useState('hide');
  const [filled, setfilled] = useState(false);
  const [gender, setGender] = useState('');
  const [selectedSession, setSelectedSession] = useState();
  const [dateForJournal, setDateForJournal] = useState();
  const [patientDetails, setPatientDetails] = useState();
  const [patientBasicDetails, setPatientBasicDetails] = useState();
  const [contentUrl, setContentUrl] = useState();
  const [statusBarStyle, setStatusBarStyle] = useState('dark-content');
  const [moodTrackerDate, setMoodTrackerDate] = useState(new Date());
  const [activePackages, setActivePackages] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [status, setStatus] = useState(null);
  const [newMomDetails, setNewMomDetails] = useState(null);
  const [freemium, setFreemium] = useState(false);
  const [onboardingPath, setOnboardingPath] = useState({
    pregnant: false,
    newMom: false,
  });
  const [onboarded, setOnboarded] = useState(false);
  const [photoCounter, setPhotoCounter] = useState(0);
  const [sessionNameInfo, setSessionNameInfo] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [contentTipOfDay, setContentTipOfDay] = useState([]);
  const [currentWeekData, setCurrentWeekData] = useState();
  const [weekOfPregnancy, setWeekOfPregnancy] = useState();
  const [keyProp, setKeyProp] = useState();
  const [countNotification, setCountNotification] = useState(0);

  useEffect(() => {
    setShowBottomFilter('hide');
    setMoodTrackerDate(new Date());
  }, [mobile, lmp, edd, showBottomFilter]);

  return (
    <DataProviderContext.Provider
      value={{
        notifications,
        setNotifications,
        mobile,
        setMobileNumber,
        gender,
        setGender,
        setfilled,
        filled,
        firstname,
        setFirstName,
        setID,
        id,
        edd,
        lmp,
        setLMP,
        setEDD,
        setSyptomFinalList,
        syptomFinalList,
        active,
        setActive,
        jidUser,
        setJID,
        tokenForChat,
        setTokenChat,
        isLogged,
        setIsLogged,
        setClientXmpp,
        clientxmpp,
        showBottomFilter,
        setShowBottomFilter,
        selectedSession,
        setSelectedSession,
        dateForJournal,
        setDateForJournal,
        setPatientDetails,
        patientDetails,
        contentUrl,
        setContentUrl,
        setStatusBarStyle,
        statusBarStyle,
        moodTrackerDate,
        setMoodTrackerDate,
        setActivePackages,
        activePackages,
        authenticated,
        setAuthenticated,
        setStatus,
        status,
        patientBasicDetails,
        setPatientBasicDetails,
        newMomDetails,
        setNewMomDetails,
        onboardingPath,
        setOnboardingPath,
        onboarded,
        setOnboarded,
        photoCounter,
        setPhotoCounter,
        sessionNameInfo,
        setSessionNameInfo,
        freemium,
        setFreemium,
        contentTipOfDay,
        setContentTipOfDay,
        setCurrentWeekData,
        currentWeekData,
        setWeekOfPregnancy,
        weekOfPregnancy,
        keyProp,
        setKeyProp,
        countNotification,
        setCountNotification,
      }}>
      {children}
    </DataProviderContext.Provider>
  );
};

export default function useDataProvider() {
  return useContext(DataProviderContext);
}
