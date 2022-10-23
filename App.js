import React, { useState } from "react";
import {
	StyleSheet,
	ScrollView,
	Text,
	View,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
	Keyboard,
} from "react-native";
import Task from "./components/Task";

export default function App() {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);

	const handleAddTask = () => {
		Keyboard.dismiss();
		setTaskItems([...taskItems, task]);
		setTask(null);
	};

	const completeTask = (index) => {
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy);
	};

	return (
		<View style={styles.container}>
			{/* Today's Task */}
			<ScrollView style={styles.tasksWrapper}>
				<Text style={styles.sectionTitle}>Today's task</Text>

				<View style={styles.items}>
					{/* This is where the tasks will go1 */}
					{taskItems.map((item, index) => {
						return (
							<Task
								key={index}
								index={index}
								text={item}
								completeTask={completeTask}
							/>
						);
					})}
				</View>
			</ScrollView>

			{/* Write a Task Section */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.writeTaskWrapper}
			>
				<TextInput
					style={styles.input}
					placeholder={"Write a task"}
					value={task}
					onChangeText={(task) => setTask(task)}
				/>

				<TouchableOpacity onPress={() => handleAddTask()}>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E8EAED",
	},
	tasksWrapper: {
		paddingTop: 80,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	items: {
		marginTop: 30,
		marginBottom: 10,
	},
	writeTaskWrapper: {
		bottom: 20,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		borderRadius: 20,
		borderColor: "#C0C0C0",
		borderWidth: 1,
		width: 250,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: "#fff",
		borderRadius: 60,
		borderColor: "#C0C0C0",
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	addText: {
		fontSize: 40,
		fontWeight: "200",
	},
});
