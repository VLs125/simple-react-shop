import React from 'react';
import './sign-in.style.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {signInWithGoogle} from "../../firebase/firebase.utils";

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.setState({
            email:'',
            password:''
        })
        console.log(this.state);
    }
    
    handleChange=(e)=>{
        const {value,name} = e.target;
        this.setState({
            [name]:value,
        })
    }

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange}
                               name="email"
                               type="email"
                               value={this.state.email}
                               label="email"
                               required/>
                    <FormInput handleChange={this.handleChange}
                               name="password"
                               type="password"
                               value={this.state.password}
                               label="password"
                               required/>
                    <div className='buttons'>
                    <CustomButton type="submit">Sign</CustomButton>
                    <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
                        Sign in with Google{''}
                    </CustomButton>
                    </div>

                </form>
            </div>
        )
    }

}

export default SignIn;