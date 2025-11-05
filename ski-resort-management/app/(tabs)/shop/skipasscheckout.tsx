import Header from "@components/header";
import {Stack, useLocalSearchParams} from "expo-router";
import React, {useEffect} from "react";
import Card from "@components/Card";
import {Pressable, Text} from "react-native";

export default function SkiPassCheckout () {
    const {selectedSkiPassTitle} = useLocalSearchParams();
    //Use this param to lookup skipass price

    const mockedSkipass = {title: "Gold", price: 50, includedList: ["Allowed in domain 1 to 3", "Free drinks at the ski resort bars"]}


    return(
        <>
            <Stack.Screen
                options={{
                    title: 'Ski-Pass Checkout',
                    headerShown: true,
                }}
            />

            <Card>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#000',
                    marginTop: 10,
                    alignSelf: "center"
                }}>Summary</Text>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 32,
                    color: '#333',
                    marginTop: 5,
                    alignSelf: "center",
                }}>${mockedSkipass.price}/mo</Text>
                <Text style={{
                    fontSize: 18,
                    marginTop: 20,
                    color: '#666',
                }}>
                    You'll pay once in the app. Your subscription renews automatically each month until cancelled.
                </Text>

                <Pressable style={{
                    backgroundColor: '#333',
                    borderRadius: 8,
                    marginTop: 15,
                    marginBottom: 30,
                    alignItems: 'center',
                    padding: 15
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '600',
                    }}>
                        Pay
                    </Text>
                </Pressable>
            </Card>
        </>
    )
}