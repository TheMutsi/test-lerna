jest.useFakeTimers();

beforeEach(() => {
  jest.clearAllMocks().resetModules();
});

describe("User Identifier Tests", () => {
  test("setUserIdentifier", () => {
    const mock = jest.fn();
    jest.mock(
      "react-native",
      () => ({
        NativeModules: {
          EmbraceManager: {
            setUserIdentifier: mock,
          },
        },
      }),
      { virtual: true }
    );
    const { setUserIdentifier } = require("../embrace");
    setUserIdentifier(testUserId);
    expect(mock).toBeCalledWith(testUserId);
  });
});
