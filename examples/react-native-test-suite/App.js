import React, {useEffect, useState} from 'react';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  NativeModules,
  Platform,
  Button,
} from 'react-native';

const {NativeTestModule} = NativeModules;
import {
  initialize,
  logMessage,
  logBreadcrumb,
  startMoment,
  endMoment,
  endAppStartup,
  ErrorHandler,
} from 'react-native-embrace';
import {getPokemonWithAxios, getPokemonWithFetch} from './src/api/apis';

import ActionButton from './src/components/ActionButton';

const App = () => {
  const isIOS = Platform.OS === 'ios';
  const [hasMomentStarted, setHasMomentStarted] = useState(false);
  const [showKaboom, setShowKaboom] = useState(false);
  const [fixJSXError, setFixJSXError] = useState(false);
  const [fixJSXErrorAgain, setFixJSXErrorAgain] = useState(false);

  useEffect(() => {
    initialize();
    endAppStartup();
  }, []);

  const handleOnStartMoment = () => {
    startMoment('MomentFromEmbraceTestSuite-4');
    setHasMomentStarted(true);
  };
  const handleOnEndMoment = () => {
    endMoment('MomentFromEmbraceTestSuite-4');
    setHasMomentStarted(false);
  };

  const actions = [
    {
      name: 'C++ Crash',
      onPress: () => {
        console.log('NativeTestModule', NativeTestModule.generateCPPCrash);
        NativeTestModule.generateCPPCrash();
      },
      backgroundColor: 'red',
    },
    {
      name: 'JS Crash',
      onPress: () => {
        throw new Error('This is a crash');
      },
      backgroundColor: 'red',
    },
    {
      name: 'Native Crash',
      onPress: () => NativeTestModule.generateNativeCrash(),
      backgroundColor: '#7f0000',
    },

    {
      name: `${isIOS ? 'NS' : 'JVM'}`,
      onPress: () => NativeTestModule.generatePlatformCrash(),
      backgroundColor: '#7f0000',
    },
    {
      name: 'Start Moment',
      onPress: handleOnStartMoment,
      backgroundColor: '#6bf',
    },
    {
      name: 'Log Message',
      onPress: () => {
        logMessage('Custom Message From Embrace Test Suite');
      },
      backgroundColor: '#fd6',
    },
    {
      name: 'Log BreadCrumb',
      onPress: () => {
        logBreadcrumb('Custom BreadCrumb From Embrace Test Suite');
      },
      backgroundColor: '#26b3bd',
    },
    {
      name: 'Log API Call Fetch',
      onPress: () => {
        getPokemonWithFetch();
      },
      backgroundColor: '#26b3bd',
    },
    {
      name: 'Log API Call Fetch',
      onPress: () => {
        getPokemonWithAxios();
      },
      backgroundColor: '#26b3bd',
    },
    {
      name: 'Force JSX Error',
      onPress: () => {
        setShowKaboom(true);
      },
      backgroundColor: '#26b3bd',
    },
  ];
  const renderAction = ({item}) => {
    return (
      <ActionButton
        onPress={item.onPress}
        actionName={item.name}
        backgroundColor={item.backgroundColor}
      />
    );
  };

  const CustomErrorComponent = ({cleanErrorHanlder}) => {
    const handleOnClean = () => {
      cleanErrorHanlder();
      setFixJSXError(true);
    };
    const handleOnCleanAgain = () => {
      cleanErrorHanlder();
      setFixJSXErrorAgain(true);
    };

    return (
      <View style={{alignItems: 'center'}}>
        {fixJSXError ? (
          <Text
            style={{
              backgroundColor: 'red',
              padding: 10,
              color: 'white',
              textAlign: 'center',
            }}>
            Was fixed but still have some error, try fix it again!
          </Text>
        ) : (
          <Text
            style={{
              backgroundColor: 'red',
              padding: 10,
              color: 'white',
              textAlign: 'center',
            }}>
            Oops!
          </Text>
        )}
        {fixJSXError ? (
          <Button title="Fix Error" onPress={handleOnCleanAgain} />
        ) : (
          <Button title="Fix Error" onPress={handleOnClean} />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'rgba(44, 62, 80, 1)',
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Embrace Test Suite
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          paddingBottom: 50,
        }}>
        <FlatList data={actions} renderItem={renderAction} numColumns={2} />
      </View>
      <ErrorHandler unmountChildrenOnError>
        {showKaboom && <View>asd</View>}
      </ErrorHandler>
      <ErrorHandler ErrorFallbackComponent={CustomErrorComponent}>
        {showKaboom && !fixJSXErrorAgain && <View>asd</View>}
        {fixJSXErrorAgain && (
          <View>
            <Text
              style={{
                padding: 10,
                backgroundColor: 'green',
                color: 'white',
                textAlign: 'center',
              }}>
              Now its fixed
            </Text>
          </View>
        )}
      </ErrorHandler>
      {hasMomentStarted && (
        <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
          <ActionButton
            backgroundColor="green"
            actionName="End Moment"
            onPress={handleOnEndMoment}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
