export const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(401).json({ message: "Foydalanuvchi roli topilmadi" });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Kirish taqiqlangan: sizda yetarli huquq yo'q" });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Ruxsat tekshirishda xatolik yuz berdi", error: err.message });
    }
  };
};
