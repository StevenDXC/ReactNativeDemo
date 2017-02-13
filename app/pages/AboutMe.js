const React = require('react');
const ReactNative = require('react-native');

const {
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} = ReactNative;
import { Actions } from 'react-native-router-flux';
import LoadingView from '../components/LoadingView'


class AboutMe extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
       loading:true,
       data:null,
    };
  }

  componentDidMount(){
    fetch("https://api.github.com/users/stevenDXC")
    .then((response)=>response.json())
    .then((json)=>{
         this.setState({data:json,loading:false})
    })
    .catch((error) => {
        this.refs.loading.onFetchError(error.message);
    })
    .done();
  }

  render(){
    if(this.state.loading){
        return(
          <View style={styles.containerLoading}>
             <LoadingView
                 ref="loading"
                 style={styles.loading}/>
          </View>
        ); 
    }else{
      return (
        <View style={styles.container}>
            <View style={styles.topView}>                                              
                <TouchableOpacity onPress={()=>{
                  Actions.pop();
                  }}>
                  <Image
                      style={styles.closeBtn}
                      source={require('../res/close.png')}
                   />
                </TouchableOpacity>
                <View style={styles.avatarContainer}>
                   <Image
                       style={styles.avatar}
                       defaultSource={require('../res/user.png')}
                       source={{uri: this.state.data.avatar_url}}
                   />
                   <Text style={{marginTop:8,fontSize:12,fontWeight:'bold'}}>{this.state.data.login}</Text>
               </View>       
            </View> 
            <View style={styles.containerInfo}>
            <Text style={{marginTop:16,fontSize:14}}>{"name: "+this.state.data.name}</Text>  
            <Text style={{marginTop:8,fontSize:14}}>{"URL: "+this.state.data.html_url}</Text>    
            <Text style={{marginTop:8,fontSize:14}}>{"Repos: "+this.state.data.repos_url}</Text>
            <Text style={{marginTop:8,fontSize:14}}>{"Repo count: "+this.state.data.public_repos}</Text>
            <Text style={{marginTop:8,fontSize:14}}>{"company: "+this.state.data.company}</Text> 
            <Text style={{marginTop:8,fontSize:14}}>{"blog: "+this.state.data.blog}</Text>
            <Text style={{marginTop:8,fontSize:14}}>{"email: "+this.state.data.email}</Text>
            <Text style={{marginTop:8,fontSize:14}}>{"location: "+this.state.data.location}</Text>
            <Text style={{marginTop:8,fontSize:14}}>{"followers: "+this.state.data.followers}</Text> 
            </View>     
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
   containerLoading:{
     flex:1,
     flexDirection: 'row',
     justifyContent:'center',
     alignItems: 'center',
   },
   container:{
     flex:1,
     flexDirection: 'column',
     alignItems: 'center',
   },
   containerInfo:{
     alignSelf: 'stretch',
     flexDirection: 'column',
     alignItems: 'flex-start',
     paddingLeft:16,
   },
   topView:{
     alignSelf: 'stretch',
     height:180,
     backgroundColor:'gold',
     flexDirection: 'column',
     shadowColor: "#000000",
     shadowOpacity: 0.4,
     shadowRadius: 1,
     shadowOffset: {
      height: 1,
      width: 0
    }
   },
   loading:{
      flex:1,
  },
  avatarContainer:{
     flex:1,
     marginTop:20,
     flexDirection:'column',
     alignItems:'center',
  },
  avatar:{
     width:48,
     height:48,
     borderRadius:24,
  },
  closeBtn:{
     width:16,
     height:16,
     marginTop:30,
     marginLeft:15,
  },
});

module.exports = AboutMe;