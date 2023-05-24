import React from "react";
import { View, Pressable, Image, ImageBackground, Text,
    FlatList, StyleSheet } from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Camera} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {authSignOutUser, profileUpdateAvatar} from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";

const ProfileScreen = ({ navigation, route }) => {
    
    const {userId, avatar} = useSelector(state => state.auth);
    const [posts, setPosts] = useState([])
    const [deletedPost, setDeletedPost] = useState('');
    const [makePhoto, setMakePhoto] = useState(null);
    const [camera, setCamera] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const dispatch = useDispatch();
    const storage = getStorage();

    const signOut = () => {
        dispatch(authSignOutUser())
    }
    const userPostsRef = query(collection(db, "posts"), where("userId", "==", userId));

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    useEffect(() => {

        getAllPosts();

    }, [deletedPost])

    const toggleMakePhoto = () => {
        if (!makePhoto) {
            setMakePhoto('camera')
        }
        if (makePhoto === 'camera' || makePhoto === 'user') {
            setMakePhoto(null)
        }
    }

    const getAllPosts = async () => {
        const querySnapshot = await getDocs(userPostsRef);
        const allPosts = querySnapshot.docs.map((post) => ({
            ...post.data(), id: post.id
        }));

        const sortedPosts = allPosts.sort(
            (firstContact, secondContact) =>
                secondContact.id - firstContact.id);
        setPosts(sortedPosts);
    }


    const deletePost = async (postId) => {
        await deleteDoc(doc(db, "posts", postId));
        setDeletedPost(postId);
    }


    const uploadAvatar = async () => {

        if (avatarUrl) {
            const response = await fetch(`${avatarUrl}`)
            const file = await response.blob();
            const uniquePostId = Date.now().toString()

            const imageRef = await ref(storage, `avatars/${uniquePostId}`)
            await uploadBytes(imageRef, file);
            const newAvatar = await getDownloadURL(imageRef);

            dispatch(profileUpdateAvatar({ avatar: newAvatar }));

            setAvatarUrl(null);
            setMakePhoto(null);
        }
    }

    const takePhoto = async () => {
        if (camera) {
            const { uri } = await camera.takePictureAsync();
            setAvatarUrl(uri);
            setMakePhoto('user')
            await MediaLibrary.createAssetAsync(uri);
        }
    }

    const goToMap = (location) => {
        navigation.navigate("Map", {
            location: location,
        })
    }

    const goToComments = (item) => (
        navigation.navigate("Comments", {
            id: item.id,
            header: item.headers.name,
            photo: item.photo,
            place: item.headers.place,
            location: item.location,
        })
    )

    return (
        <View style={styles.profileContainer}>
            <ImageBackground resizeMode="cover" source={require('../../assets/images/bg.jpg')} style={styles.imgBg}>
                <View style={styles.wrapper}>
                    <View style={styles.formInputs}>
                        <View style={styles.avatarContainer}>
                            {!makePhoto &&
                                <Image style={styles.avatarImage}
                                    source={{ uri: avatar }} />
                            }
                            {makePhoto === 'camera' &&
                                <Camera
                                    style={styles.avatarImage}
                                    type={type}
                                    ref={(ref) => {
                                        setCamera(ref);
                                    }}
                                >

                                    <View style={styles.makePhotoButton}>
                                        {makePhoto === 'camera' &&
                                            <Pressable
                                                onPress={takePhoto}
                                                title="TakePhoto"
                                            >
                                                <MaterialIcons name="add-a-photo" size={24} color="#BDBDBD" />
                                            </Pressable>
                                        }
                                    </View>

                                </Camera>
                            }
                            {makePhoto === 'user' &&
                                <View>
                                    <Image style={styles.avatarImage} source={{ uri: avatarUrl }} />
                                    <Pressable
                                        style={styles.makePhotoButton}
                                        onPress={uploadAvatar}
                                        title="UploadPicture"
                                    >
                                        <MaterialCommunityIcons name="cloud-upload" size={24} color="#BDBDBD" />
                                    </Pressable>
                                </View>
                            }
                        </View>

                        <Pressable title={"Login"} style={styles.add} onPress={toggleMakePhoto}>
                            <View>
                                <Image source={require('../../assets/images/add.png')} />
                            </View>
                        </Pressable>

                        <Pressable
                            onPress={signOut}
                            title="LogOut"
                            style={styles.profileLogOut}
                        >
                            <MaterialCommunityIcons name="logout" size={24} color="#BDBDBD" />
                        </Pressable>

                        <FlatList data={posts} keyExtractor={post => post.id}
                            renderItem={({ item }) => (
                                <View style={styles.postSection}>
                                    <Text style={{ paddingBottom: 20 }}>{item.headers.name}</Text>

                                    <Image style={styles.postImage}
                                        source={{ uri: item.photo }}
                                    />
                                    <View style={styles.postText}>


                                        <View style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View>
                                                <Text style={{ paddingBottom: 20, paddingRight: 10 }}>
                                                    {item.headers.place}
                                                </Text>
                                            </View>
                                            <Pressable title={"Delete"}
                                                onPress={() => deletePost(item.id)}>
                                                <MaterialIcons name="delete-outline" size={24} color="#FFCCCB" />
                                            </Pressable>
                                        </View>
                                    </View>

                                </View>
                            )}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
};

export default ProfileScreen;


export const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    imgBg: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        resizeMode: "cover",
    },

    imgAdd: {
        display: 'flex',
        position: "absolute",
        minHeight: 125,
        minWidth: 125,
        borderRadius: 100,
        right: '39%',
    },

    wrapper: {
        marginTop: 'auto',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
        minWidth: "100%",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    formInputs: {
        display: 'flex',
        position: "relative",
        height: "80%",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },

    avatarContainer: {
        display: "flex",
        minHeight: 120,
        minWidth: 120,
        position: "absolute",
        top: -120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
    },
     
    // avatarImage: {
    //     width: 150,
    //     height: 200,
    //     borderRadius: 8
    // },

    imgAdd: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        top: -40,
        right: '32%',
    },

    profileLogOut: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        top: -50,
        right: '10%',
    },

    makePhotoButton: {
        alignContent: 'center',
        position: "absolute",
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        top: '40%',
        right: '30%',
        borderRadius: 50,
    },
    postSection: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        minHeight: 255,
        maxWidth: '100%',
    },
});