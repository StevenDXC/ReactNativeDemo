const React = require('react');
const ReactNative = require('react-native');

const {
  Image,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} = ReactNative;

class LoadingView extends React.Component {

     constructor(props){
        super(props);
        this.state = {
            error:false,
            errorText:"",
        }
     }

     onFetchError(text){
         this.setState({error:true,errorText:text});
     }

     render(){
         if(this.state.error){
            return(
               <View style={styles.container}> 
                  <Image style={styles.image} source={require('../res/error.png')}/>
                  <Text style={styles.loadingText}>{this.state.errorText}</Text>
              </View>
           );          
         }else{
           return(
               <View style={styles.container}> 
                  <ActivityIndicator color="red" size="small" />
                  <Text style={styles.loadingText}>Loading...</Text>
              </View>
           );  
         }
       
     }
}

const styles = StyleSheet.create({
   container:{
       flex:1,
       flexDirection: 'column',
       alignItems: 'center',
   },
   loadingText:{
      marginTop:8,
      color:"black"
   },
   image:{
      width:48,
      height:48, 
   },
});
module.exports=LoadingView;