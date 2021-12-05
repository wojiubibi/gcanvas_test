import { byteLength, toByteArray, fromByteArray } from 'base64-js';
import GLmethod from '../context/webgl/GLmethod';

const isReactNativeIOS = () => {
  return GBridge.Platform.OS === 'ios';
};

const isReactNativeAndroid = () => {
  return GBridge.Platform.OS === 'android';
};

let isDebugging = false;

let isComboDisabled = false;

const logCommand = (function () {
  const methodQuery = [];
  Object.keys(GLmethod).forEach(key => {
    methodQuery[GLmethod[key]] = key;
  });
  const queryMethod = (id) => {
    return methodQuery[parseInt(id)] || 'NotFoundMethod';
  };
  const logCommand = (id, cmds) => {
    const mId = cmds.split(',')[0];
    const mName = queryMethod(mId);
    console.log(`=== callNative - componentId:${id}; method: ${mName}; cmds: ${cmds}`);
  };
  return logCommand;
})();

function joinArray(arr, sep) {
  let res = '';
  for (let i = 0; i < arr.length; i++) {
    if (i !== 0) {
      res += sep;
    }
    res += arr[i];
  }
  return res;
}

const commandsCache = {};

const GBridge = {

  GCanvasModule: null,

  Platform: null,

  callEnable: (ref, configArray) => {
    commandsCache[ref] = [];

    return GBridge.GCanvasModule.enable({
      componentId: ref,
      config: configArray
    });
  },

  callEnableDebug: () => {
    isDebugging = true;
  },

  callEnableDisableCombo: () => {
    isComboDisabled = true;
  },

  callSetContextType: function (componentId, context_type) {
    GBridge.GCanvasModule.setContextType(context_type, componentId);
  },

  callToDataURL: function (componentId, mimeType, quality) {
    return GBridge.GCanvasModule.toDataURL(componentId, mimeType, quality);
  },

  callReset: function (componentId) {
    GBridge.GCanvasModule.resetComponent && GBridge.GCanvasModule.resetComponent(componentId);
  },

  render: function (componentId) {
    return GBridge.GCanvasModule.extendCallNative({
      contextId: componentId,
      type: 0x60000001,
      args: '365', // 365 is a nonexistent webgl command, but need it to display graphics on react-native-gcanvas
    });
  },

  render2d: function (componentId, commands) {
    if (isDebugging) {
      console.log('>>> >>> render2d ===');
      console.log('>>> commands: ' + commands);
    }

    GBridge.GCanvasModule.render(commands, componentId);
  },

  flushNative: function (componentId) {
    const cmdArgs = joinArray(commandsCache[componentId], ';');
    commandsCache[componentId] = [];

    if (isDebugging) {
      console.log('>>> >>> flush native ===');
      console.log('>>> commands: ' + cmdArgs);
    }

    const result = GBridge.GCanvasModule.extendCallNative({
      contextId: componentId,
      type: 0x60000000,
      args: cmdArgs,
    });

    const res = result && result.result;

    if (isDebugging) {
      console.log('>>> result: ' + res);
    }

    return res;
  },

  callNative: function (componentId, cmdArgs, cache) {
    if (isDebugging) {
      logCommand(componentId, cmdArgs);
    }

    commandsCache[componentId].push(cmdArgs);

    if (!cache || isComboDisabled) {
      return GBridge.flushNative(componentId);
    } else {
      return undefined;
    }
  },


  texImage2D(componentId, ...args) {
    if (isReactNativeIOS()) {
      if (args.length === 6) {
        const [target, level, internalformat, format, type, image] = args;
        GBridge.callNative(
          componentId,
          GLmethod.texImage2D + ',' + 6 + ',' + target + ',' + level + ',' + internalformat + ',' + format + ',' + type + ',' + image.src
        );
      } else if (args.length === 9) {
        const [target, level, internalformat, width, height, border, format, type, image] = args;
        GBridge.callNative(
          componentId,
          GLmethod.texImage2D + ',' + 9 + ',' + target + ',' + level + ',' + internalformat + ',' + width + ',' + height + ',' + border + ',' +
          + format + ',' + type + ',' + (image ? image.src : 0)
        );
      }
    } else if (isReactNativeAndroid()) {
      if (args.length === 6) {
        const [target, level, internalformat, format, type, image] = args;
        GBridge.GCanvasModule.texImage2D(componentId, target, level, internalformat, format, type, image.src);
      } else if (args.length === 9) {
        const [target, level, internalformat, width, height, border, format, type, image] = args;
        GBridge.GCanvasModule.texImage2D(componentId, target, level, internalformat, width, height, border, format, type, image ? image.src : 0);
      }
    }
  },

  texSubImage2D(componentId, target, level, xoffset, yoffset, format, type, image) {
    if (isReactNativeIOS()) {
      if (arguments.length === 8) {
        GBridge.callNative(
          componentId,
          GLmethod.texSubImage2D + ',' + 6 + ',' + target + ',' + level + ',' + xoffset + ',' + yoffset, + ',' + format + ',' + type + ',' + image.src
        );
      }
    } else if (isReactNativeAndroid()) {
      GBridge.GCanvasModule.texSubImage2D(componentId, target, level, xoffset, yoffset, format, type, image.src);
    }
  },

  bindImageTexture(componentId, src, imageId) {
    GBridge.GCanvasModule.bindImageTexture([src, imageId], componentId, function (e) {

    });
  },

  perloadImage([url, id], callback) {
    GBridge.GCanvasModule.preLoadImage([url, id], function (image) {
      image.url = url;
      image.id = id;
      callback(image);
    });
  },
  getImageData(componentId, x, y, width, height) {
    var imageDataBase4 = GBridge.GCanvasModule.getImageData(componentId, x, y, width, height);
    // console.log(imageDataBase4);
    var length = byteLength(imageDataBase4)
    if (length > 0) {
      return {
        data: toByteArray(imageDataBase4),
        width,
        height
      }
    }
    return {
      data: [],
      width: 0,
      height: 0
    }
  },
  putImageData(componentId, imageData, dx, dy, sx, sy, width, height) {
    GBridge.GCanvasModule.putImageData(componentId, fromByteArray(imageData.data), dx, dy, sx ? parseInt(sx) : 0, sy ? parseInt(sy) : 0, width ? parseInt(width) : imageData.width, height ? parseInt(height) : imageData.height);
  }
};

export default GBridge;
