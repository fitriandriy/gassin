import Homepage from '../views/pages/homepage';
import CreateRoom from '../views/pages/createRoom';
import Detail from '../views/pages/detail';
import Rooms from '../views/pages/rooms';
import Status from '../views/pages/status';
import Result from '../views/pages/result';
import Voting from '../views/pages/voting';

const routes = {
  '/': Homepage, // default page
  '/home': Homepage,
  '/create': CreateRoom,
  '/detail/:id': Detail,
  '/rooms': Rooms,
  '/status/:id': Status,
  '/result/:id': Result,
  '/voting/:id': Voting,
};

export default routes;
