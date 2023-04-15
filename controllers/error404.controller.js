import { errorMessageFormat } from '../utils/errorMessageFormat';

export const error404 = (req, res) => {
   res.status(404).json(errorMessageFormat('Not Found', req));
};
