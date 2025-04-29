import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";

interface JobCardProps {
  job: {
    id: string | number;
    title: string;
    location: string;
    salary: string;
    phone: string;
    description?: string;
  };
  onPress?: () => void;
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onPress,
  onDelete,
  showDeleteButton = false,
}) => {
  return (
    <TouchableOpacity
      className="bg-[#1E1B34] p-4 mb-4 rounded-xl"
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="flex-row justify-between items-start">
        <Text className="text-white text-lg font-semibold flex-1">
          {job.title}
        </Text>
        {showDeleteButton && onDelete && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-red-500 h-8 w-8 rounded-full items-center justify-center ml-2"
          >
            <Trash2 size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ marginTop: 10 }} className="text-[#A8B5DB]">Location: {job.location}</Text>
      <Text style={{ marginTop: 5 }} className="text-[#A8B5DB]">Salary: {job.salary}</Text>
      <Text style={{ marginTop: 5 }} className="text-[#A8B5DB]">Phone: {job.phone}</Text>
      <View style={{ height: 1, backgroundColor: '#969696', marginTop: 5 }} />
    </TouchableOpacity>
  );
};

export default JobCard;