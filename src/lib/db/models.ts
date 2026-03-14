import mongoose, { Schema, type InferSchemaType } from "mongoose";

/* ============================================================
   User
   ============================================================ */
const userSchema = new Schema(
  {
    phone: String,
    email: String,
    password: { type: String, default: "" },
    role: { type: String, enum: ["individual", "parent", "guardian"], default: "individual" },
    gender: { type: String, enum: ["male", "female"], required: true },
    isPremium: { type: Boolean, default: false },
    plan: { type: String, enum: ["free", "premium_3", "premium_6", "premium_12"], default: "free" },
    status: { type: String, enum: ["active", "suspended", "banned", "inactive"], default: "active" },
    profileComplete: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============================================================
   Profile
   ============================================================ */
const profileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // Basic
    fullName: { type: String, required: true },
    dateOfBirth: String,
    age: Number,
    height: String,
    motherTongue: String,
    community: String,
    subCaste: String,
    maritalStatus: { type: String, enum: ["never_married", "divorced", "widowed", "awaiting_divorce"], default: "never_married" },
    hasChildren: { type: Boolean, default: false },
    numberOfChildren: Number,
    // Religious & Family
    religion: { type: String, default: "Hindu" },
    gothra: String,
    star: String,
    rashi: String,
    hasDosham: { type: Schema.Types.Mixed, default: null },
    familyType: { type: String, enum: ["joint", "nuclear"], default: "nuclear" },
    familyStatus: String,
    fatherOccupation: String,
    motherOccupation: String,
    brothersMarried: { type: Number, default: 0 },
    brothersUnmarried: { type: Number, default: 0 },
    sistersMarried: { type: Number, default: 0 },
    sistersUnmarried: { type: Number, default: 0 },
    // Education & Career
    highestDegree: String,
    institution: String,
    occupation: String,
    employer: String,
    annualIncome: String,
    workLocation: String,
    // Lifestyle
    diet: { type: String, enum: ["vegetarian", "non_vegetarian", "eggetarian"], default: "vegetarian" },
    smoking: { type: String, enum: ["no", "occasionally", "yes"], default: "no" },
    drinking: { type: String, enum: ["no", "occasionally", "yes"], default: "no" },
    hobbies: [String],
    aboutMe: String,
    lookingFor: String,
    // Photos
    photos: [{ url: String, isPrimary: Boolean, order: Number }],
    horoscopeUrl: String,
    verificationStatus: { type: String, enum: ["unverified", "pending", "verified"], default: "unverified" },
    // Meta
    isOnline: { type: Boolean, default: false },
    lastActive: Date,
    profileViews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============================================================
   Partner Preferences
   ============================================================ */
const partnerPreferencesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ageRange: { type: [Number], default: [22, 32] },
  heightRange: { type: [String], default: ["5'0\"", "6'0\""] },
  education: [String],
  occupation: [String],
  communities: [String],
  locations: [String],
  starCompatibility: { type: String, enum: ["must", "preferred", "not_important"], default: "preferred" },
  dosham: { type: String, enum: ["must_not", "doesnt_matter"], default: "doesnt_matter" },
  diet: { type: String, enum: ["must_veg", "doesnt_matter"], default: "doesnt_matter" },
  maritalStatus: [String],
});

/* ============================================================
   Interest
   ============================================================ */
const interestSchema = new Schema(
  {
    fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "declined", "expired", "withdrawn"], default: "pending" },
    note: String,
    respondedAt: Date,
  },
  { timestamps: true }
);

/* ============================================================
   Conversation & Message
   ============================================================ */
const conversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: String,
    lastMessageAt: Date,
    unreadCount: { type: Map, of: Number, default: {} },
  },
  { timestamps: true }
);

const messageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["text", "system", "photo"], default: "text" },
    isRead: { type: Boolean, default: false },
    status: { type: String, enum: ["sending", "sent", "delivered", "read", "failed"], default: "sent" },
  },
  { timestamps: true }
);

/* ============================================================
   Shortlist
   ============================================================ */
const shortlistSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    shortlistedUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

/* ============================================================
   Profile View
   ============================================================ */
const profileViewSchema = new Schema(
  {
    viewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    viewedUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

/* ============================================================
   Verification Request
   ============================================================ */
const verificationRequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
    documentType: { type: String, enum: ["aadhaar", "passport", "voter_id", "driving_license"] },
    documentUrl: String,
    selfieUrl: String,
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    reviewedAt: Date,
    reviewedBy: String,
    rejectionReason: String,
  },
  { timestamps: true }
);

/* ============================================================
   Report
   ============================================================ */
const reportSchema = new Schema(
  {
    reportedUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportedUserName: String,
    reportedByUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportedByUserName: String,
    reason: { type: String, enum: ["fake_profile", "inappropriate_photos", "harassment", "spam", "underage", "other"] },
    description: String,
    status: { type: String, enum: ["open", "resolved", "dismissed"], default: "open" },
    resolvedAt: Date,
    resolution: String,
  },
  { timestamps: true }
);

/* ============================================================
   Subscription
   ============================================================ */
const subscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
    plan: { type: String, enum: ["premium_3", "premium_6", "premium_12"], required: true },
    amount: Number,
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
    paymentMethod: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
  },
  { timestamps: true }
);

/* ============================================================
   Admin
   ============================================================ */
const adminSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "" },
    role: { type: String, enum: ["super_admin", "moderator", "support"], default: "moderator" },
    avatarUrl: String,
    lastLogin: Date,
  },
  { timestamps: true }
);

/* ============================================================
   Activity Log
   ============================================================ */
const activityLogSchema = new Schema(
  {
    action: String,
    description: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    userName: String,
  },
  { timestamps: true }
);

/* ============================================================
   Exports — use existing model if already compiled (HMR safe)
   ============================================================ */
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export const PartnerPreferences = mongoose.models.PartnerPreferences || mongoose.model("PartnerPreferences", partnerPreferencesSchema);
export const Interest = mongoose.models.Interest || mongoose.model("Interest", interestSchema);
export const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);
export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export const Shortlist = mongoose.models.Shortlist || mongoose.model("Shortlist", shortlistSchema);
export const ProfileView = mongoose.models.ProfileView || mongoose.model("ProfileView", profileViewSchema);
export const VerificationRequest = mongoose.models.VerificationRequest || mongoose.model("VerificationRequest", verificationRequestSchema);
export const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);
export const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const ActivityLog = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);
