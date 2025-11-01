import { Text, View, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import Header from "../components/header";
import SlopeCard from "../components/slopeCard";

export default function Index() {

  const favouriteSlope = {
    imageUrl: require('../assets/skislope1.png'),
    name: "Slope 1",
    description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.",
  }


  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#f5f5f5',
    }}>

      <Header />

      {/* Welcome Card */}
      <View style={{
        backgroundColor: '#fff',
        margin: 20,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <Text style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: '#000',
                }}>Ski-Free</Text>
        <Text style={{
          fontSize: 18,
          color: '#333',
        }}>Welcome back, Mark!</Text>
      </View>

      {/* Ski Pass Card */}
      <View style={{
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
      }}>
        <View style={{
          backgroundColor: '#d0d0d0',
          padding: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
          }}>Ski pass</Text>
        </View>
      </View>

      <View style={{
                backgroundColor: '#fff',
                marginHorizontal: 20,
                marginBottom: 100,
                padding: 20,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}>
                <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#333',
                marginBottom: 15,
                }}>Your favorite slope</Text>

            <SlopeCard imageUrl={favouriteSlope.imageUrl} name={favouriteSlope.name} description={favouriteSlope.description} />
        </View>


        {/* Space for bottom nav */}
    </ScrollView>
  );
}