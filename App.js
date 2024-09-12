import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { id: Date.now(), text: task }]);
      setTask('');
    }
  };

  const openEditModal = (id) => {
    setEditingTaskId(id);
    const taskToEdit = tasks.find((t) => t.id === id);
    setEditingText(taskToEdit.text);
    setModalVisible(true);
  };

  const updateTask = () => {
    setTasks(tasks.map((t) => (t.id === editingTaskId ? { ...t, text: editingText } : t)));
    setModalVisible(false);
    setEditingTaskId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setModalVisible(false);
    setEditingTaskId(null);
    setEditingText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List🌱</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search a task..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Task item={item} onEdit={() => openEditModal(item.id)} onDelete={deleteTask} />
        )}
        style={styles.taskList}
      />

      {/* For Edit Button */}
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={cancelEdit}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Edit task"
              value={editingText}
              onChangeText={setEditingText}
              style={styles.modalInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.updateButton} onPress={updateTask}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Task */}
      <View style={styles.addTaskContainer}>
        <TextInput
          placeholder="Write a task..."
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F6EA',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 50,
    color: '#1e1e1e',
  },
  searchContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    border: 'none',
    padding: 10,
    borderRadius: 9,
  },
  taskList: {
    flex: 1,
    marginBottom: 20,
  },
  addTaskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    flex: 1,
    height: 40,
    border: 'none',
    padding: 10,
    borderRadius: 9,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 5,
  },
  addButton: {
    backgroundColor: '#83A9CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  modalInput: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    padding: 10,
    borderRadius: 9,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: '#83A9CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9,
  },
  cancelButton: {
    backgroundColor: '#EB907D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
