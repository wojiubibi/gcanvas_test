# @flyskywhy/react-native-browser-polyfill

Browser polyfill with native canvas 2d 3d for React Native, can directly use canvas based html frameworks without code modified, e.g. [zdog](https://github.com/metafizzy/zdog).

`@flyskywhy/react-native-browser-polyfill` is forked from [@expo/browser-polyfill](https://github.com/expo/browser-polyfill), then use `@flyskywhy/react-native-gcanvas` instead of `expo-2d-context`, use `event-target-shim` instead of `fbemitter`, and fix some bugs.

### Installation

```bash
npm install @flyskywhy/react-native-browser-polyfill @flyskywhy/react-native-gcanvas
```

And follow [the steps to install @flyskywhy/react-native-gcanvas](https://github.com/flyskywhy/react-native-gcanvas#react-native).

### Usage

Import the library just into your project root `/index.js` , `/index.android.js` , `/index.ios.js` or `/index.native.js`.

If you don't want import it in your project root, you can also import the library into any JavaScript file where you want use it.

```js
import '@flyskywhy/react-native-browser-polyfill';
```

If canvas 2d or 3d needed, ref to README.md of [@flyskywhy/react-native-gcanvas](https://github.com/flyskywhy/react-native-gcanvas), or just ref to [demo/zdog-and-tests.js](demo/zdog-and-tests.js) here.

## Example
### zdog
No need modify any code of framework [zdog](https://github.com/metafizzy/zdog) itself.

Only modify one line code of app demo [Made with Zdog CodePen Collection](https://codepen.io/collection/DzdGMe/), e.g. just modify `.zdog-canvas` in `JS` of [https://codepen.io/clarke-nicol/pen/OezRdM](https://codepen.io/clarke-nicol/pen/OezRdM) into `this.canvas` in `zdog()` of [demo/zdog-and-tests.js](demo/zdog-and-tests.js).

Here is the result of [demo/zdog-and-tests.js](demo/zdog-and-tests.js), you can directly discover that the `render` and `mousemove` is same with the original html version [https://codepen.io/clarke-nicol/pen/OezRdM](https://codepen.io/clarke-nicol/pen/OezRdM).

<img src="https://raw.githubusercontent.com/flyskywhy/react-native-browser-polyfill/master/assets/zdog-and-tests.gif" width="480">

## Implements

## DOM

DOM is provided with very low support, these are used for libs like pixi.js that validate type.

```js
class Node
class Element
class Document
class HTMLImageElement
class Image
class ImageBitmap
class HTMLVideoElement
class Video
class HTMLCanvasElement
class Canvas
```

### Image, HTMLImageElement, ImageBitmap

Image can load from `https://somewhere.com/some.png` or from require('some.png') on Android, iOS and Web, ref to the [demo/zdog-and-tests.js](demo/zdog-and-tests.js).

```js
const image = document.createElement('img');
const image = new global.HTMLImageElement();
const image = new Image();

image.onload = () => console.log('Can recieve event load by onload');
image.addEventListener('load', () => console.log('Also can recieve event load by addEventListener');
```

### Canvas, HTMLCanvasElement
[Example As Usage of @flyskywhy/react-native-gcanvas](https://github.com/flyskywhy/react-native-gcanvas#example-as-usage)

### window as global

```js
addEventListener;
removeEventListener;
dispatchEvent;
Buffer;
TextDecoder;
TextEncoder;
document;
Document;
Element;
Image;
HTMLImageElement;
ImageBitmap;
CanvasRenderingContext2D;
WebGLRenderingContext;
// window.devicePixelRatio; // undefined as described in `src\resize.js`
window.screen.orientation;
userAgent;
location;
```

### Document

```js
document.createElement;
document.createElementNS;
```

### Element

#### All sizes return the window size:

```js
element.clientWidth;
element.clientHeight;
element.innerWidth;
element.innerHeight;
element.offsetWidth;
element.offsetHeight;
element.getBoundingClientRect;
```

#### Empty attributes that prevent libraries from crashing

```js
element.tagName;
element.setAttributeNS;
```

### Node

```js
node.ownerDocument;
node.className;
node.addEventListener;
node.removeEventListener;
node.dispatchEvent;
node.appendChild;
node.insertBefore;
node.removeChild;
```

# External Libraries

Some external node.js polyfills are added as well.

## [text-encoding](https://github.com/inexorabletash/text-encoding)

```
global.TextEncoder
global.TextDecoder
```

## [xmldom-qsa](https://github.com/zeligzhou/xmldom-qsa)

```
window.DOMParser
```
