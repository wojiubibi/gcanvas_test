import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {GCanvasView, GImage} from './react-native-gcanvas';
// import {Asset} from 'expo-asset';

// import DrawWave from './wave';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.state = {
      debugInfo: 'Click me to draw some on canvas',
    };

    // only useful on Android, because it's always true on iOS
    this.isGReactTextureViewReady = true;
    setTimeout(() => {
      this.drawSome()
    }, 2000);
  }

  initCanvas = (canvas) => {
    if (this.canvas) {
      return;
    }

    this.canvas = canvas;
    if (Platform.OS === 'web') {
      // canvas.width not equal canvas.clientWidth, so have to assign again
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
    this.ctx = this.canvas.getContext('2d');
  };

  drawSome = async () => {
    // On Android, sometimes this.isGReactTextureViewReady is false e.g.
    // navigate from a canvas page into a drawer item page with
    // react-navigation on Android, the canvas page will be maintain
    // mounted by react-navigation, then if you continually call
    // this drawSome() in some loop, it's wasting CPU and GPU,
    // if you don't care about such wasting, you can delete
    // this.isGReactTextureViewReady and related onIsReady.

    if (this.ctx && this.isGReactTextureViewReady) {
      setTimeout(() => {
        // DrawWave(this.canvas);
       var imageData = this.ctx.getImageData(0,0,50,50);
       console.log(imageData.data.length)
       this.ctx.putImageData(imageData, 100, 100);
      }, 5000);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.beginPath();

      //rect
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(0, 0, 50, 50);

      //rect
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(50, 50, 50, 50);

      this.ctx.fill();

      this.ctx.beginPath();

      //circle
      this.ctx.fillStyle = 'blue';
      this.ctx.moveTo(100, 150);
      this.ctx.arc(125, 125, 25, 0, Math.PI * 2, true);

      this.ctx.fill();

      // if `import '@flyskywhy/react-native-browser-polyfill';`, can just `let imageHttp = new Image()` here
      let imageHttp = Platform.OS === 'web' ? new Image() : new GImage();
      imageHttp.crossOrigin = true; // need this to solve `Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.` on Web
      imageHttp.onload = () => {
        this.ctx.drawImage(imageHttp, 70, 0, 112, 37);
      };
      imageHttp.onerror = (error) => {
        this.setState({
          debugInfo: error.message,
        });
      };
      // imageHttp.src =
      //   '//gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png';
      // if use `//` above, will be convert to `http:` in `packages/gcanvas/src/env/image.js`,
      // then in Android release mode, will cause error:
      // `CLEARTEXT communication to gw.alicdn.com not permitted by network security policy`,
      // so use `https://` below
      imageHttp.src =
        'https://gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png';

      // let imageRequire = Platform.OS === 'web' ? new Image() : new GImage();
      // imageRequire.onload = () => {
      //   this.ctx.drawImage(imageRequire, 0, 100, 120, 120);
      // };
      // imageRequire.onerror = (error) => {
      //   this.setState({
      //     debugInfo: error.message,
      //   });
      // };
      // let asset = await Asset.fromModule(
      //   require('@flyskywhy/react-native-gcanvas/tools/build_website/assets/logo-gcanvas.png'),
      // );
      // imageRequire.src = asset.uri;
    }
  };

  takePicture = () => {
    if (this.canvas) {
      const data = this.canvas.toDataURL();
      console.warn(data);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableHighlight onPress={this.drawSome}>
          <Text style={styles.welcome}>{this.state.debugInfo}</Text>
        </TouchableHighlight> */}
        {Platform.OS === 'web' ? (
          <canvas
            ref={this.initCanvas}
            style={
              {
                width: 200,
                height: 300,
              } /* canvas with react-native-web can't use width and height in styles.gcanvas */
            }
          />
        ) : (
          <GCanvasView
            onCanvasCreate={this.initCanvas}
            onIsReady={(value) => (this.isGReactTextureViewReady = value)}
            isGestureResponsible={true /* Here is just for example, you can remove this line because default is true */}
            style={styles.gcanvas}
          />
        )}
        {/* <TouchableHighlight onPress={this.takePicture}>
          <Text style={styles.welcome}>Click me toDataURL()</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gcanvas: {
    width: '100%',
    height: '100%',
    position: 'absolute'
    // backgroundColor: '#FF000030', // TextureView doesn't support displaying a background drawable since Android API 24
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});