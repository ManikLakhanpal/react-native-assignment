import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import JobCard from "@/components/JobCard";

export default function Save() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadBookmarks = async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem("bookmarkedJobs");
      if (data) {
        setSavedJobs(JSON.parse(data));
      } else {
        setSavedJobs([]);
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      Alert.alert("Error", "Failed to load bookmarks");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
      return () => {};
    }, [])
  );

  useEffect(() => {
    loadBookmarks();
  }, []);

  const removeBookmark = async (id) => {
    try {
      const updatedJobs = savedJobs.filter((job) => job.id !== id);
      await AsyncStorage.setItem("bookmarkedJobs", JSON.stringify(updatedJobs));
      setSavedJobs(updatedJobs);
      Alert.alert("Success", "Job removed from bookmarks");
    } catch (error) {
      console.error("Error removing bookmark:", error);
      Alert.alert("Error", "Failed to remove job from bookmarks");
    }
  };

  const confirmRemove = (id, title) => {
    Alert.alert(
      "Remove Bookmark",
      `Are you sure you want to remove "${title}" from bookmarks?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => removeBookmark(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#0F0D23] px-4 py-14 pb-14">

        <Text className="text-cyan-300 text-2xl font-bold my-4">
          Bookmarked Jobs
        </Text>
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">Loading bookmarks...</Text>
          </View>
        ) : savedJobs.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">No bookmarked jobs found</Text>
          </View>
        ) : (
          <FlatList
            data={savedJobs}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
              <JobCard
                job={item}
                showDeleteButton={true}
                onDelete={() => confirmRemove(item.id, item.title)}
                onPress={() =>
                  router.push({
                    pathname: "/job-details",
                    params: { ...item },
                  })
                }
              />
            )}
          />
        )}
    </View>
  );
}