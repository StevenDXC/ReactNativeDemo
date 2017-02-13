const React = require('react');
const ReactNative = require('react-native');

const {
  Image,
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Platform,
} = ReactNative;

import { Actions } from 'react-native-router-flux';
import LoadingView from '../components/LoadingView'

class RepoList extends React.Component{

 constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });
    this.state = {
      dataSource: ds,
      refreshing:false,
      loading:true,
    };
  }

fetchData(){
  return fetch('https://api.github.com/users/StevenDXC/repos')
       .then((response)=>response.json())
       .then((json)=>{
             this.setState({dataSource:this.state.dataSource.cloneWithRows(json),loading:false})
        })
       .catch((error)=>{
           this.refs.loading.onFetchError(error.message);
       });
}  

componentDidMount(){
    this.fetchData().done();
}

 _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    }).done();
  }

  _onRowPressed(rowData){
    this.props.navigator.push({
       title: rowData.name,
       component:RepoDetail,
       barTintColor:'red',
       tintColor:"black",
       passProps:{url:rowData.html_url},
    });
  }

 render() {
      if(this.state.loading){
          return(
            <View style={styles.container}>
            <LoadingView 
            ref="loading"
            style={styles.loading}/>
            </View>
          ); 
      }else{
          return( 
            <ListView
              style={styles.list}
              refreshControl={
                 <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this._onRefresh.bind(this)}
                />
              }
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => this.renderRow(rowData)}
              renderSeparator={this.renderSeparator}
             />);
      }
 }

renderRow(rowData){
   return( 
     <TouchableHighlight
       underlayColor="#CCCCCC"
       onPress={()=>{
            Actions.RepoDetail({title:rowData.name,url:rowData.html_url});
       }}>
       <View style={styles.row}>
         <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={styles.rowText}>{rowData.name}</Text>
            <Image style={styles.fork} source={rowData.fork ? require('../res/fork_blue.png') : null}/>
         </View>
         <Text style={styles.descText}>{rowData.description}</Text>
         <View style={{flex:1,alignItems:'center',flexDirection:'row',marginTop:8}}>
            
            <View style={styles.countContainer}>
                 <Image
                    style={styles.iconSmall} 
                    source={require('../res/watch.png')}
                 />
             <Text style={styles.countText}>{rowData.watchers_count}</Text>
             </View>

             <View style={styles.countContainer}>
             <Image
                style={styles.iconSmall} 
                source={require('../res/start.png')}
             />
             <Text style={styles.countText}>{rowData.stargazers_count}</Text>
             </View>

             <View style={styles.countContainer}>
             <Image
                style={styles.iconSmall} 
                source={require('../res/fork.png')}
             />
             <Text style={styles.countText}>{rowData.forks_count}</Text>
            </View>
        </View>
      </View>
    </TouchableHighlight>
    );
}
       

renderSeparator(sectionID, rowID){
    return (
      <View
        key={sectionID+rowID}
        style={{
          height: 1,
          backgroundColor:'#CCCCCC',
        }}
      />
    );
}

}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection:'row',
     justifyContent:'center',
     alignItems:"center",
     ...Platform.select({
        ios:{
          marginTop:64,
        },
        android:{
          marginTop:54,
        }
     }),
  },
  list:{
     flex: 1,
     ...Platform.select({
        ios:{
          marginTop:64,
        },
        android:{
          marginTop:54,
        }
     }),
  },
  loading:{
      flex:1,
  },
  row:{
    padding:8,
    flexDirection: 'column',
  },
  rowText:{
     fontSize:15,
     color:"#333333"
  },
  descText:{
     flex:1,
     fontSize:12,
     marginTop:4,
     color:"#666666",
  },
  fork:{
     width:12,
     height:12,
     marginLeft:4,
  },
  countContainer:{
     flexDirection:"row",
     width:32,
     alignItems:"center",
  },
  iconSmall:{
    width:12,
    height:12,
  },
  countText:{
    fontSize:10,
    color:"#666666",
    marginLeft:2,
  }
});

module.exports=RepoList;
