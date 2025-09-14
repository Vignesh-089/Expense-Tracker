const express = require("express");
const Income = require("../models/Income");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Income:
 *       type: object
 *       required:
 *         - label
 *         - type
 *         - amount
 *         - date
 *       properties:
 *         incomeId:
 *           type: number
 *           description: Auto-generated numeric ID starting from 1000000001
 *         label:
 *           type: string
 *         type:
 *           type: string
 *           enum: [Cash, Online]
 *         amount:
 *           type: number
 *         date:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /api/incomes/createIncome:
 *   post:
 *     summary: Add a new income
 *     tags: [Income]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Income'
 *     responses:
 *       201:
 *         description: Income created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createIncome", async (req, res) => {
    try {
        const { label, type, amount, date } = req.body;
        const newIncome = new Income({ label, type, amount, date });
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/incomes/updateIncomeById/{id}:
 *   put:
 *     summary: Update an income by MongoDB _id
 *     tags: [Income]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Income'
 *     responses:
 *       200:
 *         description: Income updated successfully
 *       404:
 *         description: Income not found
 */
router.put("/updateIncomeById/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIncome = await Income.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.json(updatedIncome);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/incomes/getAllIncome:
 *   get:
 *     summary: Get all incomes
 *     tags: [Income]
 *     responses:
 *       200:
 *         description: List of incomes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Income'
 */
router.get("/getAllIncome", async (req, res) => {
    try {
        const incomes = await Income.find();
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/incomes/getIncomeById/{incomeId}:
 *   get:
 *     summary: Get income by custom numeric ID
 *     tags: [Income]
 *     parameters:
 *       - in: path
 *         name: incomeId
 *         required: true
 *         schema:
 *           type: number
 *         description: The numeric income ID
 *     responses:
 *       200:
 *         description: Income found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Income'
 *       404:
 *         description: Income not found
 */
router.get("/getIncomeById/:id", async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        if (!income) return res.status(404).json({ message: "Income not found" });
        res.json(income);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/incomes/deleteIncomeById/{incomeId}:
 *   delete:
 *     summary: Delete an income by custom numeric ID
 *     tags: [Income]
 *     parameters:
 *       - in: path
 *         name: incomeId
 *         required: true
 *         schema:
 *           type: number
 *         description: The numeric income ID
 *     responses:
 *       200:
 *         description: Income deleted successfully
 *       404:
 *         description: Income not found
 *       500:
 *         description: Server error
 */
router.delete("/deleteIncomeById/:id", async (req, res) => {
    try {
        const result = await Income.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: "Income not found" });
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
