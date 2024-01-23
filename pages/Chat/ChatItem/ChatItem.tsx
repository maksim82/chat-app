import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import { styles } from "../../../utils/styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

interface ChatItemProps {
    text?: any;
    time?: any;
}

export const ChatItem = ({ item }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [messages, setMessages] = useState<ChatItemProps>({});

    useLayoutEffect(() => {
        setMessages(item.messages[item.messages.length - 1]);
    }, []);

    const handleNavigation = () => {
        navigation.navigate("Messaging", {
            id: item.id,
            name: item.name,
        });
    };

    return (
        <Pressable style={styles.cchat} onPress={handleNavigation}>
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={styles.cavatar}
            />

            <View style={styles.crightContainer}>
                <View>
                    <Text style={styles.cusername}>{item.name}</Text>

                    <Text style={styles.cmessage}>
                        {messages?.text ? messages.text : "Tap to start chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={styles.ctime}>
                        {messages?.time ? messages.time : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};
