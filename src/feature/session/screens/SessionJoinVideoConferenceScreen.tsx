import {Provider} from 'react-redux';

import AppContainer from '../../videoStreaming/navigator';
import {store} from '../../videoStreaming/redux';
import React from 'react';

const SessionJoinVideoConferenceScreen = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default SessionJoinVideoConferenceScreen;
