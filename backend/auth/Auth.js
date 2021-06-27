const admin = true;

const notAdminErrorDescription = (route, method) => `Ruta ${route} método ${method} no autorizada.`;

export const isAdmin = (req, res, next) => {
  if (!admin) {
    res.json({error_description: notAdminErrorDescription(req.route.path, req.method), error: -1})
  } else {
    next();
  }
};
