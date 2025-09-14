const mongoose = require("mongoose");
const Counter = require("./Counter");

const incomeSchema = new mongoose.Schema({
  incomeId: { type: Number, unique: true }, // custom numeric ID
  label: { type: String, required: true },
  type: { type: String, enum: ["Cash", "Online"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

// Auto-increment incomeId before saving
incomeSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "incomeId" },
      { $inc: { seq: 1000000001 } },
      { new: true, upsert: true }
    );
    this.incomeId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Income", incomeSchema);
