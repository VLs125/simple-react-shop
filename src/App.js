import './App.css';
import React from "react";
import HomePage from "./pages/homepage/home.page";
import {Route, Switch} from 'react-router-dom'
import ShopPage from "./pages/shop/shop.page";
import Header from "./components/header/header.component";
import SignPage from "./pages/sign/sign.page";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";

class App extends React.Component {
    constructor() {
        super();
        this.state={
            currentUser:null,
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
          if(userAuth){
            const userRef = await createUserProfileDocument(userAuth);
           userRef.onSnapshot(snapshot => {
               this.setState({
                   currentUser:{
                       id:snapshot.id,
                       ...snapshot.data(),
                   }
               });
               console.log(this.state)
           });
          }
          else{
              this.setState({currentUser:userAuth});
          }


        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route  path='/shop' component={ShopPage}/>
                    <Route  path ='/sign' component ={SignPage}/>
                </Switch>
            </div>
        );
    }


}

export default App;
