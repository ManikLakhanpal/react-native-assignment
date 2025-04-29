import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import JobCard from "@/components/JobCard";

const dummyJobs = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Job Title ${i + 1}`,
  location: `City ${i + 1}`,
  salary: `$${30000 + i * 1000}`,
  phone: `+91-98765${10000 + i}`,
  description: `Detailed description for Job ${i + 1}`,
}));

const Index = () => {
  const [visibleJobs, setVisibleJobs] = useState(dummyJobs.slice(0, 10));
  const [page, setPage] = useState(1);
  const router = useRouter();

  const loadMoreJobs = () => {
    const nextPage = page + 1;
    const newJobs = dummyJobs.slice(0, nextPage * 10);
    setVisibleJobs(newJobs);
    setPage(nextPage);
  };

  return (
    <View className="flex-1 bg-[#0F0D23] px-4 py-4 pb-14">
      <View className="flex-1 bg-[#0F0D23] px-4 pt-6">
        <Text className="text-white text-2xl font-bold my-4">Job Listings</Text>
        <FlatList
          data={visibleJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() =>
                router.push({
                  pathname: "/job-details",
                  params: { ...item },
                })
              }
            />
          )}
          onEndReached={loadMoreJobs}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

export default Index;