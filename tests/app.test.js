const request = require('supertest')
const http = require('http')

const { app } = require('../index')
const { getAllGames } = require('../controllers/index')

jest.mock('../controllers/index.js', () => ({
    ...jest.requireActual('../controllers/index.js'),
    getAllGames : jest.fn()
}))

let server
beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3001, done)
})

afterAll((done) => {
    server.close(done)
})

describe('Controller Function test', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should return all games', () => {
        const mockGames = [
            {
                'gameId': 1,
                'title': 'The Legend of Zelda: Breath of the Wild',
                'genre': 'Adventure',
                'platform': 'Nintendo Switch'
            },
            {
                'gameId': 2,
                'title': 'Red Dead Redemption 2',
                'genre': 'Action',
                'platform': 'PlayStation 4'
            },
            {
                'gameId': 3,
                'title': 'The Witcher 3: Wild Hunt',
                'genre': 'RPG',
                'platform': 'PC'
            }
        ]
        getAllGames.mockReturnValue(mockGames)
        const games = getAllGames()
        expect(games).toEqual(mockGames)
        expect(games.length).toBe(3)
    })
})

describe('API Endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('GET /games should retrieve all game', async () => {
        const mockGames = [
            {
                'gameId': 1,
                'title': 'The Legend of Zelda: Breath of the Wild',
                'genre': 'Adventure',
                'platform': 'Nintendo Switch'
            },
            {
                'gameId': 2,
                'title': 'Red Dead Redemption 2',
                'genre': 'Action',
                'platform': 'PlayStation 4'
            },
            {
                'gameId': 3,
                'title': 'The Witcher 3: Wild Hunt',
                'genre': 'RPG',
                'platform': 'PC'
            }
        ]
        const resp = await request(server).get('/games')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ games: mockGames })
        expect(resp.body.games.length).toBe(3)
    })

    it('GET /games/details/:id should retrieve the game with matching id', async () => {
        const game = {
            'gameId': 1,
            'title': 'The Legend of Zelda: Breath of the Wild',
            'genre': 'Adventure',
            'platform': 'Nintendo Switch'
        }
        const resp = await request(server).get('/games/details/1')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ game })
    })
})