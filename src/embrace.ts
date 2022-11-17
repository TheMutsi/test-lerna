'use strict';
import { NativeModules } from 'react-native';
import {
  getNetworkSDKInterceptorProvider,
  NETWORK_INTERCEPTOR_TYPES,
} from './interfaces/NetworkMonitoring';

import { ApplyInterceptorStrategy } from './networkInterceptors/ApplyInterceptor';

interface Properties {
  [key: string]: any;
}

const tracking = require('promise/setimmediate/rejection-tracking');

const reactNativeVersion = require('react-native/Libraries/Core/ReactNativeVersion.js');

const stackLimit = 200;

const unhandledPromiseRejectionPrefix = 'Unhandled promise rejection: ';

const handleError = (error: Error) => {
  if (!(error instanceof Error)) {
    console.warn('[Embrace] error must be of type Error');
    return;
  }
  const { name, message, stack = '' } = error;
  const truncated = stack.split('\n').slice(0, stackLimit).join('\n');

  NativeModules.EmbraceManager.logUnhandledJSException(
    name,
    message,
    error.constructor.name,
    truncated
  );
};

const isObjectNonEmpty = (obj?: object): boolean =>
  Object.keys(obj || {}).length > 0;

export const initialize = ({ patch }: { patch?: string } = {}) => {
  if (!ErrorUtils) {
    console.warn(
      '[Embrace] ErrorUtils is not defined. Not setting exception handler.'
    );
    return;
  }

  if (patch) {
    setJavaScriptPatch(patch);
  }

  if (
    isObjectNonEmpty(reactNativeVersion) &&
    isObjectNonEmpty(reactNativeVersion.version)
  ) {
    NativeModules.EmbraceManager.setReactNativeVersion(
      buildVersionStr(reactNativeVersion.version)
    );
  }

  // Only attempt to check for CodePush bundle URL in release mode. Otherwise CodePush will throw an exception.
  // https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native#plugin-configuration-ios
  if (!__DEV__) {
    NativeModules.EmbraceManager.checkAndSetCodePushBundleURL();
  }
  const previousHandler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    handleError(error);

    // Wait before terminating app. This gives the native side time to wrap up so we can send the JS crash report.
    setTimeout(() => {
      previousHandler(error, isFatal);
    }, 150);
  });

  tracking.enable({
    allRejections: true,
    onUnhandled: (_: any, error: Error) => {
      let message = `Unhandled promise rejection: ${error}`;
      let st = '';
      if (error instanceof Error) {
        message = unhandledPromiseRejectionPrefix + error.message;
        st = error.stack || '';
      }
      NativeModules.EmbraceManager.logMessageWithSeverityAndProperties(
        message,
        ERROR,
        {},
        false,
        st
      );
    },
    onHandled: () => {},
  });
};

const buildVersionStr = ({
  major,
  minor,
  patch,
  prerelease,
}: {
  major: string;
  minor: string;
  patch: string;
  prerelease: string | null;
}): string => {
  const versionStr = `${major || '0'}.${minor || '0'}.${patch || '0'}`;
  return prerelease ? `${versionStr}.${prerelease}` : versionStr;
};

export const endAppStartup = (properties?: Properties): void => {
  if (properties && Object.keys(properties).length > 0) {
    NativeModules.EmbraceManager.endAppStartupWithProperties(properties);
    return;
  }
  NativeModules.EmbraceManager.endAppStartup();
};

export const setUserIdentifier = (userIdentifier: string): void =>
  NativeModules.EmbraceManager.setUserIdentifier(userIdentifier);

export const clearUserIdentifier = (): void =>
  NativeModules.EmbraceManager.clearUserIdentifier();

export const setUsername = (username: string): void =>
  NativeModules.EmbraceManager.setUsername(username);

export const clearUsername = (): void =>
  NativeModules.EmbraceManager.clearUsername();

export const setUserEmail = (userEmail: string): void =>
  NativeModules.EmbraceManager.setUserEmail(userEmail);

export const clearUserEmail = (): void =>
  NativeModules.EmbraceManager.clearUserEmail();

export const logBreadcrumb = (message: string): void =>
  NativeModules.EmbraceManager.logBreadcrumb(message);

export const logScreen = (screenName: string): void =>
  NativeModules.EmbraceManager.logBreadcrumb(`Opening screen [${screenName}]`);

export const startMoment = (
  name: string,
  identifier?: string,
  properties?: Properties
): void => {
  if (!name) {
    console.warn('[Embrace] Name is not defined. The moment was not started.');
    return;
  }
  if (identifier && properties) {
    NativeModules.EmbraceManager.startMomentWithNameAndIdentifierAndProperties(
      name,
      identifier,
      properties
    );
  } else if (identifier) {
    NativeModules.EmbraceManager.startMomentWithNameAndIdentifier(
      name,
      identifier
    );
  } else if (properties) {
    NativeModules.EmbraceManager.startMomentWithNameAndIdentifierAndProperties(
      name,
      null,
      properties
    );
  } else {
    NativeModules.EmbraceManager.startMomentWithName(name);
  }
};

export const startMomentAllowingScreenshot = (
  name: string,
  allowScreenshot: boolean,
  identifier?: string,
  properties?: Properties
): void => {
  if (!name) {
    console.warn('[Embrace] Name is not defined. The moment was not started.');
    return;
  }
  if (identifier && properties) {
    NativeModules.EmbraceManager.startMomentWithNameAndIdentifierAndPropertiesAllowingScreenshot(
      name,
      identifier,
      properties,
      allowScreenshot
    );
  } else if (identifier) {
    NativeModules.EmbraceManager.startMomentWithNameAndIdentifierAllowingScreenshot(
      name,
      identifier,
      allowScreenshot
    );
  } else {
    NativeModules.EmbraceManager.startMomentWithNameAllowingScreenshot(
      name,
      allowScreenshot
    );
  }
};

export const endMoment = (
  name: string,
  identifier?: string,
  properties?: Properties
): void => {
  if (identifier) {
    NativeModules.EmbraceManager.endMomentWithNameAndIdentifier(
      name,
      identifier,
      properties
    );
  } else {
    NativeModules.EmbraceManager.endMomentWithName(name, properties);
  }
};

export const setUserPersona = (persona: string): void =>
  NativeModules.EmbraceManager.setUserPersona(persona);

export const clearUserPersona = (persona: string): void =>
  NativeModules.EmbraceManager.clearUserPersona(persona);

export const clearAllUserPersonas = (): void =>
  NativeModules.EmbraceManager.clearAllUserPersonas();

export const WARNING = 'warning';
export const INFO = 'info';
export const ERROR = 'error';

export const logMessage = (
  message: string,
  severity: 'info' | 'warning' | 'error' = 'error',
  properties?: Properties,
  allowScreenshot: boolean = false
): void => {
  const stacktrace = severity === INFO ? '' : generateStackTrace();
  NativeModules.EmbraceManager.logMessageWithSeverityAndProperties(
    message,
    severity,
    properties,
    allowScreenshot,
    stacktrace
  );
};

export const logHandledError = (
  error: Error,
  properties?: Properties
): void => {
  if (error instanceof Error) {
    NativeModules.EmbraceManager.logHandledError(
      error.message,
      error.stack,
      properties
    );
  }
};
export const startView = (view: string): void =>
  NativeModules.EmbraceManager.startView(view);

export const endView = (view: string): void =>
  NativeModules.EmbraceManager.endView(view);

export const generateStackTrace = (): string => {
  const err = new Error();
  return err.stack || '';
};

export const setJavaScriptPatch = (patch: string) => {
  NativeModules.EmbraceManager.setJavaScriptPatchNumber(patch);
};

export const setJavaScriptBundlePath = (path: string) => {
  NativeModules.EmbraceManager.setJavaScriptBundlePath(path);
};

export const addSessionProperty = (
  key: string,
  value: string,
  permanent: boolean
): Promise<boolean> => {
  return NativeModules.EmbraceManager.addSessionProperty(key, value, permanent);
};

export const removeSessionProperty = (key: string) => {
  NativeModules.EmbraceManager.removeSessionProperty(key);
};

export const getSessionProperties = () => {
  return NativeModules.EmbraceManager.getSessionProperties();
};

export const endSession = (clearUserInfo: boolean = false) => {
  return NativeModules.EmbraceManager.endSession(clearUserInfo);
};

export const setUserAsPayer = (): void =>
  NativeModules.EmbraceManager.setUserAsPayer();

export const clearUserAsPayer = (): void =>
  NativeModules.EmbraceManager.clearUserAsPayer();

export const logNetworkRequest = (
  url: string,
  httpMethod: string,
  startInMillis: number,
  endInMillis: number,
  bytesSent: number,
  bytesReceived: number,
  statusCode: number,
  error?: string
): void =>
  NativeModules.EmbraceManager.logNetworkRequest(
    url,
    httpMethod,
    startInMillis,
    endInMillis,
    bytesSent,
    bytesReceived,
    statusCode,
    error
  );

export const logNetworkClientError = (
  url: string,
  httpMethod: string,
  startInMillis: number,
  endInMillis: number,
  errorType: string,
  errorMessage: string
): void =>
  NativeModules.EmbraceManager.logNetworkClientError(
    url,
    httpMethod,
    startInMillis,
    endInMillis,
    errorType,
    errorMessage
  );

export const getDeviceId = (): string =>
  NativeModules.EmbraceManager.getDeviceId();

export const applyNetworkInterceptors = (
  networkSDKInstance: NETWORK_INTERCEPTOR_TYPES
) => {
  if (!networkSDKInstance) {
    console.warn(
      `[Embrace] The Axios instance was not provided. Interceptor was not applied.`
    );
    return 0;
  }

  const networkProviderSDK =
    getNetworkSDKInterceptorProvider(networkSDKInstance);

  if (!networkProviderSDK) {
    console.warn(
      `[Embrace] The provider is not supported. Interceptor was not applied.`
    );
    return 0;
  }

  const { applyInterceptor } = ApplyInterceptorStrategy[networkProviderSDK];

  applyInterceptor(networkSDKInstance);
  return 1;
};
