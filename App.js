import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😌', label: 'Relaxed' },
  { emoji: '😃', label: 'Excited' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState([]);

  const saveMood = () => {
    if (selectedMood) {
      const newEntry = { mood: selectedMood, note, date: new Date() };
      setHistory([newEntry, ...history]);
      setSelectedMood(null);
      setNote('');
    } else {
      Alert.alert('Please select a mood');
    }
  };

  const deleteEntry = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  const timeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#e8f0fe' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#1e3a8a', marginBottom: 20 }}>🌈 Mood Tracker</Text>

      <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 10 }}>😊 How do you feel today?</Text>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 25,
        paddingHorizontal: 5,
        gap: 12,
      }}>
        {moods.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={{
              backgroundColor: selectedMood === item.label ? '#dbeafe' : '#ffffff',
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderRadius: 20,
              width: '30%',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              borderWidth: selectedMood === item.label ? 2 : 1,
              borderColor: selectedMood === item.label ? '#2563eb' : '#e5e7eb',
            }}
            onPress={() => setSelectedMood(item.label)}
          >
            <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
            <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '600', color: '#1f2937' }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ fontWeight: '600', fontSize: 16, color: '#1f2937' }}>📝 Write a note (optional):</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Express your thoughts here..."
        style={{
          borderWidth: 1,
          borderColor: '#cbd5e1',
          borderRadius: 12,
          padding: 12,
          marginVertical: 12,
          backgroundColor: '#fff',
          minHeight: 80,
        }}
        multiline
      />

      <TouchableOpacity
        onPress={saveMood}
        style={{
          backgroundColor: '#2563eb',
          padding: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>💾 Save Mood</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 10 }}>📅 Mood History</Text>
      {history.length === 0 ? (
        <Text style={{ color: '#6b7280' }}>No mood tracked yet.</Text>
      ) : (
        history.map((entry, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#ffffff',
              padding: 16,
              borderRadius: 12,
              marginBottom: 10,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>{entry.mood}</Text>
              <TouchableOpacity onPress={() => deleteEntry(index)}>
                <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ color: '#6b7280' }}>{timeAgo(entry.date)}</Text>
            {entry.note ? <Text style={{ marginTop: 6, color: '#374151' }}>{entry.note}</Text> : null}
          </View>
        ))
      )}

      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e3a8a', marginTop: 20 }}>📊 Mood Summary</Text>
      {history.length === 0 ? (
        <Text style={{ color: '#6b7280' }}>No summary available.</Text>
      ) : (
        <Text style={{ color: '#1f2937', marginTop: 8 }}>Keep tracking your mood. Your feelings matter!</Text>
      )}
    </ScrollView>
  );
}
