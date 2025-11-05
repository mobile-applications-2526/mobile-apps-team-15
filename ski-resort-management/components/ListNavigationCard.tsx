import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import Card from "@components/Card";
import Paragraph from "@components/text/Paragraph";
import useTheme from "@components/ThemeContext";
import Divider from "@components/text/Divider";


interface NavigationItem {
    title: string;
    route: string;
}

interface ListNavigationCardProps {
    items: NavigationItem[];
}

export const ListNavigationCard: React.FC<ListNavigationCardProps> = ({ items }) => {
    const theme = useTheme();

    const handleNavigate = (route: string) => {
        router.push(route);
    };

    return (
        <Card style={{ marginVertical: 0, paddingVertical: theme.spacing.sm }}>
            {items.map((item, index) => (
                <React.Fragment key={item.route}>
                    <TouchableOpacity
                    style={theme.list.listItem}
                    onPress={() => handleNavigate(item.route)}
                >
                    <View style={{ flex: 1 }}>
                        <Paragraph>{item.title}</Paragraph>
                    </View>
                    <Paragraph style={{ fontSize: 26 }}>›</Paragraph>
                </TouchableOpacity>
                { index !== items.length - 1 && <Divider /> }
                </React.Fragment>
            ))}
        </Card>
    );
};
