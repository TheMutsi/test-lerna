const testView = 'View';
const testPersona = 'Persona';
const testUserId = 'Lucia';
const testEmail = 'lucia@nimble.la';
const testKey = 'Key';
const testValue = 'Value';
const testPermanent = false;
const testProps = { testKey: testValue };
const testMessage = 'message';
const testError = new Error();
const clearUserInfo = true;
const { INFO, ERROR, WARNING } = require('../embrace');

jest.useFakeTimers();

beforeEach(() => {
  jest.clearAllMocks().resetModules();
});

test('endAppStartup', () => {
  const mock = jest.fn();
  jest.mock('react-native', () => ({
    NativeModules: {
      EmbraceManager: {
        endAppStartup: mock,
      },
    },
  }));
  const { endAppStartup } = require('../embrace');
  endAppStartup();
  expect(mock).toBeCalled();
});

test('endAppStartupWithProperties', () => {
  const mock = jest.fn();
  jest.mock(
    'react-native',
    () => ({
      NativeModules: {
        EmbraceManager: {
          endAppStartupWithProperties: mock,
        },
      },
    }),
    { virtual: true }
  );
  const { endAppStartup } = require('../embrace');
  endAppStartup(testProps);
  expect(mock).toBeCalledWith(testProps);
});

describe('User Identifier Tests', () => {
  test('setUserIdentifier', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            setUserIdentifier: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { setUserIdentifier } = require('../embrace');
    setUserIdentifier(testUserId);
    expect(mock).toBeCalledWith(testUserId);
  });

  test('clearUserIdentifier', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            clearUserIdentifier: mock,
          },
        },
      }),
      { virtual: true }
    );

    const { clearUserIdentifier } = require('../embrace');
    clearUserIdentifier();
    expect(mock).toBeCalled();
  });
});

describe('User Data Tests', () => {
  test('setUsername', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            setUsername: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { setUsername } = require('../embrace');
    setUsername(testUserId);
    expect(mock).toBeCalledWith(testUserId);
  });

  test('clearUsername', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            clearUsername: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { clearUsername } = require('../embrace');
    clearUsername();
    expect(mock).toBeCalled();
  });

  test('setUserEmail', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            setUserEmail: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { setUserEmail } = require('../embrace');
    setUserEmail(testEmail);
    expect(mock).toBeCalledWith(testEmail);
  });

  test('clearUserEmail', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            clearUserEmail: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { clearUserEmail } = require('../embrace');
    clearUserEmail();
    expect(mock).toBeCalled();
  });
});

describe('Logs Test', () => {
  test('logBreadcrumb', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            logBreadcrumb: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { logBreadcrumb } = require('../embrace');
    logBreadcrumb(testView);
    expect(mock).toBeCalledWith(testView);
  });

  test('logScreen', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            logBreadcrumb: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { logScreen } = require('../embrace');
    logScreen(testView);
    expect(mock).toBeCalledWith(`Opening screen [${testView}]`);
  });

  describe('logMessage', () => {
    const mockSt = 'this is a fake stack trace';
    test.each`
      message        | severity   | properties   | allowScreenshot | stackTrace
      ${testMessage} | ${INFO}    | ${testProps} | ${false}        | ${''}
      ${testMessage} | ${INFO}    | ${testProps} | ${true}         | ${''}
      ${testMessage} | ${WARNING} | ${testProps} | ${false}        | ${mockSt}
      ${testMessage} | ${WARNING} | ${testProps} | ${true}         | ${mockSt}
      ${testMessage} | ${ERROR}   | ${testProps} | ${false}        | ${mockSt}
      ${testMessage} | ${ERROR}   | ${testProps} | ${true}         | ${mockSt}
    `(
      'should run $severity log',
      ({ message, severity, properties, allowScreenshot, stackTrace }) => {
        const mock = jest.fn();
        jest.mock(
          'react-native',
          () => ({
            NativeModules: {
              EmbraceManager: {
                logMessageWithSeverityAndProperties: mock,
              },
            },
          }),
          { virtual: true }
        );
        const embrace = require('../embrace');
        embrace.generateStackTrace = () => (severity === INFO ? '' : mockSt);
        embrace.logMessage(message, severity, properties, allowScreenshot);
        expect(mock).toBeCalledWith(
          message,
          severity,
          properties,
          allowScreenshot,
          stackTrace
        );
      }
    );
  });
});

describe('Log handled Error Tests', () => {
  test.each`
    message           | properties   | out
    ${'not an error'} | ${undefined} | ${{}}
    ${testError}      | ${undefined} | ${{ message: testError.message, stack: testError.stack }}
    ${testError}      | ${testProps} | ${{ message: testError.message, stack: testError.stack, properties: testProps }}
  `('logHandledError', ({ message, out, properties }) => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            logHandledError: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { logHandledError } = require('../embrace');
    logHandledError(message, properties);
    if (message instanceof Error) {
      expect(mock).toBeCalledWith(out.message, out.stack, out.properties);
    } else {
      expect(mock).not.toBeCalled();
    }
  });
});

describe('Personas Tests', () => {
  test('setUserPersona', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            setUserPersona: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { setUserPersona } = require('../embrace');
    setUserPersona(testPersona);
    expect(mock).toBeCalledWith(testPersona);
  });

  test('clearUserPersona', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            clearUserPersona: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { clearUserPersona } = require('../embrace');
    clearUserPersona(testPersona);
    expect(mock).toBeCalledWith(testPersona);
  });

  test('clearAllUserPersonas', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            clearAllUserPersonas: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { clearAllUserPersonas } = require('../embrace');
    clearAllUserPersonas();
    expect(mock).toBeCalled();
  });
});

describe('Custom Views Tests', () => {
  test('startView', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            startView: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { startView } = require('../embrace');
    startView(testView);
    expect(mock).toBeCalledWith(testView);
  });

  test('endView', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            endView: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { endView } = require('../embrace');
    endView(testView);
    expect(mock).toBeCalledWith(testView);
  });
});

describe('Session Properties Tests', () => {
  test('getSessionProperties', () => {
    const mock = jest.fn(() => Promise.resolve({ key: 'value' }));
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            getSessionProperties: mock,
          },
        },
      }),
      { virtual: true }
    );

    const { getSessionProperties } = require('../embrace');
    getSessionProperties().then((prop: any) =>
      expect(prop).toBe({ key: 'value' })
    );
  });

  test('should call addSessionProperty with values ', () => {
    const mock = jest.fn(() => Promise.resolve(true));
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            addSessionProperty: mock,
          },
        },
      }),
      { virtual: true }
    );

    const { addSessionProperty } = require('../embrace');
    addSessionProperty(testKey, testValue, testPermanent);
    expect(mock).toBeCalledWith(testKey, testValue, testPermanent);
  });

  test('addSessionProperty should return success', () => {
    const mock = jest.fn(() => Promise.resolve(true));
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            addSessionProperty: mock,
          },
        },
      }),
      { virtual: true }
    );

    const { addSessionProperty } = require('../embrace');
    addSessionProperty(testKey, testValue, testPermanent).then(
      (success: boolean) => expect(success).toBeTruthy()
    );
  });

  test('removeSessionProperty', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            removeSessionProperty: mock,
          },
        },
      }),
      { virtual: true }
    );

    const { removeSessionProperty } = require('../embrace');
    removeSessionProperty(testKey);
    expect(mock).toBeCalledWith(testKey);
  });
});

describe('endSession', () => {
  test('endSession default', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            endSession: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { endSession } = require('../embrace');
    endSession();
    expect(mock).toBeCalledWith(false);
  });

  test('endSession with clearUserInfo', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            endSession: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { endSession } = require('../embrace');
    endSession(clearUserInfo);
    expect(mock).toBeCalledWith(clearUserInfo);
  });
});

describe('Start Moment', () => {
  describe('Test Start Moment', () => {
    test('start moment', () => {
      const mockWithIdentifierAndProperties = jest.fn();
      const mockWithIdentifierWithoutProperties = jest.fn();
      const mockWithoutIdentifierAndProperties = jest.fn();
      jest.mock('react-native', () => ({
        NativeModules: {
          EmbraceManager: {
            startMomentWithNameAndIdentifierAndProperties:
              mockWithIdentifierAndProperties,
            startMomentWithNameAndIdentifier:
              mockWithIdentifierWithoutProperties,
            startMomentWithName: mockWithoutIdentifierAndProperties,
          },
        },
      }));
      const { startMoment } = require('../embrace');

      startMoment(testValue, 'identifier', {});
      startMoment(testValue, 'identifier');
      startMoment(testValue, undefined, {});
      startMoment(testValue);
      expect(mockWithIdentifierAndProperties).toBeCalledTimes(2);
      expect(mockWithIdentifierWithoutProperties).toBeCalled();
      expect(mockWithoutIdentifierAndProperties).toBeCalled();
    });

    test('start moment without name', () => {
      const mockWithIdentifierAndProperties = jest.fn();
      const mockWithIdentifierWithoutProperties = jest.fn();
      const mockWithoutIdentifierAndProperties = jest.fn();
      jest.mock('react-native', () => ({
        NativeModules: {
          EmbraceManager: {
            startMomentWithNameAndIdentifierAndProperties:
              mockWithIdentifierAndProperties,
            startMomentWithNameAndIdentifier:
              mockWithIdentifierWithoutProperties,
            startMomentWithName: mockWithoutIdentifierAndProperties,
          },
        },
      }));
      const { startMoment } = require('../embrace');

      startMoment(undefined, 'identifier', {});
      startMoment(undefined, 'identifier');
      startMoment(undefined, undefined, {});
      startMoment(undefined);

      expect(mockWithIdentifierAndProperties).toBeCalledTimes(0);
      expect(mockWithIdentifierWithoutProperties).toBeCalledTimes(0);
      expect(mockWithoutIdentifierAndProperties).toBeCalledTimes(0);
    });
  });

  describe('Test Start Moment Allowing Screenshot', () => {
    test('start moment allowing screenshot', () => {
      const mockWithIdentifierAndProperties = jest.fn();
      const mockWithIdentifierWithoutProperties = jest.fn();
      const mockWithoutIdentifierAndProperties = jest.fn();
      jest.mock('react-native', () => ({
        NativeModules: {
          EmbraceManager: {
            startMomentWithNameAndIdentifierAndPropertiesAllowingScreenshot:
              mockWithIdentifierAndProperties,
            startMomentWithNameAndIdentifierAllowingScreenshot:
              mockWithIdentifierWithoutProperties,
            startMomentWithNameAllowingScreenshot:
              mockWithoutIdentifierAndProperties,
          },
        },
      }));
      const { startMomentAllowingScreenshot } = require('../embrace');

      startMomentAllowingScreenshot(testValue, true, 'identifier', {});
      startMomentAllowingScreenshot(testValue, false, 'identifier');
      startMomentAllowingScreenshot(testValue, true);
      expect(mockWithIdentifierAndProperties).toBeCalled();
      expect(mockWithIdentifierWithoutProperties).toBeCalled();
      expect(mockWithoutIdentifierAndProperties).toBeCalled();
    });

    test('start moment allowing screenshot without name', () => {
      const mockWithIdentifierAndProperties = jest.fn();
      const mockWithIdentifierWithoutProperties = jest.fn();
      const mockWithoutIdentifierAndProperties = jest.fn();
      jest.mock('react-native', () => ({
        NativeModules: {
          Platform: {
            OS: 'android',
          },
          EmbraceManager: {
            startMomentWithNameAndIdentifierAndPropertiesAllowingScreenshot:
              mockWithIdentifierAndProperties,
            startMomentWithNameAndIdentifierAllowingScreenshot:
              mockWithIdentifierWithoutProperties,
            startMomentWithNameAllowingScreenshot:
              mockWithoutIdentifierAndProperties,
          },
        },
      }));
      const { startMomentAllowingScreenshot } = require('../embrace');

      startMomentAllowingScreenshot(undefined, true, 'identifier', {});
      startMomentAllowingScreenshot(undefined, false, 'identifier');
      startMomentAllowingScreenshot(undefined, true);
      expect(mockWithIdentifierAndProperties).toBeCalledTimes(0);
      expect(mockWithIdentifierWithoutProperties).toBeCalledTimes(0);
      expect(mockWithoutIdentifierAndProperties).toBeCalledTimes(0);
    });
  });
});

describe('endMoment', () => {
  test.each`
    name         | identifier    | properties
    ${testValue} | ${null}       | ${null}
    ${testValue} | ${testUserId} | ${null}
    ${testValue} | ${null}       | ${testProps}
    ${testValue} | ${testUserId} | ${testProps}
  `('endMomentWithName', ({ name, identifier, properties }) => {
    const mock = jest.fn();

    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            endMomentWithName: mock,
            endMomentWithNameAndIdentifier: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { endMoment } = require('../embrace');
    endMoment(name, identifier, properties);
    if (identifier) {
      expect(mock).toBeCalledWith(name, identifier, properties);
    } else {
      expect(mock).toBeCalledWith(name, properties);
    }
  });
});

describe('Payers Test', () => {
  test('setUserAsPayer', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            setUserAsPayer: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { setUserAsPayer } = require('../embrace');
    setUserAsPayer();
    expect(mock).toBeCalled();
  });
  test('clearUserAsPayer', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            clearUserAsPayer: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { clearUserAsPayer } = require('../embrace');
    clearUserAsPayer();
    expect(mock).toBeCalled();
  });
});

describe('JavaScript bundle', () => {
  test('setJavaScriptBundlePath', () => {
    const mock = jest.fn();
    jest.mock('react-native', () => ({
      NativeModules: {
        EmbraceManager: {
          setJavaScriptBundlePath: mock,
        },
      },
    }));
    const { setJavaScriptBundlePath } = require('../embrace');
    const path = 'path/to/bundle.bundle';

    setJavaScriptBundlePath(path);
    expect(mock).toBeCalledWith(path);
  });
});

describe('Log network call', () => {
  test('logNetworkRequest', () => {
    const mock = jest.fn();
    jest.mock(
      'react-native',
      () => ({
        NativeModules: {
          EmbraceManager: {
            logNetworkRequest: mock,
          },
        },
      }),
      { virtual: true }
    );

    const { logNetworkRequest } = require('../embrace');
    const url = 'https://httpbin.org/get';
    const method = 'get';
    const nowdate = new Date();
    const st = nowdate.getTime();
    const et = nowdate.setUTCSeconds(30);
    const bytesIn = Number(111);
    const bytesOut = Number(222);
    const networkStatus = Number(200);
    const error = null;

    logNetworkRequest(
      url,
      method,
      st,
      et,
      bytesIn,
      bytesOut,
      networkStatus,
      error
    );

    expect(mock).toBeCalledWith(
      url,
      method,
      st,
      et,
      bytesIn,
      bytesOut,
      networkStatus,
      error
    );
  });
});

describe('Test Device Stuffs', () => {
  test('test device Id', () => {
    const mock = jest.fn();
    jest.mock('react-native', () => ({
      NativeModules: {
        EmbraceManager: {
          getDeviceId: mock,
        },
      },
    }));
    const { getDeviceId } = require('../embrace');
    getDeviceId();
    expect(mock).toBeCalled();
  });
});

describe('Test OTA Stuffs', () => {
  test('test set javascript patch number', () => {
    const mock = jest.fn();
    jest.mock('react-native', () => ({
      NativeModules: {
        EmbraceManager: {
          setJavaScriptPatchNumber: mock,
        },
      },
    }));
    const { setJavaScriptPatch } = require('../embrace');
    setJavaScriptPatch();
    expect(mock).toBeCalled();
  });
});

describe('Test testing purpose functions', () => {
  test('get stack trace', () => {
    const { generateStackTrace } = require('../embrace');
    expect(generateStackTrace()).toContain('Error:');
  });
});

describe('Test initialize', () => {
  test('initialize', () => {
    ErrorUtils.getGlobalHandler = () => Error;
    ErrorUtils.setGlobalHandler = (c) => {
      c('', false);
    };

    const mockSetReactNativeVersion = jest.fn();
    const mockSetJavaScriptPatchNumber = jest.fn();

    jest.mock('react-native', () => ({
      NativeModules: {
        EmbraceManager: {
          setReactNativeVersion: mockSetReactNativeVersion,
          setJavaScriptPatchNumber: mockSetJavaScriptPatchNumber,
        },
      },
    }));
    const { initialize } = require('../embrace');

    initialize({ patch: testValue });

    expect(mockSetReactNativeVersion).toBeCalled();
    expect(mockSetJavaScriptPatchNumber).toBeCalled();
  });
  test('applying previousHandler', () => {
    const previousHandler = jest.fn();
    ErrorUtils.getGlobalHandler = () => previousHandler;
    ErrorUtils.setGlobalHandler = (c) => {
      c('', false);
    };
    const { initialize } = require('../embrace');

    initialize({ patch: testValue });
    jest.advanceTimersByTime(150);

    expect(previousHandler).toBeCalled();
  });

  test('applying Tracking', () => {
    interface ITracking {
      onUnhandled: (_: any, error: Error) => {};
    }

    jest.mock('promise/setimmediate/rejection-tracking', () => ({
      enable: (c: ITracking) => {
        const { onUnhandled } = c;
        onUnhandled('e', new Error());
      },
    }));

    const mockLogMessageWithSeverityAndProperties = jest.fn();
    const mockSetReactNativeVersion = jest.fn();
    const mockSetJavaScriptPatchNumber = jest.fn();

    jest.mock('react-native', () => ({
      NativeModules: {
        EmbraceManager: {
          setReactNativeVersion: mockSetReactNativeVersion,
          setJavaScriptPatchNumber: mockSetJavaScriptPatchNumber,
          logMessageWithSeverityAndProperties:
            mockLogMessageWithSeverityAndProperties,
        },
      },
    }));

    const { initialize } = require('../embrace');

    initialize({ patch: testValue });

    expect(mockLogMessageWithSeverityAndProperties).toBeCalled();
  });
});
