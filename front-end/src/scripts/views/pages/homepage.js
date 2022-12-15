/* eslint-disable camelcase */
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import API_ENDPOINT from '../../globals/api-endpoint';

const Homepage = {
  async render() {
    return `
    <div class="home" id="home">
            <div class="content-home">
                <div class="text-home">
                    <h2>Find a <span>Time</span> for your Meetings</h2>
                </div>
                <div class="room">
                  <form>
                    <div class="inputUser">
                      <input type="" name="" id="join-code" placeholder="enter your join code" minlength="15" maxlength="16" required>
                      <p id="validationCode"></p>
                    </div>
                    <div class="inputUser">
                      <input type="text" name="" id="username" placeholder="enter a your name" required>
                      <p id="validationUsername"></p>
                    </div>
                    <button id="join-button" type="submit">JOIN</button>
                </form>
                </div>
            </div>
            <div class="pic-home">
                <figure>
                    <img src="meet.png" alt="">
                </figure>
            </div>
        </div>
        
        <div class="features" id="features">
            <article class="card">
                <i><img class="img-icon" src="service1.png" alt=""></i>
                <h3>Create a Room</h3>
                <p>You can find a button to create room on the right top </p>
                <a class="next" id="next" href=""><img src="next.png" alt=""></a>
                <a class="next" id="next2" href=""><img src="next2.png" alt=""></a>
            </article>
            <article class="card">
                <i><img class="img-icon" src="service2.png" alt=""></i>
                <h3>Enter a join code</h3>
                <p>Enter a join code that given by host</p>
                <a class="next" id="next" href=""><img src="/next.png" alt=""></a>
                <a class="next" id="next2" href=""><img src="/next2.png" alt=""></a>
            </article>
            <article class="card">
                <i><img class="img-icon" src="service3.png" alt=""></i>
                <h3>List your schedule</h3>
                <p>Tell your friends about your schedule</p>
                <a class="next" id="next" href=""><img src="/next.png" alt=""></a>
                <a class="next" id="next2" href=""><img src="/next2.png" alt=""></a>
            </article>
            <article class="card">
                <i><img class="img-icon" src="service3.png" alt=""></i>
                <h3>See the Result</h3>
                <p>We will find free time for your meeting</p>
                <a class="next" id="next" href=""><img src="/next.png" alt=""></a>
                <a class="next" id="next2" href=""><img src="/next2.png" alt=""></a>
            </article>
        </div>
    `;
  },

  async afterRender() {
    const joinButton = document.getElementById('join-button');
    const joinCodeInput = document.getElementById('join-code');
    const validationCode = document.getElementById('validationCode');
    joinCodeInput.addEventListener('input', () => {
      if (joinCodeInput.value.length < 5) {
        validationCode.innerText = 'minimal 15 karakter';
      } else {
        validationCode.innerText = '';
      }
    });

    const postDataUser = async (idRoom, userName, roomsName, dateValues) => {
      const room = {
        id_room: idRoom,
        nama_pengguna: userName,
        nama_room: roomsName,
        hari_dan_tanggal: dateValues,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(room),
      };

      const response = await fetch(`${API_ENDPOINT.USER}`, options);
      const responseJson = await response.json();
      if (responseJson.status === 'success') {
        await FavoriteMovieIdb.addMovie(room);
        if (confirm('Join success!') === true) {
          window.location.assign('http://localhost:9009/#/rooms');
        }
      } else {
        alert(responseJson.status);
      }
    };

    const insertBook = async () => {
      const joinCode = document.getElementById('join-code').value;
      const username = document.getElementById('username').value;

      const options = {
        method: 'GET',
      };
      const response = await fetch(`${API_ENDPOINT.ROOM}`, options);
      const responseJson = await response.json();

      const pilihanHari = [];
      const { room, pilihan_hari } = responseJson.data;
      const roomId = [];

      room.forEach((roomItem) => {
        if (roomItem.id_room === joinCode) {
          roomId.push(roomItem.id_room);

          pilihan_hari.forEach((hari) => {
            if (hari.id_room === joinCode) {
              const dateObj = new Date(`${hari.hari_dan_tanggal}`);
              const month = dateObj.getUTCMonth() + 1; // months from 1-12
              const day = dateObj.getUTCDate() + 1;
              const year = dateObj.getUTCFullYear();
              const newdate = `${year}-${month}-${day}`;
              pilihanHari.push(newdate);
            }
          });

          postDataUser(
            roomId[0],
            username,
            roomItem.nama_room,
            pilihanHari,
          );
        }
      });
    };

    joinButton.addEventListener('click', (event) => {
      insertBook();
      event.preventDefault();
    });
  },
};

export default Homepage;
