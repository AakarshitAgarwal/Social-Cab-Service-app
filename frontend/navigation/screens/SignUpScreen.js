import React from 'react';

import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';    //from npm install react-native-animatable --save
import LinearGradient from 'react-native-linear-gradient';     //from npm install react-native-linear-gradient --save and npm i react-native-linear-gradient
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Users from '../model/users'

const SignInScreen = ({navigation}) => {

    //state of the screen
    const [data, setData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        check_usertextInputChange: false,
        check_emailtextInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

//A single function for both Input changes
    const textInputChange = (name, val) => {
        switch (name) {
            //for email
            case 'email':
                if (val.trim().length >= 4) {  //if field is not empty then we will update our state
                    setData({
                        //added destructuring operator to get existing state
                        ...data,   //this will access the data array created above
                        email: val,
                        check_emailtextInputChange: true
                    });
                } else {
                    setData({
                        ...data,
                        email: val,
                        check_emailtextInputChange: false    //false*
                    });
                }
                return;
            //for username
            case 'username':
                if (val.trim().length >= 4) {
                    setData({
                        ...data,
                        username: val,
                        check_usertextInputChange: true
                    });
                } else {
                    setData({
                        ...data,
                        username: val,
                        check_usertextInputChange: false
                    });
                }
        }
        return data;
    }
    //for password
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    //for Confirm password
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }
    //for toggling the icon of password
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry  //if it is true than it will be false and vice-versa
        });
    }
    //for toggling the icon of confirm_password
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    //for generating authToken randomly
    function generate_token(length) {
        //edit the token allowed characters
        let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        let b = [];
        for (let i = 0; i < length; i++) {
            let j = (Math.random() * (a.length - 1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    //for id
    function generateId() {
        // let [currentId] = Users.slice(-1);
        //
        // console.log(currentId.id);
        // return currentId.id + 1;
        console.log(Math.floor((Math.random())));
        return Math.random() + 4;
    }

    //pushing the entered information to Users array
    const passData = () => {
        // try {
        //     Users.push({
        //         id: generateId(),
        //         username: data.username,
        //         email: data.email,
        //         password: data.password,
        //         userToken: generate_token(16),
        //     });
        //     for (let i in Users) {
        //         console.log(Users[i]);
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
        axios.post('http://192.168.1.8:8000/register/', {
            "username": data.username,
            "email": data.email,
            "password": data.password,
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"   //this will change status acc to phones
            />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome   //icon on the username
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange('username', val)}
                    />
                    {data.check_usertextInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}

                </View>
                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome   //icon on the email
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange('email', val)}
                    />

                    {/*<Feather
                        name="check-circle"
                        color="green"
                        size={20}
                    />*/}
                    {data.check_emailtextInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}

                </View>
                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather   //icon on the email
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry}   //if it is true than it will be true otherwise it will be false
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity   //for eye ion it will be better
                        onPress={updateSecureTextEntry}
                    >

                        {data.secureTextEntry ?
                            //this feature will make eye off-on
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Confirm Password</Text>
                <View style={styles.action}>
                    <Feather   //icon on the email
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirm Your Password"
                        secureTextEntry={data.confirm_secureTextEntry}   //if it is true than it will be true otherwise it will be false
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity   //for eye ion it will be better
                        onPress={updateConfirmSecureTextEntry}
                    >

                        {data.confirm_secureTextEntry ?
                            //this feature will make eye off-on
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]} onPress={() => passData()}>
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()} //goBack function so that we can go back to the screen
                        //onPress={()=>navigation.navigate('Working')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>

        </View>

    );
};
export default SignInScreen;

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,   // 1/4 screen is for header
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,    // 3/4 screen is for footer
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});