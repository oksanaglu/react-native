import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const PostsDefaultScreen = ({ navigation, route }) => {
  if (!route.params) {
    return (
      <View style={styles.postsContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image source={require("../../assets/images/Avatar.png")} />
          <View style={styles.postsTitle}>
            <Text>Natali Romanova</Text>
            <Text>e-mail@example.com</Text>
          </View>
        </View>
      </View>
    );
  }

  const { location, pictureHeaders, photoUrl, key } = route.params;

  return (
    <View style={styles.createPostsCont}>
      <View style={styles.postsProfileSection}>
        <Image source={require("../../assets/images/Avatar.png")} />
        <View style={styles.postsProfileText}>
          <Text>Natali Romanova</Text>
          <Text>e-mail@example.com</Text>
        </View>
      </View>

      <View style={styles.postSection}>
        <Image style={styles.postImage} source={{ uri: photoUrl }} />
        <View style={styles.postText}>
          <Text style={{ paddingBottom: 20 }}>{pictureHeaders.name}</Text>
          <View>
            <Pressable
              title={"Map"}
              onPress={() =>
                navigation.navigate("Map", {
                  location,
                })
              }
            >
              <Ionicons name="location-outline" size={24} color="#BDBDBD" />
              <Text style={{ paddingBottom: 20 }}>{pictureHeaders.place}</Text>
            </Pressable>
          </View>
          <Pressable
            title={"Comments"}
            onPress={() =>
              navigation.navigate("Comments", {
                location,
              })
            }
          >
            <Text style={{ color: "#BDBDBD" }}>
              <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" /> 0
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PostsDefaultScreen;



export const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  createPostsCont: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
     
  postsProfileSection: {
    flexDirection: 'row',
    paddingBottom: 10,
  },

  postsProfileText: {
    justifyContent: 'center',
    paddingLeft: 20
  },
    
    
  postSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    maxHeight: 255,
    maxWidth: '100%',
  
  },

  postImage: {

    minWidth: 187,
    maxHeight: 250,
    borderRadius: 8
  },

  postText: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

});