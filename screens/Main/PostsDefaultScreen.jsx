import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import {db} from "../../firebase/config";


const PostsDefaultScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([])
  const { login } = useSelector(state => state.auth);
  const { avatar } = useSelector(state => state.auth)

  let uniquePostId = '';
  if (route.params) {
    uniquePostId = route.params.uniquePostId;
  }

  const q = query(collection(db, "posts"));

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(q);
    const allPosts = querySnapshot.docs.map((post) => ({
      ...post.data(), id: post.id
    }));

    const sortedPosts = allPosts.sort(
      (firstContact, secondContact) =>
        secondContact.id - firstContact.id);
    setPosts(sortedPosts);
  }


  useEffect(() => {
    getAllPosts();

  }, [uniquePostId])

  return (
    <View style={styles.createPostsCont}>
      <View style={styles.postsProfileSection}>
        <Image style={styles.avatarImg} source={{ uri: avatar }} />
        <View style={styles.postsProfileText}>
          <Text>{login}</Text>
        </View>
      </View>

      <FlatList data={posts} keyExtractor={post => post.id}
        renderItem={({ item }) => (
          <View style={styles.postSection}>
            <Text style={{ paddingBottom: 20 }}>{item.headers.name}</Text>
            <Image style={styles.postImage} source={{ uri: item.photoUrl }} />
            <View style={styles.postText}>
              <View>
                {item.location ?
                  (<Pressable
                    title={"Map"}
                    onPress={() =>
                      navigation.navigate("Map", {
                        location: item.location,
                      })
                    }
                  >
                    <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                    <Text style={{ paddingBottom: 20 }}>{item.headers.place}</Text>
                  </Pressable>) : (
                    <Text style={{ paddingBottom: 20 }}>{item.headers.place}</Text>)}
              </View>
              <Pressable
                title={"Comments"}
                onPress={() =>
                  navigation.navigate("Comments", {
                    id: item.id,
                    header: item.headers.name,
                    photo: item.photo,
                    place: item.headers.place,
                    location: item.location,
                  })
                }
              >
                <Text style={{ color: "#BDBDBD" }}>
                  <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
                  {item.commentsCount ?? 0}
                </Text>
              </Pressable>
            </View>
          </View>
        )} />
    </View>
  )
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

  avatarImg: {
    height: 120,
    width: 120,
    borderRadius: 16,
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