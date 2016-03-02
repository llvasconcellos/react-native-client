package com.mapswipeclient;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class MapCache extends ReactContextBaseJavaModule {

    private static final String CONSTANT_EXAMPLE = "CONSTANT_EXAMPLE_VALUE_1";

    public MapCache(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // Expose the name of the module to be used on javascript
    @Override
    public String getName() {
        return "MapCache";
    }

    // Expose constants
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(CONSTANT_EXAMPLE, "CONSTANT_EXAMPLE_VALUE_2");
        return constants;
    }

    // Sample method without return value
    @ReactMethod
    public void noReturnValueMethod(String message) {
        Context c = getReactApplicationContext();
        System.out.println(message);
    }

    // Sample method with callbacks
    @ReactMethod
    public void callBackMethod(String Input, Callback successCallback, Callback errorCallback) {
        try {
            successCallback.invoke("success:" + Input);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

}
