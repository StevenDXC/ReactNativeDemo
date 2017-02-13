const React = require('react');
const ReactNative = require('react-native');
const {
  WebView,
  StyleSheet,
  View,
  Platform,
} = ReactNative;

var WEBVIEW_REF = 'webview';

class RepoDetail extends React.Component{

  constructor(props){
     super(props);
     console.log(props);
  }
    
  render(){
    return(
       <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.props.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
    );
  }  
}

const styles = StyleSheet.create({
   webView:{
       flex:1,
       ...Platform.select({
        ios:{
          marginTop:64,
        },
        android:{
          marginTop:54,
        }
     }),
   },
});

module.exports=RepoDetail;