import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import Card from "@components/Card";


interface NavigationItem {
    title: string;
    route: string;
}

interface ListNavigationCardProps {
    items: NavigationItem[];
}

export const ListNavigationCard: React.FC<ListNavigationCardProps> = ({
                                                                          items,
                                                                      }) => {
    const handleNavigate = (route: string) => {
        router.push(route);
    };

    return (
        <Card marginY={0}>
            {items.map((item, index) => (
                <TouchableOpacity
                    key={item.route}
                    style={[
                        styles.listItem,
                        index === items.length - 1 && styles.lastItem
                    ]}
                    onPress={() => handleNavigate(item.route)}
                >
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            ))}
        </Card>
    );
};

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    arrow: {
        fontSize: 26,
        color: '#ccc',
    },
});
