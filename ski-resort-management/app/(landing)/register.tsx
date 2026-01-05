import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import { Redirect, Stack } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/FirebaseConfig";
import { useContext, useState } from "react";
import { AuthContext } from "@components/AuthContext";
import StyledTextInput from "@components/StyledTextInput";
import Paragraph from "@components/text/Paragraph";
import userService from "@/services/UserService";
import { RegisterUserDto, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Register() {

    const theme = useTheme();
    const {user} = useContext(AuthContext);

    const [firstName, setFirstName] = useState<string>("");
    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastName, setlastName] = useState<string>("");
    const [lastNameError, setlastNameError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [passwordConfirmationError, setPasswordConfirmationError] = useState<string>("");
    const [registerError, setRegisterError] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    const validate = () => {
        let result = true;
        if (!firstName || firstName.trim() === "") {
            setFirstNameError("First name is required");
            result = false;
        }
        if (!lastName || lastName.trim() === "") {
            setlastNameError("Last name is required");
            result = false;
        }
        if (!email || email.trim() === "") {
            setEmailError("Email is required");
            result = false;
        }
        if (!password || password.trim() === "") {
            setPasswordError("Password is required");
            result = false;
        }
        if (!passwordConfirmation || password !== passwordConfirmation) {
            setPasswordConfirmationError("Passwords do not match");
            result = false;
        }
        return result;
    }

    const clearErrors = () => {
        setFirstNameError("");
        setlastNameError("");
        setEmailError("");
        setPasswordError("");
        setPasswordConfirmationError("");
        setRegisterError("");
    }

    const handleRegister = () => {
        clearErrors();
        if (!validate()) return;
        setIsRegistering(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                if (userCredential.user) {
                    const gUser = userCredential.user;
                    const registerUserDto: RegisterUserDto = {uid: gUser.uid, firstName, lastName, email: gUser.email};
                    userService.registerUser(registerUserDto)
                        .then((user: User) => {
                        AsyncStorage.setItem("user", JSON.stringify(user));
                        gUser.getIdToken(true)
                    })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                if (error.message.includes("auth/email-already-in-use")) {
                    setEmailError("Email already in use. Please sign in or try another email.");
                } else if (error.message.includes("auth/invalid-email")) {
                    setEmailError("Invalid email address.");
                } else if (error.message.includes("auth/weak-password")) {
                    setPasswordError("Password must be at least 10 characters and contain at least 1 uppercase letter, 1 special character, and 1 number.");
                } else {
                    setRegisterError("An error occurred. Please try again.");
                }
            })
        setIsRegistering(false);
    }

    if (user) {
        return (
            <Redirect href={"(tabs)"}/>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Register',
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: {backgroundColor: theme.colors.surface},
                    headerTitleStyle: {color: theme.colors.text},
                    headerTintColor: theme.colors.text,
                }}/>
            <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background, justifyContent: "center"}}>
                <Card>
                    <SubHeading>Fill in your information</SubHeading>

                    <StyledTextInput placeholder="First name" value={firstName} onChangeText={setFirstName}
                                     accessibilityLabel="First name text input"/>
                    {firstNameError &&
                        <Paragraph style={{color: theme.colors.error, marginBottom: 0}}>{firstNameError}</Paragraph>}
                    <StyledTextInput placeholder="Last name" value={lastName} onChangeText={setlastName}
                                     accessibilityLabel="Last name text input"/>
                    {lastNameError && <Paragraph style={{color: theme.colors.error}}>{lastNameError}</Paragraph>}
                    <StyledTextInput placeholder="Email" value={email} onChangeText={setEmail}
                                     accessibilityLabel="Email text input"/>
                    {emailError && <Paragraph style={{color: theme.colors.error}}>{emailError}</Paragraph>}
                    <StyledTextInput placeholder="Password" value={password} onChangeText={setPassword}
                                     accessibilityLabel="Password input" secureTextEntry={true}/>
                    {passwordError && <Paragraph style={{color: theme.colors.error}}>{passwordError}</Paragraph>}
                    <StyledTextInput placeholder="Password Confirmation" value={passwordConfirmation}
                                     onChangeText={setPasswordConfirmation}
                                     accessibilityLabel="Password confirmation input" secureTextEntry={true}/>
                    {passwordConfirmationError &&
                        <Paragraph style={{color: theme.colors.error}}>{passwordConfirmationError}</Paragraph>}
                    {registerError && <Paragraph
                        style={{color: theme.colors.error, marginTop: theme.spacing.sm}}>{registerError}</Paragraph>}
                    <StyledButton onPress={handleRegister} primary disabled={isRegistering}>
                        {!isRegistering && "Register"}
                        {isRegistering && "Loading..."}
                    </StyledButton>
                </Card>
            </SafeAreaView>
        </>
    );
}
