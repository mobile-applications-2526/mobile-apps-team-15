import { Text, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import Header from "../components/header";

export default function Index() {
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#f5f5f5',
    }}>

      <Header title="Ski-Free" />

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

      {/* Favorite Slope Card */}
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
        
        {/* Inner content container with border */}
        <View style={{
          borderWidth: 1,
          borderColor: '#e0e0e0',
          borderRadius: 8,
          padding: 15,
        }}>
          {/* Slope Image Placeholder */}
          <View style={{
            width: '100%',
            height: 120,
            backgroundColor: '#d0d0d0',
            borderRadius: 8,
            marginBottom: 15,
          }} />
          
          {/* Title */}
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 8,
          }}>Title</Text>
          
          {/* Description */}
          <Text style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}>Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.</Text>
        </View>
      </View>
    </ScrollView>
  );
}