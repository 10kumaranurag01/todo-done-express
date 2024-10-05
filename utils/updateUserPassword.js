// Helper function to update the user's password
const updateUserPassword = async (user, newPassword) => {
  user.password = newPassword; // Set the new password
  await user.save(); // Hashes the new password automatically
};

module.exports = updateUserPassword;
