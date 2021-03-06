/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.alibaba.weex.extend.module;

import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;

import com.alibaba.weex.WXPageActivity;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

import java.util.HashMap;
import java.util.Map;


public class WXEventModule extends WXModule {

  private static final String WEEX_CATEGORY = "com.taobao.android.intent.category.WEEX";
  private static final String WEEX_ACTION = "com.taobao.android.intent.action.WEEX";


  @JSMethod(uiThread = true)
  public void openURL(String url) {
    if (TextUtils.isEmpty(url)) {
      return;
    }
    String scheme = Uri.parse(url).getScheme();
    StringBuilder builder = new StringBuilder();
    if (TextUtils.equals("http", scheme) || TextUtils.equals("https", scheme) || TextUtils.equals("file", scheme)) {
      builder.append(url);
    } else {
      builder.append("http:");
      builder.append(url);
    }

    Uri uri = Uri.parse(builder.toString());
    Intent intent = new Intent(mWXSDKInstance.getContext(),WXPageActivity.class);
    intent.setAction(WEEX_ACTION);
    intent.setData(uri);
    intent.addCategory(WEEX_CATEGORY);
    mWXSDKInstance.getContext().startActivity(intent);

    if (mWXSDKInstance.checkModuleEventRegistered("event", this)) {
      HashMap<String,Object> params=new HashMap<>();
      params.put("param1","param1");
      params.put("param2","param2");
      params.put("param3","param3");
      mWXSDKInstance.fireModuleEvent("event", this, params);
    }
  }
  /*
   * a test method for macaca case, you can fire globalEvent when download finish???device shaked and so on.
   * @param event event name
  * */
  @JSMethod(uiThread = true)
  public void fireNativeGlobalEvent(String event, JSCallback callback) {
    Map<String,Object> params=new HashMap<String,Object>();
    params.put("eventParam","value");

    mWXSDKInstance.fireGlobalEventCallback(event, params);
    if (null != callback) {
      Map<String, Boolean> result = new HashMap<String, Boolean>();
      result.put("ok",true);
      callback.invoke(result);
    }
  }
}
