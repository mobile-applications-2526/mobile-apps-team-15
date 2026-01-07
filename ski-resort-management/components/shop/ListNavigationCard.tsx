import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Card from "@components/Card";
import Paragraph from "@components/text/Paragraph";
import useTheme from "@components/ThemeContext";
import Divider from "@components/text/Divider";


interface NavigationItem {
    title: string;
    href: string;
}

interface ListNavigationCardProps {
    items: NavigationItem[];
}

export const ListNavigationCard: React.FC<ListNavigationCardProps> = ({ items }) => {
    const theme = useTheme();
    const router = useRouter();

    const handleNavigate = (href: string) => {
        router.navigate(href);
    };

    return (
        <Card style={{ marginVertical: 0, paddingVertical: theme.spacing.sm }}>
            {items.map((item, index) => (
                <React.Fragment key={item.href}>
                    <TouchableOpacity
                    style={theme.list.listItem}
                    accessibilityRole="button"
                    onPress={() => handleNavigate(item.href)}
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
