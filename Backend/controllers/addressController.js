// addressController.js
import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      district,
      postalCode,
      phone,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !street ||
      !city ||
      !district ||
      !postalCode ||
      !phone
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All address fields are required" });
    }

    const address = await Address.create({
      userId: req.userId,
      firstName,
      lastName,
      email,
      street,
      city,
      district,
      postalCode,
      phone,
    });

    res.json({ success: true, message: "Address added successfully", address });
  } catch (err) {
    console.error("Add address error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.userId });
    res.json({ success: true, addresses });
  } catch (err) {
    console.error("Get address error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const address = await Address.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updateData,
      { new: true }
    );

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.json({ success: true, message: "Address updated", address });
  } catch (err) {
    console.error("Update address error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.json({ success: true, message: "Address deleted" });
  } catch (err) {
    console.error("Delete address error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};