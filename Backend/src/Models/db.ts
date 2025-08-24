import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['consumer', 'supplier'],
    required: true,
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);

const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate supplier ids
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
  },
  serviceCategory: {
    type: String,
    required: true,
    trim: true,
  },
  volumeDistributing: {
    type: Number, // assuming quantity (kg, liters, units, etc.)
    required: true,
    min: 0,
  },
  deliveryLeadTimes: {
    type: Number, // in days
    required: true,
    min: 0,
  },
}, { timestamps: true });

const SupplierModel = mongoose.model("Supplier", supplierSchema);

//Consumer Schema 
const consumerSchema = new mongoose.Schema({
    consumerName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    purchaseHistory: [
      {
        type: String, // just storing product/service name for simplicity
        trim: true,
      }
    ],
    address: {
      type: String,
      required: true,
      trim: true,
    },
  }, { timestamps: true });
  
  const ConsumerModel = mongoose.model("Consumer", consumerSchema);
  
  export { UserModel, SupplierModel, ConsumerModel };
  