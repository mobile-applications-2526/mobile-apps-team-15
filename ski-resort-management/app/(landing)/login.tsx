import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import { Redirect, Stack } from "expo-router";
import StyledTextInput from "@components/StyledTextInput";
import { useContext, useState } from "react";
import { auth } from "@/services/FirebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "@components/AuthContext";
import Paragraph from "@components/text/Paragraph";


export default function Login() {

    const theme = useTheme();
    const {user} = useContext(AuthContext);

    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    const validate = () => {
        let result = true;
        if (!email || email.trim() === "") {
            setEmailError("Email is required");
            result = false;
        }
        if (!password || password.trim() === "") {
            setPasswordError("Password is required");
            result = false;
        }
        return result;
    }

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }


    const handleLogIn = () => {
        clearErrors();
        if (!validate()) return;
        setIsLoggingIn(true);
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => {
                if (error.message.includes("auth/invalid-credentials") || error.message.includes("auth/user-not-found") || error.message.includes("auth/wrong-password")) {
                    setLoginError("Invalid Credentials. Please try again.");
                } else {
                    console.log(error);
                    setLoginError("An error occurred. Please try again.");
                }
            });
        setIsLoggingIn(false);
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Log in',
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />
            <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background, justifyContent: "center"}}>
                <Card>
                    <SubHeading>Enter your email and password</SubHeading>

                    <StyledTextInput placeholder="Email" value={email} onChangeText={setEmail}
                                     accessibilityLabel="Email text input" textContentType={"emailAddress"} keyboardType={"email-address"}/>
                    { emailError && <Paragraph style={{color: theme.colors.error}}>{emailError}</Paragraph> }
                    <StyledTextInput placeholder="Password" value={password} onChangeText={setPassword}
                                     accessibilityLabel="Password input" secureTextEntry={true} textContentType={"password"}/>
                    { passwordError && <Paragraph style={{color: theme.colors.error}}>{passwordError}</Paragraph> }
                    { loginError && <Paragraph style={{color: theme.colors.error, marginTop: theme.spacing.sm}}>{loginError}</Paragraph> }
                    <StyledButton onPress={handleLogIn} primary disabled={isLoggingIn}>
                        {!isLoggingIn && "Log in"}
                        {isLoggingIn && "Loading..."}
                    </StyledButton>
                    {user && <Redirect href={"(tabs)"}/>}
                </Card>
            </SafeAreaView>
        </>
    );
}
