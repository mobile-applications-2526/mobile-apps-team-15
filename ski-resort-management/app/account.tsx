import { Redirect, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import Paragraph from "@components/text/Paragraph";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import { auth } from "@/services/FirebaseConfig"
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@components/AuthContext";
import { useUserStore } from "@/store/UserStore";
import { useCartStore } from "@/store/CartStore";
import SkiPassService from "@/services/SkiPassService";
import LoanService from "@/services/LoanService";
import ErrorPopup from "@components/ErrorPopup";
import { Loan, SkiPass } from "@constants/types";
import H3 from "@components/text/H3";
import Divider from "@components/text/Divider";
import { useFavoriteSlopeStore } from "@/store/FavoriteSlopeStore";


export default function Account() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const { user: backEndUser } = useUserStore();
    const removeUser = useUserStore(state => state.removeUser);
    const clearCart = useCartStore(state => state.clearCart);
    const clearFavoriteSlope = useFavoriteSlopeStore(state => state.clearFavoriteSlope);
    const [ownedSkipasses, setOwnedSkipasses] = useState([]);
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState<Error | null>(null);

    const dateFormatter = new Intl.DateTimeFormat("en-BE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        timeZone: "Europe/Brussels"
    });

    useEffect(() => {
        const fetchData = async () => {
            if (backEndUser?.uid) {
                setError(null)
                try {
                    const skipasses = await SkiPassService.getSkiPassesByUserId(backEndUser.uid);
                    const loans = await LoanService.getAllLoansByUserId(backEndUser.id);
                    setOwnedSkipasses(skipasses);
                    setLoans(loans);
                } catch (error) {
                    setOwnedSkipasses([]);
                    setLoans([]);
                    setError(error);
                }
            }
        };
        fetchData();
    }, [backEndUser]);

    const handleLogoutClick = async () => {
        await auth.signOut();
        removeUser();
        clearCart();
        clearFavoriteSlope();
        AsyncStorage.removeItem("user_notification_permission_asked")
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Account',
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: {
                        backgroundColor: theme.colors.surface,
                    },
                    headerTitleStyle: {
                        color: theme.colors.text
                    },
                    headerTintColor: theme.colors.text,
                }}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Card>
                    <H1>Account</H1>
                    <SubHeading>View your account info</SubHeading>
                    {backEndUser && <View style={{ paddingVertical: 20 }}>
                        <Paragraph
                            style={{ paddingVertical: theme.spacing.sm }}>👤{backEndUser.firstName} {backEndUser.lastName}</Paragraph>
                        <Divider/>
                        <Paragraph style={{ paddingVertical: theme.spacing.sm }}>📧 {backEndUser.email}</Paragraph>

                        <H3 style={{ marginTop: 20 }}>Owned Ski Passes</H3>
                        {ownedSkipasses.length === 0 ? (
                            <Paragraph>No ski passes yet.</Paragraph>
                        ) : (
                            ownedSkipasses.map((pass: SkiPass, index: number) => (
                                <React.Fragment key={pass.id}>
                                    <Paragraph style={{ paddingVertical: theme.spacing.sm }}>
                                        {pass.name} - {pass.skiPassType} {new Date(pass.endDate).getTime() > Date.now() ? "(Active)" : "(Expired)"}
                                    </Paragraph>
                                    {index !== ownedSkipasses.length - 1 && <Divider/>}
                                </React.Fragment>
                            ))
                        )}
                        <H3 style={{ marginTop: 20 }}>Loans</H3>
                        {loans.length === 0 ? (
                            <Paragraph>No loans yet.</Paragraph>
                        ) : (
                            loans.map((loan: Loan, index: number) => (<React.Fragment key={loan.id}>
                                    <Paragraph style={{ paddingVertical: theme.spacing.sm }}>
                                        Loan {index + 1} - {loan.returnTime ? "Returned on " + dateFormatter.format(new Date(loan.returnTime)) : `Return by ${dateFormatter.format(new Date(loan.endTime))} (Active)`}
                                    </Paragraph>
                                    {index !== loans.length - 1 && <Divider/>}
                                </React.Fragment>
                            ))
                        )}
                    </View>}
                </Card>

                <View style={{ paddingHorizontal: theme.spacing.lg }}>
                    <StyledButton onPress={handleLogoutClick}>
                        Log out
                    </StyledButton>
                </View>
            </SafeAreaView>
            {error && <ErrorPopup message={error.message}/>}
            {user === null && <Redirect href={"(landing)"}/>}
        </>
    );
}
