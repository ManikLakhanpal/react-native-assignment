import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function JobDetails() {
  const { title, location, salary, phone, description, id } =
    useLocalSearchParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, []);

  const checkBookmarkStatus = async () => {
    try {
      const existing = await AsyncStorage.getItem("bookmarkedJobs");
      if (existing) {
        const parsed = JSON.parse(existing);
        const alreadyExists = parsed.find((job) => job.id === id);
        setIsBookmarked(!!alreadyExists);
      }
    } catch (e) {
      console.log("Error checking bookmark status:", e);
    }
  };

  const toggleBookmark = async () => {
    try {
      const newJob = { id, title, location, salary, phone, description };
      const existing = await AsyncStorage.getItem("bookmarkedJobs");
      const parsed = existing ? JSON.parse(existing) : [];

      if (isBookmarked) {
        const updatedJobs = parsed.filter((job) => job.id !== id);
        await AsyncStorage.setItem(
          "bookmarkedJobs",
          JSON.stringify(updatedJobs)
        );
        setIsBookmarked(false);
        Alert.alert("Removed from bookmarks");
      } else {
        parsed.push(newJob);
        await AsyncStorage.setItem("bookmarkedJobs", JSON.stringify(parsed));
        setIsBookmarked(true);
        Alert.alert("Bookmarked!");
      }
    } catch (e) {
      console.log("Bookmark toggle error:", e);
    }
  };

  return (
    <View className="flex-1 bg-[#0F0D23] p-6 py-14">
      <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable onPress={() => router.back()} className="mb-4">
        <ArrowLeft color="#A8B5DB" size={24} />
      </Pressable>
      <Text className="text-2xl text-white font-bold mb-2">{title}</Text>
      <Text className="text-[#A8B5DB] mb-2">Location: {location}</Text>
      <Text className="text-[#A8B5DB] mb-2">Salary: {salary}</Text>
      <Text className="text-[#A8B5DB] mb-2">Phone: {phone}</Text>
      <Text className="text-[#A8B5DB] mt-4">
        {description?.replace(/\r\n|\n|\r/g, "\n\n")}
      </Text>

      <Pressable
        onPress={toggleBookmark}
        className={`px-4 py-2 rounded-lg mt-6 self-start flex-row items-center ${
          isBookmarked ? "bg-[#1A4177]" : "bg-[#2760B6]"
        }`}
      >
        {isBookmarked ? (
          <>
            <BookmarkCheck color="white" size={20} />
            <Text className="text-white ml-2">Saved</Text>
          </>
        ) : (
          <>
            <Bookmark color="white" size={20} />
            <Text className="text-white ml-2">Bookmark</Text>
          </>
        )}
      </Pressable>
      </ScrollView>
    </View>
  );
}
