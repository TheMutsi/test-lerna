package io.embrace.embracewrapper;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableMap;

import java.lang.reflect.Method;
import java.util.Map;

import javax.annotation.Nonnull;

import io.embrace.android.embracesdk.Embrace;
import io.embrace.android.embracesdk.network.http.HttpMethod;

public class EmbraceManagerModule extends ReactContextBaseJavaModule {

    public EmbraceManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "EmbraceManager";
    }

    @ReactMethod
    public void endAppStartup() {
        Embrace.getInstance().endAppStartup();
    }

    @ReactMethod
    public void endAppStartupWithProperties(ReadableMap properties) {
        Embrace.getInstance().endAppStartup(properties.toHashMap());
    }

    @ReactMethod
    public void setUserIdentifier(String userIdentifier) {
        Embrace.getInstance().setUserIdentifier(userIdentifier);
    }

    @ReactMethod
    public void setUsername(String username) {
        Embrace.getInstance().setUsername(username);
    }

    @ReactMethod
    public void setUserEmail(String userEmail) {
        Embrace.getInstance().setUserEmail(userEmail);
    }

    @ReactMethod
    public void clearUserEmail() {
        Embrace.getInstance().clearUserEmail();
    }

    @ReactMethod
    public void clearUserIdentifier() {
        Embrace.getInstance().clearUserIdentifier();
    }

    @ReactMethod
    public void clearUsername() {
        Embrace.getInstance().clearUsername();
    }

    @ReactMethod
    public void logBreadcrumb(String message) {
        Embrace.getInstance().logBreadcrumb(message);
    }

    @ReactMethod
    public void startMomentWithName(String name) {
        Embrace.getInstance().startEvent(name);
    }

    @ReactMethod
    public void startMomentWithNameAndIdentifier(String name, String identifier) {
        Embrace.getInstance().startEvent(name, identifier);
    }

    @ReactMethod
    public void startMomentWithNameAndIdentifierAndProperties(String name, String identifier, ReadableMap properties) {
        try {
            final Map<String, Object> props = properties != null ? properties.toHashMap() : null;
            Embrace.getInstance().startEvent(name, identifier, false, props);
        } catch (Exception e) {
            Log.e("Embrace", "Error starting moment with name, identifier, and properties", e);
        }
    }

    @ReactMethod
    public void startMomentWithNameAllowingScreenshot(String name, boolean allowScreenshot) {
        Embrace.getInstance().startEvent(name, null, allowScreenshot);
    }

    @ReactMethod
    public void startMomentWithNameAndIdentifierAllowingScreenshot(String name, String identifier,
            boolean allowScreenshot) {
        Embrace.getInstance().startEvent(name, identifier, allowScreenshot);
    }

    @ReactMethod
    public void startMomentWithNameAndIdentifierAndPropertiesAllowingScreenshot(String name, String identifier,
            ReadableMap properties, boolean allowScreenshot) {
        try {
            final Map<String, Object> props = properties != null ? properties.toHashMap() : null;
            Embrace.getInstance().startEvent(name, identifier, allowScreenshot, props);
        } catch (Exception e) {
            Log.e("Embrace", "Error starting moment with name, identifier, properties, and allowScreenshot", e);
        }
    }

    @ReactMethod
    public void endMomentWithName(String name, ReadableMap properties) {
        final Map<String, Object> props = properties != null ? properties.toHashMap() : null;
        Embrace.getInstance().endEvent(name, props);
    }

    @ReactMethod
    public void endMomentWithNameAndIdentifier(String name, String identifier,ReadableMap properties) {
        final Map<String, Object> props = properties != null ? properties.toHashMap() : null;
        Embrace.getInstance().endEvent(name, identifier, props);
    }

    @ReactMethod
    public void setUserPersona(String persona) {
        Embrace.getInstance().setUserPersona(persona);
    }

    @ReactMethod
    public void clearUserPersona(String persona) {
        Embrace.getInstance().clearUserPersona(persona);
    }

    @ReactMethod
    public void clearAllUserPersonas() {
        Embrace.getInstance().clearAllUserPersonas();
    }

    @ReactMethod
    public void logMessageWithSeverity(String message, String severity) {
        if (severity.equals("info")) {
            Embrace.getInstance().logInfo(message);
        } else if (severity.equals("warning")) {
            Embrace.getInstance().logWarning(message);
        } else {
            Embrace.getInstance().logError(message);
        }
    }

    @ReactMethod
    public void logMessageWithSeverityAndProperties(String message, String severity, ReadableMap properties,
            boolean allowScreenshot, String stacktrace) {
        try {
            final Map<String, Object> props = properties != null ? properties.toHashMap() : null;
            if (severity.equals("info")) {
                Embrace.getInstance().logInfo(message, props);
            } else if (severity.equals("warning")) {
                Embrace.getInstance().logWarning(message, props, allowScreenshot, stacktrace);
            } else {
                Embrace.getInstance().logError(message, props, allowScreenshot, stacktrace);
            }
        } catch (Exception e) {
            Log.e("Embrace", "Error logging message", e);
        }
    }

    @ReactMethod
    public void startView(String screen) {
        Embrace.getInstance().logRnView(screen);
    }

    @ReactMethod
    public void endView(String screen) {
        //This method is only for compatibility, Android does not need an end event to end the view, but iOS does
    }

    @ReactMethod
    public void startFragment(String screen) {
        Embrace.getInstance().startFragment(screen);
    }

    @ReactMethod
    public void endFragment(String screen) {
        Embrace.getInstance().endFragment(screen);
    }

    @ReactMethod
    public void logHandledError(String message, String javascriptStackTrace, ReadableMap properties) {
        final Map<String, Object> props = properties != null ? properties.toHashMap() : null;
        Embrace.getInstance().logError(message, props, false, javascriptStackTrace, true);
    }

    @ReactMethod
    public void logUnhandledJSException(String name, String message, String type, String stacktrace) {
        Embrace.getInstance().logUnhandledJsException(name, message, type, stacktrace);
    }

    @ReactMethod
    public void setJavaScriptPatchNumber(String number) {
        Embrace.getInstance().setJavaScriptPatchNumber(number);
    }

    @ReactMethod
    public void setReactNativeVersion(String version) {
        Embrace.getInstance().setReactNativeVersionNumber(version);
    }

    @ReactMethod
    public void checkAndSetCodePushBundleURL() {
        try {
            Class<?> clazz = Class.forName("com.microsoft.codepush.react.CodePush");
            Method method = clazz.getDeclaredMethod("getJSBundleFile");
            String bundlePath = (String) method.invoke(null);
            Embrace.getInstance().setJavaScriptBundleURL(bundlePath);
        } catch (Exception e) {
            Log.i("Embrace", "CodePush not present in build.", e);
        }
    }

    @ReactMethod
    public void setJavaScriptBundlePath(String path) {
      Embrace.getInstance().setJavaScriptBundleURL(path);
    }

    @ReactMethod
    public void addSessionProperty(String key, String value, boolean permanent, Promise promise) {
        Boolean success = Embrace.getInstance().addSessionProperty(key, value, permanent);
        promise.resolve(success);
    }

    @ReactMethod
    public void removeSessionProperty(String key) {
        Embrace.getInstance().removeSessionProperty(key);
    }

    @ReactMethod
    public void getSessionProperties(Promise promise) {
        Map<String, String> properties = Embrace.getInstance().getSessionProperties();

        WritableMap propsMap = new WritableNativeMap();

        for (Map.Entry<String, String> prop : properties.entrySet()) {
            propsMap.putString(prop.getKey(), prop.getValue());
        }
        promise.resolve(propsMap);

    }
    @ReactMethod
    public void endSession(boolean clearUserInfo) {
        Embrace.getInstance().endSession(clearUserInfo);
    }
    
    @ReactMethod
    public void setUserAsPayer() {
        Embrace.getInstance().setUserAsPayer();
    }

    @ReactMethod
    public void clearUserAsPayer() {
        Embrace.getInstance().clearUserAsPayer();
    }

    @ReactMethod()
    public void getDeviceId(Promise promise) {
        promise.resolve(Embrace.getInstance().getDeviceId());
    }

    @ReactMethod
    public void logNetworkRequest(String url,
                                  String httpMethod,
                                  Double startInMillis,
                                  Double endInMillis,
                                  Integer bytesSent,
                                  Integer bytesReceived,
                                  Integer statusCode,
                                  String error) {
        long st = startInMillis.longValue();
        long et = endInMillis.longValue();
        
        Integer method = parseMethodFromString(httpMethod);
        if(method == null) {
            Log.e("Embrace", "Failed to log network requests. Unexpected or null http method.");
            return;
        }

        Embrace.getInstance().logNetworkRequest(
            url,
            method,
            st,
            et,
            bytesSent.intValue(),
            bytesReceived.intValue(),
            statusCode.intValue(),
            error
        );                              
    }

    @ReactMethod
    public void logNetworkClientError(String url,
                                    String httpMethod,
                                    Double startInMillis,
                                    Double endInMillis,
                                    String errorType,
                                    String errorMessage) {
        long st = startInMillis.longValue();
        long et = endInMillis.longValue();
        
        boolean isHTTPMethodValid = validateHTTPMethod(httpMethod);
        if (!isHTTPMethodValid) {
            Log.e("Embrace", "Failed to log network requests. Unexpected or null http method.");
            return;
        }

        Embrace.getInstance().logNetworkClientError(
            url,
            HttpMethod.fromString(httpMethod.toUpperCase()),
            st,
            et,
            errorType,
            errorMessage
        );                              
    }

    private boolean validateHTTPMethod(String httpMethod) {
        return parseMethodFromString(httpMethod) != null;
    }

    private Integer parseMethodFromString(String httpMethod) {
        if (httpMethod == null) {
            return null;
        }

        switch (httpMethod.toUpperCase()) {
            case "GET":
                return 1;
            case "HEAD":
                return 2;
            case "POST":
                return 3;
            case "PUT":
                return 4;
            case "DELETE":
                return 5;
            case "CONNECT":
                return 6;
            case "OPTIONS":
                return 7;
            case "TRACE":
                return 8;
            case "PATCH":
                return 9;
            default:
                return null;
        }
    }
}
