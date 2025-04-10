# THIS FILE IS AUTO-GENERATED. DO NOT MODIFY!!

# Copyright 2020-2023 Tauri Programme within The Commons Conservancy
# SPDX-License-Identifier: Apache-2.0
# SPDX-License-Identifier: MIT

-keep class bounce.action.game.* {
  native <methods>;
}

-keep class bounce.action.game.WryActivity {
  public <init>(...);

  void setWebView(bounce.action.game.RustWebView);
  java.lang.Class getAppClass(...);
  java.lang.String getVersion();
}

-keep class bounce.action.game.Ipc {
  public <init>(...);

  @android.webkit.JavascriptInterface public <methods>;
}

-keep class bounce.action.game.RustWebView {
  public <init>(...);

  void loadUrlMainThread(...);
  void loadHTMLMainThread(...);
  void evalScript(...);
}

-keep class bounce.action.game.RustWebChromeClient,bounce.action.game.RustWebViewClient {
  public <init>(...);
}
