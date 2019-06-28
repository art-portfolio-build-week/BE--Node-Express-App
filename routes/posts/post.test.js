const supertest = require('supertest');

const server = require('../../api/server');


// create token for tests
let token;
beforeAll(done => {
    supertest(server)
        .post("/api/login")
        .send({
            email: "Jamar.Russel76@gmail.com",
            password: "pass"
        })
        .end((err, res) => {
            token = res.body.token; // save the token!
            done();
        });
});

describe('postings', () => {

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
      });
    

    describe('GET postings', () => {
        
        it('gets all posts and responds with 200', ()=> {
            return supertest(server).get('/api/posts')
            .expect(200)
        })

        it("GET a post By ID and responds with 200", () => {
            return supertest(server).get('/api/posts/1')
            .expect(200);
            
        })
    })

    describe("POST", () => {
        it("adds a new post and returns 201", () => {
          return supertest(server).post("/api/posts")
            .send({
                imgURL: "http://lorempixel.com/640/480/nature/2",
                description: "What a lovely place",
                title: "waaow",
                category: "nature",
                timestamp: "thetimeofnow",
            })
            .set("Authorization", `${token}`)
            .then(res => {
              expect(res.status).toBe(201);
            });
        });
    })

        

    

  

})