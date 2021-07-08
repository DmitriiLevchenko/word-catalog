export default function(req, res, next) {
  console.log(res.data)
  try {
    if (!res.data) {
      throw new Error("Server answer is empty");
    } else {
      res.status(200).json(res.data);
    }
  } catch (e) {
    next(e);
  }
};
