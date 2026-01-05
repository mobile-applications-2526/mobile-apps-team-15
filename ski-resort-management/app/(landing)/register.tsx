import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import { Redirect, Stack } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/FirebaseConfig";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "@components/AuthContext";
import StyledTextInput from "@components/StyledTextInput";
import Paragraph from "@components/text/Paragraph";
import userService from "@/services/UserService";
import { RegisterUserDto, User } from "@/types";
import { ScrollView, TextInput } from "react-native";
import { useUserStore } from "@/store/UserStore";


export default function Register() {

    const theme = useTheme();
    const {user} = useContext(AuthContext);
    const setUser = useUserStore((state) => state.setUser);

    const lastNameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const passwordConfirmationRef = useRef<TextInput>(null);

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
                            setUser(user);
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

                    <StyledTextInput placeholder="First name"
                                     accessibilityLabel="First name input"
                                     value={firstName}
                                     onChangeText={setFirstName}
                                     onSubmitEditing={() => lastNameRef.current?.focus()}
                                     returnKeyType={"next"}
                                     submitBehavior={"submit"}
                                     autoCapitalize={"words"}
                                     autoCorrect={false}
                                     textContentType={"givenName"}
                    />
                    {!!(firstNameError) &&
                        <Paragraph style={{ color: theme.colors.error, marginBottom: 0 }}>{firstNameError}</Paragraph>}
                    <StyledTextInput ref={lastNameRef} placeholder="Last name"
                                     accessibilityLabel="Last name input"
                                     value={lastName}
                                     onChangeText={setlastName}
                                     onSubmitEditing={() => emailRef.current?.focus()}
                                     returnKeyType={"next"}
                                     submitBehavior={"submit"}
                                     autoCapitalize={"words"}
                                     autoCorrect={false}
                                     textContentType={"familyName"}
                    />
                    {!!(lastNameError) && <Paragraph style={{ color: theme.colors.error }}>{lastNameError}</Paragraph>}
                    <StyledTextInput ref={emailRef} placeholder="Email"
                                     accessibilityLabel="Email input"
                                     value={email}
                                     onChangeText={setEmail}
                                     onSubmitEditing={() => passwordRef.current?.focus()}
                                     returnKeyType={"next"}
                                     submitBehavior={"submit"}
                                     autoCapitalize={"none"}
                                     autoCorrect={false}
                                     textContentType={"emailAddress"}
                                     keyboardType={"email-address"}
                    />
                    {!!(emailError) && <Paragraph style={{ color: theme.colors.error }}>{emailError}</Paragraph>}
                    <StyledTextInput ref={passwordRef}
                                     placeholder="Password"
                                     accessibilityLabel="Password input"
                                     secureTextEntry={true}
                                     value={password}
                                     onChangeText={setPassword}
                                     onSubmitEditing={() => passwordConfirmationRef.current?.focus()}
                                     autoCapitalize={"none"}
                                     autoCorrect={false}
                                     returnKeyType={"next"}
                                     submitBehavior={"submit"}
                                     textContentType={"newPassword"}
                    />
                    {!!(passwordError) && <Paragraph style={{ color: theme.colors.error }}>{passwordError}</Paragraph>}
                    <StyledTextInput ref={passwordConfirmationRef}
                                     placeholder="Password Confirmation"
                                     accessibilityLabel="Password confirmation input" secureTextEntry={true}
                                     value={passwordConfirmation}
                                     onChangeText={setPasswordConfirmation}
                                     onSubmitEditing={handleRegister}
                                     autoCapitalize={"none"}
                                     autoCorrect={false}
                                     returnKeyType={"done"}
                                     submitBehavior={"submit"}
                                     textContentType={"newPassword"}
                    />
                    {!!(passwordConfirmationError) &&
                        <Paragraph style={{ color: theme.colors.error }}>{passwordConfirmationError}</Paragraph>}
                    {!!(registerError) && <Paragraph
                        style={{ color: theme.colors.error, marginTop: theme.spacing.sm }}>{registerError}</Paragraph>}
                    <StyledButton onPress={handleRegister} primary disabled={isRegistering}>
                        {!isRegistering && "Register"}
                        {isRegistering && "Loading..."}
                    </StyledButton>
                </Card>
            </SafeAreaView>
        </>
    );
}
