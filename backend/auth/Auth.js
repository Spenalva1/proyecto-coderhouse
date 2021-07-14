const admin = process.env.ADMIN;

const notAdminErrorDescription = (route, method) => `Ruta ${route} método ${method} no autorizada.`;

export const isAdmin = (req, res, next) => {
  if (admin !== 'true') {
    res.json({error_description: notAdminErrorDescription(req.route.path, req.method), error: -1})
  } else {
    next();
  }
};
