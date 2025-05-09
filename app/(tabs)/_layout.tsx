import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { JobIcon, BookmarkIcon } from "@/components/Icons";

function TabIcon({ focused, title }: any) {
  const color = (focused) ? "#2760B6" : "#A8B5DB";

  const Icon = (title === "Jobs") ? JobIcon : BookmarkIcon;

  return (
    <View className="flex items-center justify-center mt-5">
      <Icon color={color} size={24} />
      {focused && (
        <Text className={`text-base w-full text-[#2760B6]`}>{title}</Text>
      )}
      {!focused && (
        <Text className={`text-base w-full text-[#A8B5DB]`}>{title}</Text>
      )}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          height: 70,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
          backgroundColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Jobs",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Jobs" />
          ),
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Bookmark" />
          ),
        }}
      />
    </Tabs>
  );
}
