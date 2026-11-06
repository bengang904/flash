
!function () {
  "use strict";

  /* ---------- 在 Service Worker 环境中被执行：注销自己，什么也不做 ---------- */
  if (typeof document === "undefined") {
    try {
      if (typeof self !== "undefined" && self.registration) self.registration.unregister();
    } catch (e) {}
    return;
  }

  var currentScriptSrc = document.currentScript ? document.currentScript.src : "";

  /* ---------- 清理旧版本可能注册过的 Service Worker 及其缓存 ---------- */
  try {
    if (currentScriptSrc && navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
      navigator.serviceWorker.getRegistrations().then(function (regs) {
        for (var i = 0; i < regs.length; i++) {
          var reg = regs[i];
          var w = reg.active || reg.waiting || reg.installing;
          if (w && w.scriptURL === currentScriptSrc) {
            reg.unregister();
            if (typeof caches !== "undefined") {
              var p = new URL(reg.scope).pathname;
              caches["delete"](p.substring(0, p.lastIndexOf("/") + 1));
            }
          }
        }
      }, function () {});
    }
  } catch (e) {}

  /* ---------- 小工具 ---------- */
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (src == null) continue;
      for (var k in src) if (Object.prototype.hasOwnProperty.call(src, k)) target[k] = src[k];
    }
    return target;
  }

  function resolved(value) {
    if (typeof Promise !== "undefined") return Promise.resolve(value);
    return {
      then: function (ok) {
        var self = this;
        setTimeout(function () { if (typeof ok === "function") ok(value); }, 0);
        return self;
      }
    };
  }

  var raf = typeof requestAnimationFrame !== "undefined"
    ? function (f) { return requestAnimationFrame(f); }
    : function (f) { return setTimeout(f, 1000 / 60); };

  // 每帧检查 cond()，为真时调用 done()；immediate 为真时先同步检查一次
  function waitUntil(cond, done, immediate) {
    if (immediate && cond()) { done && done(); return; }
    var tick = function () { cond() ? (done && done()) : raf(tick); };
    raf(tick);
  }

  function setStyle(el, prop, value) {
    var s = el.style;
    if (typeof s[prop] === "string") { s[prop] = value; return; }
    var cap = prop.charAt(0).toUpperCase() + prop.slice(1);
    var prefixes = ["ms", "Moz", "webkit"];
    for (var i = 0; i < prefixes.length; i++) {
      if (typeof s[prefixes[i] + cap] === "string") { s[prefixes[i] + cap] = value; return; }
    }
  }

  function removeNode(n) {
    if (!n) return;
    if (n.remove) n.remove();
    else if (n.parentNode) n.parentNode.removeChild(n);
  }

  /* ---------- 游戏配置（原文件内置的 metas） ---------- */
  var metas = {
    "info.id": "BadPiggiesOnline2018",
    "info.developer": "g",
    "info.name": "BadPiggiesOnline",
    "info.version": "8.0.4",
    "info.date": "2025-12-20 17:26:11",
    "element.container": "#container",
    "element.main": "canvas,object,embed",
    "app.size": {
      "main.swf": 6315070
    },
    "app.flashframe": 2
  };

  /* ---------- 兼容接口：window.__localGameManager.call(name, ...args) ---------- */
  var AD_OK = { ok: true, isTrusted: true, hadPrevented: false };
  var launched = false;

  var api = {
    "metas.set": function (k, v) { metas[k] = v; },
    "metas.get": function (k) { return metas[k]; },
    "loading.progress": function (p) { metas["loading.progress"] = p; },
    "loading.label": function (t) { metas["loading.label"] = t; },
    "ready": function () { return resolved(); },
    "launch": function (onClose) {
      if (launched) return typeof Promise !== "undefined" ? Promise.reject("This function can only be called once.") : resolved();
      launched = true;
      return resolved({ ok: false, isTrusted: false, hadPrevented: false });
    },
    // 广告接口：不展示任何广告，直接按"已完成"返回，游戏流程不受影响
    "reward": function () { return resolved(AD_OK); },
    "reward.enable": function () { return true; },
    "roll": function () { return resolved(AD_OK); },
    "process": function () { return resolved(AD_OK); },
    // 原为站点检测 / 弹窗跳转 / 页面埋点，全部置空
    "is": function () { return false; },
    "disabled": function () {},
    "go": function () {}
  };

  var manager = {
    version: "4.8.1",
    call: function (name) {
      var fn = api[name];
      if (typeof fn !== "function") return undefined;
      try {
        return fn.apply(null, Array.prototype.slice.call(arguments, 1));
      } catch (e) {
        return undefined;
      }
    }
  };
  window.__localGameManager = manager;

  /* ---------- 以下为原 Ruffle / Flash 加载器（逻辑不变，仅去混淆） ---------- */
  var FLASH_PARAMS = {
    allowFullScreen: "true",
    allowScriptAccess: "always",
    allowNetworking: "all",
    wmode: "opaque"
  };

  var containerEl = document.getElementById("container");
  var loadingEl = document.getElementById("loading");
  var labelEl = document.getElementById("label");

  function setLabel(text) {
    manager.call("loading.label", text);
    if (labelEl) labelEl.textContent = text;
  }

  function setProgress(p) {
    manager.call("loading.progress", p);
  }

  function showLoading() {
    setLabel("LOADING...");
  }

  function swfUrl() {
    var v = metas["app.flashmovie"];
    return v != null ? v : "main.swf";
  }

  // 播放器出现后淡入；等影片载到指定帧再移除加载层
  function watchPlayer(player) {
    var hideLoading = function () { removeNode(loadingEl); };
    setStyle(player, "opacity", "0");
    waitUntil(function () {
      return ("PercentLoaded" in player) && player.PercentLoaded() > 0;
    }, function () {
      setStyle(player, "transition", "opacity 0.5s");
      setStyle(player, "opacity", "1");
      var totalFrames = ("TotalFrames" in player)
        ? (typeof player.TotalFrames === "number" ? player.TotalFrames : player.TotalFrames())
        : 0;
      if (("TGetProperty" in player) && totalFrames > 1) {
        showLoading();
        var frames = metas["app.flashframe"] != null ? metas["app.flashframe"] : 1;
        var last;
        waitUntil(function () {
          var pct = player.PercentLoaded();
          if (last !== pct) { last = pct; setProgress(pct / 100); }
          return +player.TGetProperty("/", 12) >= frames - 1;
        }, hideLoading, true);
      } else {
        hideLoading();
      }
    }, true);
  }

  function mountPlayer(player) {
    if (containerEl.prepend) containerEl.prepend(player);
    else containerEl.insertBefore(player, containerEl.childNodes[0] || null);
    metas["element.main"] = player;
    watchPlayer(player);
  }

  function loadIntoRuffle(player, source) {
    setLabel("LOAD PLAYER...");
    var target = player.ruffle ? player.ruffle(1) : player;
    target.load(assign({}, metas["app.ruffleconfig"], source, {
      allowFullscreen: true,
      allowNetworking: "all",
      allowScriptAccess: true,
      polyfills: false,
      autoplay: "on",
      unmuteOverlay: "hidden",
      deviceFontRenderer: "canvas",
      splashScreen: false,
      preloader: false
    })).then(function () {
      setLabel("READY...");
    }, function (err) {
      setLabel(String(err));
    });
  }

  function startRuffle() {
    var player = RufflePlayer.newest().createPlayer();
    setStyle(player, "width", "100%");
    setStyle(player, "height", "100%");
    try {
      Object.defineProperty(player, "nodeName", { get: function () { return "EMBED"; } });
    } catch (e) {}
    for (var k in FLASH_PARAMS) player.setAttribute(k, FLASH_PARAMS[k]);
    mountPlayer(player);

    var url = swfUrl();
    if (typeof XMLHttpRequest === "undefined") {
      loadIntoRuffle(player, { url: url });
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer";
    xhr.open("GET", url, true);
    showLoading();
    var sizes = metas["app.size"];
    var expected = sizes ? sizes[url] : undefined;
    xhr.onprogress = function (e) {
      var computable = e.lengthComputable != null ? e.lengthComputable : e.total > 0;
      if (computable) setProgress(e.loaded / e.total);
      else if (expected > 0) setProgress(e.loaded / expected);
      else setLabel("LOADING (" + e.loaded + ")");
    };
    xhr.onload = function () {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        var data = xhr.response;
        if (expected > 0 && expected !== data.byteLength) setLabel("data modified");
        else loadIntoRuffle(player, { data: data });
      } else {
        setLabel(status + " " + xhr.statusText);
      }
    };
    xhr.onabort = xhr.onerror = xhr.ontimeout = function (e) {
      setLabel(e.type + ": " + url);
    };
    xhr.send();
  }

  // 1 = 浏览器装有 Flash 插件，2 = IE 的 ActiveX Flash，0 = 无
  function detectNativeFlash() {
    try {
      var plugin = navigator.plugins && navigator.plugins.namedItem("Shockwave Flash");
      if (plugin && /\.dll$/.test(plugin.filename)) return 1;
    } catch (e) {}
    try {
      if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) return 2;
    } catch (e) {}
    return 0;
  }

  function startNativeFlash(kind) {
    var obj = document.createElement("object");
    obj.setAttribute("id", "main");
    obj.setAttribute("type", "application/x-shockwave-flash");
    obj.setAttribute("width", "100%");
    obj.setAttribute("height", "100%");
    for (var k in FLASH_PARAMS) {
      var p = document.createElement("param");
      p.setAttribute("name", k);
      p.setAttribute("value", FLASH_PARAMS[k]);
      obj.appendChild(p);
    }
    if (kind === 2 && document.documentMode < 11) obj = obj.cloneNode(true);
    mountPlayer(obj);
    var url = swfUrl();
    var movie = document.createElement("param");
    movie.setAttribute("name", "movie");
    movie.setAttribute("value", url);
    obj.appendChild(movie);
    if (kind === 2) obj.movie = url;
  }

  function supportsModernJs() {
    try {
      return !!new Function("(a)=>(a??={...a})");
    } catch (e) {
      return false;
    }
  }

  manager.call("ready").then(function () {
    var g = window;
    g.RufflePlayer = g.RufflePlayer || {};
    g.RufflePlayer.config = assign(g.RufflePlayer.config || {}, { polyfills: false });

    var flash = detectNativeFlash();
    if (flash > 0) {
      startNativeFlash(flash);
    } else if (typeof RufflePlayer !== "undefined" && RufflePlayer.newest) {
      startRuffle();
    } else if (supportsModernJs()) {
      setLabel("Ruffle not found. Make sure ../@ruffle-rs/ruffle@0.6.0/ruffle.js is loaded before main.js");
    } else {
      setLabel("No support flash or ruffle");
    }
  });
}();
