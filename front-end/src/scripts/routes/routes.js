import NowPlaying from '../views/pages/now-playing';
import Upcoming from '../views/pages/upcoming';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';
import Status from '../views/pages/status';

const routes = {
  '/': NowPlaying, // default page
  '/now-playing': NowPlaying,
  '/upcoming': Upcoming,
  '/detail/:id': Detail,
  '/like': Like,
  '/status/:id': Status,
};

export default routes;
