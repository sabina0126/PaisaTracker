import { RandomForestClassifier as RandomForest } from "random-forest-classifier";

// Sample expense data
const expenses = [
  { amount: 15000, budgetName: "Home Essential", month: 1 },
  { amount: 6000, budgetName: "Travel", month: 2 },
  { amount: 3000, budgetName: "College", month: 3 },
  { amount: 10000, budgetName: "Clothes", month: 2 },
];

// Convert budget names to numerical values
const budgetMap = {};
expenses.forEach((e) => {
  if (!budgetMap[e.budgetName]) {
    budgetMap[e.budgetName] = Object.keys(budgetMap).length;
  }
});

console.log("Budget Map:", budgetMap);

// Prepare training data
const trainingData = expenses.map((expense) => ({
  month: expense.month,
  budget: budgetMap[expense.budgetName],
  amount: expense.amount,
}));

const features = trainingData.map((e) => ({ month: e.month, budget: e.budget }));
const labels = trainingData.map((e) => e.amount);

console.log("Features:", features);
console.log("Labels:", labels);

// Ensure data is not empty before training
if (features.length === 0 || labels.length === 0) {
  throw new Error("Features or labels are empty. Check data preprocessing.");
}

// ✅ Store the trained model in a variable
let trainedModel = null;

const trainModel = () => {
  return new Promise((resolve) => {
    const rf = new RandomForest({ n_estimators: 10, max_depth: 5 });

    rf.fit(features, labels, "amount", () => {
      console.log("✅ Random Forest Model Trained!");
      trainedModel = rf;
      resolve();
    });
  });
};

export const predictExpense = async (month, budgetName) => {
  if (!trainedModel) {
    console.log("⏳ Model training in progress...");
    await trainModel(); // Wait for training to complete
  }

  const budgetNum = budgetMap[budgetName] ?? -1; // -1 if not found

  // If budgetNum is -1, return a message
  if (budgetNum === -1) {
    return "No data for this category";
  }

  const prediction = trainedModel.predict([{ month, budget: budgetNum }]);

  // ✅ Check if prediction is empty
  if (!prediction || prediction.length === 0) {
    return "Prediction unavailable"; 
  }

  return prediction[0]; 
};
