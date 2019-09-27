
var Game = {
    template:
        `
        <div class="container marketing">
        <hr class="featurette-divider">
        <h1>List of games</h1>
        <div v-if="result" class="alert alert-info">Launch Code: {{result}}
        <span @click="closeAlert()" class="pull-right cursor-pointer">X</span>
        </div>
        <div v-if="loading" class="alert alert-info">Loading...</div>
        <table v-if="!loading" id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"  width="100%">
            <thead>
                <tr>
                    <th class="th-sm">Name</th>
                    <th class="th-sm">Provider</th>
                    <th class="th-sm">RTP</th>
                    <th class="th-sm">Image</th>
                    <th class="th-sm"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in games" :key="game.launchcode">
                    <td>{{game.name}}</td>
                    <td>{{game.provider}}</td>
                    <td>{{game.rtp}}</td>
                    <td><img class="avatar" :src=renderImg(game.launchcode) /></td>
                    <td>
                        <span class="text-danger cursor-pointer" @click="getGame(game.launchcode)">
                        View
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`,
    data() {
        return {
            games: [],
            loading: false,
            result: '',
            message: "Game List"
        }
    },
    mounted() {
        this.loadGames();
    },
    methods: {
        loadGames() {
            this.loading = true;
            axios
                .get('http://localhost/leads/api/controllers/GameController.php?action=fetch-all-open-brand-games')
                .then(response => {
                    this.games = response.data;
                    console.log(this.games);
                    this.loading = false;
                });
        },
        getGame(code) {
           this.result = code;

        },
        closeAlert(){
            this.result = ""
        },
        renderImg(code){
            return "https://stage.whgstage.com/scontent/images/games/"+code+".jpg";
        }
    }
}

