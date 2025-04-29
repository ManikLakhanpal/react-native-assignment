import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import JobCard from "@/components/JobCard";
import axios from "axios";

const Index = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`REMOVED_URL`);
  
      const data = response.data.results;
      const newJobs = Array.isArray(data) ? data : data.jobs || [data];
      console.log(data);

      setJobs((prev) => [...prev, ...newJobs]);
    } catch (error) {
      console.error("Fetch jobs error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const loadMoreJobs = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <View className="flex-1 bg-[#0F0D23] px-4 py-4 pb-14">
      <Text className="text-white text-2xl font-bold my-4">Job Listings</Text>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <JobCard
            job={{
              title: item.title,
              location: item.primary_details?.Place || "N/A",
              salary: item.primary_details?.Salary || "N/A",
              phone: item.whatsapp_no || "N/A",
            }}
            onPress={() =>
              router.push({
                pathname: "/job-details",
                params: {
                  id: item.id,
                  title: item.title,
                  location: item.primary_details?.Place,
                  salary: item.primary_details?.Salary,
                  phone: item.whatsapp_no,
                  description: item.other_details,
                  content: item.contentV3,
                },
              })
            }
          />
        )}
        onEndReached={loadMoreJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator color="#fff" /> : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Index;