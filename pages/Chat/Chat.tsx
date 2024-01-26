import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Modal } from "../../shared/ui/Modal/Modal";
import { ChatItem } from "./ChatItem/ChatItem";
import socket from "../../shared/utils/socket";
import { styles } from "../../app/styles/styles";

export const ChatPage = () => {
    const [visible, setVisible] = useState(false);
    const [rooms, setRooms] = useState([]);

    useLayoutEffect(() => {
        function fetchGroups() {
            fetch("http://localhost:4000/api")
                .then((res) => res.json())
                .then((data) => setRooms(data))
                .catch((err) => console.error(err));
        }
        fetchGroups();
    }, []);

    useEffect(() => {
        socket.on("roomsList", (rooms: any) => {
            setRooms(rooms);
        });
    }, [socket]);

    const handleCreateGroup = () => setVisible(true);

    return (
        <View style={styles.chatscreen}>
            <View style={styles.chattopContainer}>
                <View style={styles.chatheader}>
                    <Text style={styles.chatheading}>Chats</Text>
                    <Pressable onPress={handleCreateGroup}>
                        <Feather name='edit' size={24} color='green' />
                    </Pressable>
                </View>
            </View>

            <View style={styles.chatlistContainer}>
                {rooms.length > 0 ? (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => <ChatItem item={item} />}
                        keyExtractor={(item: { id: any }) => item.id}
                    />
                ) : (
                    <View style={styles.chatemptyContainer}>
                        <Text style={styles.chatemptyText}>No rooms created!</Text>
                        <Text>Click the icon above to create a Chat room</Text>
                    </View>
                )}
            </View>
            {visible ? <Modal setVisible={setVisible} /> : ""}
        </View>
    );
};
