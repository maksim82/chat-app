import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import socket from "../../shared/utils/socket";
import { MessageItem } from "./MessageItem/MessageItem";
import { styles } from "../../app/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MessagingPage = ({ route, navigation }: any) => {
    const [user, setUser] = useState("");
    const { name, id } = route.params;

    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUser(value);
            }
        } catch (e) {
            console.error("Error while loading username!");
        }
    };

    const handleNewMessage = () => {
        console.log(user)
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;

        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;

        if (user) {
            socket.emit("newMessage", {
                message,
                room_id: id,
                user,
                timestamp: { hour, mins },
            });
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
        getUsername();
        socket.emit("findRoom", id);
        socket.on("foundRoom", (roomChats: any) => setChatMessages(roomChats));
    }, []);

    useEffect(() => {
        socket.on("foundRoom", (roomChats: any) => setChatMessages(roomChats));
    }, [socket]);

    return (
        <View style={styles.messagingscreen}>
            <View
                style={[
                    styles.messagingscreen,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                {chatMessages[0] ? (
                    <FlatList
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <MessageItem item={item} user={user} />
                        )}
                        keyExtractor={(item: { id: any }) => item.id}
                    />
                ) : (
                    ""
                )}
            </View>

            <View style={styles.messaginginputContainer}>
                <TextInput
                    style={styles.messaginginput}
                    onChangeText={(value) => setMessage(value)}
                />
                <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};
