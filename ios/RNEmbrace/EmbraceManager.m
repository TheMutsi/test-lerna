#import "EmbraceManager.h"
#import <Embrace/Embrace.h>

#if __has_include(<CodePush/CodePush.h>)
#import <CodePush/CodePush.h>
#endif

@implementation EmbraceManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(endAppStartup) {
  [[Embrace sharedInstance] endAppStartup];
}

RCT_EXPORT_METHOD(endAppStartupWithProperties: (NSDictionary*)properties) {
  [[Embrace sharedInstance] endAppStartupWithProperties: properties];
}

RCT_EXPORT_METHOD(setUserIdentifier:(NSString*)userIdentifier) {
  [[Embrace sharedInstance] setUserIdentifier:userIdentifier];
}

RCT_EXPORT_METHOD(setUsername:(NSString*)username) {
  [[Embrace sharedInstance] setUsername:username];
}

RCT_EXPORT_METHOD(setUserEmail:(NSString*)userEmail) {
  [[Embrace sharedInstance] setUserEmail:userEmail];
}

RCT_EXPORT_METHOD(clearUserEmail) {
  [[Embrace sharedInstance] clearUserEmail];
}

RCT_EXPORT_METHOD(clearUserIdentifier) {
  [[Embrace sharedInstance] clearUserIdentifier];
}

RCT_EXPORT_METHOD(clearUsername) {
  [[Embrace sharedInstance] clearUsername];
}

RCT_EXPORT_METHOD(logBreadcrumb:(NSString*)message) {
  [[Embrace sharedInstance] logBreadcrumbWithMessage:message];
}

RCT_EXPORT_METHOD(startMomentWithName:(NSString*)name) {
  [[Embrace sharedInstance] startMomentWithName:name];
}

RCT_EXPORT_METHOD(startMomentWithNameAndIdentifier:(NSString*)name identifier:(NSString*)identifier) {
  [[Embrace sharedInstance] startMomentWithName:name identifier:identifier];
}

RCT_EXPORT_METHOD(startMomentWithNameAndIdentifierAndProperties:(NSString*)name identifier:(NSString*)identifier properties:(NSDictionary*)properties) {
  [[Embrace sharedInstance] startMomentWithName:name identifier:identifier properties:properties];
}

RCT_EXPORT_METHOD(startMomentWithNameAllowingScreenshot:(NSString*)name allowScreenshot:(BOOL)allowScreenshot) {
  [[Embrace sharedInstance] startMomentWithName:name identifier:nil allowScreenshot:allowScreenshot];
}

RCT_EXPORT_METHOD(startMomentWithNameAndIdentifierAllowingScreenshot:(NSString*)name identifier:(NSString*)identifier allowScreenshot:(BOOL)allowScreenshot) {
  [[Embrace sharedInstance] startMomentWithName:name identifier:identifier allowScreenshot:allowScreenshot];
}

RCT_EXPORT_METHOD(startMomentWithNameAndIdentifierAndPropertiesAllowingScreenshot:(NSString*)name identifier:(NSString*)identifier properties:(NSDictionary*)properties allowingScreenshot:(BOOL)allowingScreenshot) {
  [[Embrace sharedInstance] startMomentWithName:name identifier:identifier allowScreenshot:allowingScreenshot properties:properties];
}

RCT_EXPORT_METHOD(endMomentWithName:(NSString*)name properties:(NSDictionary*)properties) {
  [[Embrace sharedInstance] endMomentWithName:name properties:properties];
}

RCT_EXPORT_METHOD(endMomentWithNameAndIdentifier:(NSString*)name identifier:(NSString*)identifier properties:(NSDictionary*)properties) {
  [[Embrace sharedInstance] endMomentWithName:name identifier:identifier properties:properties];
}

RCT_EXPORT_METHOD(setUserPersona:(NSString*)persona) {
  [[Embrace sharedInstance] setUserPersona:persona];
}

RCT_EXPORT_METHOD(clearUserPersona:(NSString*)persona) {
  [[Embrace sharedInstance] clearUserPersona:persona];
}

RCT_EXPORT_METHOD(clearAllUserPersonas) {
  [[Embrace sharedInstance] clearAllUserPersonas];
}

-(EMBSeverity)severityFromString:(NSString*)inputString {
  if ([inputString isEqualToString:@"info"]) {
    return EMBSeverityInfo;
  } else if ([inputString isEqualToString:@"warning"]) {
    return EMBSeverityWarning;
  }
  return EMBSeverityError;
}

RCT_EXPORT_METHOD(logMessageWithSeverity:(NSString*)message severity:(NSString*)severity) {
  [[Embrace sharedInstance] logMessage:message withSeverity:[self severityFromString:severity]];
}


// TODO: Update this to take in screenshot flag and stack trace.
RCT_EXPORT_METHOD(
  logMessageWithSeverityAndProperties:(NSString*)message
                             severity:(NSString*)severity
                           properties:(NSDictionary*)properties
                       takeScreenshot:(BOOL)takeScreenshot
                         jsStackTrace:(NSString *)jsStackTrace
) {
    [[RNEmbrace sharedInstance] logMessage:message withSeverity:[self severityFromString:severity] properties:properties takeScreenshot:takeScreenshot jsStackTrace:jsStackTrace];
}

RCT_EXPORT_METHOD(logHandledError:(NSString*)message jsStackTrace:(NSString *)jsStackTrace properties:(NSDictionary*)properties) {
    [[RNEmbrace sharedInstance] logMessage:message withSeverity:EMBSeverityError properties:properties takeScreenshot:NO jsStackTrace:jsStackTrace wasHandled:YES];
}

RCT_EXPORT_METHOD(startView:(NSString*)viewName) {
    SEL selector = NSSelectorFromString(@"startViewWithName:");
    Embrace *instance = [Embrace sharedInstance];
    if ([instance respondsToSelector:selector]) {
        IMP imp = [instance methodForSelector:selector];
        ((void (*)(id, SEL, NSString *))imp)(instance, _cmd, viewName);
    } else {
      NSLog(@"Custom Views Not Supported");
    }
}

RCT_EXPORT_METHOD(endView:(NSString*)viewName) {
    SEL selector = NSSelectorFromString(@"endViewWithName:");
    Embrace *instance = [Embrace sharedInstance];
    if ([instance respondsToSelector:selector]) {
        IMP imp = [instance methodForSelector:selector];
        ((void (*)(id, SEL, NSString *))imp)(instance, _cmd, viewName);
    } else{
      NSLog(@"Custom Views Not Supported");
    }
}

RCT_EXPORT_METHOD(logUnhandledJSException:(NSString *)name message:(NSString *)message type:(NSString *)type stackTrace:(NSString *)stackTrace) {
  [[RNEmbrace sharedInstance] logUnhandledJSException:name message:message type:type stackTrace:stackTrace];
}

RCT_EXPORT_METHOD(setJavaScriptPatchNumber:(NSString *)number) {
  [[RNEmbrace sharedInstance] setJavaScriptPatchNumber:number];
}

RCT_EXPORT_METHOD(setJavaScriptBundlePath:(NSString *)path) {
  [[RNEmbrace sharedInstance] setJavaScriptBundleURL:path];
}

RCT_EXPORT_METHOD(setReactNativeVersion:(NSString *)version) {
    [[RNEmbrace sharedInstance] setReactNativeVersion:version];
}

RCT_EXPORT_METHOD(checkAndSetCodePushBundleURL) {
#if __has_include(<CodePush/CodePush.h>)
    NSURL *url = [CodePush bundleURL];
    [[RNEmbrace sharedInstance] setJavaScriptBundleURL:url.path];
#endif
}

RCT_EXPORT_METHOD(addSessionProperty:(NSString*)key value:(NSString*)value permanent:(BOOL)permanent resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  BOOL success = [[Embrace sharedInstance] addSessionProperty:value withKey:key permanent:permanent];
  resolve(@(success));
}

RCT_EXPORT_METHOD(removeSessionProperty:(NSString*)key) {
   [[Embrace sharedInstance] removeSessionPropertyWithKey:key];
}

RCT_EXPORT_METHOD (getSessionProperties:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSDictionary *props = [[Embrace sharedInstance] getSessionProperties];
  resolve(props);
}

RCT_EXPORT_METHOD(endSession:(BOOL)clearUserInfo) {
   [[Embrace sharedInstance] endSession:clearUserInfo];
}

RCT_EXPORT_METHOD(setUserAsPayer) {
  [[Embrace sharedInstance] setUserAsPayer];
}

RCT_EXPORT_METHOD(clearUserAsPayer) {
  [[Embrace sharedInstance] clearUserAsPayer];
}

RCT_EXPORT_METHOD(getDeviceId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *deviceId = [[Embrace sharedInstance] getDeviceId];
  resolve(deviceId);
}

RCT_EXPORT_METHOD(
  logNetworkRequest:
    (NSString*)url 
    method:(NSString*)method 
    startms:(nonnull NSNumber*)startms 
    endms:(nonnull NSNumber*)endms 
    bytesSent:(NSInteger)bytesSent 
    bytesReceived:(NSInteger)bytesReceived 
    statusCode:(NSInteger)statusCode 
    error:(NSString*)error) {
    if (url == nil) {
        NSLog(@"Url cannot be null when logging a network request, ignoring.");
        return;
    }
    
    NSURL *urlObj = [NSURL URLWithString:[NSString stringWithUTF8String:[url UTF8String]]];
    // Divide by 1000 because the startms method is returning milliseconds since the epoch, not seconds since the epoch
    NSDate *startTime = [NSDate dateWithTimeIntervalSince1970:startms.doubleValue/1000];
    NSDate *endTime = [NSDate dateWithTimeIntervalSince1970:endms.doubleValue/1000];
    NSError *errorObj = nil;
    if (error != nil) {
        NSString *errorStr = [NSString stringWithUTF8String:[error UTF8String]];
        errorObj = [NSError errorWithDomain:@"NativeInterface" code:statusCode userInfo:@{@"userinfo": errorStr}];
    }

    EMBNetworkRequest *request = 
      [EMBNetworkRequest 
        networkRequestWithURL:urlObj 
        method:method 
        startTime:startTime 
        endTime:endTime 
        bytesIn:bytesReceived 
        bytesOut:bytesSent 
        responseCode:statusCode 
        error:errorObj 
        traceId:nil];
    [[Embrace sharedInstance] logNetworkRequest:request];
}
@end
