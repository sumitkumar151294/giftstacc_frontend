import React, { useState } from 'react'
import img from "../../../Assets/img/EndUser/side-cut.png"
// import { useDispatch } from 'react-redux'
// import { onLoginSubmit, onSignUpSubmit } from '../../redux/modules/loginSlice';

const Login = () => {

    // const dispatch = useDispatch();
    const [data, setData] = useState({ phone_no: '' })
    const [userData,setUserData]=useState({fname:'', lname:'',mobile_no:'',email:'', password:'' })
    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(onLoginSubmit(data));  
        console.log(data) 
    }

    const userDataSubmit = (e)=>{
        e.preventDefault();
        console.log(userData)
        // dispatch(onSignUpSubmit(userData));   
    }


   

    return (
        <>
            <div class="modal fade" id="loginmodal">
                <div class="modal-dialog loginmodalsize modal-dialog-centered">
                    <div class="modal-content rounded-3">
                        <div class="loginpop">
                            <button type="button" class="close modalclosebtn" data-bs-dismiss="modal">&times;</button>
                            <div class="login-form2">
                                <div class="row marginrow">

                                    <div class="col-lg-4">
                                        <img class="w-100 new-h2" src={img} />
                                    </div>

                                    <div class="col-lg-8">
                                        <div class="row p-2">
                                            <div class="col-md-12 input-main">
                                                <h3>LOG IN</h3>
                                                <h5>Receive an otp to access your account</h5>

                                            </div>

                                            
                                                <div class="col-md-12 input-main">
                                                    <div class="floating-box ">
                                                        <input name="ctl00$txtusername" type="text" id="ctl00_txtusername" class="floating-input" onChange={(e) => {
                                                            setData({
                                                                ...data, phone_no:
                                                                    e.target.value
                                                            })
                                                        }} placeholder="Enter Mobile no. or Email ID" />
                                                        <span id="ctl00_RequiredFieldValidator1"
                                                            style={{ color: 'red', display: 'none' }}
                                                        >*</span>
                                                    </div>
                                                </div>
                                            

                                            <div class="col-md-12 input-main">

                                            </div>

                                            <form onSubmit={handleSubmit} >
                                            <div class="col-md-12 input-main">
                                                <div class="floating-box ">
                                                    <input type="submit" name="ctl00$btnlogin" value="Login" id="ctl00_btnlogin" class="loginbtn" />

                                                </div>
                                                <div class="mt-3">
                                                    <span id="ctl00_litloginmsg"></span>
                                                </div>
                                            </div>
                                            </form>

                                            <div class="col-md-12 input-main d-none">
                                                <div class="signupbox">
                                                    <div class="signupboxinner">
                                                        <p>or</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 input-main d-none">
                                                <div class="row m-n2">
                                                    <div class="col-md-6 p-2">
                                                        <div class="sociallogin">

                                                            <a id="ctl00_btnfblogin" class="fbbgcolor" href="javascript:__doPostBack(&#39;ctl00$btnfblogin&#39;,&#39;&#39;)"><i class="lab la-facebook-f"></i>Facebook</a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 p-2">
                                                        <div class="sociallogin">

                                                            <a id="ctl00_btngoogle" class="googlebgcolor" href="javascript:__doPostBack(&#39;ctl00$btngoogle&#39;,&#39;&#39;)">  <img src="https://beta.shop-loyalty.com/images/googleicon.png" />Google</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="otpmodal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-3">
                        <div class="loginpop">
                            <button id="ctl00_btncloseotpmodel" type="button" class="close modalclosebtn" data-bs-dismiss="modal">&times;</button>

                            <div class="login-logo">
                                <h3 class="heading text-center">Confirm OTP</h3>
                                <p class="text-gray">
                                    Enter OTP sent to
                                    <span id="ctl00_lblmobile"></span>
                                    &
                                    <span id="ctl00_lblemail"></span><small>
                                        <a class="text-dark ml-3 editnumberbtn" data-toggle="modal" href="javascript:void(0)" data-target="#loginmodal" data-dismiss="modal"><span class="float-right"><i class="fas fa-pen"></i>Edit</span></a>
                                    </small>
                                </p>

                            </div>
                            <div class="login-form">
                                <div class="row m-n2">

                                    <div class="col-md-12 p-2">
                                        <div class="floating-box ">
                                            <div class="text-center">

                                                <span id="ctl00_Label2" class="text-danger"
                                                    style={{ color: 'red' }}
                                                ></span>
                                                <span id="ctl00_otpmsg"
                                                    style={{ color: 'red' }}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 p-2">
                                        <div class="floating-box ">
                                            <label>Enter OTP</label>
                                            <input name="ctl00$txtotp" type="text" id="txtotp" class="floating-input" />

                                            <span id="ctl00_RequiredFieldValidator15"
                                                style={{ color: 'red', display: 'none' }}
                                            >*</span>
                                        </div>
                                    </div>
                                    <div class="col-6 p-2">
                                        {/* <script type="text/javascript">

                                        //var submit = 0;
                                        //function CheckDouble() {
                                        //    if (Page_ClientValidate()) {
                                        //        if (++submit > 1) {
                                        //            alert('Request is under process - please be patient.');
                                        //            return false;
                                        //        }
                                        //    }
                                        //}
                                        //$(document).ready(function () {
                                        //    $("#btnsubmit").click(function () {

                                        //        setTimeout(function () {
                                        //            $(this).prop('disabled', true);
                                        //        }, 00);

                                        //    });
                                        //});                         
                                        function disableClick(elem) {
                                            // var x = document.forms["myForm"]["fname"].value;
                                            var TestVar = document.getElementById('txtotp').value;
                                            if (TestVar != "") {
                                                elem.disabled = true;
                                            }
                                        }

                                        function disableClick2(elem) {
                                            elem.disabled = true;
                                        }

                                    </script> */}


                                        <div class="floating-box ">
                                            <input type="button" name="ctl00$btnsubmit" value="Verify" id="ctl00_btnsubmit" class="loginbtn" />

                                        </div>


                                    </div>
                                    <div class="col-6 p-2">

                                        <div class="resend-button text-right">
                                            <span id="timer"></span>
                                            <small>
                                                <div id="resend"
                                                    style={{ display: 'none' }}
                                                >

                                                    <a id="btnresetotp" class="py-2 text-gray d-inline-block" href="javascript:__doPostBack(&#39;ctl00$btnresetotp&#39;,&#39;&#39;)"
                                                        style={{ display: 'none' }}
                                                    >resend OTP</a>

                                                </div>
                                            </small>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div class="modal fade" id="signupmodal">
                <div class="modal-dialog modal-dialog-centered loginmodalsize">
                    <div class="modal-content rounded-3">
                        <div class="loginpop">
                            <button type="button" class="close modalclosebtn" data-bs-dismiss="modal">&times;</button>
                            <div class="login-form">
                                <div class="row marginrow">
                                    <div class="col-lg-4">
                                        <img class="w-100 new-h" src={img} />
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="row p-2">
                                            <div class="col-md-12 input-main">
                                                <h3>Sign up with Customer Capital to get the best offers</h3>
                                                <h5><i>All Fields are Mandatory</i></h5>
                                            </div>
                                            <div class="col-md-6 input-main">
                                                <div class="floating-box ">
                                                    <input name="ctl00$txtname" type="text" id="ctl00_txtname" class="floating-input" placeholder="First Name"
                                                    
                                                    onChange={(e) => {
                                                        setUserData({
                                                            ...userData, fname:
                                                                e.target.value
                                                        })
                                                    }}
                                                    />
                                                    <span id="ctl00_RequiredFieldValidator3"
                                                        style={{ display: 'none', color: 'red' }}
                                                    >*</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6 input-main">
                                                <div class="floating-box ">
                                                    <input name="ctl00$txtlastname" type="text" id="ctl00_txtlastname" class="floating-input" placeholder="Last Name"
                                                    onChange={(e) => {
                                                        setUserData({
                                                            ...userData, lname:
                                                                e.target.value
                                                        })
                                                    }}
                                                    />
                                                    <span id="ctl00_RequiredFieldValidator6"
                                                        style={{ display: 'none', color: 'red' }}
                                                    >*</span>
                                                </div>
                                            </div>
                                            <div class="col-md-12 input-main">
                                                <div class="floating-box ">
                                                    <input name="ctl00$txtmobile" type="text" id="ctl00_txtmobile" class="floating-input" placeholder="Enter 10 digit mobile number"
                                                    onChange={(e) => {
                                                        setUserData({
                                                            ...userData, mobile_no:
                                                                e.target.value
                                                        })
                                                    }}
                                                    />
                                                    <span id="ctl00_RequiredFieldValidator4"
                                                        style={{ display: 'none', color: 'red' }}
                                                    >*</span>
                                                </div>
                                            </div>
                                            <div class="col-md-12 input-main">
                                                <div class="floating-box ">
                                                    <input name="ctl00$txtemail2" type="text" id="ctl00_txtemail2" class="floating-input" placeholder="Enter Email" 
                                                    onChange={(e) => {
                                                        setUserData({
                                                            ...userData, email:
                                                                e.target.value
                                                        })
                                                    }}
                                                    />
                                                    <span id="ctl00_RequiredFieldValidator5"
                                                        style={{ display: 'none', color: 'red' }}
                                                    >*</span>
                                                </div>
                                            </div>

                                            <div class="col-md-12 input-main">
                                                <div class="floating-box ">
                                                    <input name="ctl00$txtconfirmpassword" type="password" id="ctl00_txtconfirmpassword" class="floating-input" placeholder="Confirm Password"
                                                    onChange={(e) => {
                                                        setUserData({
                                                            ...userData, password:
                                                                e.target.value
                                                        })
                                                    }}
                                                    />
                                                    <div class="showpassbtn"><i id="showpass2" class="fas fa-eye-slash"></i></div>
                                                    <span id="ctl00_RequiredFieldValidator7"
                                                        style={{ display: 'none', color: 'red' }}
                                                    >*</span>

                                                </div>
                                            </div>
                                            <div class="col-md-12 input-main">
                                                <div class="radiobtnlist signupgender">
                                                    <table id="ctl00_rbtnlist" border="0">
                                                        <tr>
                                                            <td><input id="ctl00_rbtnlist_0" type="radio" name="ctl00$rbtnlist" value="Male" /><label for="ctl00_rbtnlist_0">Male</label></td><td><input id="ctl00_rbtnlist_1" type="radio" name="ctl00$rbtnlist" value="Female" /><label for="ctl00_rbtnlist_1">Female</label></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>

                                            <div class="col-md-12 input-main">
                                                <div class="checkboxlist">
                                                    <p><small>By signing up, you agree to the <a href="terms-of-use.aspx" target="_blank">Terms & Conditions</a> and <a href="privacy-policy.aspx" target="_blank">Privacy Policy</a></small></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12 input-main">

                                            </div>

                                            <div class="hide">

                                            </div>

                                            <form onSubmit={userDataSubmit} >
                                            <div class="col-md-12 input-main">
                                                <div class="floating-box ">
                                                    <input type="submit" name="ctl00$btnsignup" value="Sign Up now" id="ctl00_btnsignup" class="loginbtn" />
                                                </div>
                                            </div>
                                            </form>

                                            <div class="col-md-12 input-main">
                                                <div class="signupbox">
                                                    <div class="signupboxinner">
                                                        <p>or</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 input-main d-none">
                                                <div class="row m-n2">
                                                    <div class="col-md-6 p-2">
                                                        <div class="sociallogin">

                                                            <a id="ctl00_LinkButton1" class="fbbgcolor" href="javascript:__doPostBack(&#39;ctl00$LinkButton1&#39;,&#39;&#39;)"><i class="lab la-facebook-f"></i>Facebook</a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 p-2">
                                                        <div class="sociallogin">

                                                            <a id="ctl00_LinkButton2" class="googlebgcolor" href="javascript:__doPostBack(&#39;ctl00$LinkButton2&#39;,&#39;&#39;)">  <img src="https://beta.shop-loyalty.com/images/googleicon.png" />Google</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 input-main">
                                                <div class="text-center mt-3">
                                                    <h5 class="m-0">Have an Customer Capital account? <a href="#." data-toggle="modal" data-target="#loginmodal" data-dismiss="modal">Login here</a></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="forgotmodal">
                <div class="modal-dialog modal-dialog-centered loginmodalsize">
                    <div class="modal-content rounded-3">
                        <div class="loginpop">
                            <button type="button" class="close modalclosebtn" data-bs-dismiss="modal">&times;</button>
                            <div class="login-form">
                                <div class="row marginrow">
                                    <div class="col-md-12 input-main">
                                        <h3>Forgot Password?</h3>
                                        <h5>We will send you new password in your Email</h5>
                                    </div>
                                    <div class="col-md-12 input-main">
                                        <div class="floating-box ">
                                            <input name="ctl00$TextBox4" type="text" id="ctl00_TextBox4" class="floating-input" placeholder="Enter Email" />
                                            <span id="ctl00_RequiredFieldValidator9"
                                                style={{ display: 'none', color: 'red' }}
                                            >*</span>
                                        </div>
                                    </div>

                                    <div class="col-md-12 input-main">
                                        <div class="floating-box ">
                                            <input type="submit" name="ctl00$btnforgetpassword" value="Send" id="#" class="loginbtn" />
                                        </div>
                                    </div>
                                    <span id="ctl00_forgetmsg"></span>

                                    <div class="col-md-12 input-main">
                                        <div class="signupbox">
                                            <div class="signupboxinner">
                                                <p>or</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 input-main">
                                        <div class="signupbtnlink text-center">
                                            <a data-toggle="modal" id="signUpPopup" data-target="#signupmodal" data-dismiss="modal">Signup</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login